<template>
    <div id="panel-date-demenagement" class="container">
        <div class="container month-banner has-text-centered has-text-black has-background-warning" style="width: 740px; max-width: 740px">
          <i class="arrow" @click="setActivePreviousMonth(activeMonth.number)" v-bind:class="{ 'left': true, 'leftInactive': activeMonth.number == currentMonth && activeMonth.currentYear == currentYear }"></i>
          <span><b>{{ titleOfActiveMonth }} {{ titleOfActiveYear }}</b></span>
          <i class="arrow right" @click="setActiveNextMonth(activeMonth.number)"></i>
        </div>
        <div class="panel-display-dates column is-full" style="width: 740px; max-width: 740px" :key="displayDatesKey" v-click-outside="unselectAllDays">
          <div class="columns is-multiline" style="width: 740px; max-width: 740px" >
            <PanelJourCalendrier id="panel-jour-calendrier" v-for="day in days" v-if="day.number <= getNumberDaysInActiveMonth()"
              :key="day.number"
              :day="day" />
          </div>
        </div>
    </div>
</template>


<script>
import { store } from '../store.js';
import PanelJourCalendrier from './PanelJourCalendrier.vue';
import ClickOutside from 'vue-click-outside';

export default {
  name: 'PanelDateDemenagement',
  data () {
    return {
      displayDatesKey: 0,
      activeMonth : store.getActiveMonth(),
      activeDay : store.getActiveDay(),
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),

      closedDates: [],
      reservedDates: []
    };
  },
  firebase: {
    days: store.state.seedDay
  },
  components: {
    PanelJourCalendrier
  },
  mounted: function () {
    //initialiser à la date actuelle
    this.setActiveDay(this.currentDay);
    this.setActiveMonth(this.currentMonth);
    this.initCurrentMonthCurrentYear(this.currentMonth, this.currentYear);
    this.initDayNames(this.currentYear, this.currentMonth);
    this.getClosedReservedDatesByMonth(this.currentMonth);
  },
  methods: {
    setActiveMonth(monthNumber) {
      this.displayDatesKey += 1;
      store.unselectAllDays();
      store.setActiveMonth(monthNumber);
      //console.log(this.closedDates);
    },
    unselectAllDays() {
      store.unselectAllDays();
    },
    setActiveDay(dayNumber) {
      store.setActiveDay(dayNumber);
    },
    initCurrentMonthCurrentYear(monthNumber, year) {
      store.initCurrentMonthCurrentYear(monthNumber, year);
      console.log("Aujourd'hui : "+this.currentDay+"/"+this.currentMonth+"/"+this.currentYear);
    },
    initDayNames(year, activeMonthNumber) {
      store.initDayNames(year, activeMonthNumber);
    },

    setActiveNextMonth(monthNumber) {
      monthNumber = monthNumber+1;
      if(monthNumber > 11) {
        monthNumber = 0;
        this.currentYear = this.currentYear + 1;
      }
      this.setActiveMonth(monthNumber);
      this.initDayNames(this.currentYear, monthNumber);
      this.getClosedReservedDatesByMonth(monthNumber);
    },

    setActivePreviousMonth(monthNumber) {
      if(monthNumber >= 0) {
        monthNumber = monthNumber-1;
      }
      if(monthNumber < 0) {
        monthNumber = 11;
        this.currentYear = this.currentYear - 1;
      }
      this.setActiveMonth(monthNumber);
      this.initDayNames(this.currentYear, monthNumber);
      this.getClosedReservedDatesByMonth(monthNumber);
    },

    getNumberDaysInActiveMonth () {
      var numberDaysInActiveMonth = store.getNumberDaysInMonth(this.activeMonth.number, this.currentYear);
      return numberDaysInActiveMonth;
    },

    getClosedReservedDatesByMonth (monthNumber) {
      this.closedDates = [];
      this.closedDates = store.getClosedDatesByMonth(monthNumber);
      this.reservedDates = [];
      this.reservedDates = store.getReservedDatesByMonth(monthNumber);
    }
  },
  computed: {
    titleOfActiveMonth () {
      return this.activeMonth.title;
    },
    titleOfActiveYear () {
      return this.currentYear;
    }
  },
  directives: {
    ClickOutside
  }
}

</script>


<style lang="scss" scoped>

#panel-date-demenagement {

  .panel-display-dates {
    margin-left: 55px;
    //border: 2px solid red;
  }

    i {
      border: solid black;
      border-width: 0 4px 4px 0;
      display: inline-block;
      padding: 3px;
    }

    .right {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      position: absolute;
      top: 8px;
      right: 250px;
      &:hover {
        cursor: pointer;
        border: solid red;
        border-width: 0 5px 5px 0;

      }
      &:active {
      }
    }

    .left {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      position: absolute;
      top: 8px;
      left: 250px;
      &:hover {
        cursor: pointer;
        border: solid red;
        border-width: 0 5px 5px 0;

      }
      &:active {

      }
    }

    .leftInactive {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      position: absolute;
      top: 8px;
      left: 250px;
      pointer-events: none;
      opacity: 0.5;
    }
}

</style>
