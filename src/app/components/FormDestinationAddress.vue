<template>
    <div id="form-destination-address">

        <div class="form-address-title">
            <p style="color: black; font-size: 20px">
                <b>Adresse de destination</b>
            </p>
        </div>

        <div class="form-destination-address-adresse">
            <label for="input-destination-address-adresse" style="color: black; font-size: 15px">Adresse :</label>
            <input id="input-destination-address-adresse" ref="autocompleteDestinationAddress" placeholder="Rechercher une adresse" type="text" v-model="inputDestinationAddress" v-on:change="$emit('update-destination-address', inputDestinationAddress)"></input>
            <p style="color: red; font-size: 10px" v-if="errorDestinationAdresse">
                Ce champ est obligatoire !
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
          <div class="form-destination-address-logement" v-show="this.$parent.isTripFeasible && this.$parent.isAddressesValid">
              <div class="form-destination-address-surface">
                  <label for="input-destination-address-surface" style="color: black; font-size: 15px">Surface (m²) :</label>
                  <select id="input-destination-address-surface" v-model="choiceDestinationSurface">
                      <option value="" disabled hidden>Selectionner une surface</option>
                      <option value="5">5m²</option>
                      <option value="10">10m²</option>
                      <option value="15">15m²</option>
                      <option value="20">20m²</option>
                      <option value="25">25m²</option>
                      <option value="30">30m²</option>
                      <option value="35">35m²</option>
                      <option value="40">40m²</option>
                      <option value="40p">Plus que 40m²</option>
                  </select>
              </div>

              <div class="form-destination-address-etage">
                  <label for="input-destination-address-etage" style="color: black; font-size: 15px">Étage :</label>
                  <select id="input-destination-address-etage" v-model="choiceDestinationEtage">
                      <option value="" disabled hidden>Selectionner une étage</option>
                      <option value="rdc">RDC</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="Pq4">Plus que 4</option>
                  </select>
              </div>

              <div id="form-destination-address-asc-cave">
                  <div class="form-destination-address-ascenseur">
                      <label for="input-destination-address-ascenseur" style="color: black; font-size: 15px">Ascenseur :</label>
                      <select id="input-destination-address-ascenseur" v-model="choiceDestinationAscenseur">
                          <option value="" disabled hidden>Oui/Non</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                      </select>
                  </div>
                  <div class="form-destination-address-cave">
                      <label for="input-destination-address-cave" style="color: black; font-size: 15px">Cave :</label>
                      <select id="input-destination-address-cave" v-model="choiceDestinationCave">
                          <option value="" disabled hidden>Oui/Non</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                      </select>
                  </div>
              </div>
          </div>
        </transition>
    </div>
</template>

<script>
import { store } from '../store.js';


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
        };
    },
    watch: {
    },
    methods: {
        getInputDestinationAddress () {
          return this.inputDestinationAddress;
        },

        submitFormDestinationAddress () {
            //if (inputDestinationAdresse === '') return this.errorDestinationAdresse = true;
            store.updateDestinationAddressChoicesUser(this.inputDestinationAdresse, this.choiceDestinationSurface, this.choiceDestinationEtage, this.choiceDestinationAscenseur, this.choiceDestinationCave);

            this.inputDestinationAdresse = '';
            this.choiceDestinationSurface = '';
            this.choiceDestinationEtage = '';
            this.choiceDestinationAscenseur = '';
            this.choiceDestinationCave = '';
            this.errorDestinationAdresse = false;
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
      margin-bottom: 30px;
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


}

</style>
