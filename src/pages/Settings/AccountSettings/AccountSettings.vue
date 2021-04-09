<template>
  <div class="account-settings-inner taskoo-scrollbar-y">
    <taskoo-input :error="userForm.firstname.error" type="text" :model="userForm.firstname.value" placeholder="Jan" :label="$t('user.firstname')" @modelChanged="setUserFormValue('firstname', ...arguments)"></taskoo-input>

    <taskoo-input :error="userForm.lastname.error" type="text" :model="userForm.lastname.value" placeholder="Dommasch" :label="$t('user.lastname')" @modelChanged="setUserFormValue('lastname', ...arguments)"></taskoo-input>

    <button type="submit" class="taskoo-button" :disabled="updatingUser" @click="updateUser">{{ $t('settings.account_settings.save') }}</button>

    <div class="subline">
      <span>{{ $t('settings.account_settings.data_title') }}</span>
    </div>

    <taskoo-input :error="dataForm.password_current.error" type="password" :model="dataForm.password_current.value" :placeholder="$t('login.labels.password_current')" :label="$t('login.labels.password_current')" @modelChanged="setDataFormValue('password_current', ...arguments)"></taskoo-input>

    <taskoo-input :error="dataForm.email.error" type="email" :model="dataForm.email.value" :placeholder="dataForm.email.oldVal" label="E-Mail" @modelChanged="setDataFormValue('email', ...arguments)"></taskoo-input>

    <taskoo-input :error="dataForm.password.error" type="password" :model="dataForm.password.value" :placeholder="$t('settings.account_settings.new_password')" :label="$t('settings.account_settings.new_password')" @modelChanged="setDataFormValue('password', ...arguments)"></taskoo-input>

    <taskoo-input :error="dataForm.password_ver.error" type="password" :model="dataForm.password_ver.value" :placeholder="$t('settings.account_settings.new_password_confirm')" :label="$t('settings.account_settings.new_password_confirm')" @modelChanged="setDataFormValue('password_ver', ...arguments)"></taskoo-input>

    <button type="submit" class="taskoo-button" :disabled="updatingUser" @click="updateUserData">{{ $t('settings.account_settings.save') }}</button>

  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
