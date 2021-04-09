<template>
<div class="task-group"  v-bind:class="{'done-tasks': (showDoneTasks)}">

  <div class="task-group-header">
    <div class="task name">
      <inputfield-editable :value="groupName" rows="1" @saveInput="changeGroupName(groupKey ,groupId, ...arguments)"></inputfield-editable>
      <div class="options">
        <md-icon v-if="!isMobile" class="group-drag">multiple_stop</md-icon>

        <v-popover offset="16">
                <md-button class="md-icon-button md-list-action tooltip-target">
                  <md-icon>more_vert</md-icon>
                </md-button>

          <template slot="popover">
            <div class="taskoo-popover-options">
                <div class="option add" v-bind:class="{'disabled': (addingGroup == true)}" v-close-popover @click="addGroup()">
                  <md-icon>add</md-icon> {{ $t('taskGroup.menu.createGroup') }}
                </div>

                <div class="option donetasks" v-bind:class="{'disabled': (addingGroup == true)}" v-close-popover @click="getDoneTasks(groupKey, groupId)">
                  <span v-if="showDoneTasks">
                    <md-icon>check_circle_outline</md-icon> {{ $t('taskGroup.menu.showOpenTasks') }}
                  </span>

                  <span v-else>
                    <md-icon>check_circle_outline</md-icon> {{ $t('taskGroup.menu.showDoneTasks') }}
                  </span>
                </div>

                <div class="option remove" v-close-popover @click="removeGroup(groupId, groupKey, groupName)">
                  <md-icon>delete</md-icon>
                  {{ $t('taskGroup.menu.deleteGroup') }}
                </div>
            </div>
          </template>
        </v-popover>

      </div>
    </div>

    <div class="task add box-shadow">
      <span v-if="showDoneTasks">{{ $t('taskGroup.doneTasks') }}</span>

      <md-button v-else class="md-icon-button md-list-action" :disabled="addingTask || showDoneTasks" @click="addTask(groupId, groupKey)">
        <md-icon>add_circle_outline</md-icon>
      </md-button>
    </div>
  </div>

  <draggable :disabled="disabled || isMobile" class="task-group-inner" :list="model" group="taskgroups"  v-bind="dragOptions" @change="changedTaskPositions(model, groupId, ...arguments)">
      <div class="task item box-shadow" v-for="(item, key) in model" :key="key" v-bind:class="{'is-done': (item.isDone)}" :ref="'task-'+item.id">

        <div class="main">
          <inputfield-editable @leftField="toggleDragging(false)" @editInput="toggleDragging(true)" :value="item.name" rows="1" @saveInput="changeTaskName(groupKey, key, item.id, ...arguments)"></inputfield-editable>
          <md-button class="md-icon-button md-list-action" @click="taskDone(item.id, key, groupKey, item.isDone)">
            <md-icon v-if="item.isDone">check_circle</md-icon>
            <md-icon v-else>check_circle_outline</md-icon>
          </md-button>
          <md-button class="md-icon-button md-list-action" @click="goToTask(item.id)">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
        </div>

        <div class="secondary">
          <div class="secondary-left">
          <span class="has-description" v-if="item.isDone === false && item.description" :title="$t('task.hasDescription')">
            <md-icon>notes</md-icon>
          </span>

          <span class="has-subtasks" v-if="item.isDone === false && item.subTasks" :title="$t('task.hasSubTasks')">
            <md-icon>view_list</md-icon>
          </span>

          <span class="date" v-if="item.dateDue && !showDoneTasks">{{ item.dateDue.date | moment('LL') }}</span>

            <span class="date done-at" v-else-if="item.isDone && item.doneAt">{{ $t('task.doneAt') }} {{ item.doneAt.date | moment('LL') }}</span>
          </div>

          <span class="users">
             <md-button v-if="item.user" class="md-icon-button task-user">
               <md-avatar class="md-avatar-icon" v-bind:style= "[item.user.hexCode ? {background: item.user.hexCode} : {}]">{{ item.user.firstname.charAt(0) }}
                 <md-tooltip md-direction="bottom">{{ item.user.firstname }} {{ item.user.lastname }}</md-tooltip>
               </md-avatar>
             </md-button>

             <md-button v-else class="md-icon-button task-user">
                  <md-avatar>
                      <md-icon>account_circle</md-icon>
                   </md-avatar>
             </md-button>
          </span>
        </div>


      </div>
  </draggable>
</div>
</template>

<style src="./style.scss" lang="scss"></style>

<script src="./index.js"></script>
