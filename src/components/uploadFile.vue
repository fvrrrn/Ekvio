<template>
    <div>
        <label class="input-file">
            <input type="file" name="file" @change="upload" ref="files">
            <span>
                <div v-if="isUploaded" class="input-file-btn">Удалить</div>
                <div v-else-if="isUploading" class="input-file-btn">Отменить</div>
                <div v-else-if="uploadStatus" class="input-file-btn">Выбрать</div>
                <div v-else class="input-file-btn">Выберите файл</div>
            </span>
            <span class="input-file-text">
                <div v-if="isUploading" class="flex">
                    <Spinner />{{ $refs.files.files[0].name }}
                </div>
                <div v-else-if="isUploaded">{{ $refs.files.files[0].name }}</div>
                <div v-else>Файл не выбран</div>
            </span>

        </label>
        <span v-if="uploadStatus" class="error">{{ this.uploadStatus }}</span>
        <span v-else class="text">Hint text</span>
    </div>
</template>

<script>
import Spinner from './Spinner.vue'

export default {
    data() {
        return {
            isUploaded: false,
            isUploading: false,
            uploadStatus: ''
        }
    },
    components: {Spinner},
    methods: {
        async upload() {
            try {
                this.isUploading = true;
                await new Promise((resolve, reject) =>
                    setTimeout(() => {
                        const luckyNumber = Math.floor(Math.random() * 6) + 1;
                        if (luckyNumber > 3) resolve();
                        else reject("Ошибка: отсуствует подключение к Интернету");
                    }, 3000),
                );
                this.isUploaded = true;
            } catch (error) {
                this.uploadStatus = error;
            } finally {
                this.isUploading = false;
            }
        },

    },
}
</script>