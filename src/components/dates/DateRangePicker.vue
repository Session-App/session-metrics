<template>
  <q-btn no-caps color="primary" :label="selectedPeriod.from  + ' - ' + selectedPeriod.to">
    <q-popup-proxy transition-show="scale" transition-hide="scale" ref="dateProxy" @before-show="clearDates">
      <q-date mask="YYYY-MM-DD" v-model="selectedPeriod" range @update:model-value="selectionUpdated" />
    </q-popup-proxy>
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DateRangePicker",
  props: {
    initialPeriod: { type: Object },
  },
  data() {
    return {
      selectedPeriod: {
        to: "",
        from: "",
      },
    };
  },
  created() {
    this.selectedPeriod = { ...this.initialPeriod };
  },
  methods: {
    selectionUpdated() {
      this.$emit("selection-updated", this.selectedPeriod);
      this.$nextTick(() => {
        this.$refs.dateProxy.hide();
      });
    },
    clearDates() {
      this.selectedPeriod = { to: "", from: "" };
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
