<template>
    <div id="app-inventaire">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px ">Créez votre inventaire : </h1>
        <PanelInventaire class="panel-inventaire"></PanelInventaire>
        <div class="panel-info-commande">
          <PanelInfoCommande :currentTarif="tarif" />
        </div>
        <ButtonSuivant id="button-suivant" :onClick="openPageDemontage" v-bind:class="{ 'disableButton': inventaire.length == 0 }"></ButtonSuivant>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageTypeDemenagement"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelInventaire from './PanelInventaire.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppInventaire',
  data () {
    return {
      isPageInventaire: true,
      inventaire: this.$store.getters.getInventaireUser
    }
  },
  components: {
    PanelInventaire,
    PanelInfoCommande,
    ButtonSuivant,
    ButtonPrecedent
  },
  methods: {
    openPageDemontage() {
      this.$parent.$options.methods.openPageDemontage();
    },
    returnPageTypeDemenagement() {
      this.$parent.$options.methods.returnPageTypeDemenagement();
    }
  },
  computed: {
    tarif() {
      return this.$store.state.tarif;
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

#app-inventaire {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;

  #app-inventaire .panel-info-commande {
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

  .disableButton {
    opacity: 0.5;
    pointer-events: none;
  }
}


</style>
