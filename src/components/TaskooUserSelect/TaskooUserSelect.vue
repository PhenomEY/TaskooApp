<template>
  <div class="taskoo-user-select">
    <multiselect class="user-select" v-model="data"
                 :options="options"
                 :multiple="multi"
                 :close-on-select="!multi"
                 track-by="id"
                 label="firstname"
                 :placeholder="$t('task.userSelect.placeholder')"
                 :selectLabel="$t('task.userSelect.selectLabel')"
                 :deselectLabel="$t('task.userSelect.deselectLabel')"
                 :selectedLabel="$t('task.userSelect.selectedLabel')"
                 @remove="removeUser(...arguments)"
                 @select="addUser(...arguments)"
                 :limit="3"
                 :disabled="disabled"
                 :custom-label="firstAndLastname"
                 :limitText= "count => $t('task.userSelect.more', {count: count})"
    >
      <template v-if="multi === false" slot="singleLabel" slot-scope="props"> <span>{{props.option.firstname}} {{props.option.lastname}}</span></template>

      <template slot="tag" slot-scope="props">
                  <span class="multiselect__tag user-tag">
                  <span>{{props.option.firstname}} {{props.option.lastname}}</span>
                  <i aria-hidden="true" tabindex="1" @mousedown.prevent="props.remove(props.option)" class="multiselect__tag-icon"></i>
                </span>
      </template>
      <template slot="option" slot-scope="props">
        <span>{{ props.option.firstname }}  {{ props.option.lastname }}</span>
      </template>
    </multiselect>
  </div>
</template>



<style src="./style.scss" lang="scss">
</style>

<script src="./index.js"></script>
