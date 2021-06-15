<template>
  <div class="file-preview" v-if="files.length > 0">
    <preview-box v-for="(file, index) in files" :file="file" @delete="toggleDeleteDialog({index, ...arguments})"></preview-box>

    <!--    delete dialog-->
    <taskoo-dialog v-if="deleteData" class="taskoo-dialog"
                   :active="showDialog"
                   :title="$t('prompts.delete.file.title', {name: files[deleteData.index].fileName})"
                   :content="$t('prompts.delete.taskGroup.description')"
                   :confirm-text="$t('prompts.delete.taskGroup.confirm')"
                   :cancel-text="$t('prompts.delete.taskGroup.cancel')"
                   @close="toggleDeleteDialog(false)"
                   @confirm="deleteFile"
    >
    </taskoo-dialog>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

