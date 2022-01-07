
<template>
  <div class="wrapper">
    <div class="circles" v-for="(item, key) in data" v-bind:key="key">
      <div class="circle" v-bind:style="{ height: item + '9px', width: item + '9px' }">
          <span> {{ item }} </span>
      </div>
      <p>{{ key }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "Circle",
  props: {
    data: Object,
  },
};

</script>

<style scoped>
.wrapper {
  display: inline-block;
  word-wrap: break-word;
}
.circles {
  display: inline-block;
  height: 100%;
  text-align: center;
  max-width:100px;
  margin:1.5em;
  vertical-align: middle;
  vertical-align: top;
}
.circle {
  border-radius: 50%;
  padding: 1em;
  margin: 2em;
}
.circles:nth-child(1) div:nth-child(1) {
  background-color: #809fff;
}
.circles:nth-child(2) div:nth-child(1) {
  background-color: #ff80bf;
}
.circles:nth-child(3) div:nth-child(1) {
  background-color: #9ab9f7;
}
.circles:nth-child(4) div:nth-child(1) {
  background-color: #c266ff;
}
.circle:nth-child(5) div:nth-child(1) {
  background-color: yellow;
}
.circle:nth-child(6) div:nth-child(1) {
  background-color: rgb(68, 179, 123);
}
.circle:nth-child(7) div:nth-child(1) {
  background-color: rgb(1, 136, 12);
}
.circle:nth-child(8) div:nth-child(1) {
  background-color: rgb(230, 182, 78);
}
.circle:nth-child(9) div:nth-child(1) {
  background-color: rgb(255, 153, 122);
}


@media only screen and (max-width: 500px) {
  .circles {
  display: inline-block;
  height: 100%;
  text-align: center;
  max-width:100px;
  margin:1.5em;
  vertical-align: middle;
}
.circle {
  border-radius: 50%;
  margin:0;
}

}
</style>
