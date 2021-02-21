<template>
  <div class="taskoo-tasklist" v-bind:class="{'dashboard': (type === 'dashboard'), 'my-tasks': (type === 'myTasks')}">
    <div class="tasklist">
      <div class="task add" v-if="title || addButton">
        <span class="title" v-if="title">
          {{ title }}
        </span>

        <div class="add-button" v-else-if="addButton">
          <md-button class="md-icon-button md-list-action"  :disabled="addingTask" @click="addSubTask">
            <md-tooltip md-direction="top">{{ $t('task.addSubTask') }}</md-tooltip>
            <md-icon>add_circle_outline</md-icon>
          </md-button>
        </div>
      </div>

      <draggable handle=".list-task-dragger" :disabled="changingPositions || isMobile || disabled || noDragging" class="task-list-inner" :list="tasks" v-bind="dragOptions" @change="positionsChanged(tasks)">

        <div class="empty" v-if="tasks && noDragging && tasks.length === 0">
          <md-empty-state
            md-icon="check_circle_outline"
            :md-label="$t('tasks.emptyTasks')">
          </md-empty-state>
        </div>

      <div class="task item" v-for="(task,key) in tasks" v-bind:class="{'is-done': (task.isDone)}">
        <div class="list-task-left">
          <div class="list-task-dragger" v-if="!isMobile && !noDragging">
            <md-icon>swap_vert</md-icon>
          </div>

          <div class="list-task-name">
            <inputfield-editable @leftField="disabled = false" @editInput="disabled = true" :value="task.name" @saveInput="changeTaskName(key, task.id, ...arguments)"></inputfield-editable>
          </div>
        </div>

        <div class="list-task-right">
          <div class="list-task-project">
            <span class="project-entry"  v-if="type === 'myTasks' && task.projectName">
              <span class="label">Projekt: </span> <span class="project" @click="goToProject(task.projectId)">{{ task.projectName }}</span>
            </span>

          </div>

          <div class="list-task-secondary">
          <span class="has-subtasks" v-if="task.subTasks" :title="$t('task.hasSubTasks')">
             <md-icon>view_list</md-icon>
          </span>

          <span class="has-description" v-if="task.description" :title="$t('task.hasDescription')">
            <md-icon>notes</md-icon>
          </span>

            <span class="sub-date-due" v-if="task.dateDue && !task.isDone">
             {{ $t('task.dateDue') }} {{ task.dateDue.date | moment('LL') }}
            </span>

            <div class="list-task-done" v-if="task.isDone">
              {{ $t('task.doneAt') }} {{ task.doneAt.date | moment('LL') }}
            </div>

            <div class="task-options">
              <md-button class="md-icon-button md-list-action" @click="finishTask(key, task.id, task.isDone)">
                <md-icon v-if="task.isDone">check_circle</md-icon>
                <md-icon v-else>check_circle_outline</md-icon>
              </md-button>
              <md-button class="md-icon-button md-list-action" @click="goToTask(task.id)">
                <md-icon>keyboard_arrow_right</md-icon>
              </md-button>
            </div>
          </div>
        </div>
      </div>
      </draggable>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

