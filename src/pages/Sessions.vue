<template>
  <div class="page">
    <div class="page-title">Sessions</div>
    <DateRangePicker :initialPeriod="selectedPeriod" @selection-updated="getData" />
    <div class="numbers">
      <div class="title">Total</div>
      <div class="values">
        <Number label="Sessions organisées" :value="sessionsOrganizedTotal" />
        <Number label="Participants" :value="participantsTotal" />
      </div>
    </div>
    <div class="numbers">
      <div class="title">Sur la période</div>
      <div class="values">
        <Number label="Sessions organisées" :value="sessionsOrganizedPeriodTotal" />
        <Number label="Participants" :value="participantsPeriodTotal" />
      </div>
    </div>
    <div class="charts">
      <LineChart v-if="sessionsOrganizedPeriod.length !== 0" :labels="['Sessions organisées']" label="Sessions organisées" :data="[sessionsOrganizedPeriod]" :from="selectedPeriod.from" :to="selectedPeriod.to" />
      <LineChart v-if="participantsPeriod.length !== 0" :labels="['Participants']" label="Participants" :data="[participantsPeriod]" :from="selectedPeriod.from" :to="selectedPeriod.to" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getSessionsActivity } from "boot/apiCalls.js";
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
      sessionsOrganizedTotal: 0,
      sessionsOrganizedPeriodTotal: 0,
      participantsTotal: 0,
      participantsPeriodTotal: 0,
      sessionsOrganizedPeriod: [],
      participantsPeriod: [],
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
      getSessionsActivity(period).then((data) => {
        this.selectedPeriod = { ...period };
        this.sessionsOrganizedTotal = data.sessionsCreatedTotal;
        this.sessionsOrganizedPeriod = data.sessionsCreatedPeriod;
        this.sessionsOrganizedPeriod = data.sessionsCreatedPeriod;
        this.participantsPeriod = data.participantsPeriod;
        this.participantsTotal = data.participantsTotal;
        this.sessionsOrganizedPeriodTotal = totalFromPeriod(
          this.sessionsOrganizedPeriod
        );
        this.participantsPeriodTotal = totalFromPeriod(this.participantsPeriod);
      });
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
