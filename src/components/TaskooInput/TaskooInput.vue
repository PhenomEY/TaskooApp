<template>
      <div class="taskoo-input" v-bind:class="{'error': (error)}">
        <span v-if="label" class="input-label" >{{ label }}</span>

        <div class="input-field-container">
          <div class="input-field">
            <input class="box-shadow" :type="type" :placeholder="placeholder" v-model="inputModel" @change="modelChange" :required="required ? true : false">
            <div class="info-text" v-if="infoText">
              {{ infoText }}
            </div>
          </div>

          <taskoo-help-icon v-if="helpText" :help-text="helpText"></taskoo-help-icon>
        </div>
      </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

