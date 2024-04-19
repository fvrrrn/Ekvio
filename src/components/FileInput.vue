<template>
  <div class="flex flex-col">
    <label class="pb-3">{{ label }}</label>
    <div class="flex gap-4 items-center">
      <input
        type="file"
        ref="fileInputRef"
        @change="handleFileInputChange"
        :accept="accept"
        :disabled="disabled"
        hidden
      />

      <FileInputButton @click="handleFileInputButtonClick">{{
        fileInputButtonText
      }}</FileInputButton>

      <div v-if="fileRef" class="selected-file-info">
        <span>{{ fileRef.name }}</span>
      </div>
      <div v-else>{{ noFileChosenLabel }}</div>
    </div>
    <p class="hint-text">{{ hintText }}</p>
  </div>
</template>

<script setup lang="ts">
import FileInputButton from './FileInputButton.vue'
import { ref } from 'vue'

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

function handleFileInputButtonClick() {
  fileRef.value ? cancelablePromise.cancel() : fileInputRef.value?.click()
}

async function handleFileInputChange(event: Event) {
  fileRef.value = event.target.files?.[0] || fileRef.value

  try {
    fileInputButtonSlot.value = 'Отменить'

    // TODO: add CancelablePromise
    await new Promise((resolve) => setTimeout(resolve, 1000))

    fileInputButtonSlot.value = 'Удалить'
  } catch (error) {
    fileInputHintText.value = error
  }
}
</script>

<style scoped>
/* TODO: replace with semantic colors */
/* TODO: replace with flex, items-center, gap-2 */
.selected-file-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.no-file-chosen {
  color: #757575;
}

.hint-text {
  margin-top: 8px;
  font-size: 12px;
  color: #757575;
}
</style>
