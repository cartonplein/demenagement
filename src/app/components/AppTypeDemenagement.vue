<template>
    <div id="app-type-demenagement">
        <h1>Choisissez votre type de déménagement :</h1>
        <div id="panel-type-demenagement" class="container">
          <div class="columns is-mobile">
            <div class="columns is-multiline">
              <div class="column is-full">
                  <PanelDemenagementInventaire id="panel-demenagement-inventaire" ref="panelDemenagementInventaire" :onClick="selectTypeInventaire"></PanelDemenagementInventaire>
              </div>
              <div class="column is-full">
                  <PanelDemenagementTransport id="panel-demenagement-transport" ref="panelTransport" :onClick="selectTypeTransport"></PanelDemenagementTransport>
              </div>
              <div class="column is-full">
                  <PanelDemenagementAideDem id="panel-demenagement-aide-dem" ref="panelDemenagementAideDem" :onClick="selectTypeAideDem"></PanelDemenagementAideDem>
              </div>
            </div>
          </div>
        </div>
        <PanelInfoCommande id="panel-info-commande" />
        <ButtonPrecedent id="button-precedent" :onClick="returnPageAddress"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelDemenagementAideDem from './PanelDemenagementAideDem.vue';
import PanelDemenagementInventaire from './PanelDemenagementInventaire.vue';
import PanelDemenagementTransport from './PanelDemenagementTransport.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppTypeDemenagement',
  data() {
    return {
      isPageTypeDemenagement: true,
      typeAideDem: 'Aide au déménagement',
      typeInventaire: 'Déménagement sur inventaire',
      typeTransport: 'Transport simple',
    }
  },
  components: {
    PanelDemenagementAideDem,
    PanelDemenagementInventaire,
    PanelDemenagementTransport,
    PanelInfoCommande,
    ButtonPrecedent
  },
  methods: {
    selectTypeAideDem() {
      this.$store.commit('setTypeDemenagement', this.typeAideDem);
      this.$store.commit('setTypeAideDem', true);
      this.$store.commit('setTypeInventaire', false);
      this.$store.commit('setTypeTransport', false);
      this.$parent.$options.methods.openPageTailleLogement();
    },
    selectTypeInventaire() {
      this.$store.commit('setTypeDemenagement', this.typeInventaire);
      this.$store.commit('setTypeAideDem', false);
      this.$store.commit('setTypeInventaire', true);
      this.$store.commit('setTypeTransport', false);
      this.$parent.$options.methods.openPageInventaire();
    },
    selectTypeTransport() {
      this.$store.commit('setTypeDemenagement', this.typeTransport);
      this.$store.commit('setTypeAideDem', false);
      this.$store.commit('setTypeInventaire', false);
      this.$store.commit('setTypeTransport', true);
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

  #button-precedent {
    position: absolute;
    right: 0;
    bottom: 30px;
  }

  mark {
    background-color: #E85029;
    color: #FFF;
  }

  h1 {
    font-size: 200%;
    font-weight: bold;
    padding-bottom: 20px;
    margin-top: 70px;
    color: #E85029;
  }
}



</style>
