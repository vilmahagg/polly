
<template>
<div class="wrapperBars">
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div class="items" v-bind:style="{height: item + '5px'}">
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
word-wrap: break-word;
}
.items{
  position: relative;
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
  background-color:#809fff;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:#ff80bf;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:#80aaff;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:#c266ff;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}
.bar:nth-child(6) div:nth-child(1) {
  background-color:rgb(68, 179, 123);
}
.bar:nth-child(7) div:nth-child(1) {
  background-color:rgb(1, 136, 12);
}
.bar:nth-child(8) div:nth-child(1) {
  background-color:rgb(230, 182, 78);
}
.bar:nth-child(9) div:nth-child(1) {
  background-color:rgb(255, 153, 122);
}
.wrapperBars {
padding-top:3em;
}



@media only screen and (max-width: 500px) {
  .bar{
    width:35px;
    padding:0.8em;
  }


}
</style>
