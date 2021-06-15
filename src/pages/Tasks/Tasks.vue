<template>
  <div class="tasks-wrapper content-wrapper">
    <div class="tasks-content">
      <div class="tasks-header">
        <h1 class="title">{{ $t('tasks.title') }}</h1>

        <div class="tasks-options">
          <div class="finish-button" v-bind:class="{'done': (doneTasks)}" @click="showDoneTasks">
            <q-icon name="check_circle_outline"></q-icon>
            <span>{{ $t('tasks.doneTasks') }}</span>
          </div>
        </div>
      </div>

      <div class="tasks">
        <div class="taskoo-tasklist skeleton" v-if="loadingTasks">
          <div class="entry">
            <PuSkeleton class="taskoo-skeleton" />
          </div>
        </div>

        <task-list v-else type="myTasks" :tasks="tasks" :noDragging="true" @finishTask="finishTask(...arguments)" @changedTaskName="changeTaskName(...arguments)"></task-list>
      </div>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

