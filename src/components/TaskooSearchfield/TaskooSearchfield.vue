<template>
  <div class="taskoo-search" v-bind:class="{'is-focused': (isFocused), 'has-results': (results || loading)}">
    <form @submit.prevent="toggleSearch">
      <input type="text" @focus="focusedSearch" @blur="blurredSearch" v-model="search" placeholder="Suche..." >
    </form>

    <div v-if="results || loading" class="searchresult-container box-shadow">
      <div class="searchresult-actions">
        <div class="label">
          Suche nach:
        </div>

        <div class="searchaction-button all" @click="switchType('all')" v-bind:class="{'active': (type === 'all')}">
          Allem
        </div>

        <div class="searchaction-button tasks" @click="switchType('task')" v-bind:class="{'active': (type === 'task')}">
          Aufgaben
        </div>

        <div class="searchaction-button medias" @click="switchType('media')" v-bind:class="{'active': (type === 'media')}">
          Dateien
        </div>
      </div>

      <div class="searchresults" v-if="results && !loading">

        <div class="no-results" v-if="results.mediaResultCount === 0 && results.taskResultCount === 0">
          Keine Ergebnisse
        </div>

        <div class="tasks" v-if="results.tasks && results.tasks.length > 0">
          <div class="label">
            Aufgaben
          </div>
          <div class="task-result" v-for="task in results.tasks">
            <div class="task-information">
              <router-link class="name" :to="{name: 'Task', params: { taskId: task.id}}">
                {{ task.name }}
              </router-link>

              <div class="project-entry">
                <span class="label">
                  Projekt:
                    <router-link class="project" :to="{ name: 'Project', params: { projectId: task.project.id }}">
                      <span v-if="task.project.organisation" class="color-brick box-shadow" :title="task.project.organisation.name" v-bind:style= "[task.project.organisation.color ? {background: task.project.organisation.color.hexCode} : {}]"></span>
                      {{ task.project.name }}
                    </router-link>
                </span>
              </div>
            </div>

            <div class="task-description">
              {{ task.description }}
            </div>
          </div>
        </div>

        <div class="medias" v-if="results.medias && results.medias.length > 0">
          <div class="label">
            Dateien
          </div>
            <div class="media-result" v-for="media in results.medias">
              <div class="preview">
                <a :href="API_URL+'/file/'+media.filePath" target="_blank">
                  <img :src="API_URL+'/file/'+media.filePath">
                </a>
              </div>

              <div class="name">
                {{ media.fileName }}
              </div>

              <div class="task">
                Aufgabe:
                <router-link :to="{name: 'Task', params: { taskId: media.task.id}}">
                  <span v-if="media.task.project.organisation" class="color-brick box-shadow" :title="media.task.project.organisation.name" v-bind:style= "[media.task.project.organisation.color ? {background: media.task.project.organisation.color.hexCode} : {}]"></span>
                  {{ media.task.name }}
                </router-link>
              </div>
            </div>
        </div>
      </div>

      <div class="loader" v-else>
        <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

