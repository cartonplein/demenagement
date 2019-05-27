<template>
    <div id="form-destination-address">

        <div class="form-address-title">
            <p style="color: black; font-size: 20px">
                <b>Adresse de destination</b>
            </p>
        </div>

        <div class="form-destination-address-adresse">
          <vue-google-autocomplete
            ref="destinationAddress"
            id="input-destination-address-adresse"
            classname="form-control"
            placeholder="Rechercher une adresse"
            v-on:placechanged="getDestinationAddressData"
            v-on:no-results-found="displayError"
            v-on:focus="onInputFocus"
            country="fr"
          >
          </vue-google-autocomplete>
          <p style="color: red; font-size: 10px" v-if="errorDestinationAdresse">
              Adresse introuvable !
          </p>
        </div>
        <!--
        <div id="form-destination-address-codepostal-ville">
            <div class="form-destination-address-codepostal">
                <label for="fdCp" style="color: blue; font-size: 15px">Code postal :</label>
                <input type="text" pattern="[0-9]{5}" id="fdCp" placeholder="Code postal" v-model="inputDestinationCodePostal" required />
                <p style="color: red; font-size: 10px" v-if="errorDestinationCodePostal">
                    Ce champ est obligatoire !
                </p>
            </div>
            <div class="form-destination-address-ville">
                <label for="fdVil" style="color: blue; font-size: 15px">Ville :</label>
                <input type="text" id="fdVil" placeholder="Ville" v-model="inputDestinationVille" required />
                <p style="color: red; font-size: 10px" v-if="errorDestinationVille">
                    Ce champ est obligatoire !
                </p>
            </div>
        </div>
        -->
        <transition name="fade" mode="out-in">
          <div class="form-destination-address-logement" style="margin-top: 20px" v-show="isAddressAvailable">
              <div class="form-destination-address-surface">
                  <label for="input-destination-address-surface">Surface (m²)<span style="color:red">*</span> :</label>
                  <select id="input-destination-address-surface" ref="destinationSurface" @change="isFormCompleted">
                      <option value="" disabled selected>Selectionner une surface</option>
                      <option value="5m²">5m²</option>
                      <option value="10m²">10m²</option>
                      <option value="15m²">15m²</option>
                      <option value="20m²">20m²</option>
                      <option value="25m²">25m²</option>
                      <option value="30m²">30m²</option>
                      <option value="35m²">35m²</option>
                      <option value="40m²">40m²</option>
                      <option value="Plus que 40m²">Plus que 40m²</option>
                  </select>
              </div>

              <div class="form-destination-address-etage">
                  <label for="input-destination-address-etage">Étage<span style="color:red">*</span> :</label>
                  <select id="input-destination-address-etage" ref="destinationEtage" @change="isFormCompleted">
                      <option value="" disabled selected>Selectionner une étage</option>
                      <option value="RDC">RDC</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="Plus que 4">Plus que 4</option>
                  </select>
              </div>

              <div id="form-destination-address-asc-cave">
                  <div class="form-destination-address-ascenseur">
                      <label for="input-destination-address-ascenseur">Ascenseur<span style="color:red">*</span> :</label>
                      <select id="input-destination-address-ascenseur" ref="destinationAscenseur" @change="isFormCompleted">
                          <option value="" disabled selected>Oui/Non</option>
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
                      </select>
                  </div>
                  <div class="form-destination-address-cave">
                      <label for="input-destination-address-cave">Cave<span style="color:red">*</span> :</label>
                      <select id="input-destination-address-cave" ref="destinationCave" @change="isFormCompleted">
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
    name: 'FormDestinationAddress',
    data () {
        return {
          inputDestinationAddress: '',
          choiceDestinationSurface: '',
          choiceDestinationEtage: '',
          choiceDestinationAscenseur: '',
          choiceDestinationCave: '',
          errorDestinationAdresse: false,

          //isAddressAvailable: false
        };
    },
    components: {
      VueGoogleAutocomplete
    },
    methods: {

        getDestinationAddressData (addressData, placeResultData, id) {
          this.$parent.$options.methods.updateDestination(addressData, placeResultData, id);
          this.inputDestinationAddress = placeResultData.formatted_address;
          this.isFormCompleted();
        },

        displayError() {
          this.errorDestinationAdresse = true;
          this.$refs.destinationAddress.blur();
        },

        onInputFocus() {
          if(this.errorDestinationAdresse == true) {
            this.errorDestinationAdresse = false;
          }
          this.$refs.destinationAddress.clear();
          this.$parent.$options.methods.initializeDestinationAddress();
          this.inputDestinationAddress = '';
          this.isFormCompleted();
        },

        submitFormDestinationAddress () {
            //if (inputDestinationAdresse === '') return this.errorDestinationAdresse = true;
            let destinationAddress = [this.inputDestinationAddress, this.$refs.destinationSurface.value, this.$refs.destinationEtage.value, this.$refs.destinationAscenseur.value, this.$refs.destinationCave.value];
            this.$store.commit('setDestinationAddressUser', destinationAddress);
            this.errorDestinationAdresse = false;
        },

        isFormCompleted() {
          let choiceDestinationSurface = this.$refs.destinationSurface.value;
          let choiceDestinationEtage = this.$refs.destinationEtage.value;
          let choiceDestinationAscenseur = this.$refs.destinationAscenseur.value;
          let choiceDestinationCave = this.$refs.destinationCave.value;

          if(this.inputDestinationAddress == '' || choiceDestinationSurface == '' || choiceDestinationEtage == '' || choiceDestinationAscenseur == '' || choiceDestinationCave == '') {
            this.$parent.setDestinationAddressCompleted(false);
          }
          else {
            this.$parent.setDestinationAddressCompleted(true);
          }
        }
    },
    watch: {
      inputDestinationAddress: function() {
        if(this.inputDestinationAddress == '') {
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

#form-destination-address {
    background: #FFF;
    border: 2px solid black;
    border-radius: 10px;
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;

    #input-destination-address-adresse {
      width: 260px;
      max-width: 260px;
      height: 30px;
      max-height: 30px;
      margin-top: 5px;
      padding: 5px;
      border-radius: 5px;
    }

    /* on n'utilise pas
    #form-destination-address-codepostal-ville {
        background: inherit;
        margin: 0 auto;

        .form-destination-address-codepostal,
        .form-destination-address-ville {
          width: 48%;
        }

        .form-destination-address-codepostal {
          float: left;
        }

        .form-destination-address-ville {
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

    #form-destination-address-asc-cave {
        background: inherit;
        margin: auto;

        .form-destination-address-ascenseur,
        .form-destination-address-cave {
            width: 48%;
        }

        .form-destination-address-ascenseur {
            float: left;
        }

        .form-destination-address-cave {
            float: right;
        }

        label, select, p {
            position: static;
            display: block;
        }
    }

    .form-destination-address-logement {

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
      color: black;
      font-size: 12px;
      font-weight: bold;
    }


}

</style>
