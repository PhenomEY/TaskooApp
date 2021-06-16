<template>
  <div class="offpage-wrapper">
    <div class="slim-container">

      <div class="header">
        <taskoo-logo></taskoo-logo>
        <span class="taskoo-slogan">
          {{ $t('taskoo.slogan') }}
        </span>
      </div>

      <form novalidate class="form" @submit.prevent="login">

        <div class="error-message" v-if="formError">
          {{ $t('login.login_failed') }}
        </div>

        <taskoo-input type="email" :model="username" placeholder="user@taskoo.de" :label="$t('login.labels.email')" @modelChanged="setUsername(...arguments)"></taskoo-input>


        <taskoo-input type="password" :model="password" :placeholder="$t('login.labels.password')" :label="$t('login.labels.password')" @modelChanged="setPassword(...arguments)"></taskoo-input>


        <button class="taskoo-button" type="submit">
          {{ $t('login.submit') }}
        </button>

        <div class="links">
          <a href="#" class="lost-password">
            {{ $t('login.links.lostPassword') }}
          </a>
          <a href="https://taskoo.de" class="about" target="_blank">
            {{ $t('login.links.about') }}
          </a>
        </div>
      </form>

    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
