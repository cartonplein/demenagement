<template>
    <div id="app-recapitulatif">
      <div v-bind:class="{ 'backgroundDisabled': errorForm }">
        <div class="container">
          <!--<div v-bind:class="{ 'backgroundDisabled': errorForm }">-->
          <h1 style="color:white; font-size: 200%; padding-bottom: 20px ">Récapitulatif de votre commande : </h1>
          <PanelRecapitulatif class="panel-recapitulatif"></PanelRecapitulatif>
        </div>
        <FormContact class="panel-form-contact" ref="formContact"></FormContact>
        <ButtonFinaliser id="button-finaliser" :onClick="finaliserCommande" v-bind:class="{ 'disableButton': false }">
        </ButtonFinaliser>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageOptions"></ButtonPrecedent>
      </div>
      <div id="panel-error-msg" v-show="errorForm">
        <span class="closebtn" @click="fermerErrorMsg">&times;</span>
        <!--<button class="btn-close" @click="fermerErrorMsg"><b>Fermer</b></button>-->
        <b>Ce(s) champ(s) est/sont obligatoire(s) :</b><br/>
        {{ errorMsg }}
      </div>

    </div>

</template>

<script>

import PanelRecapitulatif from './PanelRecapitulatif.vue';
import FormContact from './FormContact.vue';
import ButtonFinaliser from './ButtonFinaliser.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppRecapitulatif',
  data () {
    return {
      errorMsg: '',
      errorForm: false,
      isPrenomEmpty: false,
      isNomEmpty: false,
      isTelephoneEmpty: false,
      isEmailEmpty: false,
      isSurveyAnswered: false
    }
  },
  components: {
    PanelRecapitulatif,
    FormContact,
    ButtonFinaliser,
    ButtonPrecedent
  },
  methods: {
    finaliserCommande() {

      let inputContactPrenom = this.$refs.formContact.$refs.inputPrenom.value;
      let inputContactNom = this.$refs.formContact.$refs.inputNom.value;
      let inputContactTelephone = this.$refs.formContact.$refs.inputTelephone.value;
      let inputContactEmail = this.$refs.formContact.$refs.inputEmail.value;

      let isReponseOneChecked = this.$refs.formContact.$refs.reponseEnqueteOne.checked;
      let isReponseTwoChecked = this.$refs.formContact.$refs.reponseEnqueteTwo.checked;
      let isReponseThreeChecked = this.$refs.formContact.$refs.reponseEnqueteThree.checked;
      let isReponseFourChecked = this.$refs.formContact.$refs.reponseEnqueteFour.checked;
      let isReponseFiveChecked = this.$refs.formContact.$refs.reponseEnqueteFive.checked;
      let isReponseSixChecked = this.$refs.formContact.$refs.reponseEnqueteSix.checked;

      if(inputContactPrenom === '') {
        this.isPrenomEmpty = true;
        this.errorMsg = this.errorMsg.concat('Prénom ');
      }
      if(inputContactNom === '') {
        this.isNomEmpty = true;
        this.errorMsg = this.errorMsg.concat('Nom ');
      }
      if(inputContactTelephone === '') {
        this.isTelephoneEmpty = true;
        this.errorMsg = this.errorMsg.concat('Téléphone ');
      }
      if (inputContactEmail === '') {
        this.isEmailEmpty = true;
        this.errorMsg = this.errorMsg.concat('Email ');
      }
      if (isReponseOneChecked || isReponseTwoChecked || isReponseThreeChecked ||
      isReponseFourChecked || isReponseFiveChecked || isReponseSixChecked ) {
        this.isSurveyAnswered = true;
      }
      if (!this.isSurveyAnswered) {
        this.errorMsg = this.errorMsg.concat('Enquête ');
      }

      if(this.isPrenomEmpty || this.isNomEmpty || this.isTelephoneEmpty || this.isEmailEmpty || !this.isSurveyAnswered) {
        this.errorForm = true;
      }
      else {
        //console.log(inputContactPrenom, inputContactNom, inputContactTelephone, inputContactEmail);
        let responsesEnquete = this.$refs.formContact.$options.methods.getCheckedResponses();
        this.$store.commit('saveContactUser', [inputContactPrenom, inputContactNom, inputContactTelephone, inputContactEmail, responsesEnquete]);
        console.log(this.$store.state.choicesUser.contact);
        this.$parent.$options.methods.openPaymentPage();
        //this.$refs.formContact.$options.methods.submitContactInformation(inputContactPrenom, inputContactNom, inputContactTelephone, inputContactEmail);
      }
      this.isNomEmpty = false;
      this.isPrenomEmpty = false;
      this.isTelephoneEmpty = false;
      this.isEmailEmpty = false;
      this.isSurveyAnswered = false;
    },

    returnPageOptions() {
      this.$parent.$options.methods.returnPageOptions();
    },
    fermerErrorMsg () {
      this.errorForm = false;
      this.errorMsg = '';
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

  #app-recapitulatif .panel-form-contact {
    position: absolute;
    right: 0;
    bottom: 100px;
  }

  #button-finaliser {
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

  #panel-error-msg {
    background-color: white;
    border-radius: 10px;
    color: black;
    width: 380px;
    height: 150px;
    z-index: 1;
    padding: 10px;
    margin: auto;
    position: absolute;
    left:0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: 0 9px black;

    .closebtn {
      margin-left: 15px;
      color: black;
      font-weight: bold;
      float: right;
      font-size: 25px;
      line-height: 20px;
      cursor: pointer;
      transition: 0.3s;
    }

    .closebtn:hover {
      color: red;
    }
  }

  .backgroundDisabled {
    opacity: 0.2;
    pointer-events: none;
    //background-color: rgba(0, 0, 0, 0.5);
  }

}


</style>
