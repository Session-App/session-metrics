<template>
  <div class="page">
    <div class="page-title">Spots</div>
    <DateRangePicker :initialPeriod="selectedPeriod" @selection-updated="getData" />
    <div class="numbers">
      <div class="title">Sur la période</div>
      <div class="values">
        <Number label="Spots ajoutés" :value="spotsAddedPeriodTotal" />
      </div>
    </div>
    <div class="charts">
      <LineChart v-if="spotsAddedPeriod.length !== 0" :labels="['Spots ajoutés']" label="Spots ajoutés" :data="[spotsAddedPeriod]" :from="selectedPeriod.from" :to="selectedPeriod.to" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getSpotsActivity } from "boot/apiCalls.js";
import { totalFromPeriod } from "boot/helpers.js";
import LineChart from "components/charts/LineChart.vue";
import DateRangePicker from "components/dates/DateRangePicker.vue";
import Number from "components/charts/Number.vue";

export default defineComponent({
  name: "Spots",
  components: { LineChart, DateRangePicker, Number },
  data() {
    return {
      selectedPeriod: {
        to: "",
        from: "",
      },
      spotsAddedPeriod: [],
      spotsAddedPeriodTotal: 0,
    };
  },
  created() {
    const today = new Date();
    let from = new Date();
    from.setDate(today.getDate() - 10);
    this.selectedPeriod.from = from.toISOString().substring(0, 10);
    this.selectedPeriod.to = new Date().toISOString().substring(0, 10);
    this.getData();
  },
  methods: {
    getData(selectedPeriod) {
      const period = selectedPeriod ?? this.selectedPeriod;
      getSpotsActivity(period).then((data) => {
        this.selectedPeriod = { ...period };
        this.spotsAddedPeriod = data.spotsAddedPeriod;
        this.spotsAddedPeriodTotal = totalFromPeriod(this.spotsAddedPeriod);
      });
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
