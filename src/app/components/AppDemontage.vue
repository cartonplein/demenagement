<template>
    <div id="app-demontage">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px ">Vos meubles, on les démonte ou pas ?  </h1>
        <div class="panel-demontage">
          <div class="columns is-multiline">
            <PanelElementDemontage id="panel-element-demontage" v-for="element in sharedState.choicesUser.inventaire"
              :key="element.id"
              :element="element" />
          </div>
        </div>
        <div class="panel-info-commande">
          <PanelInfoCommande />
        </div>
        <ButtonSuivant id="button-suivant" :onClick="openPageDateDemenagement"></ButtonSuivant>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageInventaire"></ButtonPrecedent>
    </div>
</template>

<script>
import { store } from '../store.js';

import PanelElementDemontage from './PanelElementDemontage.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppDemontage',
  data () {
    return {
      isPageDemontage: true,
      sharedState: store.state
    }
  },
  components: {
    PanelElementDemontage,
    PanelInfoCommande,
    ButtonSuivant,
    ButtonPrecedent
  },
  methods: {
    openPageDateDemenagement() {
      this.$parent.$options.methods.openPageDateDemenagement();
    },
    returnPageInventaire() {
      this.$parent.$options.methods.returnPageInventaire();
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

#app-demontage {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;

  #app-demontage .panel-demontage {
    background: #E85029;
    opacity: 0.95;
    position: absolute;
    border: 2px solid black;
    left: 0;
    bottom: 150px;
    width: 700px;
    max-width: 700px;
    height: 400px;
    max-height: 400px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    padding: 15px;
  }

  #app-demontage .panel-info-commande {
    position: absolute;
    right: 0;
    bottom: 90px;
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
    margin-top: 70px;
  }
}


</style>
