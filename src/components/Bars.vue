
<template>
<div class="wrapper">
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div v-bind:style="{height: item + '5px'}">
      <span> {{item}} </span>
    </div>
    <div class="text">
      {{key}}
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Bars',
  props: {
    data: Object
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text{
color: black;
font-family: "Lucida Console", "Monaco", monospace;
}
.bar {
  display: inline-block;
  width: 70px;
  vertical-align: bottom;
  padding: 20px;
}
.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:red;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:blue;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:teal;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:purple;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}
.wrapper {
padding:3em;
  word-wrap: break-word;
}
</style>
