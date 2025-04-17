<template>
  <div class="users-list">
    <div class="title">{{ label }}</div>
    <div class="user" v-for="user in users" :key="user.username">
      <div class="username">{{ user.username }}</div>
      <div class="connected">
        Connecté :
        {{ user.lastConnection }}
      </div>
      <div class="connected">
        Créé-le :
        {{ user.createdAt ? user.createdAt.slice(0, -15) : 'unknown' }}
      </div>
      <div>Plateforme : {{ user.platform }}</div>
      <div>Langue : {{ user.lang }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LineChart',
  components: {},
  created() {},
  methods: {},
  watch: {},
  props: {
    users: { type: Array },
    label: { type: String },
  },
  data() {
    return {}
  },
})
</script>
<style lang="scss" scoped>
.users-list {
  height: 500px;
  overflow-y: scroll;
  margin: 15px;
  > .title {
    font-size: 1.5em;
  }
  .user {
    margin-bottom: 15px;
    border-radius: 15px;
    border: $primary solid 2px;
    padding: 7px;
    .username {
      font-size: 1.2em;
    }
  }
}
</style>
