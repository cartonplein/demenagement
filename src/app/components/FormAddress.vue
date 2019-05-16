<template>
    <div id="form-address" class="container">
      <div class="columns is-mobile">
        <div id="panel-forms" class="columns is-mobile is-centered">
          <div class="column">
              <FormPickupAddress id="form-pickup-address" ref="formPickupAddress" v-on:update-pickup-address="updateOrigin($event)"></FormPickupAddress>
          </div>
          <div class="column">
              <FormDestinationAddress id="form-destination-address" ref="formDestinationAddress" v-on:update-destination-address="updateDestination($event)"></FormDestinationAddress>
          </div>
          <transition name="fade" mode="out-in">
            <p id="feasibility-trip-ko" v-show="!isTripFeasible">DÉMÉNAGEMENT NON-POSSIBLE<br> On vous invite à contacter un autre partenaire :
              <ul>
                <li> 0612445567 </li>
              </ul>
            </p>
          </transition>
        </div>
        <div id="panel-map">
          <iframe height="100%" width="100%" :src="getDirection(origin, destination)" id="map" v-if="this.isTripFeasible && this.isAddressesValid" allowFullscreen>
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
      origin: 'carton plein',
      destination: 'carton plein',
      isTripFeasible: true,
      isAddressesValid: false
    };
  },
  components: {
    FormPickupAddress,
    FormDestinationAddress
  },
  methods: {

    updateOrigin(e) {
      if(e == '') {
        this.isAddressesValid = false;
      }
      else {
        this.origin = e;
      }
    },

    updateDestination(e) {
      if(e == '') {
        this.isAddressesValid = false;
      }
      else {
        this.destination = e;
        this.calculateFeasibility();
      }
    },

    calculateFeasibility() {
      this.isTripFeasible = true;
      this.isAddressesValid = true;
    },

    getDirection(origin, destination) {
      console.log(origin, destination);
      if(origin === '' || destination === '') {
        return null;
      }
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
    height: 400px;
    max-height: 400px;

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1.5s;
    }

    .fade-enter,
    .fade-leave-to
    {
      opacity: 0
    }

    #feasibility-trip-ko {
      padding: 10px;
      background: black;
      border-radius: 10px;
      position: inherit;
      bottom: 10px;
      width: 60%;
      height: 50%;
      color: #F91A04;
      font-size: 15px;
      font-weight: bold;
    }
  }

  #panel-map {
    background: lightgray;
    border: 2px solid black;
    position: absolute;
    right: 0;
    top: 0;
    height: 400px;
    width: 480px;
  }
}
</style>
