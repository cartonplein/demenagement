<template>
    <div id="app-inventaire">
      <h1>Créez votre inventaire : </h1>
      <div id="panel-inv" class="container">
        <PanelInventaire></PanelInventaire>
      </div>
      <PanelInfoCommande id="panel-info-commande" />
      <ButtonSuivant id="button-suivant" :onClick="openPageDemontage" v-bind:class="{ 'disableButton': $store.getters.getNumberItems == 0 }"></ButtonSuivant>
      <ButtonPrecedent id="button-precedent" :onClick="returnPageTypeDemenagement"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelInventaire from './PanelInventaire.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';


export default {
  name: 'AppInventaire',
  data () {
    return {
      isPageInventaire: true,
      //inventaire: this.$store.getters.getInventaire
    }
  },
  components: {
    PanelInventaire,
    PanelInfoCommande,
    ButtonSuivant,
    ButtonPrecedent
  },
  methods: {
    openPageDemontage() {
      this.$parent.$options.methods.openPageDemontage();
    },
    returnPageTypeDemenagement() {
      this.$parent.$options.methods.returnPageTypeDemenagement();
    },
    makeAdmin() {
      console.log('hello');
      //this.returnPageTypeDemenagement();
    },
    doNothing() {
      console.log('nothing');
    },

    test() {

    }
  }
}

</script>

<style lang="scss">
html, body {
  height: 100%;
}
</style>

<style lang="scss" scoped>

#app-inventaire {
  /*
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;*/

  #panel-info-commande {
    position: absolute;
    right: 0;
    bottom: 100px;
  }

  #button-suivant {
    position: absolute;
    right: 0;
    bottom: 30px;
  }

  #button-precedent {
    position: absolute;
    right: 130px;
    bottom: 30px;
  }

  h1 {
    font-size: 200%;
    font-weight: bold;
    padding-bottom: 20px;
    margin-top: 70px;
    color: #E85029;
  }

  mark {
    background-color: #E85029;
    color: #FFF;
  }

  .disableButton {
    opacity: 0.5;
    pointer-events: none;
  }
}


</style>
