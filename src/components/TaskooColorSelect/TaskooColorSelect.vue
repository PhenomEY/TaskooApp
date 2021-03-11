<template>
  <div>
    <multiselect class="taskoo-select color-select" v-model="data"
                 :options="colors"
                 selectLabel=""
                 deselectLabel=""
                 selectedLabel=""
                 :loading="!colors"
                 :searchable="false"
                 :allowEmpty="false"
                 @select="selectedColor"
    >
      <template v-if="colors" slot="singleLabel" slot-scope="props"> <span class="color-brick" v-bind:style= "[props.option.hexCode ? {background: props.option.hexCode} : {}]"></span></template>

      <template v-if="colors" slot="option" slot-scope="props">
        <span class="color-brick" v-bind:style= "[props.option.hexCode ? {background: props.option.hexCode} : {}]"></span>
      </template>
    </multiselect>
  </div>
</template>



<style src="./style.scss" lang="scss">
</style>

<script src="./index.js"></script>
