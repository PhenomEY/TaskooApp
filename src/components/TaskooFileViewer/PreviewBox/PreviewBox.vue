<template>
    <div class="preview-box box-shadow">

      <div class="file-informations">
        <div class="file-name" :title="file.fileName">
          {{ file.fileName }}
        </div>

        <v-popover offset="16">

          <taskoo-icon-button class="tooltip-target">
            <q-icon name="more_vert"></q-icon>
          </taskoo-icon-button>

          <template slot="popover">
            <div class="taskoo-popover-options">
              <div class="option remove" @click="deleteFile(file.id)" v-close-popover>
                <q-icon name="delete"></q-icon>
                {{ $t('task.files.delete') }}
              </div>
            </div>
          </template>
        </v-popover>
      </div>

      <div class="file-image-wrapper" v-if="isImage(file.fileExtension)">
        <a :href="API_URL+'/file/'+file.filePath" class="file-link" target="_blank" :title="file.fileName">
          <img :src="API_URL+'/file/'+file.filePath"  class="file-image" :alt="file.fileName" />
        </a>
      </div>

      <div class="file-icon-wrapper" v-else>
        <a :href="API_URL+'/file/'+file.filePath" class="file-link" target="_blank" :title="file.fileName">
          <div class="file-icon">
            <q-icon name="file_download"></q-icon>
          </div>

          <span class="file-extension">
            {{ file.fileExtension }}
          </span>
        </a>
      </div>
    </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

