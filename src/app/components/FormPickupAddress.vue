<template>
    <div id="form-pickup-address">

        <div class="form-pickup-address-title">
            <p style="color: black; font-size: 20px">
                <b>Adresse de départ</b>
            </p>
        </div>

        <div class="form-pickup-address-adresse">
            <label for="input-pickup-address-adresse" style="color: black; font-size: 15px">Adresse :</label>
            <input id= "input-pickup-address-adresse" ref="autocompletePickupAddress" placeholder="Rechercher une adresse" type="text" v-model="value" v-on:change="$emit('update-pickup-address', value)"></input>
            <p style="color: red; font-size: 10px" v-if="errorPickupAdresse">
                Ce champ est obligatoire !
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
        <div class=form-pickup-address-logement>
            <div class="form-pickup-address-surface">
                <label for="input-pickup-address-surface" style="color: black; font-size: 15px">Surface (m²) :</label>
                <select id="input-pickup-address-surface" v-model="choicePickupSurface" ref="pickupSurface">
                    <option value="" disabled hidden>Selectionner une surface</option>
                    <option value="5">5m²</option>
                    <option value="10">10m²</option>
                    <option value="15">15m²</option>
                    <option value="20">20m²</option>
                    <option value="25">25m²</option>
                    <option value="30">30m²</option>
                    <option value="35">35m²</option>
                    <option value="40">40m²</option>
                    <option value="40+">Plus que 40m²</option>
                </select>
            </div>

            <div class="form-pickup-address-etage">
                <label for="input-pickup-address-etage" style="color: black; font-size: 15px">Étage :</label>
                <select id="input-pickup-address-etage" v-model="choicePickupEtage" ref="pickupEtage">
                    <option value="" disabled hidden>Selectionner une étage</option>
                    <option value="rdc">RDC</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="Plus que 4">Plus que 4</option>
                </select>
            </div>

            <div id="form-pickup-address-asc-cave">
                <div class="form-pickup-address-ascenseur">
                    <label for="input-pickup-address-ascenseur" style="color: black; font-size: 15px">Ascenseur :</label>
                    <select id="input-pickup-address-ascenseur" v-model="choicePickupAscenseur" ref="pickupAscenseur">
                        <option value="" disabled hidden>Oui/Non</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>
                <div class="form-pickup-address-cave">
                    <label for="input-pickup-address-cave" style="color: black; font-size: 15px">Cave :</label>
                    <select id="input-pickup-address-cave" v-model="choicePickupCave" ref="pickupCave">
                        <option value="" disabled hidden>Oui/Non</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { store } from '../store.js';

export default {
    name: 'FormPickupAddress',
    data () {
        return {
            value: '',
            choicePickupSurface: '',
            choicePickupEtage: '',
            choicePickupAscenseur: '',
            choicePickupCave: '',
            errorPickupAdresse: false
        }
    },
    methods: {

        getInputPickupAdresse () {
          return this.inputPickupAdresse;
        },

        submitFormPickupAddress () {
            //if (inputPickupAdresse === '') return this.errorPickupAdresse = true;
            store.updatePickupAddressChoicesUser(this.inputPickupAdresse, this.choicePickupSurface, this.choicePickupEtage, this.choicePickupAscenseur, this.choicePickupCave);

            this.inputPickupAdresse = '';
            this.choicePickupSurface = '';
            this.choicePickupEtage = '';
            this.choicePickupAscenseur = '';
            this.choicePickupCave = '';
            this.errorPickupAdresse = false;
        }
    }
}

</script>

<style lang="scss" scoped>

#form-pickup-address {
    background: #FFF;
    border: 2px solid black;
    border-radius: 10px;
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;

    #input-pickup-address-adresse {
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

    .form-pickup-address-logement {
    /*  display: none;*/
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
