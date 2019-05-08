<template>
    <div id="app-address">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px">Saisissez vos adresses de départ et de destination : </h1>
        <FormAddress id="form-address" ref="formAddress"></FormAddress>
        <ButtonSuivant id="button-suivant" :onClick="openPageTypeDemenagement"></ButtonSuivant>
    </div>
</template>

<script>
import { store } from '../store.js';
import LogoCartonPlein from './LogoCartonPlein.vue';
import FormAddress from './FormAddress.vue';
import ButtonSuivant from './ButtonSuivant.vue';

export default {
  name: 'AppAddress',
  components: {
    LogoCartonPlein,
    FormAddress,
    ButtonSuivant
  },
  methods: {
    openPageTypeDemenagement() {
      this.$refs.formAddress.submitFormAddress();
      this.$parent.$options.methods.openPageTypeDemenagement();
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>

<style lang="scss" scoped>
#app-address {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  /*border-top: 1px solid lightgray;*/
  position: relative;


  #form-address {
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
  }

  #button-suivant {
    position: absolute;
    right: 0;
    bottom: 30px;
  }

  h1 {
    margin-top: 70px;
  }
}

</style>
