<template>
    <div id="app-recapitulatif">
      <div>
        <div class="container">
          <h1>Récapitulatif de votre commande : </h1>
          <PanelRecapitulatif class="panel-recapitulatif"></PanelRecapitulatif>
        </div>

        <div id="form-contact">
          <form id="form-contact-1" onsubmit="return false">
            <div class="form-contact-title-contact">
                <p style="font-size: 15px">
                    <b>Contact<span style="color:red">*</span></b>
                </p>
            </div>

            <div class="form-contact-prenom">
              <input type="text" id="input-contact-prenom" placeholder="Prénom*" v-model="inputContactPrenom" ref="inputPrenom"  required />
            </div>

            <div class="form-contact-nom">
              <input type="text" id="input-contact-nom" placeholder="Nom*" v-model="inputContactNom" ref="inputNom" required />
            </div>

            <div class="form-contact-telephone">
              <input type="text" id="input-contact-telephone" placeholder="N° de téléphone*" v-model="inputContactTelephone" ref="inputTelephone" required />
            </div>

            <div class="form-contact-email">
              <input type="text" id="input-contact-email" placeholder="Email*" v-model="inputContactEmail" ref="inputEmail" required />
            </div>

            <div class="form-contact-title-cp">
              <p style="font-size: 15px">
                <b>Enquête: Comment avez-vous connu Carton Plein ?<span style="color:red">*</span></b>
              </p>
            </div>

            <div class="form-contact-cp-reponse">
              <label for="one" style="font-size: 12px">
                <input type="checkbox" name="input-response-enquete" v-model="inputReponseEnqueteOne" ref="reponseEnqueteOne" value="Un/Une proche m'en a parlé"/> "Un/Une proche m'en a parlé"<br>
              </label>
              <label for="two" style="font-size: 12px">
                <input type="checkbox" name="input-response-enquete" v-model="inputReponseEnqueteTwo" ref="reponseEnqueteTwo" value="J'ai vu passer vos remorques dans la rue" /> "J'ai vu passer vos remorques dans la rue"<br>
              </label>
              <label for="three" style="font-size: 12px">
                <input type="checkbox" name="input-response-enquete" v-model="inputReponseEnqueteThree" ref="reponseEnqueteThree" value="J'ai entendu parler de vous par la presse" /> "J'ai entendu parler de vous par la presse"<br>
              </label>
              <label for="four" style="font-size: 12px">
                <input type="checkbox" name="input-response-enquete" v-model="inputReponseEnqueteFour" ref="reponseEnqueteFour" value="J'ai vu une publication sur les réseaux sociaux" /> "J'ai vu une publication sur les réseaux sociaux"<br>
              </label>
              <label for="five" style="font-size: 12px">
                <input type="checkbox" name="input-response-enquete" v-model="inputReponseEnqueteFive" ref="reponseEnqueteFive" value="En tapant déménagement sur mon moteur de recherche" /> "En tapant déménagement sur mon moteur de recherche"<br>
              </label>
              <label for="six" style="font-size: 12px">
                <input type="checkbox" name="input-response-enquete" v-model="inputReponseEnqueteSix" ref="reponseEnqueteSix" value="Autres" /> "Autres"
              </label>
              <p style="color: red; font-size: 10px" v-if="errorSurvey">
                  Veuillez répondre à l'enquête !
              </p>
            </div>
          </form>
        </div>

        <vue-stripe-checkout
          ref="checkoutRef"
          :image="image"
          :locale="locale"
          :name="name"
          :description="description"
          :currency="currency"
          :panelLabel="panelLabel"
          :allow-remember-me="false"
          :email="inputContactEmail"
          :amount = "getTotalTarif()"
          @done="done"
          @opened="opened"
          @closed="closed"
          @canceled="canceled"
        ></vue-stripe-checkout>

        <button type="submit" id="button-finaliser" form="form-contact-1" @click="validateContactForm">Finaliser votre commande</button>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageOptions"></ButtonPrecedent>
      </div>
    </div>

</template>

<script>

import PanelRecapitulatif from './PanelRecapitulatif.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';
import image from "../../../public/images/carton_plein_logo_noir.jpg"

export default {
  name: 'AppRecapitulatif',
  data () {
    return {
      inputContactPrenom: '',
      inputContactNom: '',
      inputContactTelephone: '',
      inputContactEmail: '',
      inputReponseEnqueteOne: false,
      inputReponseEnqueteTwo: false,
      inputReponseEnqueteThree: false,
      inputReponseEnqueteFour: false,
      inputReponseEnqueteFive: false,
      inputReponseEnqueteSix: false,

      errorSurvey: false,

      image: image,
      locale: 'fr',
      name: 'Carton Plein 75',
      description: "Réservation d'un déménagement",
      panelLabel: 'Régler',
      currency: 'EUR',
    }
  },
  components: {
    PanelRecapitulatif,
    ButtonPrecedent
  },
  methods: {

    getCheckedResponses() {
      var items = document.getElementsByName('input-response-enquete');
      var selectedItems = [];
      for(var i=0; i<items.length; i++){
        if(items[i].type=='checkbox' && items[i].checked==true) {
          selectedItems.push(items[i].value);
        }
      }
      return selectedItems;
    },

    validateContactForm () {
      let isReponseOneChecked = this.$refs.reponseEnqueteOne.checked;
      let isReponseTwoChecked = this.$refs.reponseEnqueteTwo.checked;
      let isReponseThreeChecked = this.$refs.reponseEnqueteThree.checked;
      let isReponseFourChecked = this.$refs.reponseEnqueteFour.checked;
      let isReponseFiveChecked = this.$refs.reponseEnqueteFive.checked;
      let isReponseSixChecked = this.$refs.reponseEnqueteSix.checked;

      if (isReponseOneChecked || isReponseTwoChecked || isReponseThreeChecked || isReponseFourChecked || isReponseFiveChecked || isReponseSixChecked) {
        this.errorSurvey = false;
        if(!(this.inputContactPrenom == '' || this.inputContactNom == '' || this.inputContactTelephone == '' || this.inputContactEmail == '')) {
          this.$store.commit('saveContactUser', [this.inputContactPrenom, this.inputContactNom, this.inputContactTelephone, this.inputContactEmail, this.getCheckedResponses()]);
          this.openPaymentForm();
          console.log(this.$store.state.choicesUser.contact);
        }
      }
      else {
        this.errorSurvey = true;
      }
    },

    async openPaymentForm() {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      const { token, args } = await this.$refs.checkoutRef.open();
    },

    done ({token, args}) {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      this.$store.commit('setOrderDateTime', this.getCurrentDateTime());
      let ordersRef = fb.rootRef.child('orders');
      ordersRef.push(this.$store.state.choicesUser);
    },

    opened () {
      // do stuff
    },
    closed () {
      // do stuff
    },
    canceled () {
      // do stuff
    },

    getCurrentDateTime() {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date+' '+time;
    },

    getTotalTarif() {
      return this.$store.state.tarif*100;
    },

    returnPageOptions() {
      this.$parent.$options.methods.returnPageOptions();
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

#app-recapitulatif {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;

  #form-contact {
    background: #FFF;
    box-shadow: 0 2px 2px 0 #E85029;
    opacity: 0.95;
    border: 1px solid #E85029;
    border-radius: 10px;
    width: 330px;
    max-width: 330px;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;
    display: inline-block;
    align-self: stretch;
    position: absolute;
    right: 0;
    bottom: 100px;
    color: #E85029;

    .form-contact-title-cp {
      margin-top: 20px;
    }

    input[type=text] {
      width: 100%;
      padding: 10px 10px;
      margin: 5px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      &:focus {
        outline: none;
      }
    }

    select {
      width: 100%;
      padding: 10px 10px;
      margin: 5px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }

  #button-finaliser {
    position: absolute;
    right: 0;
    bottom: 30px;
    display: inline-block;
    padding: 3px;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: purple;
    border: none;
  //  border-radius: 10px;
    box-shadow: 0 9px #999;
    width: 120px;
    height: 40px;

    &:hover {background-color: #3E0863}

    &:active {
      background-color: #3E0863;
      box-shadow: 0 5px #666;
      transform: translateY(4px);
    }
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
    color: red;
    background-color: #FFF;
  }

  .disableButton {
    opacity: 0.5;
    pointer-events: none;
  }

  label {
    color: #E85029;
  }

}


</style>
