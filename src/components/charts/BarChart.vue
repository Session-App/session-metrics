<template>
  <div class="line-chart">
    <div class="title">{{label}}</div>
    <Bar class="chart" :chart-options="chartOptions" :chart-data="chartData" :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :height="height" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { randomColor } from "boot/helpers.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

//todo : continue dev
export default defineComponent({
  name: "LineChart",
  components: { Bar },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      this.chartData.labels = updatedData.labels;
      this.chartData.datasets = [];
      let i = 0;
      this.data.forEach((d) => {
        let dataset = {
          data: [],
          backgroundColor: i === 0 ? "rgba(1, 116, 188, 1)" : randomColor(),
          label: "",
        };
        dataset.data = d.data;
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
