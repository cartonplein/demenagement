<template>
    <div id="panel-recapitulatif">
      <div class="panel-recapitulatif-choix">
        <table width="100%" style="font-size: 13px" id="my-table">
          <tbody>
            <tr>
              <th scope="row">Votre adresse de départ</th>
              <td>
                <ul>
                  <li>{{ getPickupAddressUser().adresse }}</li>
                  <li style="font-size: 11px"><b>Etage :</b> {{ getPickupAddressUser().etage }} |
                  <b>Ascenseur :</b> {{ getPickupAddressUser().ascenseur }} | <b>Cave :</b> {{ getPickupAddressUser().cave }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">Votre adresse de destination</th>
              <td>
                <ul>
                  <li>{{ getDestinationAddressUser().adresse }}</li>
                  <li style="font-size: 11px"><b>Etage :</b> {{ getDestinationAddressUser().etage }} |
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
            <tr v-show="isInventaire || isTransport">
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
                      <tr v-for="element in $store.getters.getInventaireUser">
                        <td>{{ element.name }}</td>
                        <td>{{ element.quantity }}</td>
                      </tr>
                    </table>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-show="isInventaire || isTransport">
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

      <a @click="createSummaryPdf">Télécharger le récapitulatif en version PDF</a>

      <div class="panel-recapitulatif-total">
          <h1><b>TOTAL : {{ tarifTotal }} €</b></h1>
      </div>
    </div>
</template>

<script>
import jsPDF from 'jsPDF';

export default {
    name: 'PanelRecapitulatif',
    data() {
      return {
        typeDemenagement: 'typeDemenagement',
        dureePrestation: 'dureePrestation',
        tailleLogement: 'tailleLogement',
        dateDemenagement: 'dateDemenagement',

        orderNumber: '',
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
      },
      createSummaryPdf() {
        let pdfName = 'CP_DEM_'+this.$store.getters.getOrderNumber;
        var doc = new jsPDF();

        var img = new Image();
        img.src = '../../../public/images/carton_plein_logo.png';
        doc.addImage(img, 'PNG', 8, 10, 70, 15);

        doc.setLineWidth(0.5);
        doc.line(200, 25, 10, 25);

        doc.setFontSize(20);
        doc.setFontType('bold');
        doc.text(10, 40, 'Récapitulatif du déménagement (#'+this.$store.getters.getOrderNumber+')');

        doc.setFontSize(11);
        doc.text('Adresse de départ :', 12, 55);
        doc.text('Adresse de destination :', 12, 70);
        doc.text('Distance :', 12, 85);
        doc.text('Type de déménagement :', 12, 95);
        doc.text('Date de déménagement :', 12, 105);
        doc.text('Inventaire :', 12, 115);

        doc.setFontType('normal');
        doc.text(this.getPickupAddressUser().adresse, 70, 55);
        doc.text('Étage : '+this.getPickupAddressUser().etage+', Ascenseur : '+this.getPickupAddressUser().ascenseur+', Cave : '+this.getPickupAddressUser().cave, 70, 60);
        doc.text(this.getDestinationAddressUser().adresse, 70, 70);
        doc.text('Étage : '+this.getDestinationAddressUser().etage+', Ascenseur : '+this.getDestinationAddressUser().ascenseur+', Cave : '+this.getDestinationAddressUser().cave, 70, 75);
        doc.text(this.getDistanceAdressesUser().text, 70, 85);
        doc.text(this.getTypeDemenagementUser(), 70, 95);
        doc.text(this.getDateDemenagementUser()+' ('+this.getCreneauDemenagementUser()+')', 70, 105);

        let p=0;
        for(var i=0; i<this.$store.getters.getInventaireUser.length; i++) {
          if(this.$store.getters.getInventaireUser[i].quantity > 0) {
            p = 115+(5*i);
            doc.text(this.$store.getters.getInventaireUser[i].name+' x'+this.$store.getters.getInventaireUser[i].quantity, 70, p);
          }
        }

        if(this.$store.getters.getOptionsUser.length !== 0) {
          doc.setFontType('bold');
          doc.text('Options :', 12, p+10);
          doc.setFontType('normal');
          for(var i=0; i<this.$store.getters.getOptionsUser.length; i++) {
            doc.text(this.$store.getters.getOptionsUser[i].name+' x'+this.$store.getters.getOptionsUser[i].quantity, 70, (p+10)+(5*i));
          }
        }

        doc.line(200, 270, 10, 270);
        doc.setFontSize(15);
        doc.setFontType('bold');
        doc.text('Tarif : '+this.$store.getters.getTarif+'€', 10, 277);
        doc.line(200, 280, 10, 280);



        /*
        doc.setFontSize(15);
        doc.setFontType('bold');
        doc.text(10, p+10, 'Vos coordonnées :');

        doc.setFontSize(11);
        doc.text('Nom :', 12, p+20);
        doc.text('Prénom :', 12, p+25);
        doc.text('Numéro de téléphone :', 12, p+30);
        doc.text('Email', 12, p+35);

        doc.setFontType('normal');
        doc.text(this.$store.getters.getContactUser.nom, 70, p+20);
        doc.text(this.$store.getters.getContactUser.prenom, 70, p+25);
        doc.text(this.$store.getters.getContactUser.telephone, 70, p+30);
        doc.text(this.$store.getters.getContactUser.email, 70, p+35);
        */
        doc.save(pdfName + '.pdf');
      }
    },
    computed: {
      isAideDem () {
        return this.$store.state.isAideDem;
      },
      isInventaire () {
        return this.$store.state.isInventaire;
      },
      isTransport () {
        return this.$store.state.isTransport;
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

    a {
      font-size: 11px;
      float: right;
      color: #E85029;
      text-decoration: underline;
      margin-top: 5px;
      &:hover {
        color: red;
      }
    }
}

</style>
