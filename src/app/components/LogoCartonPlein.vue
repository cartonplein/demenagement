<template>
  <div id="logo-carton-plein" @click="goHomePage">
    <img :src="image" />
  </div>
</template>

<script>
import image from "../../../public/images/carton_plein_logo.svg"

export default {
    data() {
        return {
            image: image
        }
    },
    methods: {
      goHomePage () {
        location.href = 'http://cartonplein.org/';
      }
    }
}
</script>

<style lang="scss" scoped>

#logo-carton-plein {
  display: inline-block;
  height: 60px;
  line-height: 26px;
  max-height: 75%;
  width: 271.266px;
  max-width: 100%;
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}

</style>
