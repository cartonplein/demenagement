<template>
    <div id="app-options">
        <h1>Choisissez vos options : </h1>
        <div id="panel-options" class="container">
          <div class="columns" style="width: 1000px; max-width: 850px">
            <PanelOptions />
          </div>
        </div>
        <PanelInfoCommande id="panel-info-commande" />
        <ButtonSuivant id="button-suivant" :onClick="openPageRecapitulatif"></ButtonSuivant>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageDateDemenagement"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelOptions from './PanelOptions.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppDateDemenagement',
  data () {
    return {
      isPageOptions: true,

    }
  },
  methods: {
  },
  components: {
    PanelOptions,
    PanelInfoCommande,
    ButtonSuivant,
    ButtonPrecedent
  },
  methods: {
    openPageRecapitulatif() {
      this.$parent.$options.methods.openPageRecapitulatif();
    },
    returnPageDateDemenagement() {
      this.$parent.$options.methods.returnPageDateDemenagement();
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

#app-options {
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
}


</style>
