<template>
    <div id="panel-info-commande">
      <div class="panel-info-commande-tarif">
          <p style="color: black; font-size: 15px">
              <b>Votre tarif :</b>
          </p>
          <p style="color: #E85029; font-size: 30px">
              {{ currentTarif }} <span style="color: black">€</span>
          </p>
      </div>

      <div class="panel-info-commande-choix" style="margin-top: 10px">
          <p style="color: black; font-size: 15px">
              <b>Vos choix :</b>
          </p>
          <ul style="color: #E85029; font-size: 11px">
            <li><b>Adresse de départ :</b><br/>{{ choicePickupAddress }}</li>
            <li>Surface - {{ choicePickupSurface }}</li>
            <li>Étage - <br/>{{ choicePickupEtage }}</li>
            <li>Ascenseur - {{ choicePickupAscenseur }}</li>
            <li>Cave - {{ choicePickupCave }}</li>
            <li><br/><b>Adresse de destination :</b><br/> {{ choiceDestinationAddress }}</li>
            <li>Surface - {{ choiceDestinationSurface }}</li>
            <li>Étage - <br/>{{ choiceDestinationEtage }}</li>
            <li>Ascenseur - {{ choiceDestinationAscenseur }}</li>
            <li>Cave - {{ choiceDestinationCave }}</li>
            <li><br/><b>Distance : </b>{{ distancePickupDestination }}</li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageDureePrestation || isPageTailleLogement || isPageInventaire || isPageDemontage || isPageDateDemenagement || isPageOptions }">
                                <b><br/>Type de déménagement :</b><br/> {{ displayChoiceUserByIndex(typeDemenagement) }}
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageTailleLogement || (isPageDateDemenagement || isPageOptions) && isForfait }">
                                <b><br/>Durée de prestation :</b><br/> {{ displayChoiceUserByIndex(dureePrestation) }}
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': (isPageDateDemenagement || isPageOptions) && isForfait }">
                                <b><br/>Taille de logement :</b><br/> {{ displayChoiceUserByIndex(tailleLogement) }}
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageDemontage || (isPageDateDemenagement || isPageOptions) && isInventaire }">
                                <b><br/>Inventaire :</b><br/>
                                <div class="tooltipInventaire">
                                  <i><ins>Placez le curseur ici pour voir</ins></i>
                                  <span class="tooltipListeInventaire">
                                    <table style="width:100%">
                                      <tr>
                                        <th>Meuble</th>
                                        <th>Qté</th>
                                      </tr>
                                      <tr v-for="element in inventaire">
                                        <td>{{ element.name }}</td>
                                        <td>{{ element.quantity }}</td>
                                      </tr>
                                    </table>
                                  </span>
                                </div>
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': (isPageDateDemenagement || isPageOptions) && isInventaire }">
                                <b><br/>Meubles à démonter :</b><br/>
                                <div class="tooltipDemontage">
                                  <i><ins>Placez le curseur ici pour voir</ins></i>
                                  <span class="tooltipListeDemontage">
                                    <table style="width:100%">
                                      <tr>
                                        <th>Meuble</th>
                                        <th>Qté</th>
                                      </tr>
                                      <tr v-for="element in inventaire" v-if="element.quantityDemonter > 0">
                                        <td>{{ element.name }}</td>
                                        <td>{{ element.quantityDemonter }}</td>
                                      </tr>
                                    </table>
                                  </span>
                                </div>
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageOptions }">
                                <b><br/>Date de déménagement :</b><br/> {{ displayChoiceUserByIndex(dateDemenagement) }}
            </li>
          </ul>

      </div>

    </div>
</template>

<script>
import { store } from '../store.js';

export default {
    name: 'PanelInfoCommande',
    data () {
      return {
        isPageDureePrestation: this.$parent.isPageDureePrestation,
        isPageTailleLogement: this.$parent.isPageTailleLogement,
        isPageInventaire: this.$parent.isPageInventaire,
        isPageDemontage: this.$parent.isPageDemontage,
        isPageDateDemenagement: this.$parent.isPageDateDemenagement,
        isPageOptions: this.$parent.isPageOptions,
        typeDemenagement: 'typeDemenagement',
        dureePrestation: 'dureePrestation',
        tailleLogement: 'tailleLogement',
        dateDemenagement: 'dateDemenagement',
        inventaire: store.getInventaireUser()
      }
    },
    computed: {
        isForfait () {
          return store.state.isForfait;
        },
        isInventaire () {
          return store.state.isInventaire;
        }
    },
    props: {
      currentTarif: Number,
      choicePickupAddress: String,
      choicePickupSurface: String,
      choicePickupEtage: String,
      choicePickupAscenseur: String,
      choicePickupCave: String,
      choiceDestinationAddress: String,
      choiceDestinationSurface: String,
      choiceDestinationEtage: String,
      choiceDestinationAscenseur: String,
      choiceDestinationCave: String,
      distancePickupDestination: String,
    },
    methods: {
      displayChoiceUserByIndex(index) {
        return store.displayChoiceUserByIndex(index);
      }
    }
}

</script>

<style lang="scss" scoped>

#panel-info-commande {
    background: #FFF;
    /*border: 1px solid black;
    border-radius: 10px;*/
    padding: 15px;
    width: 200px;
    max-width: 200px;
    height: 550px;
    max-height: 550px;
    display: inline-block;
    align-self: stretch;

    .hideElement {
      display: none;
    }

    .displayElement {
      display: block;
    }

    .tooltipInventaire {
      position: relative;
      .tooltipListeInventaire {
        opacity: 0.9;
        visibility: hidden;
        width: 150px;
        background-color: #E85029;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 5px;
        position: absolute;
        z-index: 1;
        top: -10px;
        right: 105%;
      }
      &:hover {
        cursor: context-menu;
        .tooltipListeInventaire {
          visibility: visible;
        }
      }
    }

    .tooltipDemontage {
      position: relative;
      .tooltipListeDemontage {
        opacity: 0.9;
        visibility: hidden;
        width: 150px;
        background-color: #E85029;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 5px;
        position: absolute;
        z-index: 1;
        top: -10px;
        right: 105%;
      }
      &:hover {
        cursor: context-menu;
        .tooltipListeDemontage {
          visibility: visible;
        }
      }
    }

    table, th, td {
      color: white;
      border: 1px solid black;
    }

    th, td {
      padding-left: 5px;
    }

}

</style>
