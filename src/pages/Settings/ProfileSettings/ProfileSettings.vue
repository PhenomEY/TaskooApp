<template>
  <div class="profile-settings-inner" v-if="user">

    <div class="input-label">
      {{ $t('settings.profile_settings.avatar') }}
    </div>
      <div class="user-avatar">
        <taskoo-avatar :user="user"></taskoo-avatar>

        <div class="change">
          <input class="fileinput" type="file" name="file" id="file" ref="fileinput" @change="upload"/>
          <label for="file">
            <span class="upload-text">
              {{ $t('settings.profile_settings.avatar_upload') }} <q-icon name="file_upload"></q-icon>
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
