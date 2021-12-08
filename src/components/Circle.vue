
<template>
<div class="wrapper">
  <div class="circle" v-for="(item, key) in data" v-bind:key="key">
    <!--<div v-bind:style="{width: item + '5px'}">-->
    <div class ="panel" v-bind:style="{height: '5px'}"></div>
      <span> {{item}} </span>
    <div class="text">
      {{key}}
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Circle',
  props: {
    data: Object
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.panel{
color: black;
font-family: "Lucida Console", "Monaco", monospace;
display: inline-block;
}

.text {
  width: 70px;
  height: 50px;
  vertical-align: bottom;
  padding: 20px;
  display: inline-block;
}

.circle{
  /*display: inline-block;*/
}
.panel{
  display: inline-block;
}
.panel span {
  position: relative;
  top: -1.2em;
}
.panel:nth-child(1) div:nth-child(1) {
  background-color:red;
}
.panel:nth-child(2) div:nth-child(1) {
  background-color:blue;
}
.panel:nth-child(3) div:nth-child(1) {
  background-color:teal;
}
.panel:nth-child(4) div:nth-child(1) {
  background-color:purple;
}
.panel:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}
.wrapper {
padding:3em;
  word-wrap: break-word;
}
</style>
