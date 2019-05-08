<template>
    <div id="panel-element-inventaire">
      <div class="element-name has-text-justified has-text-black"><b>{{ element.name }}</b></div>
      <label for="qteElement" style="color: black; font-size: 15px">Qté.</label>
      <button class="btn-minus" @click="decreaseElementQuantity(element)" v-bind:class="{ 'disableButton': quantiteElement == 1 }"><b>-</b></button>
      <input type="number" id="qteElement" name="quantity" min="1" max="10" v-model="quantiteElement">
      <button class="btn-plus" @click="increaseElementQuantity(element)"><b>+</b></button>
      <i class="fa fa-trash fa-lg" @click="deleteElementFromInventaire(element)"></i>
    </div>
</template>

<script>
import { store } from '../store.js';

export default {
    name: 'PanelElementInventaire',
    props: ['element'],
    data () {
      return {
        quantiteElement: 1
      }
    },
    methods: {
      increaseElementQuantity(element) {
        this.quantiteElement++;
        store.updateElementQuantity(element, this.quantiteElement);
        return this.quantiteElement;
      },
      decreaseElementQuantity(element) {
        this.quantiteElement--;
        store.updateElementQuantity(element, this.quantiteElement);
        return this.quantiteElement;
      },
      deleteElementFromInventaire (element) {
        store.deleteElementFromInventaire(element);
      }
    }
}

</script>

<style lang="scss" scoped>

#panel-element-inventaire {
    background: #f6b26bff;
    border: 1px solid black;
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

    label[for="qteElement"] {
      position: absolute;
      right: 140px;
      bottom: 21.5px;
    }

    .element-name {
      position: absolute;
      left: 10px;
      bottom: 23px;
    }

    .btn-plus {
      position: absolute;
      background-color: #4CAF50;
      font-size: 10px;
      color: white;
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
      color: white;
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

}

</style>
