<template>
    <div>
        <label class="input-file">
            <input type="file" name="file" @change="upload" ref="files">
            <span>
                <div v-if="isUploaded" class="input-file-btn">Удалить</div>
                <div v-else class="input-file-btn">Выберите файл</div>
            </span>
            <span class="input-file-text">
                <div v-if="isUploading" class="flex"><Spinner/>{{ $refs.files.files[0].name }}</div>
                <div v-else-if="isUploaded">{{ $refs.files.files[0].name }}</div>
                <div v-else>Файл не выбран</div>
            </span>
        </label>
    </div>
</template>

<script>
import Spinner from './Spinner.vue'

export default {
    data() {
        return {
            isUploaded: false,
            isUploading: false
        }
    },
    components: {Spinner},
    methods: {
        upload() {
            this.isUploaded = true
            clearTimeout(this.isUploading)
            this.isUploading = setTimeout(() => {
                this.isUploading = true
            }, 5000)
            console.log(this.$refs.files.files)
        }
    },
}
</script>