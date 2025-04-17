<template>
  <div class="number">
    <div class="value">
      <div class="val">{{value}}</div>
      <div class="percentage" v-if="compareValue">({{percentage}}%)</div>
    </div>
    <div class="label">{{label}}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Number",
  components: {},
  created() {
    this.setPercentage();
  },
  methods: {
    setPercentage() {
      if (this.compareValue) {
        this.percentage = (this.value / this.compareValue) * 100;
        const precision = Math.pow(10, 2);
        this.percentage = Math.ceil(this.percentage * precision) / precision;
      }
    },
  },
  watch: {
    value() {
      this.setPercentage();
    },
  },
  props: {
    label: { type: String },
    value: { type: Number },
    compareValue: { type: Number, required: false },
  },
  data() {
    return {
      percentage: 0,
    };
  },
});
</script>
<style lang="scss" scoped>
.number {
  text-align: center;
  color: $primary;
  font-size: 1.5em;
  border: 2px $primary solid;
  padding: 10px;
  border-radius: 15px;
  margin: 5px 10px;
  .value {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .val {
      font-weight: bold;
    }
    .percentage {
      font-size: 0.8em;
      margin-left: 5px;
    }
  }
}
</style>
