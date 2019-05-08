import Vue from 'vue';
import { config } from '../db/index.js'

const fb = require('../db/index.js');

export const store = {
    state: {
      isForfait: false,
      isInventaire: false,
      seedSize: fb.rootRef.child('taillesLogement'),
      seedMonth: fb.rootRef.child('mois'),
      seedDay: fb.rootRef.child('jour'),
      seedElementsInventaire: fb.rootRef.child('meubles'),
      choicesUser: {
        pickupAddress: { adresse: '', surface: '', etage: '', ascenseur: '', cave: '' },
        destinationAddress: { adresse: '', surface: '', etage: '', ascenseur: '', cave: '' },
        distance: '',
        typeDemenagement: '',
        dureePrestation: '',
        tailleLogement: '',
        inventaire: [],
        demontageMeubles: [],
        dateDemenagement: '',
        options: [{name: 'option1', quantity: 1}],
        prix: '',
        contact: { nom: '', prenom: '', telephone: '', email: '', reponseEnquete: '' }
      }
    },

    displayChoiceUserByIndex(index) {
      return this.state.choicesUser[index];
    },

    getInventaireUser() {
      return this.state.choicesUser.inventaire;
    },

    getOptionsUser() {
      return this.state.choicesUser.options;
    },

    getDateDemenagementUser () {
      return this.state.choicesUser.dateDemenagement;
    },

    googleMapsData: {
      urlMap: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBcc_IiK7JtWDhD9jm20HHjDaduqKHkcNg"
    },

    openNextPage (currentPageId, nextPageId) {
      var nextPage = document.getElementById(nextPageId);
      var currentPage = document.getElementById(currentPageId);
      if (nextPage.style.display === "none") {
        nextPage.style.display = "block";
      }
      nextPage.scrollIntoView({ block: 'end',  behavior: 'smooth' });
      nextPage.style.opacity = "1";
      nextPage.style.pointerEvents = "initial";
      currentPage.style.opacity = "0.4";
      currentPage.style.pointerEvents = "none";
    },

    returnPreviousPage (currentPageId, previousPageId) {
      var previousPage = document.getElementById(previousPageId);
      var currentPage = document.getElementById(currentPageId);
      previousPage.scrollIntoView({ block: 'end',  behavior: 'smooth' });
      previousPage.style.opacity = "1";
      previousPage.style.pointerEvents = "initial";
      setTimeout(function() { currentPage.style.display = "none"; }, 500)
    },

    submitFormPickupAddress (pickupAdresse, pickupSurface, pickupEtage, pickupAscenseur, pickupCave) {

    },

    submitFormDestinationAddress (destinationAdresse, destinationSurface, destinationEtage, destinationAscenseur, destinationCave) {

    },

    selectTypeDemenagement (typeDemenagement) {
      this.state.choicesUser.typeDemenagement = typeDemenagement;
      console.log(this.state.choicesUser);
    },

    selectDureePrestation (dureePrestation) {
      this.state.choicesUser.dureePrestation = dureePrestation;
      console.log(this.state.choicesUser);
    },

    setSelectedSizeLogement (sizeId) {
      let seedSize = this.state.seedSize;
      seedSize.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedSize.child(child.key).update({selected: false});
          if(child.key == sizeId) {
            seedSize.child(child.key).update({selected: true});
          }
        });
      });
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

    selectTailleLogement (tailleLogement) {
      this.state.choicesUser.tailleLogement = tailleLogement;
      console.log(this.state.choicesUser);
    },

    selectDateDemenagement (dateDemenagement) {
      this.state.choicesUser.dateDemenagement = dateDemenagement;
      console.log(this.state.choicesUser);
    },

    getIdCurrentMonth () {
      var d = new Date();
      return d.getMonth();
    },

    initDayNames(year, activeMonthNumber) {
      let days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          let d = new Date(year, activeMonthNumber, child.key);
          let dayName = days[d.getDay()];
          seedDay.child(child.key).update({name: dayName});
        });
      });
    },

    initCurrentMonthCurrentYear(monthNumber, year) {
      let seedMonth = this.state.seedMonth;
      let seedDay = this.state.seedDay;
      seedMonth.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedMonth.child(child.key).update({currentYear: year});
        });
      });
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          seedDay.child(child.key).update({currentMonth: monthNumber});
          seedDay.child(child.key).update({currentYear: year});
        });
      });
    },

    setActiveMonth (monthNumber) {
      let seedMonth = this.state.seedMonth;
      seedMonth.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedMonth.child(child.key).update({active: false});
          if(child.key == monthNumber+1) {
            seedMonth.child(child.key).update({active: true});
          }
        });
      });
    },

    getActiveMonth () {
      let seedMonth = this.state.seedMonth;
      var activeMonth = { title: '', number: '', currentYear: '' };
      seedMonth.orderByChild('active').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        activeMonth.title = data.title;
        activeMonth.number = data.number;
        activeMonth.currentYear = data.currentYear;
      });
      return activeMonth;
    },


    getCurrentYear () {
      return new Date().getFullYear();
    },

    getNumberDaysInMonth (month, year) {
      return new Date(year, month+1, 0).getDate();
    },

    getDayName (year, month, day) {
      var days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      var d = new Date(year, month, day);
      return days[d.getDay()];
    },

    setSelectedDay (dayNumber) {
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          seedDay.child(child.key).update({selected: false});
          if(child.key == dayNumber) {
            seedDay.child(child.key).update({selected: true});
          }
        });
      });
    },

    getSelectedDay () {
      let seedDay = this.state.seedDay;
      var selectedDay = { number: '' };
      seedDay.orderByChild('selected').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        selectedDay.number = data.number;
      });
      return selectedDay;
    },

    setActiveDay (dayNumber) {
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          seedDay.child(child.key).update({active: false});
          if(child.key == dayNumber) {
            seedDay.child(child.key).update({active: true});
          }
        });
      });
    },

    getActiveDay () {
      let seedDay = this.state.seedDay;
      var activeDay = { number: '', currentMonth: '', currentYear: '' };
      seedDay.orderByChild('active').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        activeDay.number = data.number;
        activeDay.currentMonth = data.currentMonth;
        activeDay.currentYear = data.currentYear;
      });
      return activeDay;
    },

    unselectAllDays () {
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          child.ref.update({selected: false});
        });
      });
    },

    getClosedDatesByMonth (monthNumber) {
      let seedClosedDates = fb.backOfficeRef.child('datesFermees');
      var closedDatesByMonth = [];
      seedClosedDates.orderByKey().on('child_added', function(snapshot) {
        if(snapshot.key == monthNumber) {
          snapshot.forEach(function(child){
            closedDatesByMonth.push(child.val());
          });
        }
      });
      return closedDatesByMonth;

    },

    getReservedDatesByMonth (monthNumber) {
      let seedReservedDates = fb.backOfficeRef.child('datesReservees');
      var reservedDatesByMonth = [];
      seedReservedDates.orderByKey().once('value', function(snapshot) {
        if(snapshot.key == monthNumber) {
          snapshot.forEach(function(child){
            reservedDatesByMonth.push(child.val());
          });
        }
      });
      return reservedDatesByMonth;

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

    getCurrentTarif() {

    },


    updatePickupAddressChoicesUser (pickupAddressAdresse, pickupAddressSurface, pickupAddressEtage, pickupAddressAscenseur, pickupAddressCave) {
  /*    this.state.seedChoicesUser.map((choicesUserObj) => {
        choicesUserObj.pickupAddress.push({
          "adresse": pickupAddressAdresse,
          "surface": pickupAddressSurface,
          "etage" : pickupAddressEtage,
          "ascenseur" : pickupAddressAscenseur,
          "cave" : pickupAddressCave
        });
      });*/

      //alert(pickupAddressAdresse+ ' ' +pickupAddressSurface+ ' ' +pickupAddressEtage+ ' ' +pickupAddressAscenseur+ ' ' +pickupAddressCave);

    },
    updateDestinationAddressChoicesUser (destinationAddressAdresse, destinationAddressSurface, destinationAddressEtage, destinationAddressAscenseur, destinationAddressCave) {
    /*  this.state.seedChoicesUser.map((choicesUserObj) => {
        choicesUserObj.destinationAddress.push({
          "adresse": destinationAddressAdresse,
          "surface": destinationAddressSurface,
          "etage" : destinationAddressEtage,
          "ascenseur" : destinationAddressAscenseur,
          "cave" : destinationAddressCave
        });
      });*/
    },

    addElementInInventaire(element) {
      this.state.choicesUser.inventaire.push({ id: element.number, name: element.name, icon: element.icon, quantity: 1, quantityDemonter: 0 });
    },

    updateElementQuantity(element, quantity) {
      const index = this.state.choicesUser.inventaire.findIndex((e) => e.id === element.id);
      this.state.choicesUser.inventaire[index].quantity = quantity;
    },

    updateElementQuantityDemonter(element, quantityDemonter) {
      const index = this.state.choicesUser.inventaire.findIndex((e) => e.id === element.id);
      this.state.choicesUser.inventaire[index].quantityDemonter = quantityDemonter;
    },

    deleteElementFromInventaire(element) {
      this.state.choicesUser.inventaire.splice(this.state.choicesUser.inventaire.indexOf(element), 1);
    },

    finaliserCommande () {

    },

    submitContactInformation(inputContactPrenom, inputContactNom, inputContactTelephone, inputContactEmail) {
      console.log(inputContactPrenom, inputContactNom, inputContactTelephone, inputContactEmail);
    },

    getDirection (origin, destination) {
      return this.googleMapsData.urlMap+="&origin="+origin+"&destination="+destination+"&mode=bicycling";
    }
}
