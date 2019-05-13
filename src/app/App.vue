<template>
    <div id="app">
      <LogoCartonPlein />
      <div id="app-address">
          <AppAddress />
      </div>
      <div id="app-type-demenagement"> <!--style="display:none"-->
          <AppTypeDemenagement />
      </div>
      <div id="app-duree-prestation">
          <AppDureePrestation />
      </div>
      <div id="app-taille-logement">
          <AppTailleLogement />
      </div>
      <div id="app-inventaire">
          <AppInventaire />
      </div>
      <div id="app-demontage">
          <AppDemontage />
      </div>
      <div id="app-date-demenagement">
          <AppDateDemenagement />
      </div>
      <div id="app-options">
          <AppOptions />
      </div>
      <div id="app-recapitulatif">
          <AppRecapitulatif />
      </div>
    </div>

</template>

<script>
import { store } from './store.js';
import LogoCartonPlein from './components/LogoCartonPlein.vue';
import AppAddress from './components/AppAddress.vue';
import AppTypeDemenagement from './components/AppTypeDemenagement.vue';
import AppDureePrestation from './components/AppDureePrestation.vue';
import AppTailleLogement from './components/AppTailleLogement.vue';
import AppInventaire from './components/AppInventaire.vue';
import AppDemontage from './components/AppDemontage.vue';
import AppDateDemenagement from './components/AppDateDemenagement.vue';
import AppOptions from './components/AppOptions.vue';
import AppRecapitulatif from './components/AppRecapitulatif.vue';

export default {
  name: 'App',
  components: {
    LogoCartonPlein,
    AppAddress,
    AppTypeDemenagement,
    AppDureePrestation,
    AppTailleLogement,
    AppInventaire,
    AppDemontage,
    AppDateDemenagement,
    AppOptions,
    AppRecapitulatif
  },
  methods: {

    /* depuis Page Address */
    openPageTypeDemenagement() {
      store.openNextPage("app-address", "app-type-demenagement");
    },

    /* depuis Page Type Déménagement */
    openPageDureePrestation() {
      store.state.isForfait = true;
      store.state.isInventaire = false;
      store.openNextPage("app-type-demenagement", "app-duree-prestation");
    },
    openPageInventaire() {
      store.state.isInventaire = true;
      store.state.isForfait = false;
      store.openNextPage("app-type-demenagement", "app-inventaire");
    },
    returnPageAddress() {
      store.returnPreviousPage("app-type-demenagement", "app-address");
    },

    /* depuis Page Durée Prestation */
    openPageTailleLogement() {
      store.openNextPage("app-duree-prestation", "app-taille-logement");
    },

    /* depuis Page Inventaire */
    openPageDemontage() {
      store.openNextPage("app-inventaire", "app-demontage");
    },

    /* depuis Page Duree Prestation ou Page Inventaire */
    returnPageTypeDemenagement() {
      if(store.state.isForfait) {
        store.returnPreviousPage("app-duree-prestation", "app-type-demenagement");
      }
      if(store.state.isInventaire) {
        store.returnPreviousPage("app-inventaire", "app-type-demenagement");
      }
      store.state.isForfait = false;
      store.state.isInventaire = false;
    },

    /* depuis Page Taille Logement ou Page Demontage */
    openPageDateDemenagement() {
      if(store.state.isForfait) {
        store.openNextPage("app-taille-logement", "app-date-demenagement");
      }
      if(store.state.isInventaire) {
        store.openNextPage("app-demontage", "app-date-demenagement");
      }
    },

    returnPageDureePrestation() {
      store.returnPreviousPage("app-taille-logement", "app-duree-prestation");
    },

    returnPageInventaire() {
      store.returnPreviousPage("app-demontage", "app-inventaire");
    },

    openPageOptions () {
      store.openNextPage("app-date-demenagement", "app-options");
    },

    returnPageBeforeDateDemenagement () {
      if(store.state.isForfait) {
        store.returnPreviousPage("app-date-demenagement", "app-taille-logement");
      }
      if(store.state.isInventaire) {
        store.returnPreviousPage("app-date-demenagement", "app-demontage");
      }
    },

    returnPageDateDemenagement () {
      store.returnPreviousPage("app-options", "app-date-demenagement");
    },

    openPageRecapitulatif () {
      store.openNextPage("app-options", "app-recapitulatif");
    },

    returnPageOptions () {
      store.returnPreviousPage("app-recapitulatif", "app-options");
    }

  }
}

</script>

<style lang="scss">
body {
  height: 100%;
  overflow-x: hidden;

}

html {
  background: url(../../public/images/Demenagement.jpg) no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}

</style>

<style lang="scss" scoped>

#app {

  display: grid;
  flex-direction: column;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  position: relative;
  overflow-y: scroll;
  scroll-behavior: smooth;

}


</style>
