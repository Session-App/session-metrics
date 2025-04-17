<template>
  <div class="line-chart">
    <div class="title">{{label}}</div>
    <Line class="chart" :chart-options="chartOptions" :chart-data="chartData" :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :height="height" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { fillDaysWithoutData, randomColor } from "boot/helpers.js";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default defineComponent({
  name: "LineChart",
  components: { Line },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      let updatedData = fillDaysWithoutData(this.from, this.to, this.data[0]);
      this.chartData.labels = updatedData.labels;
      this.chartData.datasets = [];
      let i = 0;
      this.data.forEach((d) => {
        let dataset = {
          data: [],
          borderColor: i === 0 ? "rgba(1, 116, 188, 1)" : randomColor(),
          label: "",
          cubicInterpolationMode: "monotone",
        };
        let updatedData = fillDaysWithoutData(this.from, this.to, d);
        dataset.data = updatedData.data;
        dataset.label = this.labels[i];
        this.chartData.datasets.push({ ...dataset });
        i++;
      });
    },
  },
  watch: {
    data() {
      this.updateData();
    },
  },
  props: {
    data: { type: Array },
    from: {},
    to: {},
    label: { type: String },
    labels: { type: Array },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    height: {
      type: Number,
      default: 120,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.line-chart {
  margin: 30px 0px;
  .title {
    font-size: 1.8em;
  }
  .chart {
    width: 80vw !important;
  }
}
</style>
