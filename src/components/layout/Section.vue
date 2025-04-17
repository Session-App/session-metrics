<template>
  <div class="section clickable" @click="goTo">
    <div class="name">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Section",
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  methods: {
    goTo() {
      this.$router.push(this.link);
    },
  },
});
</script>
<style lang="scss" scoped>
.section {
  color: white;
  padding: 20px 0px;
  width: 100%;
  text-align: center;
}
</style>
