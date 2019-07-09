<template>
    <div id="panel-inventaire">
      <input id="input-search-bar" type="text" v-model="searchElement" placeholder="Cherchez un objet pour filtrer">
      <table id="buttonsTab">
        <tr>
          <td class="buttonTab has-text-centered" v-on:click="openTab(0)" v-bind:class="{ 'tabActive': tabs[0] }">SALON/SÉJOUR</td>
          <td class="buttonTab has-text-centered" v-on:click="openTab(1)" v-bind:class="{ 'tabActive': tabs[1] }">BUREAU</td>
          <td class="buttonTab has-text-centered" v-on:click="openTab(2)" v-bind:class="{ 'tabActive': tabs[2] }">CHAMBRE</td>
          <td class="buttonTab has-text-centered" v-on:click="openTab(3)" v-bind:class="{ 'tabActive': tabs[3] }">CUISINE</td>
          <td class="buttonTab has-text-centered" v-on:click="openTab(4)" v-bind:class="{ 'tabActive': tabs[4] }">CELLIER</td>
          <td class="buttonTab has-text-centered" v-on:click="openTab(5)" v-bind:class="{ 'tabActive': tabs[5] }">DIVERS</td>
        </tr>
      </table>
      <div class="panel-inventaire-list" v-if="tabs[0]">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in filteredInventaire"
            v-if="element.tab == 0"
            v-bind:class="{ 'isInInventaire' : element.quantity > 0 }"
            :key="filteredInventaire.indexOf(element)"
            :element="element" />
        </div>
      </div>
      <div class="panel-inventaire-list" v-if="tabs[1]">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in filteredInventaire"
            v-if="element.tab == 1"
            v-bind:class="{ 'isInInventaire' : element.quantity > 0 }"
            :key="filteredInventaire.indexOf(element)"
            :element="element" />
        </div>
      </div>
      <div class="panel-inventaire-list" v-if="tabs[2]">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in filteredInventaire"
            v-if="element.tab == 2"
            v-bind:class="{ 'isInInventaire' : element.quantity > 0 }"
            :key="filteredInventaire.indexOf(element)"
            :element="element" />
        </div>
      </div>
      <div class="panel-inventaire-list" v-if="tabs[3]">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in filteredInventaire"
            v-if="element.tab == 3"
            v-bind:class="{ 'isInInventaire' : element.quantity > 0 }"
            :key="filteredInventaire.indexOf(element)"
            :element="element" />
        </div>
      </div>
      <div class="panel-inventaire-list" v-if="tabs[4]">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in filteredInventaire"
            v-if="element.tab == 4"
            v-bind:class="{ 'isInInventaire' : element.quantity > 0 }"
            :key="filteredInventaire.indexOf(element)"
            :element="element" />
        </div>
      </div>
      <div class="panel-inventaire-list" v-if="tabs[5]">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in filteredInventaire"
            v-if="element.tab == 5"
            v-bind:class="{ 'isInInventaire' : element.quantity > 0 }"
            :key="filteredInventaire.indexOf(element)"
            :element="element" />
        </div>
      </div>
      <div id="panel-calcul-transport-simple" v-show="$store.getters.getNumberItems !== 0">
        <span style="color: #E85029; font-weight: bold">{{ $store.getters.getTypeDemenagementUser }}</span>
        <table style="width:100%; margin-bottom: 3px;">
          <tr>
            <th>Durée de transport</th>
            <td>~ {{ tripTime }}</td>
          </tr>
          <tr>
            <th>Nombre d'articles</th>
            <td>{{ numberItems }}</td>
          </tr>
          <tr>
            <th>Nombre de déménageurs</th>
            <td>{{ numberMovers }}</td>
          </tr>
        </table>
        <div style="margin-bottom: 10px;" v-show="$store.getters.isTransportTwoMovers">
          <input type="checkbox" @change="toggleCheckbox()" ref="checkboxOneMover">
            <span style="margin-left: 5px; font-size: 13px; font-weight: bold">
              Je n'ai besoin qu'un seul déménageur
            </span>
          </input>
        </div>
        <span style="color: #E85029; font-weight: bold"> Tarif : {{ tarif }}€</span>
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
        tabs: [true, false, false, false, false, false],

        tpsAppr1: { codesPostaux:'', heure: 0 },
        tpsAppr2: { codesPostaux:'', heure: 0 },
        tpsAppr3: { codesPostaux:'', heure: 0 },

        vitesseTraj1: 0,
        vitesseTraj2: 0,
        vitesseTraj3: 0,
        vitesseTraj4: 0,

        tpsManutention: 0,
        etageMaxGratuit: 0,

        tarifManutention: 0,
        tarifPerDistance: 0,
        tarifApproach: 0,
        tarifAccessibilityFloor: 0
      }
    },
    mounted() {
      this.getInventaire();
      this.getApproachDataCalcul();
      this.getTripDataCalcul();
      this.getHandlingDataCalcul();
      this.getAccessibiltyFloorDataCalcul();
    },
    components: {
      ElementSearchBar,
      PanelElementInventaire
    },
    methods: {

      openTab(tab) {
        this.tabs = [false, false, false, false, false, false];
        this.tabs[tab] = true;
      },

      toggleCheckbox() {
        if(this.$refs.checkboxOneMover.checked) {
          this.$store.commit('setNumberMovers', 1);
        }
        else {
          this.$store.commit('setNumberMovers', 2);
        }
      },

      getInventaire () {
        let panelInventaire = this;
        fb.inventaireRef.orderByKey().equalTo('meubles').on('child_added', function(snapshot) {
          console.log('Added');
          panelInventaire.$store.commit('emptyInventaire');
          snapshot.forEach(function(data) {
            if(data.val().isSalon) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 0]);
            }
            if(data.val().isBureau) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 1]);
            }
            if(data.val().isChambre) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 2]);
            }
            if(data.val().isCuisine) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 3]);
            }
            if(data.val().isCellier) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 4]);
            }
            if(data.val().isDivers) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 5]);
            }
          });
        });
        fb.inventaireRef.orderByKey().equalTo('meubles').on('child_changed', function(snapshot) {
          console.log('Changed');
          panelInventaire.$store.commit('emptyInventaire');
          snapshot.forEach(function(data) {
            if(data.val().isSalon) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 0]);
            }
            if(data.val().isBureau) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 1]);
            }
            if(data.val().isChambre) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 2]);
            }
            if(data.val().isCuisine) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 3]);
            }
            if(data.val().isCellier) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 4]);
            }
            if(data.val().isDivers) {
              panelInventaire.$store.commit('addElementInInventaire', [data.val(), 0, 0, 5]);
            }
          });
        });
      },

      getApproachDataCalcul() {
        let panelInventaire = this;
        fb.inventaireRef.child('calculs').child('approche').on('child_added', function(snapshot) {
          if(snapshot.key == 1) {
            panelInventaire.tpsAppr1 = snapshot.val();
          }
          if(snapshot.key == 2) {
            panelInventaire.tpsAppr2 = snapshot.val();
          }
          if(snapshot.key == 3) {
            panelInventaire.tpsAppr3 = snapshot.val();
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifApproach = snapshot.val();
          }
        });
        fb.inventaireRef.child('calculs').child('approche').on('child_changed', function(snapshot) {
          if(snapshot.key == 1) {
            panelInventaire.tpsAppr1 = snapshot.val();
          }
          if(snapshot.key == 2) {
            panelInventaire.tpsAppr2 = snapshot.val();
          }
          if(snapshot.key == 3) {
            panelInventaire.tpsAppr3 = snapshot.val();
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifApproach = snapshot.val();
          }
        });
      },

      getTripDataCalcul() {
        let panelInventaire = this;
        fb.inventaireRef.child('calculs').child('trajet').on('child_added', function(snapshot) {
          if(snapshot.key == 1) {
            panelInventaire.vitesseTraj1 = snapshot.val().vitesse;
          }
          if(snapshot.key == 2) {
            panelInventaire.vitesseTraj2 = snapshot.val().vitesse;
          }
          if(snapshot.key == 3) {
            panelInventaire.vitesseTraj3 = snapshot.val().vitesse;
          }
          if(snapshot.key == 4) {
            panelInventaire.vitesseTraj4 = snapshot.val().vitesse;
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifPerDistance = snapshot.val();
          }

        });
        fb.inventaireRef.child('calculs').child('trajet').on('child_changed', function(snapshot) {
          if(snapshot.key == 1) {
            panelInventaire.vitesseTraj1 = snapshot.val().vitesse;
          }
          if(snapshot.key == 2) {
            panelInventaire.vitesseTraj2 = snapshot.val().vitesse;
          }
          if(snapshot.key == 3) {
            panelInventaire.vitesseTraj3 = snapshot.val().vitesse;
          }
          if(snapshot.key == 4) {
            panelInventaire.vitesseTraj4 = snapshot.val().vitesse;
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifPerDistance = snapshot.val();
          }
        });
      },

      getHandlingDataCalcul() {
        let panelInventaire = this;
        fb.inventaireRef.child('calculs').child('manutention').on('child_added', function(snapshot) {
          if(snapshot.key == 'heure') {
            panelInventaire.tpsManutention = snapshot.val();
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifManutention = snapshot.val();
          }
        });
        fb.inventaireRef.child('calculs').child('manutention').on('child_changed', function(snapshot) {
          if(snapshot.key == 'heure') {
            panelInventaire.tpsManutention = snapshot.val();
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifManutention = snapshot.val();
          }
        });
      },

      getAccessibiltyFloorDataCalcul () {
        let panelInventaire = this;
        fb.inventaireRef.child('calculs').child('accessibiliteEtage').on('child_added', function(snapshot) {
          if(snapshot.key == 'etageMaxGratuit') {
            panelInventaire.etageMaxGratuit = snapshot.val();
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifAccessibilityFloor = snapshot.val();
          }
        });
        fb.inventaireRef.child('calculs').child('accessibiliteEtage').on('child_changed', function(snapshot) {
          if(snapshot.key == 'etageMaxGratuit') {
            panelInventaire.etageMaxGratuit = snapshot.val();
          }
          if(snapshot.key == 'tarif') {
            panelInventaire.tarifAccessibilityFloor = snapshot.val();
          }
        });
      },

      calculateTripTime() {
        let distance = this.$store.getters.getDistanceAdressesUser.value/1000;
        if(this.$store.getters.getNumberMovers == 1) {
          return Math.round((distance/this.vitesseTraj1)*100)/100;
        }
        else if (this.$store.getters.getNumberMovers == 2) {
          return Math.round((distance/this.vitesseTraj2)*100)/100;
        }
        else if (this.$store.getters.getNumberMovers == 3) {
          return Math.round((distance/this.vitesseTraj3)*100)/100;
        }
        else if (this.$store.getters.getNumberMovers == 4) {
          return Math.round((distance/this.vitesseTraj4)*100)/100;
        }
      },

      calculateTarifDistance() {
        let tarifDistance = this.calculateTripTime()*this.$store.getters.getNumberMovers*this.tarifPerDistance;
        return Math.round(tarifDistance*100)/100;
      },

      calculateTarifApproach() {
        if(this.tpsAppr1.codesPostaux.includes(this.$store.getters.getPickupAddressUser.cp)) {
          return this.tpsAppr1.heure*this.tarifApproach;
        }
        else if(this.tpsAppr2.codesPostaux.includes(this.$store.getters.getPickupAddressUser.cp)) {
          return this.tpsAppr2.heure*this.tarifApproach;
        }
        else if(this.tpsAppr3.codesPostaux.includes(this.$store.getters.getPickupAddressUser.cp)) {
          return this.tpsAppr3.heure*this.tarifApproach;
        }
      },

      calculateTarifAccessibility() {
        let pickupEtage = parseInt(this.$store.getters.getPickupAddressUser.etage, 10);
        let destinationEtage = parseInt(this.$store.getters.getDestinationAddressUser.etage, 10);
        let tarifAccessibilityPickup = 0;
        let tarifAccessibilityDestination = 0;
        if(pickupEtage > this.etageMaxGratuit) {
          if(!this.$store.getters.getPickupAddressUser.hasAscenseur) {
            tarifAccessibilityPickup = (this.$store.getters.getNumberItems*(pickupEtage-this.etageMaxGratuit)*this.tarifAccessibilityFloor);
          }
        }
        if(destinationEtage > this.etageMaxGratuit) {
          if(!this.$store.getters.getDestinationAddressUser.hasAscenseur) {
            tarifAccessibilityDestination = (this.$store.getters.getNumberItems*(destinationEtage-this.etageMaxGratuit)*this.tarifAccessibilityFloor);
          }
        }
        let tarifAccessibility = tarifAccessibilityPickup + tarifAccessibilityDestination;
        return Math.round(tarifAccessibility*100)/100;
      },

      calculateTarifHandling() {
        return this.$store.getters.getNumberMovers * this.tarifManutention * this.tpsManutention;
      },

      calculateTarifTransportSimple() {
        let tarifTransportSimple = this.calculateTarifHandling() + this.calculateTarifAccessibility() + this.calculateTarifDistance() + this.calculateTarifApproach();
        tarifTransportSimple = parseFloat(Math.round(tarifTransportSimple * 100) / 100).toFixed(2);
        this.$store.commit('setTarifTransportSimple', tarifTransportSimple);
        return tarifTransportSimple;
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

      /*
      updateTarif() {
        let tarifInventaire = this.tarifInventaire;
        this.$store.commit('setTarif', this.$store.state.tarif + tarifInventaire);
      }*/
    },
    computed: {
      isInventaire() {
        return this.$store.state.isInventaire;
      },
      isTransport() {
        return this.$store.state.isTransport;
      },
      filteredInventaire() {
        return this.$store.getters.getInventaire.filter(element => {
          return element.name.toLowerCase().includes(this.searchElement.toLowerCase())
        });
      },
      numberItems() {
        return this.$store.state.numberItems;
      },
      tripTime() {
        return this.decimalToHourMin(this.calculateTripTime());
      },
      numberMovers() {
        return this.$store.state.numberMovers;
      },
      tarif() {
        if(this.$store.state.isTransport) {
          return this.calculateTarifTransportSimple();
        }
        if(this.$store.state.isInventaire) {
          return 0;
        }
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
    height: 580px;
    max-height: 580px;
    align-self: stretch;
    overflow: hidden;
    position: relative;
    /*
    #list-elements-search-bar {
      z-index: 2;
      position: absolute;
      overflow-y: scroll;
      scroll-behavior: smooth;
      -webkit-transition: height 0.4s ease-in-out;
      transition: height 0.4s ease-in-out;
      max-height: 250px;
      max-width: 70%;
    }*/

    #buttonsTab {
      width: 79%;
      border: 1px solid #E85029;
      margin-top: 5px;
    }

    .buttonTab {
      width: 16%;
      background: #FFF;
      font-size: 12px;
      margin: 0;
      border: 1px solid #E85029;
      padding: 5px;
      cursor: pointer;
    }

    .tabActive {
      color: white;
      font-weight: bold;
      background: #E85029;
    }

    .panel-inventaire-list {
      opacity: 0.95;
      background: #FFF;
      box-shadow: 0 2px 2px 0 #E85029;
      padding: 15px;
      border: 2px solid #E85029;
      height: 74.5%;
      max-height: 74.5%;
      width: 79%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      float: left;
    }

    #panel-calcul-transport-simple {
      opacity: 0.95;
      background: #FFF;
      box-shadow: 0 2px 2px 0 #E85029;
      padding: 10px;
      border: 2px solid #E85029;
      height: 60%;
      max-height: 60%;
      width: 20%;
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
      width: 79%;
    }

    table, th, td {
      color: #E85029;
      border: 2px solid #E85029;
      font-size: 12px;
      padding: 5px;
    }
    th {
      width: 63%;
    }
    td {
      width: 37%;
    }

    .isInInventaire {
      background: #F6F4F4;
      border: 3px solid #E85029;
    }

}

</style>
