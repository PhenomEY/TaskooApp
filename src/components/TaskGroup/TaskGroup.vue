<template>
<div class="task-group"  v-bind:class="{'done-tasks': (showDoneTasks)}">

  <div class="task-group-header">
    <div class="task name">
      <inputfield-editable :value="groupName" rows="1" @saveInput="changeGroupName(groupKey ,groupId, ...arguments)"></inputfield-editable>
      <div class="options">

        <taskoo-icon-button v-if="!isMobile" class="group-drag">
          <q-icon name="multiple_stop"></q-icon>
        </taskoo-icon-button>

        <v-popover offset="16">
          <taskoo-icon-button class="tooltip-target">
            <q-icon name="more_vert"></q-icon>
          </taskoo-icon-button>

          <template slot="popover">
            <div class="taskoo-popover-options">
                <div class="option add" v-bind:class="{'disabled': (addingGroup == true)}" v-close-popover @click="addGroup()">
                  <q-icon name="add"></q-icon> {{ $t('taskGroup.menu.createGroup') }}
                </div>

                <div class="option donetasks" v-bind:class="{'disabled': (addingGroup == true)}" v-close-popover @click="getDoneTasks(groupKey, groupId)">
                  <span v-if="showDoneTasks">
                    <q-icon name="check_circle_outline"></q-icon> {{ $t('taskGroup.menu.showOpenTasks') }}
                  </span>

                  <span v-else>
                    <q-icon name="check_circle_outline"></q-icon> {{ $t('taskGroup.menu.showDoneTasks') }}
                  </span>
                </div>

                <div class="option remove" v-close-popover @click="removeGroup(groupId, groupKey, groupName)">
                  <q-icon name="delete"></q-icon>
                  {{ $t('taskGroup.menu.deleteGroup') }}
                </div>
            </div>
          </template>
        </v-popover>

      </div>
    </div>

    <div class="task add box-shadow">
      <span v-if="showDoneTasks">{{ $t('taskGroup.doneTasks') }}</span>

      <taskoo-icon-button v-else :disabled="addingTask || showDoneTasks" @click="addTask(groupId, groupKey)">
        <q-icon name="add_circle_outline"></q-icon>
      </taskoo-icon-button>
    </div>
  </div>

  <draggable :disabled="disabled || isMobile" class="task-group-inner" :list="model" group="taskgroups"  v-bind="dragOptions" @change="changedTaskPositions(model, groupId, ...arguments)">
      <div class="task item box-shadow" v-for="(item, key) in model" :key="key" v-bind:class="{'is-done': (item.isDone), 'high-priority': (item.higherPriority)}" :ref="'task-'+item.id">

        <div class="main">
          <inputfield-editable @leftField="toggleDragging(false)" @editInput="toggleDragging(true)" :value="item.name" rows="1" @saveInput="changeTaskName(groupKey, key, item.id, ...arguments)"></inputfield-editable>

          <taskoo-icon-button @click="taskDone(item.id, key, groupKey, item.isDone)">
            <q-icon v-if="item.isDone" name="check_circle"></q-icon>
            <q-icon v-else name="check_circle_outline"></q-icon>
          </taskoo-icon-button>

          <taskoo-icon-button @click="goToTask(item.id)">
            <q-icon name="keyboard_arrow_right"></q-icon>
          </taskoo-icon-button>
        </div>

        <div class="secondary">
          <div class="secondary-left">
            <span class="has-description" v-if="item.isDone === false && item.description" :title="$t('task.hasDescription')">
              <q-icon name="notes"></q-icon>
            </span>

            <span class="has-subtasks" v-if="item.isDone === false && item.subTasks" :title="$t('task.hasSubTasks')">
              <q-icon name="view_list"></q-icon>
            </span>

            <span class="has-files" v-if="item.isDone === false && item.hasFiles" :title="$t('task.hasFiles')">
              <q-icon name="description"></q-icon>
            </span>

          <span class="date" v-if="item.dateDue && !showDoneTasks" v-bind:class="{'overdue': ((new Date(item.dateDue.date.replace(' ', 'T'))) < (new Date()))}">{{ item.dateDue.date | moment('LL') }}</span>
            <span class="date done-at" v-else-if="item.isDone && item.doneAt">{{ $t('task.doneAt') }} {{ item.doneAt.date | moment('LL') }}</span>
          </div>

          <span class="users">
            <taskoo-avatar v-if="item.user" :user="item.user">
              <q-tooltip anchor="bottom middle" :offset="[5, 5]">
                {{ item.user.firstname }} {{ item.user.lastname }}
              </q-tooltip>
            </taskoo-avatar>

            <taskoo-icon-button class="task-user" v-else>
              <q-icon name="account_circle"></q-icon>
            </taskoo-icon-button>
          </span>
        </div>


      </div>
  </draggable>
</div>
</template>

<style src="./style.scss" lang="scss"></style>

<script src="./index.js"></script>
