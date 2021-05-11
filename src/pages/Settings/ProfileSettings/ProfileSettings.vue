<template>
  <div class="profile-settings-inner taskoo-scrollbar-y" v-if="user">

    <div class="input-label">
      {{ $t('settings.profile_settings.avatar') }}
    </div>
      <div class="taskoo-avatar">
        <div class="avatar" v-bind:style="[(user.color) ? {background: user.color.hexCode, borderColor: user.color.hexCode} : {}]">
          <img v-if="user.avatar.filePath" :src="API_URL+'/file/'+user.avatar.filePath" />
        </div>

        <div class="change">
          <input class="fileinput" type="file" name="file" id="file" ref="fileinput" @change="upload"/>
          <label for="file">
            <span class="upload-text">
               {{ $t('settings.profile_settings.avatar_upload') }} <md-icon>file_upload</md-icon>
            </span>
          </label>
        </div>
      </div>

      <div class="input-label">
        {{ $t('settings.profile_settings.profile_color') }}
      </div>
      <taskoo-color-select :model="user.color" :colors="availableColors" @selectedColor="changeColor"></taskoo-color-select>
  </div>

  <div v-else>

  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
