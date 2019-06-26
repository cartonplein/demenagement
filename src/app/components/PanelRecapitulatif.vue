<template>
    <div id="panel-recapitulatif">
      <div class="panel-recapitulatif-choix">
        <table width="100%" style="font-size: 13px">
          <tbody>
            <tr>
              <th scope="row">Votre adresse de départ</th>
              <td>
                <ul>
                  <li>{{ getPickupAddressUser().adresse }}</li>
                  <li style="font-size: 11px"><b>Surface :</b> {{ getPickupAddressUser().surface }} | <b>Etage :</b> {{ getPickupAddressUser().etage }} |
                  <b>Ascenseur :</b> {{ getPickupAddressUser().ascenseur }} | <b>Cave :</b> {{ getPickupAddressUser().cave }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">Votre adresse de destination</th>
              <td>
                <ul>
                  <li>{{ getDestinationAddressUser().adresse }}</li>
                  <li style="font-size: 11px"><b>Surface :</b> {{ getDestinationAddressUser().surface }} | <b>Etage :</b> {{ getDestinationAddressUser().etage }} |
                  <b>Ascenseur :</b> {{ getDestinationAddressUser().ascenseur }} | <b>Cave :</b> {{ getDestinationAddressUser().cave }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">Votre distance de déménagement</th>
              <td>{{ getDistanceAdressesUser().text }}</td>
            </tr>
            <tr>
              <th scope="row">Votre type de déménagement</th>
              <td>{{ getTypeDemenagementUser() }}</td>
            </tr>
            <tr v-show="isAideDem">
              <th scope="row">Votre taille de logement</th>
              <td>{{ getTailleLogementUser() }}</td>
            </tr>
            <tr v-show="isAideDem">
              <th scope="row">Votre durée de prestation</th>
              <td>{{ getDureePrestationUser() }}</td>
            </tr>
            <tr v-show="isInventaire">
              <th scope="row">Votre inventaire</th>
              <td>
                <div class="tooltip">
                  <i><ins>Placez le curseur ici pour voir</ins></i>
                  <span class="tooltipListe">
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
              </td>
            </tr>
            <tr v-show="isInventaire">
              <th scope="row">Vos meubles à démonter</th>
              <td>
                <div class="tooltip">
                  <i><ins>Placez le curseur ici pour voir</ins></i>
                  <span class="tooltipListe">
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
              </td>
            </tr>
            <tr>
              <th scope="row">Votre date de déménagement</th>
              <td>{{ getDateDemenagementUser() }} ({{ getCreneauDemenagementUser() }})</td>
            </tr>
            <tr>
              <th scope="row">Vos options</th>
              <td>
                <div class="tooltip">
                  <i><ins>Placez le curseur ici pour voir</ins></i>
                  <span class="tooltipListe">
                    <table style="width:100%">
                      <tr>
                        <th>Option</th>
                        <th>Qté</th>
                      </tr>
                      <tr v-for="element in $store.getters.getOptionsUser">
                        <td>{{ element.name }}</td>
                        <td>{{ element.quantity }}</td>
                      </tr>
                    </table>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="panel-recapitulatif-total">
          <h1><b>TOTAL : {{ tarifTotal }} €</b></h1>
      </div>
    </div>
</template>

<script>

export default {
    name: 'PanelRecapitulatif',
    data() {
      return {
        typeDemenagement: 'typeDemenagement',
        dureePrestation: 'dureePrestation',
        tailleLogement: 'tailleLogement',
        dateDemenagement: 'dateDemenagement'
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
      tarifTotal() {
        return this.$store.state.tarif;
      }
    }
}

</script>

<style lang="scss" scoped>

#panel-recapitulatif {
    background: #FFF;
    box-shadow: 0 2px 2px 0 #E85029;
    opacity: 0.95;
    border: 1px solid #E85029;
    //border-radius: 10px;
    padding: 15px;
    width: 750px;
    max-width: 750px;
    height: 450px;
    max-height: 450px;
    display: inline-block;
    align-self: stretch;
    position: relative;

    .panel-recapitulatif-total {
      border-top: 1.5px solid #E85029;
      position: absolute;
      bottom: 10px;
      color: #E85029;
      font-size: 25px;
    }

    .tooltip {
      position: relative;
      .tooltipListe {
        opacity: 0.9;
        visibility: hidden;
        width: 200px;
        max-width: 200px;
        background-color: #E85029;
        text-align: center;
        border-radius: 6px;
        padding: 5px 5px;
        position: absolute;
        z-index: 1;
        top: -5px;
      }
      &:hover {
        cursor: context-menu;
        .tooltipListe {
          visibility: visible;
        }
      }
      table, th, td {
        font-size: 12px;
        color: #FFF;
        border: 2px solid #FFF;
      }
      th, td {
        padding: 3px 3px;
      }
    }


    table, th, td {
      border: 2px solid #E85029;
      color: #E85029;
    }

    th, td {
      padding: 8px 8px;
    }
}

</style>
