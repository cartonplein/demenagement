<template>
    <div id="form-address" class="container">
      <div class="columns is-mobile">
        <div id="panel-forms" class="columns is-mobile is-centered">
          <div class="column">
              <FormPickupAddress id="form-pickup-address" ref="formPickupAddress" v-on:update-pickup-address="updateOrigin($event)"></FormPickupAddress>
          </div>
          <div class="column">
              <FormDestinationAddress id="form-destination-address" ref="formDestinationAddress" v-model="destination"></FormDestinationAddress>
          </div>
        </div>
        <div id="panel-map">
          <iframe height="400px" width="480px" v-bind:src="getDirection(origin, destination)" id="map" allowFullscreen>
          </iframe>

        </div>
      </div>
    </div>


</template>


<script>

import { store } from '../store.js';
import FormPickupAddress from './FormPickupAddress.vue';
import FormDestinationAddress from './FormDestinationAddress.vue';

export default {
  name: 'FormAddress',
  data () {
    return {
      origin: 'paris',
      destination: 'paris'
    };
  },
  components: {
    FormPickupAddress,
    FormDestinationAddress
  },
  methods: {

    updateOrigin(e) {
      this.origin = e;
    },

    getDirection(origin, destination) {
      this.origin = origin;
      return store.getDirection(origin, destination);
    },


    submitFormAddress () {
      console.log(this.origin);
      this.$refs.formPickupAddress.submitFormPickupAddress();
      this.$refs.formDestinationAddress.submitFormDestinationAddress();
    }
  }
}
</script>


<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
}
</style>


<style lang="scss" scoped>

#form-address {
  height: 450px;
  position: relative;

  #panel-forms {
    background: #E85029;
    opacity: 0.95;
    position: absolute;
    border: 2px solid black;
    left: 12px;
    top: 12px;
  }

  #map {
    background: lightgray;
    border: 2px solid black;
    position: absolute;
    right: 0;
    top: 0;

  }
}
</style>
