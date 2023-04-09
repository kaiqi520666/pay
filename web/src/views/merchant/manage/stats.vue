<template>
  <div id="chart"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, watch } from "vue";
import { get24Hours, get24HoursOrderAmount } from "@/utils/common";
import { find_24h_order_by_user_id } from "@/api/order";
import { useDark } from "@vueuse/core";
const isDark = useDark();
let chart: echarts.ECharts;
let orders: any[] = [];
watch(isDark, () => {
  window.removeEventListener("resize", chart.resize as any);
  chart.dispose();
  buildChart();
});
const buildChart = () => {
  chart = echarts.init(
    document.getElementById("chart") as HTMLDivElement,
    isDark.value ? "dark" : "light"
  );
  chart.setOption({
    title: {
      text: "24小时销量",
    },
    tooltip: {},
    xAxis: {
      data: get24Hours(),
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: get24HoursOrderAmount(orders),
      },
    ],
    backgroundColor: "rgba(18,18,18,0)",
  });
  window.onresize = () => {
    chart.resize();
  };
};
onMounted(async () => {
  const { data } = await find_24h_order_by_user_id();
  orders = data.orders;
  buildChart();
});
</script>
<style>
#chart {
  width: 100%;
  height: 500px;
}
</style>
