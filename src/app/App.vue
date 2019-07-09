<template>
    <div id="app">
      <div id="upper-bar-tabs">
        <LogoCartonPlein style="float:left; margin-left: 20px" />
        <div style="float: right; margin-right: 20px">
          <a href="http://cartonplein.org/">ACCUEIL</a>
          <a href="http://cartonplein.org/association">L'ASSOCIATION</a>
          <a href="https://boutique.cartonplein.org/">CARTONS</a>
          <a href="http://cartonplein.org/actions/demenagement">DÉMÉNAGEMENT</a>
          <a href="http://cartonplein.org/collecte">COLLECTE</a>
        </div>
      </div>
      <AppAddress id="app-address" class="app-page" />
      <AppTypeDemenagement id="app-type-demenagement" class="app-page" style="display: none" />
      <AppInventaire id="app-inventaire" class="app-page" style="display: none" />
      <AppDemontage id="app-demontage" class="app-page" style="display: none" />
      <!-- style="display: none"
      <AppTailleLogement id="app-taille-logement" class="app-page" />
      <AppDureePrestation id="app-duree-prestation" class="app-page" />
      -->
      <AppDateDemenagement id="app-date-demenagement" class="app-page" style="display: none" />
      <AppOptions id="app-options" class="app-page" style="display: none" />
      <AppRecapitulatif id="app-recapitulatif" class="app-page" style="display: none" />
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
    AppRecapitulatif
  },
  methods: {
    /*
      Balayer depuis une page vers une autre page
    */
    openPage (currentPageId, nextPageId) {
      var nextPage = document.getElementById(nextPageId);
      var currentPage = document.getElementById(currentPageId);
      if (nextPage.style.display === "none") {
        nextPage.style.display = "block";
      }
      nextPage.scrollIntoView({ block: 'end',  behavior: 'smooth' });
      /*
      nextPage.style.opacity = "1";
      nextPage.style.pointerEvents = "initial";*/
      setTimeout(function() { currentPage.style.display = "none"; }, 1000)
    },

    /*
      Balayer vers la page de choix du type de déménagement
    */
    openPageTypeDemenagement() {
      this.openPage("app-address", "app-type-demenagement");
    },

    /*
      Balayer vers la page de création de l'inventaire
      (cas Transport Simple ou Déménagement sur Inventaire)
    */
    openPageInventaire() {
      this.openPage("app-type-demenagement", "app-inventaire");
    },

    /*
      Balayer vers la page de choix des meubles à démonter
      (cas Transport Simple ou Déménagement sur Inventaire)
    */
    openPageDemontage() {
      let inventaireUser = []
      for(var i=0; i<store.getters.getInventaire.length; i++) {
        if(store.getters.getInventaire[i].quantity > 0) {
          store.commit('addElementInInventaireUser', store.getters.getInventaire[i]);
        }
      }
      this.openPage("app-inventaire", "app-demontage");
    },

    /*
      Balayer vers la page de choix de la taille du logement
      (cas Aide au Déménagement)
    */
    openPageTailleLogement() {
      this.openPage("app-type-demenagement", "app-taille-logement");
    },

    /*
      Balayer vers la page de choix de la durée de prestation
      (cas Aide au Déménagement)
    */
    openPageDureePrestation() {
      this.openPage("app-taille-logement", "app-duree-prestation");
    },

    /*
      Balayer vers la page de choix de date de déménagement
    */
    openPageDateDemenagement() {
      if(store.state.isAideDem) {
        this.openPage("app-duree-prestation", "app-date-demenagement");
      }
      if(store.state.isInventaire) {
        store.commit('setTarif', store.state.tarifDemInventaire);
        this.openPage("app-demontage", "app-date-demenagement");
      }
      if(store.state.isTransport) {
        store.commit('setTarif', store.state.tarifTransportSimple);
        this.openPage("app-demontage", "app-date-demenagement");
      }
    },

    /*
      Balayer vers la page de choix des options
    */
    openPageOptions () {
      this.openPage("app-date-demenagement", "app-options");
    },

    /*
      Balayer vers la page d'affichage du récapitulatif de déménagement
    */
    openPageRecapitulatif () {
      store.commit('setOrderNumber', Math.floor(Math.random() * Math.floor(999999999)));
      this.openPage("app-options", "app-recapitulatif");
    },

    /*
      Revenir vers la page de saisie des adresses de départ et d'arrivée
    */
    returnPageAddress() {
      this.openPage("app-type-demenagement", "app-address");
    },

    /*
      Revenir vers la page de choix du type de déménagement
    */
    returnPageTypeDemenagement() {
      if(store.state.isAideDem) {
        this.openPage("app-taille-logement", "app-type-demenagement");
      }
      if(store.state.isInventaire) {
        this.openPage("app-inventaire", "app-type-demenagement");
      }
      if(store.state.isTransport) {
        this.openPage("app-inventaire", "app-type-demenagement");
      }
      store.dispatch('resetChoicesUser');
      store.commit('setTypeAideDem', false);
      store.commit('setTypeInventaire', false);
      store.commit('setTypeTransport', false);
    },

    /*
      Revenir vers la page de création de l'inventaire
      (cas Transport Simple ou Déménagement sur Inventaire)
    */
    returnPageInventaire() {
      store.commit('emptyInventaireUser');
      this.openPage("app-demontage", "app-inventaire");
    },

    /*
      Revenir vers la page de choix de la taille du logement
      (cas Aide au Déménagement)
    */
    returnPageTailleLogement() {
      this.openPage("app-duree-prestation", "app-taille-logement");
    },

    /*
      Revenir vers la page avant la page de choix de date de déménagement
      (soit la page de démontage ou la page de choix de la durée de prestation)
    */
    returnPageBeforeDateDemenagement () {
      store.commit('unselectAllDays');
      store.commit('setDateDemenagement', '');
      store.commit('setCreneauDemenagement', '');
      store.commit('emptyOptions');
      if(store.state.isAideDem) {
        if(store.getters.getDureePrestationUser == 'Une journée') {
          store.commit('setTarif', store.state.tarifPrec/2);
        }
        else {
          store.commit('setTarif', store.state.tarifPrec);
        }
        this.openPage("app-date-demenagement", "app-duree-prestation");
      }
      if(store.state.isInventaire) {
        store.commit('setTarif', 0);
        this.openPage("app-date-demenagement", "app-demontage");
      }
      if(store.state.isTransport) {
        store.commit('setTarif', 0);
        this.openPage("app-date-demenagement", "app-demontage");
      }
    },

    /*
      Revenir vers la page de choix de date de déménagement
    */
    returnPageDateDemenagement () {
      this.openPage("app-options", "app-date-demenagement");
    },

    /*
      Revenir vers la page de choix des options
    */
    returnPageOptions () {
      this.openPage("app-recapitulatif", "app-options");
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

  .app-page {
    height: 690px;
    grid-row: auto;
    display: flex;
    flex-direction: column;
    //border: 1px solid red;
    border-top: 1px solid lightgray;
    position: relative;
  }

  a {
    color: #E85029;
    margin-right: 30px;
    font-size: 13px;
    &:hover {
      color: black;
    }
  }

  #upper-bar-tabs {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 999;
    background: #FFF;
    height: 9%;
    padding: 20px;
    border-bottom: 0.5px solid #E85029;
  }

}


</style>
