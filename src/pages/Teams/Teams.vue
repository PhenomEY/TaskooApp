<template>
  <div class="content-wrapper teampage-wrapper">
    <div class="header">
      <h1 class="title">{{ $t('navigation.teams') }}</h1>
    </div>

    <div class="teampage-content">
      <div class="loader" v-if="loading">
          <div class="team-column-skeleton">
            <PuSkeleton class="taskoo-skeleton"></PuSkeleton>
          </div>

        <div class="team-column-skeleton">
          <PuSkeleton class="taskoo-skeleton"></PuSkeleton>
        </div>

        <div class="team-column-skeleton">
          <PuSkeleton class="taskoo-skeleton"></PuSkeleton>
        </div>

        <div class="team-column-skeleton">
          <PuSkeleton class="taskoo-skeleton"></PuSkeleton>
        </div>
      </div>

        <div v-else class="team-entry" v-for="(team, index) in teams" v-bind:class="{'active': (index === 0)}" v-bind:style= "[team.color ? {borderColor: team.color.hexCode} : {}]" :ref="'team-'+team.id">
          <div class="team-title">
            <span class="color-brick box-shadow" :title="team.name" v-bind:style= "[team.color ? {background: team.color.hexCode} : {}]"></span> {{ team.name }}

            <div class="team-opener" @click="openTeam(team.id)">
              <q-icon name="expand_more"></q-icon>
            </div>
          </div>

          <div class="team-role-columns">
            <div class="team-role-column" v-for="column in reverseColumns(team.columns)">
              <div class="team-role-column-user" v-for="user in column">
                <taskoo-avatar :user="user"></taskoo-avatar>
                <div class="user-information">
                  <span class="user-name">{{ user.firstname }} {{ user.lastname }}</span>
                  <span class="user-role" v-if="user.teamrole">{{ user.teamrole.name }}</span>
                  <a :href="'mailto:'+user.email" class="user-email">{{ user.email }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>
