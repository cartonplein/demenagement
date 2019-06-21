<template>
    <div id="panel-element-inventaire">
      <img id="element-image" :src="viewElementImage(element)" @click="displayElementImage(element)"/>
      <div class="element-name has-text-justified"><b>{{ element.name }}</b></div>
      <button class="btn-minus" @click="decreaseElementQuantity(element)" v-bind:class="{ 'disableButton': element.quantity == 1 }"><b>-</b></button>
      <input type="number" id="qteElement" name="quantity" min="1" max="10" v-model.number="element.quantity" disabled>
      <button class="btn-plus" @click="increaseElementQuantity(element)" v-bind:class="{ 'disableButton': exceedTransportLimit(element) }"><b>+</b></button>
      <i class="fa fa-trash fa-lg" @click="deleteElementFromInventaire(element)"></i>
    </div>
</template>

<script>
import { config } from '../../db/index.js';

const fb = require('../../db/index.js');

export default {
    name: 'PanelElementInventaire',
    props: ['element'],
    mounted() {
      /*
      let panelElementInventaire = this;
      fb.inventaireRef.child('meubles').on('child_changed', function(snapshot) {
        //si l'élément est déjà ajouté
        if(panelElementInventaire.$store.state.choicesUser.inventaire.includes(panelElementInventaire.element)) {
          let oldElementTarif = panelElementInventaire.element.tarif;
          let oldElementQuantity = panelElementInventaire.element.quantity;
          let oldElementQuantityDemonter = panelElementInventaire.element.quantityDemonter;
          panelElementInventaire.$store.commit('deleteElementFromInventaire', panelElementInventaire.element);
          panelElementInventaire.$store.commit('addElementInInventaire', snapshot.val());
          panelElementInventaire.$store.commit('modifyQuantityElementInventaire', [snapshot.val().number, oldElementQuantity]);
          panelElementInventaire.$store.commit('modifyQuantityDemonterElementInventaire', [snapshot.val().number, oldElementQuantityDemonter]);
          if(oldElementQuantityDemonter > 0) {
            panelElementInventaire.$store.commit('setTarif', panelElementInventaire.$store.state.tarif - oldElementQuantity*oldElementTarif + oldElementQuantity*(snapshot.val().tarif) - oldElementQuantityDemonter*oldElementTarif*0.25 + oldElementQuantityDemonter*(snapshot.val().tarif*0.25));
          }
          else {
            panelElementInventaire.$store.commit('setTarif', panelElementInventaire.$store.state.tarif - oldElementQuantity*oldElementTarif + oldElementQuantity*(snapshot.val().tarif));
          }
        }
      });*/
    },
    methods: {
      increaseElementQuantity(element) {
        element.quantity++;
        this.$store.commit('setVrTotalInventaire', Math.round((this.$store.state.vrTotalInventaire+element.vr)*100)/100);
        this.$store.dispatch('calculateNumberMovers');
        //this.$store.commit('setTarif', this.$store.state.tarif + element.tarif);
        //this.updateElementQuantity(element, this.quantiteElement);
      },
      decreaseElementQuantity(element) {
        element.quantity--;
        if(element.quantityDemonter > 0) {
          //this.$store.commit('setTarif', this.$store.state.tarif - element.tarif - element.tarif*0.25);
          if(element.quantityDemonter >= element.quantity) {
            element.quantityDemonter = element.quantity;
          }
        }
        else {
          this.$store.commit('setVrTotalInventaire', Math.round((this.$store.state.vrTotalInventaire-element.vr)*100)/100);
          this.$store.dispatch('calculateNumberMovers');
          //this.$store.commit('setTarif', this.$store.state.tarif - element.tarif);
        }
        //this.updateElementQuantity(element, this.quantiteElement);
      },
      deleteElementFromInventaire (element) {
        this.$store.commit('setVrTotalInventaire', Math.round((this.$store.state.vrTotalInventaire-element.quantity*element.vr)*100)/100);
        //this.$store.commit('setTarif', this.$store.state.tarif - (element.quantity*element.tarif) - (element.quantityDemonter*element.tarif*0.25));
        this.$store.commit('deleteElementFromInventaire', element);
        this.$store.dispatch('calculateNumberMovers');
      },
      viewElementImage(element) {
        return element.image;
      },
      displayElementImage(element) {
        window.open(element.image);
        return false;
      },
      exceedTransportLimit(element) {
        return (element.vr + this.$store.state.vrTotalInventaire) > 1;
      }
    },
    computed: {

    }
}

</script>

<style lang="scss" scoped>

#panel-element-inventaire {
    background: #FFF;
    border: 1px solid #E85029;
    box-shadow: 0 2px 2px 0 #E85029;
    color: #E85029;
    border-radius: 10px;
    width: 100%;
    height: 70px;
    max-height: 70px;
    overflow: hidden;
    margin-bottom: 5px;
    position: relative;

    input[type=number] {
      position: absolute;
      right: 70px;
      bottom: 20px;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 15px;
      box-sizing: border-box;
      width: 40px;
      text-align:center;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .element-name {
      position: absolute;
      left: 110px;
      bottom: 23px;
    }

    .btn-plus {
      position: absolute;
      background-color: #4CAF50;
      font-size: 10px;
      color: #FFF;
      right: 45px;
      bottom: 23px;
      border-radius: 10px;
      &:hover {
        cursor: pointer;
        background-color: #3e8e41;
      }
      &:active {
        background-color: #3e8e41;
        transform: translateY(2px);
      }
    }

    .btn-minus {
      position: absolute;
      background-color: #ff0000ff;
      font-size: 10px;
      color: #FFF;
      right: 112px;
      bottom: 23px;
      border-radius: 10px;
      &:hover {
        cursor: pointer;
        background-color: #980000ff;
      }
      &:active {
        background-color: #980000ff;
        transform: translateY(2px);
      }
    }

    .disableButton {
      pointer-events: none;
      opacity: 0.3;
    }

    .fa-trash {
      position: absolute;
      right: 10px;
      bottom: 24px;
      color: black;
      &:hover {
        cursor: pointer;
        color: red;
      }
      &:active {
        color: red;
        transform: translateY(2px);
      }
    }

    #element-image {
      position: absolute;
      left: 10px;
      top: 5px;
      width: 15%;
      height: 85%;
      cursor: pointer;
      border: 1px solid black;
    }

}

</style>
