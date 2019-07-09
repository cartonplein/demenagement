<template>
    <div id="panel-element-demontage">
      <div class="element-name has-text-centered" style="margin-top: 5px">{{ element.name }}</div>
      <img id="element-image" :src="viewElementImage(element)"/>
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
      },
      decreaseElementQuantity(element) {
        element.quantityDemonter--;
      },
      viewElementImage(element) {
        return element.image;
      },
    }
}

</script>

<style lang="scss" scoped>

#panel-element-demontage {
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

    .disabled {
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
