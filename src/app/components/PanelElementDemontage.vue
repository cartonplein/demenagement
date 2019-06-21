<template>
    <div id="panel-element-demontage" v-show="element.canDisassemble">
      <div class="element-name has-text-centered" style="margin-top: 5px"><b>{{ element.name }}</b></div>
      <img id="element-image" :src="viewElementImage(element)" @click="displayElementImage(element)"/>
      <button class="btn-minus" @click="decreaseElementQuantity(element)" v-bind:class="{ 'disableButton': element.quantityDemonter == 0 }"><b>-</b></button>
      <input type="number" id="qteElement" name="quantity" min="1" max="10" v-model.number="element.quantityDemonter" disabled>
      <button class="btn-plus" @click="increaseElementQuantity(element)" v-bind:class="{ 'disableButton': element.quantityDemonter == element.quantity }"><b>+</b></button>
    </div>
</template>

<script>

export default {
    name: 'PanelElementDemontage',
    props: ['element'],
    methods: {
      /*
      updateElementQuantityDemonter(element, quantity) {
        let elementAndQuantity = [element, quantity];
        this.$store.commit('updateElementQuantityDemonter', elementAndQuantity);
        console.log();
      },
      */
      increaseElementQuantity(element) {
        element.quantityDemonter++;
        console.log(element.canDisassemble);
        this.$store.commit('setTarif', this.$store.state.tarif + element.tarif*0.25);
      },
      decreaseElementQuantity(element) {
        element.quantityDemonter--;
        this.$store.commit('setTarif', this.$store.state.tarif - element.tarif*0.25);
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

#panel-element-demontage {
    background: #FFF;
    color: #E85029;
    border: 1px solid #E85029;
    box-shadow: 0 2px 2px 0 #E85029;
    border-radius: 10px;
    width: 180px;
    max-width: 220px;
    height: 180px;
    max-height: 180px;
    margin-left: 5px;
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;

    input[type=number] {
      position: absolute;
      right: 70px;
      bottom: 8px;
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


    .btn-plus {
      position: absolute;
      background-color: #4CAF50;
      font-size: 10px;
      color: #FFF;
      right: 45px;
      bottom: 12px;
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
      left: 45px;
      bottom: 12px;
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

    .disabled {
      pointer-events: none;
      opacity: 0.3;
    }

    #element-image {
      position: absolute;
      left: 43px;
      top: 58px;
      width: 50%;
      height: 45%;
      cursor: pointer;
      border: 1px solid black;
    }


}

</style>
