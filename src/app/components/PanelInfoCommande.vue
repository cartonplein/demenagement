<template>
    <div id="panel-info-commande">
      <div class="panel-info-commande-tarif">
          <p style="color: #FFF; font-size: 15px">
              <b>Votre tarif :</b>
          </p>
          <p style="color: #FFF; font-size: 30px">
              {{ tarif }} €
          </p>
      </div>

      <div class="panel-info-commande-choix" style="margin-top: 10px">
          <p style="color: #FFF; font-size: 15px">
              <b>Vos choix :</b>
          </p>
          <ul style="color: #FFF; font-size: 11px">
            <li>
              <b><br/>Adresse de départ :</b><br/>
                <div class="tooltipAdresse">
                  <i><ins>Placez le curseur ici pour voir</ins></i>
                  <span class="tooltipDetailsAdresse">
                    <table style="width:100%">
                      <tr>
                        <th>Adresse</th>
                        <td>{{ getPickupAddressUser().adresse }}</td>
                      </tr>
                      <tr>
                        <th>Surface</th>
                        <td>{{ getPickupAddressUser().surface }}</td>
                      </tr>
                      <tr>
                        <th>Étage</th>
                        <td>{{ getPickupAddressUser().etage }}</td>
                      </tr>
                      <tr>
                        <th>Ascenseur</th>
                        <td>{{ getPickupAddressUser().ascenseur }}</td>
                      </tr>
                      <tr>
                        <th>Cave</th>
                        <td>{{ getPickupAddressUser().cave }}</td>
                      </tr>
                    </table>
                  </span>
                </div>
            </li>
            <li>
              <b><br/>Adresse de destination :</b><br/>
                <div class="tooltipAdresse">
                  <i><ins>Placez le curseur ici pour voir</ins></i>
                  <span class="tooltipDetailsAdresse">
                    <table style="width:100%">
                      <tr>
                        <th>Adresse</th>
                        <td>{{ getDestinationAddressUser().adresse }}</td>
                      </tr>
                      <tr>
                        <th>Surface</th>
                        <td>{{ getDestinationAddressUser().surface }}</td>
                      </tr>
                      <tr>
                        <th>Étage</th>
                        <td>{{ getDestinationAddressUser().etage }}</td>
                      </tr>
                      <tr>
                        <th>Ascenseur</th>
                        <td>{{ getDestinationAddressUser().ascenseur }}</td>
                      </tr>
                      <tr>
                        <th>Cave</th>
                        <td>{{ getDestinationAddressUser().cave }}</td>
                      </tr>
                    </table>
                  </span>
                </div>
            </li>
            <li><br/><b>Distance : </b>{{ getDistanceAdressesUser().text }}</li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageDureePrestation || isPageTailleLogement || isPageInventaire || isPageDemontage || isPageDateDemenagement || isPageOptions }">
                                <b><br/>Type de déménagement :</b><br/> {{ getTypeDemenagementUser() }}
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageDureePrestation || (isPageDateDemenagement || isPageOptions) && isAideDem }">
                                <b><br/>Taille de logement :</b><br/> {{ getTailleLogementUser() }}
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': (isPageDateDemenagement || isPageOptions) && isAideDem }">
                                <b><br/>Durée de prestation :</b><br/> {{ getDureePrestationUser() }}
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageInventaire || isPageDemontage || (isPageDateDemenagement || isPageOptions) && isInventaire }">
                                <b><br/>Inventaire :</b><br/>
                                <div class="tooltipInventaire">
                                  <i><ins>Placez le curseur ici pour voir</ins></i>
                                  <span class="tooltipListeInventaire">
                                    <table style="width:100%">
                                      <tr>
                                        <th>Meuble</th>
                                        <th>Qté</th>
                                      </tr>
                                      <tr v-for="element in $store.getters.getInventaireUser" v-if="element.quantity > 0">
                                        <td>{{ element.name }}</td>
                                        <td>{{ element.quantity }}</td>
                                      </tr>
                                    </table>
                                  </span>
                                </div>
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageDemontage || (isPageDateDemenagement || isPageOptions) && isInventaire }">
                                <b><br/>Meubles à démonter :</b><br/>
                                <div class="tooltipDemontage">
                                  <i><ins>Placez le curseur ici pour voir</ins></i>
                                  <span class="tooltipListeDemontage">
                                    <table style="width:100%">
                                      <tr>
                                        <th>Meuble</th>
                                        <th>Qté</th>
                                      </tr>
                                      <tr v-for="element in $store.getters.getInventaireUser" v-if="element.quantityDemonter > 0">
                                        <td>{{ element.name }}</td>
                                        <td>{{ element.quantityDemonter }}</td>
                                      </tr>
                                    </table>
                                  </span>
                                </div>
            </li>
            <li v-bind:class="{ 'hideElement': true,
                                'displayElement': isPageDateDemenagement || isPageOptions }">
                                <b><br/>Date de déménagement :</b><br/> {{ getDateDemenagementUser() }}<br/> {{ getCreneauDemenagementUser() }}
            </li>
          </ul>

      </div>

    </div>
</template>

<script>

export default {
    name: 'PanelInfoCommande',
    data () {
      return {
        isPageTailleLogement: this.$parent.isPageTailleLogement,
        isPageDureePrestation: this.$parent.isPageDureePrestation,
        isPageInventaire: this.$parent.isPageInventaire,
        isPageDemontage: this.$parent.isPageDemontage,
        isPageDateDemenagement: this.$parent.isPageDateDemenagement,
        isPageOptions: this.$parent.isPageOptions,
        typeDemenagement: 'typeDemenagement',
        dureePrestation: 'dureePrestation',
        tailleLogement: 'tailleLogement',
        dateDemenagement: 'dateDemenagement',
      }
    },
    methods: {
      getPickupAddressUser() {
        return this.$store.getters.getPickupAddressUser;
      },
      getDestinationAddressUser() {
        return this.$store.getters.getDestinationAddressUser;
      },
      getDistanceAdressesUser() {
        return this.$store.getters.getDistanceAdressesUser;
      },
      getTypeDemenagementUser() {
        return this.$store.getters.getTypeDemenagementUser;
      },
      getTailleLogementUser() {
        return this.$store.getters.getTailleLogementUser;
      },
      getDureePrestationUser() {
        return this.$store.getters.getDureePrestationUser;
      },
      getDateDemenagementUser() {
        let date = this.$store.getters.getDateDemenagementUser;
        if(date.length ==  0) {
          return '';
        }
        return ""+date[0]+"/"+(date[1]+1)+"/"+date[2]+"";
      },
      getCreneauDemenagementUser() {
        return this.$store.getters.getCreneauDemenagementUser;
      }
    },
    computed: {
      isAideDem () {
        return this.$store.state.isAideDem;
      },
      isInventaire () {
        return this.$store.state.isInventaire;
      },
      tarif() {
        return this.$store.state.tarif;
      }
    },
}

</script>

<style lang="scss" scoped>

#panel-info-commande {
    background: #E85029;
    box-shadow: 0 2px 2px 0 #E85029;
    /*border: 1px solid black;*/
    border-radius: 10px;
    padding: 15px;
    width: 200px;
    max-width: 200px;
    height: 500px;
    max-height: 500px;
    display: inline-block;
    align-self: stretch;

    .hideElement {
      display: none;
    }

    .displayElement {
      display: block;
    }

    .tooltipAdresse {
      position: relative;
      .tooltipDetailsAdresse {
        opacity: 0.9;
        visibility: hidden;
        width: 200px;
        background-color: #FFF;
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
        .tooltipDetailsAdresse {
          visibility: visible;
        }
      }
    }

    .tooltipInventaire {
      position: relative;
      .tooltipListeInventaire {
        opacity: 0.9;
        visibility: hidden;
        width: 150px;
        background-color: #FFF;
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
        background-color: #FFF;
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
      color: #E85029;
      border: 1px solid #E85029;
    }

    th, td {
      padding-left: 5px;
    }

}

</style>
