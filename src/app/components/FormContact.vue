<template>
    <div id="form-contact">

        <div class="form-contact-title-contact">
            <p style="color: black; font-size: 15px">
                <b>Contact<span style="color:red">*</span></b>
            </p>
        </div>

        <div class="form-contact-prenom">
          <!--<label for="input-contact-prenom" style="color: black; font-size: 15px">Prénom :</label>-->
          <input type="text" id="input-contact-prenom" placeholder="Prénom*" v-model="inputContactPrenom" ref="inputPrenom"  required />
          <p style="color: red; font-size: 10px" v-if="errorContactPrenom">
            Ce champ est obligatoire !
          </p>
        </div>

        <div class="form-contact-nom">
          <!--<label for="input-contact-nom" style="color: black; font-size: 15px">Nom :</label>-->
          <input type="text" id="input-contact-nom" placeholder="Nom*" v-model="inputContactNom" ref="inputNom" required />
          <p style="color: red; font-size: 10px" v-if="errorContactNom">
            Ce champ est obligatoire !
          </p>
        </div>

        <div class="form-contact-telephone">
          <!--<label for="input-contact-telephone" style="color: black; font-size: 15px">Numéro de téléphone :</label>-->
          <input type="text" id="input-contact-telephone" placeholder="N° de téléphone*" v-model="inputContactTelephone" ref="inputTelephone" required />
          <p style="color: red; font-size: 10px" v-if="errorContactTelephone">
            Ce champ est obligatoire !
          </p>
        </div>

        <div class="form-contact-email">
          <!--<label for="input-contact-email" style="color: black; font-size: 15px">Email :</label>-->
          <input type="text" id="input-contact-email" placeholder="Email*" v-model="inputContactEmail" ref="inputEmail" required />
          <p style="color: red; font-size: 10px" v-if="errorContactEmail">
            Ce champ est obligatoire !
          </p>
        </div>

        <div class="form-contact-title-cp">
            <p style="color: black; font-size: 15px">
                <b>Enquête: Comment avez-vous connu Carton Plein ?<span style="color:red">*</span></b>
            </p>
        </div>

        <div class="form-contact-cp-reponse">
          <label for="one" style="color: black; font-size: 12px">
            <input type="checkbox" id="one" v-model="inputReponseEnqueteOne" ref="reponseEnqueteOne" /> "Un/Une proche m'en a parlé"<br>
          </label>
          <label for="two" style="color: black; font-size: 12px">
            <input type="checkbox" id="two" v-model="inputReponseEnqueteTwo" ref="reponseEnqueteTwo" /> "J'ai vu passer vos remorques dans la rue"<br>
          </label>
          <label for="three" style="color: black; font-size: 12px">
            <input type="checkbox" id="three" v-model="inputReponseEnqueteThree" ref="reponseEnqueteThree" /> "J'ai entendu parler de vous par la presse"<br>
          </label>
          <label for="four" style="color: black; font-size: 12px">
            <input type="checkbox" id="four" v-model="inputReponseEnqueteFour" ref="reponseEnqueteFour" /> "J'ai vu une publication sur les réseaux sociaux"<br>
          </label>
          <label for="five" style="color: black; font-size: 12px">
            <input type="checkbox" id="five" v-model="inputReponseEnqueteFive" ref="reponseEnqueteFive" /> "En tapant déménagement sur mon moteur de recherche"<br>
          </label>
          <label for="six" style="color: black; font-size: 12px">
            <input type="checkbox" id="six" v-model="inputReponseEnqueteSix" ref="reponseEnqueteSix" /> "Autres"
          </label>
          <p style="color: red; font-size: 10px" v-if="errorReponseEnquete">
            Ce champ est obligatoire !
          </p>
        </div>


    </div>
</template>

<script>
import { store } from '../store.js';

export default {
    name: 'FormContact',
    data() {
        return {
            inputContactPrenom: '',
            inputContactNom: '',
            inputContactTelephone: '',
            inputContactEmail: '',
            errorContactPrenom: false,
            errorContactNom: false,
            errorContactTelephone: false,
            errorContactEmail: false,
            inputReponseEnqueteOne: false,
            inputReponseEnqueteTwo: false,
            inputReponseEnqueteThree: false,
            inputReponseEnqueteFour: false,
            inputReponseEnqueteFive: false,
            inputReponseEnqueteSix: false,
            errorReponseEnquete: false
        }
    },
    methods: {
      submitContactInformation (inputContactPrenom, inputContactNom, inputContactTelephone, inputContactEmail) {
        store.submitContactInformation(inputContactPrenom, inputContactNom, inputContactTelephone, inputContactEmail);
        this.inputContactPrenom = '';
        this.inputContactNom = '';
        this.inputContactTelephone = '';
        this.inputContactEmail = '';
      }
    }
}

</script>

<style lang="scss" scoped>

#form-contact {
    background: #FFF;
    opacity: 0.95;
    border: 1px solid black;
    border-radius: 10px;
    width: 330px;
    max-width: 330px;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;
    display: inline-block;
    align-self: stretch;
    overflow: hidden;

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

</style>
