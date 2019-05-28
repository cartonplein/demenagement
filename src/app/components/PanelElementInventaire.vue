<template>
    <div id="panel-element-inventaire">
      <img id="element-image" :src="viewElementImage(element)" @click="displayElementImage(element)"/>
      <div class="element-name has-text-justified has-text-black"><b>{{ element.name }} ({{ element.volume }}m³)</b></div>
      <button class="btn-minus" @click="decreaseElementQuantity(element)" v-bind:class="{ 'disableButton': element.quantity == 1 }"><b>-</b></button>
      <input type="number" id="qteElement" name="quantity" min="1" max="10" v-model.number="element.quantity" disabled>
      <button class="btn-plus" @click="increaseElementQuantity(element)"><b>+</b></button>
      <i class="fa fa-trash fa-lg" @click="deleteElementFromInventaire(element)"></i>
    </div>
</template>

<script>

export default {
    name: 'PanelElementInventaire',
    props: ['element'],
    methods: {
      increaseElementQuantity(element) {
        element.quantity++;
        this.$store.commit('setTarif', this.$store.state.tarif + element.tarif);
        //this.updateElementQuantity(element, this.quantiteElement);
      },
      decreaseElementQuantity(element) {
        element.quantity--;
        if(element.quantityDemonter > 0) {
          this.$store.commit('setTarif', this.$store.state.tarif - element.tarif - element.tarif*0.5);
          if(element.quantityDemonter >= element.quantity) {
            element.quantityDemonter = element.quantity;
          }
        }
        else {
          this.$store.commit('setTarif', this.$store.state.tarif - element.tarif);
        }
        //this.updateElementQuantity(element, this.quantiteElement);
      },
      deleteElementFromInventaire (element) {
        this.$store.commit('setTarif', this.$store.state.tarif - (element.quantity*element.tarif) - (element.quantityDemonter*element.tarif*0.5));
        this.$store.commit('deleteElementFromInventaire', element);
      },
      viewElementImage(element) {
        return element.image;
      },
      displayElementImage(element) {
        window.open(element.image);
        return false;
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

    .element-name {
      position: absolute;
      left: 90px;
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

    #element-image {
      position: absolute;
      left: 10px;
      top: 5px;
      width: 10%;
      height: 85%;
      cursor: pointer;
      border: 1px solid black;
    }

}

</style>
