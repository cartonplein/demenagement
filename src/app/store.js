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
        direction: '',
        distance: { text: '', value: null },
        typeDemenagement: '',
        tailleLogement: null,
        dureePrestation: null,
        inventaire: [],
        dateDemenagement: '',
        options: [],
        contact: { nom: '', prenom: '', telephone: '', email: '', reponseEnquete: [] },
        orderDateTime: ''
      },
      tarifAddresses: 0,
      tarifPrec: 0,
      tarifOptions: 0,
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

      getTarifAddresses() {
        return store.state.tarifAddresses;
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

      setDirection (state, direction) {
        state.choicesUser.direction = direction;
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
      },

      setTailleLogement (state, tailleLogement) {
        state.choicesUser.tailleLogement = tailleLogement;
      },

      setDureePrestation (state, dureePrestation) {
        state.choicesUser.dureePrestation = dureePrestation;
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
      },

      addOption(state, element) {
        state.choicesUser.options.push({ number: element.number, name: element.name, tarif: element.tarif, quantity: 1});
      },

      setTarifOptions (state, tarif) {
        state.tarifOptions = tarif;
      },

      deleteOption(state, element) {
        state.choicesUser.options.splice(state.choicesUser.options.indexOf(element), 1);
      },

      emptyOptions(state) {
        for(var i=0; i<state.choicesUser.options.length; i++) {
          state.choicesUser.options.splice(state.choicesUser.options[i], 1);
        }
      },

      saveContactUser(state, contact) {
        state.choicesUser.contact.prenom = contact[0];
        state.choicesUser.contact.nom = contact[1];
        state.choicesUser.contact.telephone = contact[2];
        state.choicesUser.contact.email = contact[3];
        state.choicesUser.contact.reponseEnquete = contact[4];
      },

      setOrderDateTime(state, orderDateTime) {
        state.choicesUser.orderDateTime = orderDateTime;
      }

    },

    actions: {
      resetChoicesUser(context) {
        context.commit('setTypeDemenagement', '');
        context.commit('setTailleLogement', null);
        context.commit('setDureePrestation', null);
        context.commit('emptyInventaire');
        context.commit('setDateDemenagement', '');
        context.commit('emptyOptions');
        context.commit('setTarif', context.getters.getTarifAddresses);
        context.commit('setTarifPrec', 0);
        context.commit('setTarifOptions', 0);
      }
    }


});
