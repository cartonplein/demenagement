<template>
    <div id="app-type-demenagement">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px ">Choisissez votre type de déménagement :</h1>
        <div id="panel-type-demenagement" class="container">
          <div class="columns is-mobile">
            <div class="columns is-multiline">
              <div class="column is-full">
                  <PanelDemenagementForfait id="panel-demenagement-forfait" ref="panelDemenagementForfait" :onClick="selectTypeDemenagementForfait"></PanelDemenagementForfait>
              </div>
              <div class="column is-full">
                  <PanelDemenagementInventaire id="panel-demenagement-inventaire" ref="panelDemenagementInventaire" :onClick="selectTypeDemenagementInventaire"></PanelDemenagementInventaire>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-info-commande">
          <PanelInfoCommande />
        </div>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageAddress"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelDemenagementForfait from './PanelDemenagementForfait.vue';
import PanelDemenagementInventaire from './PanelDemenagementInventaire.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppTypeDemenagement',
  data() {
    return {
      isPageTypeDemenagement: true,
      typeForfait: 'Déménagement au forfait',
      typeInventaire: 'Déménagement sur inventaire',
    }
  },
  components: {
    PanelDemenagementForfait,
    PanelDemenagementInventaire,
    PanelInfoCommande,
    ButtonPrecedent
  },
  methods: {
    selectTypeDemenagementForfait() {
      this.$store.commit('setTypeDemenagement', this.typeForfait);
      this.$parent.$options.methods.openPageTailleLogement();
    },
    selectTypeDemenagementInventaire() {
      this.$store.commit('setTypeDemenagement', this.typeInventaire);
      this.$parent.$options.methods.openPageInventaire();
    },
    returnPageAddress() {
      this.$parent.$options.methods.returnPageAddress();
    },
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app-type-demenagement {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;

  #app-type-demenagement .panel-info-commande {
    position: absolute;
    right: 0;
    bottom: 100px;
  }

  #button-precedent {
    position: absolute;
    right: 0;
    bottom: 30px;
  }

  h1 {
    margin-top: 70px;
  }
}



</style>
