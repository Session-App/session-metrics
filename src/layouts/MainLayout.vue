<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white header">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>Session metrics
        </q-toolbar-title>
      </q-toolbar>
      <div class="logout">
        <q-icon name="logout" size="30px" @click="logout" class="clickable" />
      </div>
    </q-header>
    <q-drawer class="left-drawer" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <Section name="Utilisateurs" link="users" icon="aa" />
      <Section name="Spots" link="spots" icon="aa" />
      <Section name="Sessions" link="sessions" icon="aa" />
    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Section from "components/layout/Section.vue";
import { logout } from "boot/helpers.js";
export default {
  components: { Section },
  setup() {
    return {
      leftDrawerOpen: true,
    };
  },
  methods: {
    logout() {
      logout();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  .logout {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
<style lang="scss">
.q-drawer {
  width: $sidebar-width !important;
  .left-drawer {
    background-color: $primary;
  }
}
.page-container {
  padding-left: $sidebar-width !important;
}
</style>