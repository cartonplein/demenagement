<template>
    <div id="app">
      <div id="app-address">
          <LogoCartonPlein />
          <AppAddress />
      </div>
      <div id="app-type-demenagement"> <!--style="display:none"-->
          <AppTypeDemenagement />
      </div>
      <div id="app-inventaire" >
          <AppInventaire />
      </div>
      <div id="app-demontage">
          <AppDemontage />
      </div>
      <div id="app-taille-logement">
          <AppTailleLogement />
      </div>
      <div id="app-duree-prestation">
          <AppDureePrestation />
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
import Payment from './components/Payment.vue';
import { store } from './store.js'

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
    AppRecapitulatif,
    Payment
  },
  methods: {

    openNextPage (currentPageId, nextPageId) {
      var nextPage = document.getElementById(nextPageId);
      var currentPage = document.getElementById(currentPageId);
      if (nextPage.style.display === "none") {
        nextPage.style.display = "block";
      }
      nextPage.scrollIntoView({ block: 'end',  behavior: 'smooth' });
      nextPage.style.opacity = "1";
      nextPage.style.pointerEvents = "initial";
      setTimeout(function() { currentPage.style.display = "none"; }, 500)
    },

    returnPreviousPage (currentPageId, previousPageId) {
      var previousPage = document.getElementById(previousPageId);
      var currentPage = document.getElementById(currentPageId);
      if (previousPage.style.display === "none") {
        previousPage.style.display = "block";
      }
      previousPage.scrollIntoView({ block: 'end',  behavior: 'smooth' });
      previousPage.style.opacity = "1";
      previousPage.style.pointerEvents = "initial";
      setTimeout(function() { currentPage.style.display = "none"; }, 500)
    },

    /* depuis Page Address */
    openPageTypeDemenagement() {
      this.openNextPage("app-address", "app-type-demenagement");
    },

    /* depuis Page Type Déménagement */
    openPageTailleLogement() {
      this.openNextPage("app-type-demenagement", "app-taille-logement");
    },
    openPageInventaire() {
      this.openNextPage("app-type-demenagement", "app-inventaire");
    },
    returnPageAddress() {
      this.returnPreviousPage("app-type-demenagement", "app-address");
    },

    /* depuis Page Taille Logement */
    openPageDureePrestation() {
      this.openNextPage("app-taille-logement", "app-duree-prestation");
    },


    /* depuis Page Inventaire */
    openPageDemontage() {
      this.openNextPage("app-inventaire", "app-demontage");
    },

    /* depuis Page Duree Prestation ou Page Inventaire */
    returnPageTypeDemenagement() {
      if(store.state.isAideDem) {
        this.returnPreviousPage("app-taille-logement", "app-type-demenagement");
      }
      if(store.state.isInventaire) {
        this.returnPreviousPage("app-inventaire", "app-type-demenagement");
      }
      if(store.state.isTransport) {
        this.returnPreviousPage("app-inventaire", "app-type-demenagement");
      }
      store.commit('setTypeAideDem', false);
      store.commit('setTypeInventaire', false);
      store.commit('setTypeTransport', false);
    },

    /* depuis Page Taille Logement ou Page Demontage */
    openPageDateDemenagement() {
      if(store.state.isAideDem) {
        this.openNextPage("app-duree-prestation", "app-date-demenagement");
      }
      if(store.state.isInventaire) {
        this.openNextPage("app-demontage", "app-date-demenagement");
      }
      if(store.state.isTransport) {
        this.openNextPage("app-demontage", "app-date-demenagement");
      }
    },

    returnPageTailleLogement() {
      this.returnPreviousPage("app-duree-prestation", "app-taille-logement");
    },

    returnPageInventaire() {
      this.returnPreviousPage("app-demontage", "app-inventaire");
    },

    openPageOptions () {
      this.openNextPage("app-date-demenagement", "app-options");
    },

    returnPageBeforeDateDemenagement () {
      if(store.state.isAideDem) {
        if(store.getters.getDureePrestationUser == 'Une journée') {
          store.commit('setTarif', store.state.tarifPrec/2);
        }
        else {
          store.commit('setTarif', store.state.tarifPrec);
        }
        this.returnPreviousPage("app-date-demenagement", "app-duree-prestation");
      }
      if(store.state.isInventaire) {
        store.commit('setTarif', store.state.tarifPrec);
        this.returnPreviousPage("app-date-demenagement", "app-demontage");
      }
    },

    returnPageDateDemenagement () {
      this.returnPreviousPage("app-options", "app-date-demenagement");
    },

    openPageRecapitulatif () {
      this.openNextPage("app-options", "app-recapitulatif");
    },

    returnPageOptions () {
      this.returnPreviousPage("app-recapitulatif", "app-options");
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
