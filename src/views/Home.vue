<template>
  <img
    src="@/assets/fondo2.jpg"
    style="
      border-radius: 50%;
      display: blocK;
      margin: 4% auto;
      width: 30%;
      filter: grayscale(50%);
      opacity: 0.7;
    "
  />
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios.get("api/v1/productos/").then((result) => {
      console.log(result.data);
    });
  },
};
</script>

<style scoped lang="scss"></style>
