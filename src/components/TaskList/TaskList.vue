<template>
  <div class="taskoo-tasklist" v-bind:class="{'dashboard': (type === 'dashboard'), 'my-tasks': (type === 'myTasks')}">

         <div class="title" v-if="title">
          {{ title }}
        </div>
    <div class="tasklist box-shadow">
      <div class="task add" v-if="addButton">
        <div class="add-button">
          <taskoo-icon-button icon-name="add_circle_outline" :disabled="addingTask" @click="addSubTask">
            <q-tooltip anchor="top middle" :offset="[30, 30]">
              {{ $t('task.addSubTask') }}
            </q-tooltip>
            <q-icon name="add_circle_outline"></q-icon>
          </taskoo-icon-button>
        </div>
      </div>

      <draggable handle=".list-task-dragger" :disabled="changingPositions || isMobile || disabled || noDragging" class="task-list-inner" :list="tasks" v-bind="dragOptions" @change="positionsChanged(tasks)">

        <div class="empty" v-if="tasks && noDragging && tasks.length === 0">
          <q-icon name="o_task_alt"></q-icon>
          {{ $t('tasks.emptyTasks') }}
        </div>

      <div class="task item" v-for="(task,key) in tasks" v-bind:class="{'is-done': (task.isDone), 'high-priority': (task.higherPriority)}">
        <div class="list-task-left">
          <div class="list-task-dragger" v-if="!isMobile && !noDragging">
            <q-icon name="swap_vert" />
          </div>

          <div class="list-task-name">
            <inputfield-editable @leftField="disabled = false" @editInput="disabled = true" :value="task.name" @saveInput="changeTaskName(key, task.id, ...arguments)"></inputfield-editable>
          </div>
        </div>

        <div class="list-task-right">
          <div class="list-task-project">
            <span class="project-entry"  v-if="type === 'myTasks' && task.projectName">
              <span class="label">Projekt: </span>
              <span class="project" @click="goToProject(task.projectId)">
                <span class="color-brick" :title="task.organisationName" v-bind:style= "[task.organisationColor ? {background: task.organisationColor} : {}]"></span>
                {{ task.projectName }}
              </span>
            </span>

          </div>

          <div class="list-task-secondary">
          <span class="has-subtasks" v-if="task.subTasks" :title="$t('task.hasSubTasks')">
             <q-icon name="view_list"></q-icon>
          </span>

          <span class="has-description" v-if="task.description" :title="$t('task.hasDescription')">
            <q-icon name="notes"></q-icon>
          </span>

          <span class="has-files" v-if="task.hasFiles" :title="$t('task.hasFiles')">
            <q-icon name="description"></q-icon>
          </span>

            <span class="sub-date-due" v-if="task.dateDue && !task.isDone" v-bind:class="{'overdue': ((new Date(task.dateDue.date.replace(' ', 'T'))) < (new Date()))}">
             {{ $t('task.dateDue') }} {{ task.dateDue.date | moment('LL') }}
            </span>

            <div class="list-task-done" v-if="task.isDone && task.doneAt">
              {{ $t('task.doneAt') }} {{ task.doneAt.date | moment('LL') }}
            </div>

            <div class="task-options">
              <taskoo-icon-button icon-name="check_circle" @click="finishTask(key, task.id, task.isDone)">
                <q-icon v-if="task.isDone" name="check_circle"></q-icon>
                <q-icon v-else name="check_circle_outline"></q-icon>
              </taskoo-icon-button>

              <taskoo-icon-button @click="goToTask(task.id)">
                <q-icon name="keyboard_arrow_right"></q-icon>
              </taskoo-icon-button>
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

