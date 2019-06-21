<template>
    <div id="panel-inventaire">
      <input id="input-search-bar" type="text" v-model="searchElement" placeholder="Cherchez un objet pour l'ajouter" v-on:click="showList=true" v-click-outside="hideList">
      <div id="list-elements-search-bar" v-show="showList && isInventaire">
        <ElementSearchBar id="element-search-bar" v-for="element in filteredListInventaire"
          :key="element.number"
          :element="element" />
      </div>
      <div id="list-elements-search-bar" v-show="showList && isTransport">
        <ElementSearchBar id="element-search-bar" v-for="element in filteredListTransport"
          :key="element.number"
          :element="element" />
      </div>
      <div id="list-elements-search-bar" v-show="showList && this.$store.state.vrTotalInventaire == 1 && isTransport">
        <div id="msg-limit-reached">
          <p>Vous avez atteint le volume maximum pour transport simple.</p>
        </div>
      </div>
      <div id="panel-inventaire-list">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in this.$store.state.choicesUser.inventaire"
            :key="element.number"
            :element="element" />
        </div>
      </div>
      <div id="panel-inventaire-calcul" v-show="this.$store.state.choicesUser.inventaire.length !== 0">
        <table style="width:100%; margin-bottom: 3px;">
          <tr>
            <th>Équivalent vélo-remorque</th>
            <td>{{ getVrTotalInventaire() }}</td>
          </tr>
          <tr>
            <th>Nombre de déménageurs</th>
            <td>{{ numberMovers }}</td>
          </tr>
          <tr>
            <th>Nombre d'articles</th>
            <td>{{ numberItems }}</td>
          </tr>
          <tr>
            <th>Durée d'approche</th>
            <td>~ {{ approachTime }}</td>
          </tr>
          <tr>
            <th>Durée de transport</th>
            <td>~ {{ tripTime }}</td>
          </tr>
          <!--
          <tr>
            <th>Durée total</th>
            <td>{{ totalTime }}</td>
          </tr>-->

        </table>
        <span style="color: #E85029; font-weight: bold"> Tarif calculé : {{ tarifTransportSimple }}€</span>
        <!--<button id="btn-update-tarif" @click="updateTarif">Calculer tarif</button>-->
      </div>
    </div>
</template>

<script>

import ElementSearchBar from './ElementSearchBar.vue';
import PanelElementInventaire from './PanelElementInventaire.vue'
import ClickOutside from 'vue-click-outside';
import { config } from '../../db/index.js'

const fb = require('../../db/index.js');

export default {
    name: 'PanelInventaire',
    data () {
      return {
        searchElement: '',
        showList: false,
        cp1: ['75008', '75009', '75010', '75011', '75018', '75019'],
        cp2: ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75017', '75020'],
        cp3: ['75012', '75013', '75014', '75015', '75016'],

        tarifParEtage: 2,
        tarifParDistance: 30,
        forfaitTransportByHour: 30
      }
    },
    firebase: {
      elementsInventaire: fb.inventaireRef.child('meubles')
    },
    components: {
      ElementSearchBar,
      PanelElementInventaire
    },
    methods: {
      hideList () {
        this.showList = false;
      },

      getVrTotalInventaire() {
        return this.$store.state.vrTotalInventaire;
      },

      getNumberItems() {
        let numberItems = 0;
        for(var i=0; i<this.$store.state.choicesUser.inventaire.length; i++) {
          numberItems = numberItems + this.$store.state.choicesUser.inventaire[i].quantity;
        }
        return numberItems;
      },

      calculateApproachTime() {
        if(this.cp1.includes(this.$store.getters.getPickupAddressUser.cp)) {
          return 0.5;
        }
        else if(this.cp2.includes(this.$store.getters.getPickupAddressUser.cp)) {
          return 1;
        }
        else if(this.cp3.includes(this.$store.getters.getPickupAddressUser.cp)) {
          return 1.5;
        }
      },

      calculateTripTime() {
        let distance = this.$store.getters.getDistanceAdressesUser.value/1000;
        if(this.$store.getters.getNumberMovers == 1) {
          return Math.round((distance/15)*100)/100;
        }
        else if (this.$store.getters.getNumberMovers == 2) {
          return Math.round((distance/13)*100)/100;
        }
        else if (this.$store.getters.getNumberMovers == 3) {
          return Math.round((distance/10)*100)/100;
        }
        else if (this.$store.getters.getNumberMovers == 4) {
          return Math.round((distance/9)*100)/100;
        }
        else {

        }
        /*
        if(this.$store.state.vrTotalInventaire <= 1) {
          return Math.round((distance/15)*100)/100;
        }
        else if (this.$store.state.vrTotalInventaire <= 2) {
          return Math.round((distance/13)*100)/100;
        }
        else if (this.$store.state.vrTotalInventaire <= 3) {
          return Math.round((distance/10)*100)/100;
        }
        else if (this.$store.state.vrTotalInventaire <= 4) {
          return Math.round((distance/9)*100)/100;
        }*/
      },

      calculateTarifDistance() {
        let tarifDistance = this.calculateTripTime()*this.$store.getters.getNumberMovers*this.tarifParDistance;
        return Math.round(tarifDistance*100)/100;
      },

      calculateTarifAccessibility() {
        let pickupEtage = parseInt(this.$store.getters.getPickupAddressUser.etage, 10);
        let destinationEtage = parseInt(this.$store.getters.getDestinationAddressUser.etage, 10);
        let tarifAccessibilityPickup = 0;
        let tarifAccessibilityDestination = 0;
        if(pickupEtage > 2) {
          if(!this.$store.getters.getPickupAddressUser.hasAscenseur) {
            tarifAccessibilityPickup = (this.getNumberItems()*(pickupEtage-2)*this.tarifParEtage);
            console.log(tarifAccessibilityPickup);
          }
        }
        if(destinationEtage > 2) {
          if(!this.$store.getters.getDestinationAddressUser.hasAscenseur) {
            tarifAccessibilityDestination = (this.getNumberItems()*(destinationEtage-2)*this.tarifParEtage);
          }
        }
        let tarifAccessibility = tarifAccessibilityPickup + tarifAccessibilityDestination;
        return Math.round(tarifAccessibility*100)/100;
        //return tarifAccessibility.toFixed(2);
      },

      calculateTarifTransportSimple() {
        return (this.$store.getters.getNumberMovers * this.forfaitTransportByHour * 2) + this.calculateTarifAccessibility() + this.calculateTarifDistance();
      },

      decimalToHourMin(decimalTime) {
        if(decimalTime >= 1) {
          let hour = Math.floor(decimalTime);
          let min = Math.ceil(Math.round(((decimalTime*60)-hour*60)*10)/10);
          if(min == 0) {
            return hour +" h";
          }
          return hour +" h "+ min +" min";
        }
        return Math.ceil(Math.round((decimalTime*60)*10)/10) +" min";
      },

      updateTarif() {
        let tarifInventaire = this.tarifInventaire;
        this.$store.commit('setTarif', this.$store.state.tarif + tarifInventaire);
      }
    },
    computed: {
      isInventaire() {
        return this.$store.state.isInventaire;
      },
      isTransport() {
        return this.$store.state.isTransport;
      },
      filteredListInventaire() {
        return this.elementsInventaire.filter(element => {
          return element.name.toLowerCase().includes(this.searchElement.toLowerCase())
        });
      },
      filteredListTransport() {
        return this.elementsInventaire.filter(element => {
          return this.$store.state.vrTotalInventaire + element.vr <= 1
        });
      },
      numberItems() {
        return this.getNumberItems();
      },
      tripTime() {
        return this.decimalToHourMin(this.calculateTripTime());
      },
      approachTime() {
        return this.decimalToHourMin(this.calculateApproachTime());
      },
      numberMovers() {
        return this.$store.state.numberMovers;
      },
      tarifTransportSimple() {
        return this.calculateTarifTransportSimple();
      }
    },
    directives: {
      ClickOutside
    }
}

</script>

<style lang="scss" scoped>

#panel-inventaire {
    width: 900px;
    max-width: 900px;
    height: 480px;
    max-height: 480px;
    align-self: stretch;
    overflow: hidden;
    position: relative;

    #list-elements-search-bar {
      z-index: 2;
      position: absolute;
      overflow-y: scroll;
      scroll-behavior: smooth;
      -webkit-transition: height 0.4s ease-in-out;
      transition: height 0.4s ease-in-out;
      max-height: 250px;
      max-width: 70%;
    }

    #msg-limit-reached {
      border: 1px solid #ddd;
      margin-top: -1px;
      background-color: #f6f6f6;
      padding: 12px;
      text-decoration: none;
      font-size: 15px;
      height: 50px;
      max-height: 50px;
      width: 630px;
    }

    #panel-inventaire-list {
      opacity: 0.95;
      background: #FFF;
      box-shadow: 0 2px 2px 0 #E85029;
      margin-top: 10px;
      padding: 15px;
      border: 2px solid #E85029;
      height: 88%;
      max-height: 88%;
      width: 70%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      float: left;
    }

    #panel-inventaire-calcul {
      opacity: 0.95;
      background: #FFF;
      box-shadow: 0 2px 2px 0 #E85029;
      margin-top: 10px;
      padding: 15px;
      border: 2px solid #E85029;
      height: 88%;
      max-height: 88%;
      width: 28%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      float: right;

      #btn-update-tarif {
        float: right;
        cursor: pointer;
        margin-top: 10px;
      }

    }

    input[type=text] {
      width: 300px;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 13px;
      background-color: #FFF;
      background-image: url('../../../public/images/search-icon.png');
      background-position: 10px 10px;
      background-repeat: no-repeat;
      padding: 10px 20px 10px 40px;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
    }
    input[type=text]:focus {
      width: 70%;
    }

    table, th, td {
      color: #E85029;
      border: 2px solid #E85029;
      font-size: 12px;
      padding: 5px;
    }
    th, td {
      width: 50%;
    }

}

</style>
