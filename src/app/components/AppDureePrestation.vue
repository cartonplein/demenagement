<template>
    <div id="app-duree-prestation">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px ">Choisissez la durée de la prestation : </h1>
        <div id="panel-duree-prestation" class="container">
            <div class="columns is-mobile">
              <div class="columns">
                <div class="column is-half">
                    <PanelDureeDemiJournee id="panel-duree-demi-journee" :onClick="selectDureeDemiJournee"></PanelDureeDemiJournee>
                </div>
                <div class="column is-half">
                    <PanelDureeUneJournee id="panel-duree-une-journee" :onClick="selectDureeUneJournee"></PanelDureeUneJournee>
                </div>
              </div>
            </div>
        </div>
        <div class="panel-info-commande">
          <PanelInfoCommande />
        </div>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageTypeDemenagement"></ButtonPrecedent>
    </div>
</template>

<script>
import { store } from '../store.js';
import PanelDureeDemiJournee from './PanelDureeDemiJournee.vue';
import PanelDureeUneJournee from './PanelDureeUneJournee.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppDureePrestation',
  data() {
    return {
      isPageDureePrestation: true,
      dureeDemiJournee: 'Démi-journée',
      dureeUneJournee: 'Une journée',
      tarif: store.getCurrentTarif(),
    }
  },
  components: {
    PanelDureeDemiJournee,
    PanelDureeUneJournee,
    PanelInfoCommande,
    ButtonPrecedent
  },
  methods: {
    selectDureeDemiJournee() {
      store.selectDureePrestation(this.dureeDemiJournee);
      this.$parent.$options.methods.openPageTailleLogement();
    },
    selectDureeUneJournee() {
      store.selectDureePrestation(this.dureeUneJournee);
      this.$parent.$options.methods.openPageTailleLogement();
    },
    returnPageTypeDemenagement() {
      this.$parent.$options.methods.returnPageTypeDemenagement();
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

#app-duree-prestation {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;

  #app-duree-prestation .panel-info-commande {
    position: absolute;
    right: 0;
    bottom: 90px;
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
