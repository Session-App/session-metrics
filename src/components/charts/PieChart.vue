<template>
  <div class="pie-chart">
    <div class="title">{{label}}</div>
    <Pie class="chart" :chart-options="chartOptions" :chart-data="chartData" :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :height="height" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Pie } from "vue-chartjs";
import { randomColor } from "boot/helpers.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  name: "PieChart",
  components: { Pie },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      let dataSorted = [];
      let dataCopy = { ...this.data };
      this.chartData.datasets[0].backgroundColor = [];
      this.chartData.labels = [];
      if (this.data && Object.keys(this.data).length !== 0) {
        Object.keys(this.data).forEach((key) => {
          let max = ["sport", 0];
          Object.keys(dataCopy).forEach((k) => {
            if (parseInt(dataCopy[k]) > max[1]) {
              max = [k, dataCopy[k]];
            }
          });
          if (max[1] != 0 && max[1] != 1) {
            this.chartData.labels.push(max[0]);
            dataSorted.push(parseInt(max[1]));
            this.chartData.datasets[0].backgroundColor.push(randomColor());
          }
          delete dataCopy[max[0]];
        });
        this.chartData.datasets[0].data = dataSorted;
      }
    },
  },
  watch: {
    data(newVal) {
      this.updateData();
    },
  },
  props: {
    data: { type: Object },
    label: { type: String },
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
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.pie-chart {
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 1.8em;
  }
  .chart {
    width: 40vw !important;
  }
}
</style>
