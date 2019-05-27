import Vue from 'vue';
import Vuex from 'vuex';
import { config } from '../db/index.js'
import { seedMonth, seedDay } from '../db/seed.js';

const fb = require('../db/index.js');

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      isAddressAvailable: false,
      isForfait: false,
      isInventaire: false,
      seedMonth,
      seedDay,
      choicesUser: {
        pickupAddress: { adresse: '', surface: '', etage: '', ascenseur: '', cave: '' },
        destinationAddress: { adresse: '', surface: '', etage: '', ascenseur: '', cave: '' },
        distance: { text: '', value: null },
        typeDemenagement: '',
        tailleLogement: { title: '', tarif: null },
        dureePrestation: '',
        inventaire: [],
        dateDemenagement: '',
        options: [{name: 'option1', quantity: 1}],
        prix: 0,
        contact: { nom: '', prenom: '', telephone: '', email: '', reponseEnquete: '' }
      },
      tarifAddresses: 0,
      tarifPrec: 0,
      tarif: 0
    },

    getters: {

      getDays () {
        return store.state.seedDay;
      },

      getActiveMonth () {
        return store.state.seedMonth.find((month) => month.active);
      },

      getActiveDay () {
        return store.state.seedDay.find((day) => day.active);
      },

      getSelectedDay () {
        return store.state.seedDay.find((day) => day.selected);
      },

      getTarif() {
        return store.state.tarif;
      },

      getPickupAddressUser() {
        return store.state.choicesUser.pickupAddress;
      },

      getDestinationAddressUser() {
        return store.state.choicesUser.destinationAddress;
      },

      getDistanceAdressesUser() {
        return store.state.choicesUser.distance;
      },

      getTypeDemenagementUser() {
        return store.state.choicesUser.typeDemenagement;
      },

      getTailleLogementUser() {
        return store.state.choicesUser.tailleLogement;
      },

      getDureePrestationUser() {
        return store.state.choicesUser.dureePrestation;
      },

      getInventaireUser() {
        return store.state.choicesUser.inventaire;
      },

      getDateDemenagementUser () {
        return store.state.choicesUser.dateDemenagement;
      },

      getOptionsUser() {
        return store.state.choicesUser.options;
      },
    },
/*
    submitFormPickupAddress (pickupAdresse, pickupSurface, pickupEtage, pickupAscenseur, pickupCave) {

    },

    submitFormDestinationAddress (destinationAdresse, destinationSurface, destinationEtage, destinationAscenseur, destinationCave) {

    },

    getSelectedSizeLogement () {
      let seedSize = this.state.seedSize;
      var selectedSize = { title: '' };
      seedSize.orderByChild('selected').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        selectedSize.title = data.title;
      });
      return selectedSize;
    },
    */

    mutations: {

      setAddressAvailable (state, val) {
        state.isAddressAvailable = val;
      },

      setPickupAddressUser (state, pickupAddress) {
        state.choicesUser.pickupAddress.adresse = pickupAddress[0];
        state.choicesUser.pickupAddress.surface = pickupAddress[1];
        state.choicesUser.pickupAddress.etage = pickupAddress[2];
        state.choicesUser.pickupAddress.ascenseur = pickupAddress[3];
        state.choicesUser.pickupAddress.cave = pickupAddress[4];
      },

      setDestinationAddressUser (state, destinationAddress) {
        state.choicesUser.destinationAddress.adresse = destinationAddress[0];
        state.choicesUser.destinationAddress.surface = destinationAddress[1];
        state.choicesUser.destinationAddress.etage = destinationAddress[2];
        state.choicesUser.destinationAddress.ascenseur = destinationAddress[3];
        state.choicesUser.destinationAddress.cave = destinationAddress[4];
      },

      setTypeForfait(state, isForfait) {
        state.isForfait = isForfait;
      },

      setTypeInventaire(state, isInventaire) {
        state.isInventaire = isInventaire;
      },

      initDayNames(state, monthAndYear) {
        let days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        state.seedDay.map((dayObj) => {
          let d = new Date(monthAndYear[1], monthAndYear[0], dayObj.number);
          dayObj.name = days[d.getDay()];

        });
      },

      initCurrentMonthCurrentYear(state, monthAndYear) {
        state.seedDay.map((dayObj) => {
          dayObj.currentMonth = monthAndYear[0];
          dayObj.currentYear = monthAndYear[1];
        });
        state.seedMonth.map((monthObj) => {
          monthObj.currentYear = monthAndYear[1];
        });
      },

      setActiveDay (state, dayNumber) {
        state.seedDay.map((dayObj) => {
          dayObj.number === dayNumber ? dayObj.active = true : dayObj.active = false;
        });
      },

      setSelectedDay (state, dayNumber) {
        state.seedDay.map((dayObj) => {
          dayObj.number === dayNumber ? dayObj.selected = true : dayObj.selected = false;
        });
      },

      unselectAllDays (state) {
        state.seedDay.map((dayObj) => {
          dayObj.selected = false;
        });
      },

      setActiveMonth (state, monthNumber) {
        state.seedMonth.map((monthObj) => {
          monthObj.number === monthNumber ? monthObj.active = true : monthObj.active = false;
        });
      },

      setDistanceAdressesUser(state, distance) {
        console.log(distance);
        state.choicesUser.distance = distance;
      },

      setTarifAddresses(state, tarif) {
        state.tarifAddresses = tarif;
      },

      setTarif(state, tarif) {
        state.tarif = tarif;
      },

      setTypeDemenagement (state, typeDemenagement) {
        state.choicesUser.typeDemenagement = typeDemenagement;
        console.log(state.choicesUser.typeDemenagement);
      },

      setTailleLogement (state, tailleLogement) {
        state.choicesUser.tailleLogement = tailleLogement;
        console.log(state.choicesUser.tailleLogement);
      },

      setDureePrestation (state, dureePrestation) {
        state.choicesUser.dureePrestation = dureePrestation;
        console.log(state.choicesUser.dureePrestation);
      },

      addElementInInventaire(state, element) {
        state.choicesUser.inventaire.push({ number: element.number, name: element.name, image: element.image, volume: element.volume, tarif: element.tarif, quantity: 1, quantityDemonter: 0 });
      },

      deleteElementFromInventaire(state, element) {
        state.choicesUser.inventaire.splice(state.choicesUser.inventaire.indexOf(element), 1);
      },

      emptyInventaire(state) {
        for(var i=0; i<state.choicesUser.inventaire.length; i++) {
          state.choicesUser.inventaire.splice(state.choicesUser.inventaire[i], 1);
        }
      },

      setTarifPrec (state, tarif) {
        state.tarifPrec = tarif;
      },

      setDateDemenagement (state, dateDemenagement) {
        state.choicesUser.dateDemenagement = dateDemenagement;
        console.log(this.state.choicesUser.dateDemenagement);
      },

    },

    actions: {

    },



    /* //object to array
    getUnavailableDates() {
      var dates = [];
      let seedUnavailableDates = this.state.seedUnavailableDates;
      seedUnavailableDates.orderByChild('day').on('child_added', function(snapshot) {
        var date = snapshot.val();
        dates.push({
          day: date.day,
          month: date.month,
          year: date.year
        });
      });
      console.log(dates);

    },*/


    finaliserCommande () {

    }



});
