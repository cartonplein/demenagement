<template>
    <div id="app-demontage">
        <h1>Vos meubles, on les démonte ou pas ? </h1>
        <div id="panel-dem" class="container">
          <div id="panel-demontage">
            <div class="columns is-multiline">
              <PanelElementDemontage id="panel-element-demontage" v-for="element in this.$store.getters.getInventaireUser"
                v-show="element.canDisassemble && element.quantity > 0"
                :key="element.id"
                :element="element" />
            </div>
          </div>
        </div>
        <PanelInfoCommande id="panel-info-commande" />
        <ButtonSuivant id="button-suivant" :onClick="openPageDateDemenagement"></ButtonSuivant>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageInventaire"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelElementDemontage from './PanelElementDemontage.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppDemontage',
  data () {
    return {
      isPageDemontage: true
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
  /*
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;*/

  #panel-dem {

    #panel-demontage {
      opacity: 0.95;
      background: #FFF;
      box-shadow: 0 2px 2px 0 #E85029;
      margin-top: 10px;
      padding: 15px;
      border: 2px solid #E85029;
      width: 760px;
      max-width: 760px;
      height: 450px;
      max-height: 450px;
      width: 100%;
      overflow-y: scroll;
      scroll-behavior: smooth;
    }
  }

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
}


</style>
