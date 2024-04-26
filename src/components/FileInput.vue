<template>
  <div class="flex flex-col">
    <label class="pb-3">{{ label }}</label>

    <div class="flex gap-4 items-center">
      <input
        type="file"
        ref="fileInputRef"
        <!-- @ts-ignore -->
        @change="handleFileInputChange($event.target?.files?.[0])"
        :accept="accept"
        :disabled="disabled"
        hidden
      />

      <FileInputButton @click="handleFileInputButtonClick" :disabled="disabled">{{
        fileInputButtonText
      }}</FileInputButton>

      <div class="flex flex-row gap-2" :class="{ disabled }">
        <span v-if="fileInputButtonText === 'Отменить'" class="loader" />

        <div v-if="fileRef">
          <span>{{ fileRef.name }}</span>
        </div>

        <div v-else>{{ noFileChosenLabel }}</div>
      </div>
    </div>

    <p class="hint-text" :class="{ error: fileInputHintText === 'Error message' }">
      {{ fileInputHintText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import FileInputButton from './FileInputButton.vue'
import { ref } from 'vue'

// TODO: add enum or internal button state instead of button text mapping

const props = defineProps({
  label: {
    type: String,
    default: 'Выбрать файл'
  },
  noFileChosenLabel: {
    type: String,
    default: 'Файл не выбран'
  },
  hintText: {
    type: String,
    default: 'Hint text'
  },
  accept: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

const fileInputRef = ref<HTMLInputElement | null>(null)
// using ref because v-model does not support input file
const fileRef = ref<File | null>(null)
const fileInputButtonText = ref(props.label)
const fileInputHintText = ref<string>(props.hintText)
let controller: AbortController

function handleFileInputButtonClick() {
  fileInputHintText.value = props.hintText

  switch (fileInputButtonText.value) {
    case 'Удалить':
      fileInputButtonText.value = 'Выбрать файл'
      fileRef.value = null
      fileInputRef.value && (fileInputRef.value.value = '')
      break

    case 'Отменить':
      controller.abort()
      fileInputButtonText.value = 'Выбрать файл'
      fileRef.value = null
      fileInputRef.value && (fileInputRef.value.value = '')
      break

    case 'Выбрать файл':
      fileInputRef.value?.click()
      break

    default:
      fileInputRef.value?.click()
      break
  }
}

async function handleFileInputChange(file?: File) {
  if (!file) return
  try {
    fileRef.value = file
    fileInputButtonText.value = 'Отменить'

    controller = new AbortController()

    // const data = new FormData()
    // data.set('file', fileRef.value)
    // await fetch(
    //   '/media',
    //   {
    //     method: 'POST',
    //     body: data
    //   },
    //   { signal: controller.signal }
    // )
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, 2000)
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timeout)
        reject('Error message')
      })
    })

    fileInputButtonText.value = 'Удалить'
  } catch (error) {
    if (typeof error === 'string') fileInputHintText.value = error
  }
}
</script>

<style scoped>
/* TODO: replace with semantic colors */
.hint-text {
  margin-top: 8px;
  font-size: 12px;
  color: #757575;
}

.disabled {
  color: #9ca3b0;
  pointer-events: none;
}

.error {
  color: #ef4343;
}
</style>
