<template>

<!--  TASK NOT FOUND-->
  <div class="task-window" v-if="notFound">
    <div class="taskbar">
      <div class="header">
        <h1 class="project-title">
          {{ $t('task.notFoundTitle') }}
        </h1>
      </div>

      <div class="right">
        <md-button class="md-icon-button md-list-action" @click="returnTo">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </div>
    </div>

    <taskoo404 :label="$t('task.notFound')"></taskoo404>
  </div>

<!--  TASK WINDOW-->
  <div class="task-window" v-bind:class="{'is-done': (task.isDone)}" v-else-if="task">
    <div class="taskbar">
      <div class="header">
        <h1 class="project-title">
          {{ task.projectName }}
        </h1>

        <md-icon v-if="task.mainTask">chevron_right</md-icon>
        <h2 class="main-task" v-if="task.mainTask">
           {{ task.mainTask }}
        </h2>

        <span class="deadline" v-if="task.dateDue && !isMobile">
          {{ $t('project.deadline') }} {{ task.dateDue.date | moment('LL') }}
        </span>
      </div>

      <div class="right">

        <div class="finish-button" v-bind:class="{'done': (task.isDone)}" @click="finishTask(task.id, task.isDone)">
          <md-icon>check_circle_outline</md-icon>
          <span v-if="task.isDone">{{ $t('task.detail.taskFinished') }}</span>
          <span v-else>{{ $t('task.detail.finishTask') }}</span>
        </div>

        <v-popover offset="16">
          <md-button class="md-icon-button md-list-action tooltip-target">
            <md-icon>more_vert</md-icon>
          </md-button>


          <template slot="popover">
            <div class="task-group-options">
              <div class="option remove" v-close-popover>
                <md-icon>delete</md-icon>
                {{ $t('task.menu.delete') }}
              </div>
            </div>
          </template>
        </v-popover>

        <md-button class="md-icon-button md-list-action" @click="returnTo">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </div>
    </div>

    <div class="done-info" v-if="task.isDone">
      {{ $t('task.detail.doneAt', {"date": $moment(task.doneAt.date).format('LLL'), "firstname": task.doneBy.firstname, "lastname": task.doneBy.lastname}) }}
    </div>

    <div class="task-content">
      <div class="task-name">
        <span class="label">{{ $t('task.task') }}</span>
        <textarea class="name box-shadow" v-model="task.name" @change="updateTaskName(task.name)"></textarea>
      </div>

      <div class="task-users" v-if="task.availableUsers">
        <span class="label">{{ $t('task.assignedUsers') }}</span>
        <taskoo-user-select :multi="true" :model="assignedUsers" :options="task.availableUsers"
                            @removedUser="removeUser(...arguments)"
                            @addedUser="addUser(...arguments)"
        ></taskoo-user-select>
      </div>

      <div class="date-due">
        <span class="label">{{ $t('task.dateDue') }}</span>
        <taskoo-datepicker :model="dateDue" @modelChanged="setDate(...arguments)"></taskoo-datepicker>
      </div>

      <div class="task-description"  v-bind:class="{'is-focused': (descriptionisFocused)}">
        <vue-editor v-model="task.description" :placeholder="$t('task.description')" :editor-toolbar="taskToolbar" @text-change="activateDescriptionSave" @focus="descriptionisFocused = true" @blur="descriptionisFocused = false"></vue-editor>
        <button class="save-button" :disabled="!descriptionSave" @click="saveDescription(task.id)">{{ $t('taskoo.save') }}</button>
      </div>

      <div class="task-subtasks" v-if="!task.mainTask">
        <span class="label">{{ $t('task.subTasks') }}</span>
        <task-list :addButton="true" :addingTask="addingSubTask" :disabled="changingPositions" @finishTask="finishSubTask(...arguments)" @positionsChanged="changedSubPositions(...arguments)" @addSubTask="addSubTask" @changedTaskName="changeSubTaskName(...arguments)" :tasks="task.subTasks" type="sub"></task-list>
      </div>
    </div>


  </div>


<!--  SKELETON-->
  <div class="task-window skeleton" v-else>
    <div class="taskbar">
      <div class="header">
        <PuSkeleton class="taskoo-skeleton" />
      </div>
    </div>

    <div class="task-content">
      <div class="task-name">
        <PuSkeleton class="taskoo-skeleton" />
      </div>

      <div class="task-users">
        <PuSkeleton class="taskoo-skeleton" />
      </div>

      <div class="date-due">
        <PuSkeleton class="taskoo-skeleton" />
      </div>

      <div class="task-description">
        <PuSkeleton class="taskoo-skeleton" />
      </div>
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss">
</style>

<script src="./index.js">
</script>
