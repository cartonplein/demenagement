<template>
    <div id="app-address">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px">Saisissez vos adresses de départ et de destination : </h1>
        <div id="form-address" class="container">
          <div class="columns is-mobile">
            <div id="panel-forms" class="columns is-mobile is-centered">
              <div class="column">
                <FormPickupAddress id="form-pickup-address" ref="formPickupAddress"></FormPickupAddress>
              </div>
              <div class="column">
                <FormDestinationAddress id="form-destination-address" ref="formDestinationAddress" ></FormDestinationAddress>
              </div>
            </div>
            <div id="panel-map">
              <iframe height="100%" width="100%" id="iframe-map" allowFullscreen>
              </iframe>
            </div>
            <transition name="fade" mode="out-in">
              <p id="feasibility-trip-ko">DÉMÉNAGEMENT NON-POSSIBLE<br> On vous invite à contacter un autre partenaire :
                <ul>
                  <li> 0612445567 </li>
                </ul>
              </p>
            </transition>
          </div>
        </div>
        <ButtonSuivant id="button-suivant" :onClick="openPageTypeDemenagement" v-show="isButtonNextVisible"></ButtonSuivant>
    </div>
</template>

<script>

import LogoCartonPlein from './LogoCartonPlein.vue';
import FormPickupAddress from './FormPickupAddress.vue';
import FormDestinationAddress from './FormDestinationAddress.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import { store } from '../store.js';

import { config } from '../../db/index.js'

const fb = require('../../db/index.js');

export default {
  name: 'AppAddress',
  data () {
    return {
      originAdr: '',
      originCoor: '',
      originCp: '',

      destinationAdr: '',
      destinationCoor: '',
      destinationCp: '',

      availablePostalCodes: [],

      isPickupAddressCompleted: false,
      isDestinationAddressCompleted: false,
    }
  },
  components: {
    LogoCartonPlein,
    FormPickupAddress,
    FormDestinationAddress,
    ButtonSuivant
  },
  mounted() {
    this.availablePostalCodes = this.getAvailablePostalCodes();
  },
  methods: {

    setPickupAddressCompleted(completed) {
      this.isPickupAddressCompleted = completed;
    },

    setDestinationAddressCompleted(completed) {
      this.isDestinationAddressCompleted = completed;
    },

    updateOrigin (addressData, placeResultData, id) {
      this.originAdr = placeResultData.formatted_address;
      this.originCp = addressData.postal_code;
      this.originCoor = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      this.calculateDirections();
    },

    updateDestination (addressData, placeResultData, id) {
      this.destinationAdr = placeResultData.formatted_address;
      this.destinationCp = addressData.postal_code;
      this.destinationCoor = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      this.calculateDirections();
    },

    calculateDirections () {
      let app = this;
      if(this.originAdr !== undefined && this.destinationAdr !== undefined) {
        if(!this.getAvailablePostalCodes().includes(this.originCp) || !this.getAvailablePostalCodes().includes(this.destinationCp)) {
          document.getElementById('feasibility-trip-ko').style.display = "block";
        }
        else {
          document.getElementById('feasibility-trip-ko').style.display = "none";
          document.getElementById('iframe-map').src = this.getDirection(this.originCoor, this.destinationCoor);
          store.commit('setAddressAvailable', true);
          this.calculateDistance(this.originCoor, this.destinationCoor).then( (distance) => {
            store.commit('setDistanceAdressesUser', distance);
            store.commit('setTarifAddresses', store.state.tarif + this.calculateTarifByDistance(distance.value));
          });
        }
      }
      else {
        document.getElementById('iframe-map').src = '';
      }
    },

    getDirection (origin, destination) {
      return "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBcc_IiK7JtWDhD9jm20HHjDaduqKHkcNg&origin="+origin+"&destination="+destination+"&mode=bicycling";
    },

    calculateDistance (origin, destination) {
      var distanceService = new google.maps.DistanceMatrixService();
      return new Promise((resolve, reject) => {
        distanceService.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'BICYCLING'
        }, (response, status) => {
          if(status === 'OK') {
            resolve(response.rows[0].elements[0].distance);
          } else {
            reject(new Error('Not OK'));
          }
        });
      });
    },

    calculateTarifByDistance(distanceVal) {
      let distanceKm = (distanceVal / 1000).toFixed(1);
      return Math.ceil(distanceKm)*10;
    },

    initializePickupAddress() {
      this.originAdr = undefined;
      this.originCoor = '';
      this.originCp = '';
      document.getElementById('iframe-map').src = '';
    },

    initializeDestinationAddress() {
      this.destinationAdr = undefined;
      this.destinationCoor = '';
      this.destinationCp = '';
      document.getElementById('iframe-map').src = '';
    },

    submitFormAddress () {
      this.$refs.formPickupAddress.submitFormPickupAddress();
      this.$refs.formDestinationAddress.submitFormDestinationAddress();
    },

    getAvailablePostalCodes () {
      let availablePostalCodes = [];
      fb.addressesRef.child('codesPostaux').on('child_added', function(snapshot) {
        availablePostalCodes = snapshot.val();
      });
      fb.addressesRef.child('codesPostaux').on('child_changed', function(snapshot) {
        availablePostalCodes = snapshot.val();
      });
      fb.addressesRef.child('codesPostaux').on('child_removed', function(snapshot) {
        availablePostalCodes = [];
      });
      return availablePostalCodes;
    },

    openPageTypeDemenagement() {
      this.submitFormAddress();
      this.$store.commit('setTarif', this.$store.state.tarifAddresses);
      this.$parent.$options.methods.openPageTypeDemenagement();
    }
  },
  computed: {
    isButtonNextVisible() {
      return this.isPickupAddressCompleted && this.isDestinationAddressCompleted;
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

      #button-validate-addresses {
        position: inherit;
        bottom: 15px;
        cursor: pointer;
        width: 12%;
        height: 8%;
        font-size: 90%;
        border-radius: 8px;
        background-color: #4A4CE3;
        color: white;

        &:hover {
          background-color: #2628D1;
        }
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

    #feasibility-trip-ko {
      padding: 20px;
      background: black;
      position: absolute;
      right: 0;
      top: 0;
      margin: auto;
      height: 400px;
      width: 480px;
      color: #F91A04;
      font-size: 15px;
      font-weight: bold;
      display: none;
    }
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
