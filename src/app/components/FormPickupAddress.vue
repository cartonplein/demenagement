<template>
    <div id="form-pickup-address">

        <div class="form-pickup-address-title">
            <p style="font-size: 20px">
              <b>Adresse de départ</b>
            </p>
        </div>

        <div class="form-pickup-address-adresse">
            <vue-google-autocomplete
              ref="pickupAddress"
              id="input-pickup-address-adresse"
              classname="form-control"
              placeholder="Rechercher une adresse"
              v-on:placechanged="getPickupAddressData"
              v-on:no-results-found="displayError"
              v-on:focus="onInputFocus"
              country="fr"
            >
            </vue-google-autocomplete>
            <p style="color: red; font-size: 10px" v-if="errorPickupAdresse">
                Adresse introuvable !
            </p>
        </div>
        <!--
        <div id="form-pickup-address-cp-ville">
            <div class="form-pickup-address-codepostal">
                <label for="fpCp" style="color: blue; font-size: 15px">Code postal :</label>
                <input type="text" pattern="[0-9]{5}" id="fpCp" placeholder="Code postal" v-model="inputPickupCodePostal" required />
                <p style="color: red; font-size: 10px" v-if="errorPickupCodePostal">
                    Ce champ est obligatoire !
                </p>
            </div>
            <div class="form-pickup-address-ville">
                <label for="fpVil" style="color: blue; font-size: 15px">Ville :</label>
                <input type="text" id="fpVil" placeholder="Ville" v-model="inputPickupVille" required />
                <p style="color: red; font-size: 10px" v-if="errorPickupVille">
                    Ce champ est obligatoire !
                </p>
            </div>
        </div>
        -->
        <transition name="fade" mode="out-in">
          <div id="form-pickup-address-logement" style="margin-top: 20px" v-show="isAddressAvailable">
              <div class="form-pickup-address-surface">
                  <label for="input-pickup-address-surface">Surface (m²)<span style="color:red">*</span> :</label>
                  <select id="input-pickup-address-surface" ref="pickupSurface" @change="isFormCompleted">
                      <option value="" disabled selected>Selectionner une surface</option>
                      <option value="10m²-20m²">10m²-20m²</option>
                      <option value="20m²-30m²">20m²-30m²</option>
                      <option value="30m²-40m²">30m²-40m²</option>
                      <option value="40m²-50m²">40m²-50m²</option>
                      <option value="50m²-60m²">50m²-60m²</option>
                      <option value=">60m²">&gt;60m²</option>
                  </select>
              </div>

              <div class="form-pickup-address-etage">
                  <label for="input-pickup-address-etage">Étage<span style="color:red">*</span> :</label>
                  <select id="input-pickup-address-etage" ref="pickupEtage" @change="isFormCompleted">
                      <option value="" disabled selected>Selectionner une étage</option>
                      <option value="RDC">RDC</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value=">8">&gt;8</option>
                  </select>
              </div>

              <div id="form-pickup-address-asc-cave">
                  <div class="form-pickup-address-ascenseur">
                      <label for="input-pickup-address-ascenseur">Ascenseur<span style="color:red">*</span> :</label>
                      <select id="input-pickup-address-ascenseur" ref="pickupAscenseur" @change="isFormCompleted">
                          <option value="" disabled selected>Oui/Non</option>
                          <option value="Oui - 2 personnes">Oui - 2 personnes</option>
                          <option value="Oui - 3 personnes">Oui - 3 personnes</option>
                          <option value="Oui - 4 personnes">Oui - 4 personnes</option>
                          <option value="Non">Non</option>
                      </select>
                  </div>
                  <div class="form-pickup-address-cave">
                      <label for="input-pickup-address-cave">Cave<span style="color:red">*</span> :</label>
                      <select id="input-pickup-address-cave" ref="pickupCave" @change="isFormCompleted">
                          <option value="" disabled selected>Oui/Non</option>
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
                      </select>
                  </div>
              </div>
          </div>
        </transition>

    </div>
</template>

<script>
import { store } from '../store.js';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    name: 'FormPickupAddress',
    data () {
      return {
        inputPickupAddress: '',
        errorPickupAdresse: false,
      }
    },
    components: {
      VueGoogleAutocomplete
    },
    methods: {

        getPickupAddressData (addressData, placeResultData, id) {
          this.$parent.$options.methods.updateOrigin(addressData, placeResultData, id);
          this.inputPickupAddress = placeResultData.formatted_address;
          this.isFormCompleted();
        },

        displayError() {
          this.errorPickupAdresse = true;
          this.$refs.pickupAddress.blur();
        },

        onInputFocus() {
          if(this.errorPickupAdresse == true) {
            this.errorPickupAdresse = false;
          }
          this.$refs.pickupAddress.clear();
          this.$store.commit('setFirstTarif', 0);
          this.$parent.$options.methods.initializePickupAddress();
          this.inputPickupAddress = '';
          this.isFormCompleted();
        },
        
        submitFormPickupAddress () {
            console.log(this.$refs.pickupSurface.value);
            this.$store.commit('setPickupAddressUser', [this.inputPickupAddress, this.$refs.pickupSurface.value, this.$refs.pickupEtage.value, this.$refs.pickupAscenseur.value, this.$refs.pickupCave.value]);
            this.errorPickupAdresse = false;
        },

        isFormCompleted() {
          let choicePickupSurface = this.$refs.pickupSurface.value;
          let choicePickupEtage = this.$refs.pickupEtage.value;
          let choicePickupAscenseur = this.$refs.pickupAscenseur.value;
          let choicePickupCave = this.$refs.pickupCave.value;

          if(this.inputPickupAddress == '' || choicePickupSurface == '' || choicePickupEtage == '' || choicePickupAscenseur == '' || choicePickupCave == '') {
            this.$parent.setPickupAddressCompleted(false);
          }
          else {
            this.$parent.setPickupAddressCompleted(true);
          }
        },
    },
    watch: {
      inputPickupAddress: function() {
        if(this.inputPickupAddress == '') {
          this.$store.commit('setAddressAvailable', false);
        }
      }
    },
    computed: {
      isAddressAvailable() {
        return this.$store.state.isAddressAvailable;
      }
    }
}

</script>

<style lang="scss" scoped>

#form-pickup-address {
    background: #FFF;
    color: #E85029;
    border: 1px solid #E85029;
    box-shadow: 0 2px 2px 0 #E85029;
    border-radius: 10px;
    max-width: 300px;
    padding: 20px;
    overflow: hidden;

    #input-pickup-address-adresse {
      width: 260px;
      max-width: 260px;
      height: 30px;
      max-height: 30px;
      margin-top: 5px;
      padding: 5px;
      border-radius: 5px;
    }

    /* on n'utilise pas
    #form-pickup-address-cp-ville {
        background: inherit;
        margin: 0 auto;

        .form-pickup-address-codepostal,
        .form-pickup-address-ville {
          width: 48%;
        }

        .form-pickup-address-codepostal {
          float: left;
        }

        .form-pickup-address-ville {
          float: right;
        }

        label, input, p {
          position: static;
          display: block;
        }
    }
    */

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1.5s;
    }

    .fade-enter,
    .fade-leave-to
    {
      opacity: 0
    }

    #form-pickup-address-asc-cave {
        background: inherit;
        margin: auto;

        .form-pickup-address-ascenseur,
        .form-pickup-address-cave {
            width: 48%;
        }

        .form-pickup-address-ascenseur {
            float: left;
        }

        .form-pickup-address-cave {
            float: right;
        }

        label, select, p {
          position: static;
          display: block;
        }
    }

    input[type=text] {
      width: 100%;
      padding: 10px 10px;
      margin: 5px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;

      &:focus {
          outline: none;
      }
    }

    select {
      width: 100%;
      padding: 10px 10px;
      margin: 5px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    label {
      font-size: 12px;
      font-weight: bold;
    }


}

</style>
