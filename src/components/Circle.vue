
circle

<template>
  <div class="app" style="padding-left: 100px">
    <h1>This is a pie chart</h1>
    <pie-chart style="width: 400px; height: 400px" />
  </div>


 <!-- Vilmas cirklar -->
  <!-- <div class="wrapper">
    <div class="circles" v-for="(item, key) in data" v-bind:key="key">
	<div class="circle">
      <div v-bind:style="{ height: item + '7px', width: item + '7px' }">
        <span> {{ item }} </span>
      </div>

    </div>
        {{ key }}
	</div>
  </div> -->
</template>

<script>
// Vilmas cirklar
// export default {
//   name: "Circle",
//   props: {
//     data: Object,
//   },
// };
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
vue.component('pie-chart', {
	extends: VueChartJs.Pie,
	data: function () {
		return {
			datacollection: {
				labels: ['Pie 1', 'Pie 2', 'Pie 3', 'Pie 4', 'Pie 5'],
				datasets: [
					{
						backgroundColor: [ '#1E9600', '#99C802', '#FFF200', '#F89403',	'#FF0000' ],
						data: [1, 2, 3, 4, 5],
					},
				],
			},
			options: {
				responsive: true,
				legend: {
					display: true,
					position: 'right',
				},
  	 },
   }
 },
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.datacollection, this.options,
    this.options)
    	}
    })
</script>

<style scoped>
/*Vilmas cirklar
 .wrapper{
	display: inline-block;
}
.circles{
  display: inline-block;
  vertical-align: middle;
  height:100%;
}
.circle {
  border-radius: 50%;
  padding: 20px;
  margin: 40px;
}
.circles:nth-child(1) div:nth-child(1){
  background-color:#809fff;
}
.circles:nth-child(2) div:nth-child(1){
  background-color:#ff80bf;
}
.circles:nth-child(3) div:nth-child(1){
  background-color:#9ab9f7;
}
.circles:nth-child(4) div:nth-child(1) {
  background-color:#c266ff;
}
.circle:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}
.circle:nth-child(6) div:nth-child(1) {
  background-color:rgb(68, 179, 123);
}
.circle:nth-child(7) div:nth-child(1) {
  background-color:rgb(1, 136, 12);
}
.circle:nth-child(8) div:nth-child(1) {
  background-color:rgb(230, 182, 78);
}
.circle:nth-child(9) div:nth-child(1) {
  background-color:rgb(255, 153, 122);
} */
</style>
