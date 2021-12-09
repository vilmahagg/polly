
circle

<template>
<div class="wrapper">
  <div class="circle" v-for="(item, key) in data" v-bind:key="key">
    <!--<div v-bind:style="{width: item + '5px'}">-->
    <div class ="panel" v-bind:style="{witdh: '5px'}"></div>
      <span> {{item}} </span>
    <div class="text">
      {{key}}
    </div>
    </div>
  </div>
</template>

<script>
component('pie-chart', {
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
		this.renderChart(this.datacollection, this.options)
	}


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
