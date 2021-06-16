<template>
  <div class="invite-wrapper">
    <taskoo-loader v-if="verifying"></taskoo-loader>

    <div class="offpage-wrapper" v-else>
      <div class="slim-container">

        <div class="header">
          <taskoo-logo></taskoo-logo>
          <span class="taskoo-slogan">
          {{ $t('taskoo.slogan') }}
        </span>
        </div>

        <div class="invite-form-container" v-show="!inviteSuccess">
          <div class="invite-header">
            <h1 class="headline">
              {{ $t('invite.headline', {name: invitedUser.firstname}) }}
            </h1>

            <div class="invite-text">
              {{ $t('invite.inviteText') }}
            </div>
          </div>

          <form novalidate class="form" @submit.prevent="finishInvite">
            <div class="error-message" v-if="formError">
              {{ $t('invite.passwordError') }}
            </div>

            <div class="user-mail">
              {{ invitedUser.email }}
            </div>

            <taskoo-input :info-text="$t('invite.new_password_info')" :error="inviteForm.password.error" type="password" :model="inviteForm.password.value" :placeholder="$t('login.labels.password')" :label="$t('login.labels.password')" @modelChanged="setPassword(...arguments)"></taskoo-input>
            <taskoo-input :error="inviteForm.password_ver.error" type="password" :model="inviteForm.password_ver.value" :placeholder="$t('login.labels.password')" :label="$t('login.labels.password_verification')" @modelChanged="setPasswordVer(...arguments)"></taskoo-input>


            <button class="taskoo-button" type="submit" :disabled="loading">
              {{ $t('invite.submit') }}
            </button>

            <div class="links">
              <a href="https://taskoo.de" class="about" target="_blank">
                {{ $t('login.links.about') }}
              </a>
            </div>
          </form>
        </div>

        <div class="invite-success" v-show="inviteSuccess">
          {{ $t('invite.successText') }} <br />
          {{ $t('invite.redirect') }}
        </div>


      </div>
    </div>

  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
