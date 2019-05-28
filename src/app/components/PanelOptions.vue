<template>
  <div id="panel-options">
    <div class="row">
      <div class="cell" style="width: 70%">
        <div class="columns is-multiline" id="panel-element-options">
          <div id="element-options" v-for="element in options"
            :key="element.number"
            :element="element" @click="addOption(element)">
            <b>{{ element.name }}</b><br>
            <span style="font-size: 12px">{{ element.items }}<br></span>
            <span style="font-size: 11px"><i>{{ element.details }}</i></span>
            <div class="tarif-option"><b>{{ element.tarif }}€</b></div>
          </div>
        </div>
      </div>
      <div class="cell" style="width: 30%">
        <div id="choices-options">
          <span style="color: black"><b><ins>Vos options :</ins></b></span>
          <p style="color: black; font-size: 13px;" v-show="!(Array.isArray(this.$store.state.choicesUser.options) && this.$store.state.choicesUser.options.length)">Ajoutez des options depuis le catalogue</p>
          <div id="choice-element" v-for="element in this.$store.state.choicesUser.options"
            :key="element.number"
            :element="element">
            <b>{{ element.name }}</b>
            <button class="btn-minus" @click="decreaseOptionQuantity(element)" v-bind:class="{ 'disableButton': element.quantity == 1 }"><b>-</b></button>
            <input type="number" id="qte-element" v-model.number="element.quantity" disabled>
            <button class="btn-plus" @click="increaseOptionQuantity(element)"><b>+</b></button>
            <i class="fa fa-trash fa-lg" @click="deleteOption(element)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { config } from '../../db/index.js'
const fb = require('../../db/index.js');

export default {
    name: 'PanelOptions',
    props: ['element'],
    firebase: {
      options: fb.rootRef.child('options'),
    },
    methods: {
      addOption(element) {
        if(!this.isOptionAdded(element)) {
          this.$store.commit('addOption', element);
          this.$store.commit('setTarifOptions', this.$store.state.tarifOptions + element.tarif);
          this.$store.commit('setTarif', this.$store.state.tarif + element.tarif);
        }
        else {
          this.$store.state.choicesUser.options.map((elementObj) => {
            if(elementObj.number === element.number) {
              this.increaseOptionQuantity(elementObj);
            }
          });
        }
      },
      deleteOption(element) {
        this.$store.commit('setTarifOptions', this.$store.state.tarifOptions - (element.quantity*element.tarif));
        this.$store.commit('setTarif', this.$store.state.tarif - (element.quantity*element.tarif));
        this.$store.commit('deleteOption', element);
      },
      increaseOptionQuantity(element) {
        element.quantity++;
        this.$store.commit('setTarifOptions', this.$store.state.tarifOptions + element.tarif);
        this.$store.commit('setTarif', this.$store.state.tarif + element.tarif);
      },
      decreaseOptionQuantity(element) {
        element.quantity--;
        this.$store.commit('setTarifOptions', this.$store.state.tarifOptions - element.tarif);
        this.$store.commit('setTarif', this.$store.state.tarif - element.tarif);
      },
      isOptionAdded(element) {
        var found = false;
        for(var i = 0; i < this.$store.state.choicesUser.options.length; i++) {
          if (this.$store.state.choicesUser.options[i].number == element.number) {
            found = true;
            break;
          }
        }
        return found;
      }
    }
}

</script>

<style lang="scss" scoped>

#panel-options {
  display: table;
  width: 100%;
  height: 500px;
  max-height: 500px;

  .row {
    display: table-row;
  }

  .row .cell {
    //border: 1px solid blue;
    display: table-cell;
    padding: 0 0 0 15px;
  }

  #panel-element-options {
    margin: 0;
    overflow-y: scroll;
    scroll-behavior: smooth;
    height: 100%;
    border: 2px solid black;
    background: #E85029;
    padding: 10px;
    width: 100%;
    opacity: 0.95;
  }

  #choices-options {
    margin: 0;
    border: 2px solid black;
    background: #E85029;
    padding: 10px;
    opacity: 0.95;
    width: 100%;
    max-height: 100%;
    text-align: center;
  }

  #element-options {
    padding: 15px;
    width: 100%;
    height: 85px;
    background: white;
    margin-left: auto;
    margin-bottom: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 13px;
    color: black;
    text-align: justify;
    cursor: pointer;
    position: relative;

    &:hover {
      transform: translateX(5px);
    }

    .tarif-option {
      position: absolute;
      bottom: 2px;
      right: 2px;
      color: white;
      background: green;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 3px;
    }
  }

  #choice-element {
    border: 1px solid gray;
    margin-bottom: 1px;
    background: #FFF;
    padding: 10px;
    opacity: 0.95;
    width: 100%;
    height: 60px;
    color: black;
    font-size: 11px;
    border-radius: 5px;
    position: relative;

    .btn-plus {
      position: absolute;
      background-color: #4CAF50;
      font-size: 10px;
      color: white;
      right: 60px;
      bottom: 6px;
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
      color: white;
      left: 60px;
      bottom: 6px;
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
      bottom: 7px;
      right: 7px;
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

    input[type=number] {
      position: absolute;
      bottom: 3px;
      right: 87px;
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
  }



}

</style>
