<template>
    <div id="app-address">
        <h1>Saisissez vos adresses de départ et d'arrivée :</h1>
        <div id="form-address" class="container">
          <table id="panel-forms">
            <tr>
              <FormPickupAddress id="form-pickup-address" ref="formPickupAddress"></FormPickupAddress>
              <FormDestinationAddress id="form-destination-address" ref="formDestinationAddress" ></FormDestinationAddress>
            </tr>
            <tr>
              <div id="warning-msg">
                <img id="warning-icon" src="../../../public/images/warning.png" alt="">
                <p>La distance entre les adresses de départ et d'arrivée doit être comprise entre 0 et 10 kilomètres.</p>
              </div>
            </tr>
          </table>
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
        <ButtonSuivant id="button-suivant" :onClick="openPageTypeDemenagement" v-show="isButtonNextVisible"></ButtonSuivant>
    </div>
</template>

<script>

import FormPickupAddress from './FormPickupAddress.vue';
import FormDestinationAddress from './FormDestinationAddress.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import { store } from '../store.js';
import iconWarning from "../../../public/images/search-icon.png"

import { config } from '../../db/index.js'

const fb = require('../../db/index.js');

export default {
  name: 'AppAddress',
  data () {
    return {
      originAdr: '',
      originCoor: '',

      destinationAdr: '',
      destinationCoor: '',

      availablePostalCodes: [],

      isPickupAddressCompleted: false,
      isDestinationAddressCompleted: false,
    }
  },
  components: {
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
      store.commit('setPickupCp', addressData.postal_code);
      this.originCoor = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      this.calculateDirections();
    },

    updateDestination (addressData, placeResultData, id) {
      this.destinationAdr = placeResultData.formatted_address;
      store.commit('setDestinationCp', addressData.postal_code);
      this.destinationCoor = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      this.calculateDirections();
    },

    calculateDirections () {
      let app = this;
      if(this.originAdr !== undefined && this.destinationAdr !== undefined) {
        if(!this.getAvailablePostalCodes().includes(store.getters.getPickupAddressUser.cp) || !this.getAvailablePostalCodes().includes(store.getters.getDestinationAddressUser.cp)) {
          document.getElementById('feasibility-trip-ko').style.display = "block";
        }
        else {
          document.getElementById('feasibility-trip-ko').style.display = "none";
          store.commit('setDirection', this.getDirection(this.originCoor, this.destinationCoor));
          document.getElementById('iframe-map').src = this.getDirection(this.originCoor, this.destinationCoor);
          store.commit('setAddressAvailable', true);
          this.calculateDistance(this.originCoor, this.destinationCoor).then( (distance) => {
            store.commit('setDistanceAdressesUser', distance);
            console.log(distance);
            store.commit('setFirstTarif', store.state.firstTarif + this.calculateTarifByDistance(distance.value));
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
      document.getElementById('iframe-map').src = '';
    },

    initializeDestinationAddress() {
      this.destinationAdr = undefined;
      this.destinationCoor = '';
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
      this.$store.commit('setTarif', this.$store.state.firstTarif);
      console.log(this.$store.state.choicesUser.destinationAddress);
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
    position: absolute;
    top: 150px;
    width: 100%;

    #panel-forms {
      opacity: 0.95;
      //border-radius: 10px;
      float: left;
      height: 250px;
      width: 55%;

      #form-pickup-address {
        float: left;
      }

      #form-destination-address {
        float: right;
      }

      #warning-msg {
        //border: 1px solid #E85029;
        box-shadow: 0 2px 2px 0 #E85029;
        background: #E85029;
        border-radius: 10px;
        padding: 10px;
        height: 100px;
        width: 100%;
        color: #FFF;
        font-size: 13px;
        position: relative;
        margin-top: 20px;

        p {
          position: absolute; left: 55px; top: 15px; font-weight: bold;
        }

        #warning-icon {
          width: 40px; height: 40px;
        }
      }
    }

    #panel-map {
      background: lightgray;
      border: 1px solid #E85029;
      box-shadow: 0 2px 2px 0 #E85029;
      float: right;
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
    font-size: 200%;
    font-weight: bold;
    padding-bottom: 20px;
    margin-top: 70px;
    color: #E85029;
  }

  mark {
    background-color: #E85029;
    color: #FFF;
  }

}

</style>
