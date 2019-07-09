<template>
    <div id="panel-element-inventaire">
      <img id="element-image" :src="viewElementImage(element)"/>
      <div class="element-name has-text-centered">{{ element.name }}</div>
      <button class="btn-minus" @click="decreaseElementQuantity(element)" v-bind:class="{ 'disableButton': element.quantity == 0 }"><b>-</b></button>
      <input type="number" id="qteElement" name="quantity" min="1" max="10" v-model.number="element.quantity" disabled>
      <button class="btn-plus" @click="increaseElementQuantity(element)" v-bind:class="{ 'disableButton': exceedTransportLimit(element) }"><b>+</b></button>
      <!--<i class="fa fa-trash fa-lg" @click="deleteElementFromInventaire(element)"></i>-->
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
        this.$store.commit('setNumberItems', this.$store.getters.getNumberItems+1);
        this.$store.commit('setVrTotalInventaire', Math.round((this.$store.state.vrTotalInventaire+element.vr)*100)/100);
        if(!this.$parent.$refs.checkboxOneMover.checked) {
          this.$store.dispatch('calculateNumberMovers');
        }
        //this.$store.commit('setTarif', this.$store.state.tarif + element.tarif);
        //this.updateElementQuantity(element, this.quantiteElement);
      },
      decreaseElementQuantity(element) {
        element.quantity--;
        this.$store.commit('setNumberItems', this.$store.getters.getNumberItems-1);
        if(element.quantityDemonter > 0) {
          //this.$store.commit('setTarif', this.$store.state.tarif - element.tarif - element.tarif*0.25);
          if(element.quantityDemonter >= element.quantity) {
            element.quantityDemonter = element.quantity;
          }
        }
        this.$store.commit('setVrTotalInventaire', Math.round((this.$store.state.vrTotalInventaire-element.vr)*100)/100);
        if(!this.$parent.$refs.checkboxOneMover.checked) {
          this.$store.dispatch('calculateNumberMovers');
        }
        if(this.$store.getters.getNumberItems == 0) {
          this.$parent.$refs.checkboxOneMover.checked = false;
        }
        //this.$store.commit('setTarif', this.$store.state.tarif - element.tarif);
        //this.updateElementQuantity(element, this.quantiteElement);
      },
      viewElementImage(element) {
        return element.image;
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
    width: 130px;
    max-width: 130px;
    height: 130px;
    max-height: 130px;
    overflow: hidden;
    margin: 5px;
    position: relative;

    input[type=number] {
      position: absolute;
      left: 43px;
      bottom: 5px;
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
      left: 0;
      right: 0;
      position: absolute;
      bottom: 33px;
      font-size: 13px;
    }

    .btn-plus {
      position: absolute;
      background-color: #4CAF50;
      font-size: 10px;
      color: #FFF;
      right: 18px;
      bottom: 9px;
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
      left: 18px;
      bottom: 9px;
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

    #element-image {
      position: absolute;
      left: 35px;
      top: 10px;
      width: 45%;
      height: 35%;
      cursor: pointer;
      border: 1px solid black;
    }

}

</style>
