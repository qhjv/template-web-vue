<template>
  <div v-if="this.chartOptionFinance.xaxis.categories.length > 0">
    <apexchart
      type="bar"
      height="500"
      :options="chartOptionFinance"
      :series="seriesFinance"
    ></apexchart>
  </div>
  <div v-if="this.chartOptionFinance.xaxis.categories.length === 0">
    <p class="t-w-full t-m-auto t-absolute t-top-1/2 t-text-center">
      Đang cập nhật dữ liệu
    </p>
  </div>
</template>

<script>
import OverviewService from "@/services/homeOverview.service";
import { formatMomentDate } from "@/utils/date";
export default {
  components: {},
  el: "#abc",
  data: () => {
    return {
      seriesFinance: [
        {
          type: "line",
          name: "Phát sinh",
          data: [],
        },
        {
          type: "line",
          name: "Thành công",
          data: [],
        },
        {
          type: "line",
          name: "Đang giao",
          data: [],
        },
        {
          type: "bar",
          name: "",
          data: [],
        },
      ],
      chartOptionFinance: {
        colors: ["#259062", "#D2494D", "#EEBF5C"],
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          hover: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          active: {
            allowMultipleDataPointsSelection: true,
            filter: {
              type: "none",
              value: 0,
            },
          },
        },
        legend: {
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "16px",
          horizontalAlign: "left",
          offsetX: 9,
          offsetY: 6,
          onItemClick: {
            toggleDataSeries: false,
          },
          formatter: function (seriesName) {
            return `${seriesName}`;
          },
          markers: {
            width: 90,
            height: 2,
            fillColors: ["#fff", "#fff"],
            customHTML: [
              function () {
                return '<div style="witdh:90px;height:2px;background-color:#259062;border-radius:2px;"></div><div style="width: 16px;height: 16px;border-radius:12px;background-color: #259062;border: 4px solid #FFFFFF;margin-left: 38px;margin-top: -9px;"></div>';
              },
              function () {
                return '<div style="witdh:90px;height:2px;background-color:#D2494D;border-radius:2px;"></div><div style="width: 16px;height: 16px;border-radius:12px;background-color: #D2494D;border: 4px solid #FFFFFF;margin-left: 38px;margin-top: -9px;"></div>';
              },
              function () {
                return '<div style="witdh:90px;height:2px;background-color:#EEBF5C;border-radius:2px;"></div><div style="width: 16px;height: 16px;border-radius:12px;background-color: #EEBF5C;border: 4px solid #FFFFFF;margin-left: 38px;margin-top: -9px;"></div>';
              },
              function () {
                return '<div style="witdh:90px;height:2px;background-color:#FFFFFF;border-radius:2px;"></div><div style="width: 16px;height: 16px;border-radius:12px;background-color: #FFFFFF;border: 4px solid #FFFFFF;margin-left: 38px;margin-top: -9px;"></div>';
              },
            ],
          },
          itemMargin: {
            horizontal: 30,
            vertical: 8,
          },
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: [0, 1, 2],
          shared: true,
          followCursor: true,
          intersect: false,
        },
        markers: {
          size: [5, 5],
          strokeColors: "#fff",
          strokeWidth: 2,
          strokeOpacity: 3,
        },
        chart: {
          type: "line",
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            tools: {
              download: false,
            },
          },
        },

        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          width: 2,
        },
        grid: {
          strokeDashArray: 5,
          row: {
            colors: ["#fff", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              fontFamily: "Roboto",
              fontWeight: "normal",
              fontSize: "14px",
              colors: "#808080",
            },
          },
          categories: [],
        },
        yaxis: [
          {
            labels: {
              style: {
                fontFamily: "Roboto",
                fontWeight: "normal",
                fontSize: "14px",
                colors: "#259062",
              },
              formatter: (val) => {
                return (Math.round(val * 100) / 100)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    async getData() {
      const overviewService = new OverviewService();
      this.chartOptionFinance.xaxis.categories = [];
      this.seriesFinance[0].data = [];
      this.seriesFinance[1].data = [];
      this.seriesFinance[2].data = [];
      try {
        let res = await overviewService.browseLineChart(
          this.$store.state.overview.query
        );
        if (res !== undefined && res.success) {
          for (let item of Object.keys(res.data)) {
            let dateInput = {};
            dateInput._d = item;
            this.chartOptionFinance.xaxis.categories.push(
              formatMomentDate(dateInput, "DD-MM")
            );
          }
          for (let date in res.data) {
            let obj = res.data[date];
            this.seriesFinance[0].data.push(
              !obj.created ? 0 : obj.created.value
            );
            this.seriesFinance[1].data.push(
              !obj.success ? 0 : obj.success.value
            );
            this.seriesFinance[2].data.push(
              !obj.delivering ? 0 : obj.delivering.value
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.getData();
  },
  watch: {
    "$store.state.overview.query.range": function () {
      this.getData();
    },
  },
};
</script>

<style></style>
