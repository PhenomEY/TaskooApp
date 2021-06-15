<template>
  <div class="content-wrapper boxed-content">
    <div class="boxed-content-title">
      <slot name="title"></slot>
    </div>
    <div class="content-inner">
      <div class="boxed-content-navigation t-s-h">
        <slot name="navigation"></slot>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss">
</style>

<script src="./index.js"></script>

