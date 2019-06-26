<template>
    <div id="panel-date-demenagement" class="container">
      <div class="calendar">
          <table id="agenda">
            <tr id="row-month">
              <th id="month-display" colspan="7">

                <i class="arrow" @click="setActivePreviousMonth(getActiveMonth().number)" v-bind:class="{ 'left': true, 'leftInactive': getActiveMonth().number == currentMonth && getActiveMonth().currentYear == currentYear }"></i>
                <span style="font-size: 20px; color: #E85029;"><b>{{ getActiveMonth().name }} {{ titleOfActiveYear }}</b></span>
                <i class="arrow right" @click="setActiveNextMonth(getActiveMonth().number)"></i>

              </th>
            </tr>

            <tr id="days-display">
              <th scope="col" v-for="dayName in dayNames" :key="dayName" style="color: #E85029;">{{ dayName }}</th>
            </tr>

            <tr id="days-row-one">
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
            </tr>

            <tr id="days-row-two">
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(2)  && day.number <= getLastDateByWeek(2) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
            </tr>

            <tr id="days-row-three">
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
            </tr>

            <tr id="days-row-four">
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
            </tr>

            <tr id="days-row-five">
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                  :key="day.number"
                  :day="day" />
              </td>
            </tr>

            <tr id="days-row-six">
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Lun'"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Mar'"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Mer'"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Jeu'"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Ven'"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Sam'"
                  :key="day.number"
                  :day="day" />
              </td>
              <td>
                <PanelJourCalendrier v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Dim'"
                  :key="day.number"
                  :day="day" />
              </td>
            </tr>
          </table>
        </div>
    </div>
</template>


<script>

import PanelJourCalendrier from './PanelJourCalendrier.vue';
import ClickOutside from 'vue-click-outside';
import { config } from '../../db/index.js';

const fb = require('../../db/index.js');

export default {
  name: 'PanelDateDemenagement',
  data () {
    return {
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      dayNames: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],

      days: this.$store.getters.getDays,
      reservedDates: {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}},
      closedDates: {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}}
    };
  },
  components: {
    PanelJourCalendrier
  },
  created() {
    this.setActiveDay(this.currentDay);
    this.setActiveMonth(this.currentMonth);
  },
  mounted: function () {
    //initialiser à la date actuelle
    this.initCurrentMonthCurrentYear(this.currentMonth, this.currentYear);
    console.log("Aujourd'hui : "+this.currentDay+"/"+(this.currentMonth+1)+"/"+this.currentYear);
    this.initDayNames(this.currentMonth, this.currentYear);
    console.log(this.getActiveDay());
    this.getClosedReservedDatesByMonth(this.currentMonth);
  },
  methods: {
    setActiveMonth(monthNumber) {
      this.$store.commit('unselectAllDays');
      this.$store.commit('setActiveMonth', monthNumber);
      if(this.$store.getters.getDateDemenagementUser.length !== 0) {
        if(this.$store.getters.getDateDemenagementUser[1] == this.getActiveMonth().number) {
          this.$store.commit('setSelectedDay', this.$store.getters.getDateDemenagementUser[0]);
        }
      }
    },

    getActiveMonth() {
      return this.$store.getters.getActiveMonth;
    },

    getActiveDay() {
      return this.$store.getters.getActiveDay;
    },

    setActiveDay(dayNumber) {
      this.$store.commit('setActiveDay', dayNumber);
    },

    setActiveNextMonth(monthNumber) {
      monthNumber = monthNumber+1;
      if(monthNumber > 11) {
        monthNumber = 0;
        this.currentYear = this.currentYear + 1;
      }
      this.setActiveMonth(monthNumber);
      this.initDayNames(monthNumber, this.currentYear);
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

      this.initDayNames(monthNumber, this.currentYear);
      this.getClosedReservedDatesByMonth(monthNumber);
    },

    initDayNames(monthNumber, year) {
      let monthAndYear = [monthNumber, year];
      this.$store.commit('initDayNames', monthAndYear);
    },

    initCurrentMonthCurrentYear(monthNumber, year) {
      let monthAndYear = [monthNumber, year];
      this.$store.commit('initCurrentMonthCurrentYear', monthAndYear);
    },

    getNumberDaysInActiveMonth () {
      return new Date(this.currentYear, this.getActiveMonth().number+1, 0).getDate();
    },

    getDayName (year, month, day) {
      var days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      var d = new Date(year, month, day);
      return days[d.getDay()];
    },

    getLastDateByWeek(week) {
      let lastDateByWeek = 7;

      if(this.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Mar') { lastDateByWeek = 6; }
      if(this.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Mer') { lastDateByWeek = 5; }
      if(this.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Jeu') { lastDateByWeek = 4; }
      if(this.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Ven') { lastDateByWeek = 3; }
      if(this.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Sam') { lastDateByWeek = 2; }
      if(this.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Dim') { lastDateByWeek = 1; }

      if(week == 1) { return lastDateByWeek; }
      if(week == 2) { return lastDateByWeek + 7; }
      if(week == 3) { return lastDateByWeek + 14; }
      if(week == 4) { return lastDateByWeek + 21; }
      if(week == 5) { return lastDateByWeek + 28; }
      if(week == 6) { return this.getNumberDaysInActiveMonth(); }
    },

    getFirstDateByWeek(week) {

      if(week == 2) { return this.getLastDateByWeek(1) + 1; }
      if(week == 3) { return this.getLastDateByWeek(2) + 1; }
      if(week == 4) { return this.getLastDateByWeek(3) + 1; }
      if(week == 5) { return this.getLastDateByWeek(4) + 1; }
      if(week == 6) { return this.getLastDateByWeek(5) + 1; }

    },

    getClosedReservedDatesByMonth (monthNumber) {
      let agenda = this;
      fb.agendaRef.child('datesReservees').on('child_added', function(snapshot) {
        agenda.reservedDates[snapshot.key] = snapshot.val();
      });
      fb.agendaRef.child('datesReservees').on('child_changed', function(snapshot) {
        agenda.reservedDates[snapshot.key] = snapshot.val();
      });
      fb.agendaRef.child('datesReservees').on('child_removed', function(snapshot) {
        //snapshot.forEach(function(child) {
        agenda.reservedDates[snapshot.key] = {};
        //});
      });
      fb.agendaRef.child('datesFermees').on('child_added', function(snapshot) {
        agenda.closedDates[snapshot.key] = snapshot.val();
      });
      fb.agendaRef.child('datesFermees').on('child_changed', function(snapshot) {
        agenda.closedDates[snapshot.key] = snapshot.val();
      });
      fb.agendaRef.child('datesFermees').on('child_removed', function(snapshot) {
        //snapshot.forEach(function(child) {
        agenda.closedDates[snapshot.key] = {};
        //});
      });
    },


  },
  computed: {
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

    #agenda {
      background-color: #FFF;
      opacity: 0.95;
      border: 1px solid #E85029;
      box-shadow: 0 2px 2px 0 #E85029;
    }

    table {
      border-collapse: collapse;
      //border: 1px solid rgb(100, 100, 100);
      letter-spacing: 1px;
      margin: auto;
      table-layout: fixed;
      width: 720px;
      max-width: 720px;
      position: absolute;
      left: 0;
    }

    th,
    td {
      //overflow: hidden;
      text-align: center;
    }


    #month-display, #days-display {
      //border: 1px solid rgb(100, 100, 100);
      padding: 5px 5px;

      i {
        border: solid black;
        border-width: 0 4px 4px 0;
        display: inline-block;
        padding: 3px;
      }

      .right {
        border: solid #E85029;
        border-width: 0 4px 4px 0;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        position: absolute;
        right: 200px;
        top: 15px;
        &:hover {
          cursor: pointer;
          border: solid red;
          border-width: 0 5px 5px 0;

        }
      }

      .left {
        border: solid #E85029;
        border-width: 0 4px 4px 0;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        position: absolute;
        left: 200px;
        top: 15px;
        &:hover {
          cursor: pointer;
          border: solid red;
          border-width: 0 5px 5px 0;

        }
      }

      .leftInactive {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        pointer-events: none;
        opacity: 0.5;

      }
    }




}

</style>
