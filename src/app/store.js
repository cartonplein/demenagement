import Vue from 'vue';
import Vuex from 'vuex';
import { config } from '../db/index.js'
import { seedMonth, seedDay } from '../db/seed.js';

const fb = require('../db/index.js');

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      orderNumber: 0,
      isAddressAvailable: false,
      isAideDem: false,
      isInventaire: false,
      isTransport: false,
      seedMonth,
      seedDay,
      inventaire: [],
      choicesUser: {
        pickupAddress: { adresse: '', cp: '', etage: '', ascenseur: '', hasAscenseur: false, cave: '' },
        destinationAddress: { adresse: '', cp: '', etage: '', ascenseur: '', hasAscenseur: false, cave: '' },
        direction: '',
        distance: { text: '', value: null },
        typeDemenagement: '',
        tailleLogement: null,
        dureePrestation: null,
        inventaire: [],
        dateDemenagement: [],
        creneauDemenagement: '',
        options: [],
        contact: { nom: '', prenom: '', telephone: '', email: '', reponseEnquete: [] },
        orderDateTime: ''
      },
      tarif: 0,
      tarifTransportSimple: 0,
      tarifDemInventaire: 0,
      vrTotalInventaire: 0,
      numberMovers: 0,
      numberItems: 0,
      isTransportTwoMovers: false,
    },

    getters: {

      getChoicesUser() {
        return store.state.choicesUser;
      },

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
        return parseFloat(Math.round(store.state.tarif * 100) / 100);
      },

      getTarifTransportSimple() {
        return store.state.tarifTransportSimple;
      },

      getTarifDemInventaire() {
        return store.state.tarifDemInventaire;
      },

      getOrderNumber() {
        return store.state.orderNumber;
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

      getInventaire() {
        return store.state.inventaire;
      },

      getInventaireUser() {
        return store.state.choicesUser.inventaire;
      },

      getDateDemenagementUser () {
        return store.state.choicesUser.dateDemenagement;
      },

      getCreneauDemenagementUser () {
        return store.state.choicesUser.creneauDemenagement;
      },

      getOptionsUser() {
        return store.state.choicesUser.options;
      },

      getVrTotalInventaire() {
        return store.state.vrTotalInventaire;
      },

      getNumberMovers() {
        return store.state.numberMovers;
      },

      getNumberItems() {
        return store.state.numberItems;
      },

      isTransportTwoMovers() {
        return store.state.isTransportTwoMovers;
      },

      getContactUser() {
        return store.state.choicesUser.contact;
      }
    },


    mutations: {

      setOrderNumber(state, orderNumber) {
        state.orderNumber = orderNumber;
      },

      setAddressAvailable (state, val) {
        state.isAddressAvailable = val;
      },

      setPickupAddressUser (state, pickupAddress) {
        state.choicesUser.pickupAddress.adresse = pickupAddress[0];
        //state.choicesUser.pickupAddress.surface = pickupAddress[1];
        state.choicesUser.pickupAddress.etage = pickupAddress[1];
        state.choicesUser.pickupAddress.ascenseur = pickupAddress[2];
        if(pickupAddress[3] !== 'Non') {
          state.choicesUser.pickupAddress.hasAscenseur = true;
        }
        state.choicesUser.pickupAddress.cave = pickupAddress[3];
      },

      setPickupCp (state, pickupCp) {
        state.choicesUser.pickupAddress.cp = pickupCp;
      },

      setDestinationAddressUser (state, destinationAddress) {
        state.choicesUser.destinationAddress.adresse = destinationAddress[0];
        //state.choicesUser.destinationAddress.surface = destinationAddress[1];
        state.choicesUser.destinationAddress.etage = destinationAddress[1];
        state.choicesUser.destinationAddress.ascenseur = destinationAddress[2];
        if(destinationAddress[3] !== 'Non') {
          state.choicesUser.destinationAddress.hasAscenseur = true;
        }
        state.choicesUser.destinationAddress.cave = destinationAddress[3];
      },

      setDestinationCp (state, destinationCp) {
        state.choicesUser.destinationAddress.cp = destinationCp;
      },

      setDirection (state, direction) {
        state.choicesUser.direction = direction;
      },

      setTypeAideDem(state, isAideDem) {
        state.isAideDem = isAideDem;
      },

      setTypeInventaire(state, isInventaire) {
        state.isInventaire = isInventaire;
      },

      setTypeTransport(state, isTransport) {
        state.isTransport = isTransport;
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

      unselectDay (state, dayNumber) {
        state.seedDay.map((dayObj) => {
          dayObj.number === dayNumber ? dayObj.selected = false : dayObj.selected = false;
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

      setTarif(state, tarif) {
        state.tarif = tarif;
      },

      setTarifTransportSimple (state, tarifTransportSimple) {
        state.tarifTransportSimple = tarifTransportSimple;
      },

      setTarifDemInventaire (state, tarifDemInventaire) {
        state.tarifDemInventaire = tarifDemInventaire;
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

      setInventaire(state, inventaire) {
        state.inventaire = inventaire;
        console.log(state.inventaire);
      },

      addElementInInventaireUser(state, element) {
        state.choicesUser.inventaire.push(element);
      },

      addElementInInventaire(state, element) {
        state.inventaire.push({
          number: element[0].number,
          name: element[0].name,
          image: element[0].image,
          volume: element[0].volume,
          vr: element[0].vr,
          canDisassemble: element[0].canDisassemble,
          quantity: element[1],
          quantityDemonter: element[2],
          tab: element[3]
        });
      },


      deleteElementFromInventaire(state, element) {
        state.inventaire.splice(state.inventaire.indexOf(element), 1);
      },

      /*
      modifyQuantityElementInventaire(state, elementNumberAndQuantity) {
        state.choicesUser.inventaire.map((elementObj) => {
          if(elementObj.number === elementNumberAndQuantity[0]) {
            elementObj.quantity = elementNumberAndQuantity[1];
          }
        });
      },

      modifyQuantityDemonterElementInventaire(state, elementNumberAndQuantity) {
        state.choicesUser.inventaire.map((elementObj) => {
          if(elementObj.number === elementNumberAndQuantity[0]) {
            elementObj.quantityDemonter = elementNumberAndQuantity[1];
          }
        });
      },
      */

      setVrTotalInventaire (state, vrTotalInventaire) {
        state.vrTotalInventaire = vrTotalInventaire;
      },

      emptyInventaire(state) {
        state.inventaire = [];
      },

      emptyInventaireUser(state) {
        state.choicesUser.inventaire = [];
      },

      resetInventaire(state) {
        for(var i=0; i<state.inventaire.length; i++) {
          state.inventaire[i].quantity = 0;
          state.inventaire[i].quantityDemonter = 0;
        }
      },


      setDateDemenagement (state, dateDemenagement) {
        state.choicesUser.dateDemenagement = dateDemenagement;
      },

      setCreneauDemenagement (state, creneauDemenagement) {
        state.choicesUser.creneauDemenagement = creneauDemenagement;
      },

      addOption(state, element) {
        state.choicesUser.options.push({
          number: element.number,
          name: element.name,
          tarif: element.tarif,
          quantity: 1
        });
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

      resetContactUser(state) {
        state.choicesUser.contact.prenom = '';
        state.choicesUser.contact.nom = '';
        state.choicesUser.contact.telephone = '';
        state.choicesUser.contact.email = '';
        state.choicesUser.contact.reponseEnquete = [];
      },

      setOrderDateTime(state, orderDateTime) {
        state.choicesUser.orderDateTime = orderDateTime;
      },

      setNumberMovers(state, numberMovers) {
        state.numberMovers = numberMovers;
      },

      setNumberItems(state, numberItems) {
        state.numberItems = numberItems;
      },

      setTransportTwoMovers(state, isTransportTwoMovers) {
        state.isTransportTwoMovers = isTransportTwoMovers;
      }

    },

    actions: {
      resetChoicesUser(context) {
        context.commit('setTypeDemenagement', '');
        context.commit('setTailleLogement', null);
        context.commit('setDureePrestation', null);
        context.commit('setTarifTransportSimple', 0);
        context.commit('setTarifDemInventaire', 0);
        context.commit('resetInventaire');
        context.commit('setNumberItems', 0);
        context.commit('setNumberMovers', 0);
        context.commit('setVrTotalInventaire', 0);
        context.commit('setDateDemenagement', '');
        context.commit('setCreneauDemenagement', '');
        context.commit('emptyOptions');
        context.commit('resetContactUser');
      },

      calculateNumberMovers(context) {
        context.commit('setTransportTwoMovers', false);
        if(context.getters.getNumberItems !== 0) {
          for(var i=0; i<context.getters.getInventaire.length; i++) {
            if(context.getters.getInventaire[i].vr > 0.2 && context.getters.getInventaire[i].quantity > 0) {
              context.commit('setTransportTwoMovers', true);
            }
          }
          if(context.getters.isTransportTwoMovers) {
            context.commit('setNumberMovers', 2);
          }
          else {
            context.commit('setNumberMovers', 1);
          }
        }
        else {
          context.commit('setNumberMovers', 0);
        }
      },

      calculateAccessibility(context) {

      }

    },




});
