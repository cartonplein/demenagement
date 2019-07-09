<template>
    <div id="app-date-demenagement">
        <h1>Choisissez la date de votre déménagement : </h1>
        <div id="panel-date-demenagement" class="container">
          <PanelDateDemenagement></PanelDateDemenagement>
        </div>
        <div id="panel-creneaux-horaires" v-show="$store.getters.getDateDemenagementUser.length !== 0">
          <b>Choisir votre créneau horaire :</b>
          <div class="choice-creneau has-text-centered" v-bind:class="{ 'creneau-selected': isCreneauMatin }" @click="setCreneau(1)">Entre 10h et 12h</div>
          <div class="choice-creneau has-text-centered" v-bind:class="{ 'creneau-selected': isCreneauSoir }" @click="setCreneau(2)">Entre 14h et 16h</div>
        </div>
        <PanelInfoCommande id="panel-info-commande" />
        <ButtonSuivant id="button-suivant" :onClick="openPageOptions" v-bind:class="{ 'disableButton': $store.getters.getCreneauDemenagementUser == '' }"></ButtonSuivant>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageBeforeDateDemenagement"></ButtonPrecedent>
    </div>
</template>

<script>

import PanelDateDemenagement from './PanelDateDemenagement.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppDateDemenagement',
  data () {
    return {
      isPageDateDemenagement: true,

      isCreneauMatin: false,
      isCreneauSoir: false
    }
  },
  components: {
    PanelDateDemenagement,
    PanelInfoCommande,
    ButtonSuivant,
    ButtonPrecedent
  },
  methods: {
    setCreneau(creneau) {
      if(creneau == 1) {
        this.isCreneauMatin = true;
        this.isCreneauSoir = false;
        this.$store.commit('setCreneauDemenagement', 'Entre 10h - 12h');
      }
      if(creneau == 2) {
        this.isCreneauMatin = false;
        this.isCreneauSoir = true;
        this.$store.commit('setCreneauDemenagement', 'Entre 14h - 16h');
      }
    },
    openPageOptions() {
      this.$parent.$options.methods.openPageOptions();
    },
    returnPageBeforeDateDemenagement() {
      this.$parent.$options.methods.returnPageBeforeDateDemenagement();
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

#app-date-demenagement {
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

  #panel-creneaux-horaires {
    position: absolute;
    top: 138px;
    right: 240px;
    width: 180px;
    height: 200px;
    border: 1px solid #E85029;
    background: #FFF;
    box-shadow: 0 2px 2px 0 #E85029;
    padding: 10px;
    color: #E85029;

    .choice-creneau {
      border: 1px solid #E85029;
      background: #FFF;
      padding: 5px;
      margin: 10px;
      cursor: pointer;
    }

    .creneau-selected {
      background: #E85029;
      color: #FFF;
    }
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

  .disableButton {
    opacity: 0.5;
    pointer-events: none;
  }

}


</style>
