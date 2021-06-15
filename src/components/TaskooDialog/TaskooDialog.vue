<template>
  <q-dialog v-model="isActive" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="q-ml-sm title">{{ title }}</div>
        <span class="q-ml-sm">{{ content }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="cancelText" color="primary" v-close-popup @click="emitClose" />
        <q-btn flat :label="confirmText" color="primary" class="confirm" v-close-popup @click="emitConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style src="./style.scss" lang="scss"></style>

<script src="./index.js"></script>
