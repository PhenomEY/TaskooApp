<template>
    <div class="preview-box box-shadow">

      <div class="file-informations">
        <div class="file-name" :title="file.fileName">
          {{ file.fileName }}
        </div>

        <v-popover offset="16">
          <md-button class="md-icon-button md-list-action tooltip-target">
            <md-icon>more_vert</md-icon>
          </md-button>


          <template slot="popover">
            <div class="taskoo-popover-options">
              <div class="option remove" @click="deleteFile(file.id)" v-close-popover>
                <md-icon>delete</md-icon>
                {{ $t('task.files.delete') }}
              </div>
            </div>
          </template>
        </v-popover>
      </div>

      <div class="file-image-wrapper" v-if="isImage(file.fileExtension)">
        <a :href="apiURL+'/file/'+file.filePath" class="file-link" target="_blank" :title="file.fileName">
          <img :src="apiURL+'/file/'+file.filePath"  class="file-image" :alt="file.fileName" />
        </a>
      </div>

      <div class="file-icon-wrapper" v-else>
        <a :href="apiURL+'/file/'+file.filePath" class="file-link" target="_blank" :title="file.fileName">
          <md-icon>file_download</md-icon>

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

