<template>
    <div id="app-duree-prestation">
        <h1>Choisissez la durée de la prestation : </h1>
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
        <ButtonPrecedent id="button-precedent" :onClick="returnPageTailleLogement"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelDureeDemiJournee from './PanelDureeDemiJournee.vue';
import PanelDureeUneJournee from './PanelDureeUneJournee.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppDureePrestation',
  data() {
    return {
      isPageDureePrestation: true,
      dureeDemiJournee: 'Demi-journée',
      dureeUneJournee: 'Une journée',
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
      this.$store.commit('setDureePrestation', this.dureeDemiJournee);
      this.$store.commit('setTarif', this.$store.state.tarif * 1);
      this.$store.commit('setTarifPrec', this.$store.state.tarif);
      this.$parent.$options.methods.openPageDateDemenagement();
    },
    selectDureeUneJournee() {
      this.$store.commit('setDureePrestation', this.dureeUneJournee);
      this.$store.commit('setTarif', this.$store.state.tarif * 2);
      this.$store.commit('setTarifPrec', this.$store.state.tarif);
      this.$parent.$options.methods.openPageDateDemenagement();
    },
    returnPageTailleLogement() {
      this.$store.commit('setTarif', this.$store.state.firstTarif);
      this.$parent.$options.methods.returnPageTailleLogement();
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
