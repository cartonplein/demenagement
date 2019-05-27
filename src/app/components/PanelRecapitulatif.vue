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
                  <li style="font-size: 11px">Surface : {{ getPickupAddressUser().surface }} | Etage : {{ getPickupAddressUser().etage }} |
                  Ascenseur : {{ getPickupAddressUser().ascenseur }} | Cave : {{ getPickupAddressUser().cave }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">Votre adresse de destination</th>
              <td>
                <ul>
                  <li>{{ getDestinationAddressUser().adresse }}</li>
                  <li style="font-size: 11px">Surface : {{ getDestinationAddressUser().surface }} | Etage : {{ getDestinationAddressUser().etage }} |
                  Ascenseur : {{ getDestinationAddressUser().ascenseur }} | Cave : {{ getDestinationAddressUser().cave }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">Votre type de déménagement</th>
              <td>{{ getTypeDemenagementUser() }}</td>
            </tr>
            <tr v-show="isForfait">
              <th scope="row">Votre taille de logement</th>
              <td>{{ getTailleLogementUser() }}</td>
            </tr>
            <tr v-show="isForfait">
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
                      <tr v-for="element in inventaire">
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
                      <tr v-for="element in inventaire" v-if="element.quantityDemonter > 0">
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
              <td>{{ getDateDemenagementUser() }}</td>
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
                      <tr v-for="element in options"">
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
          <p style="color: black; font-size: 25px; font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif">
              <b>TOTAL : {{ tarifTotal }} €</b>
          </p>
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
        dateDemenagement: 'dateDemenagement',
        inventaire: this.$store.getters.getInventaireUser,
        options: this.$store.getters.getOptionsUser
      }
    },
    methods: {
      getPickupAddressUser() {
        return this.$store.getters.getPickupAddressUser;
      },
      getDestinationAddressUser() {
        return this.$store.getters.getDestinationAddressUser;
      },
      getTypeDemenagementUser() {
        return this.$store.getters.getTypeDemenagementUser;
      },
      getTailleLogementUser() {
        return this.$store.getters.getTailleLogementUser.title;
      },
      getDureePrestationUser() {
        return this.$store.getters.getDureePrestationUser;
      },
      getDateDemenagementUser() {
        return this.$store.getters.getDateDemenagementUser;
      }
    },
    computed: {
      isForfait () {
        return this.$store.state.isForfait;
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
    opacity: 0.95;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px;
    width: 750px;
    max-width: 750px;
    height: 450px;
    max-height: 450px;
    display: inline-block;
    align-self: stretch;
    position: relative;

    .panel-recapitulatif-total {
      border-top: 1.5px solid black;
      position: absolute;
      bottom: 10px;
    }

    .tooltip {
      position: relative;
      .tooltipListe {
        opacity: 0.9;
        visibility: hidden;
        width: 200px;
        max-width: 200px;
        background-color: black;
        color: #fff;
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
        color: white;
        border: 2px solid white;
      }
      th, td {
        padding: 3px 3px;
      }
    }


    table, th, td {
      border: 2px solid black;
    }

    th, td {
      padding: 8px 8px;
    }
}

</style>
