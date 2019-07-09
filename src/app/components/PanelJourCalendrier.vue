<template>
    <div id="panel-jour-calendrier" @click="selectDay"
      v-bind:class="{ 'styleInitial': true,
                      'styleWeekend' : (day.name == 'Sam' || day.name == 'Dim') && !(day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear),
                      'styleSelected':  day.selected,
                      'styleInactive': day.number < this.$parent.getActiveDay().number && day.currentMonth >= this.$parent.getActiveMonth().number && day.currentYear >= this.$parent.currentYear,
                      'styleSelectedWeekend' : (day.name == 'Sam' || day.name == 'Dim') && day.selected && !(day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear),
                      'styleReservedDate': (this.$parent.reservedDates &&
                                  this.$parent.reservedDates[this.$parent.getActiveMonth().number] &&
                                  this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number] &&
                                  this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear)) &&
                                  !(day.number < this.$parent.getActiveDay().number &&
                                    day.currentMonth >= this.$parent.getActiveMonth().number &&
                                    day.currentYear >= this.$parent.currentYear),
                      'styleClosedDate' : (this.$parent.closedDates &&
                                this.$parent.closedDates[this.$parent.getActiveMonth().number] &&
                                this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number] &&
                                this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear)) &&
                                !(day.number < this.$parent.getActiveDay().number &&
                                  day.currentMonth >= this.$parent.getActiveMonth().number &&
                                  day.currentYear >= this.$parent.currentYear),
                      }"
      >
      <div class="day-banner has-text-justified"><b>{{ day.number }}</b></div>
      <!--<span class="tarif-date" v-show="!(day.number < this.$parent.getActiveDay().number &&
                                                        day.currentMonth >= this.$parent.getActiveMonth().number &&
                                                        day.currentYear >= this.$parent.currentYear) &&
                                                        !((this.$parent.closedDates &&
                                                           this.$parent.closedDates[this.$parent.getActiveMonth().number] &&
                                                           this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number] &&
                                                           this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear))
                                                          ||
                                                         (this.$parent.reservedDates &&
                                                           this.$parent.reservedDates[this.$parent.getActiveMonth().number] &&
                                                           this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number] &&
                                                           this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear))
                                                         )"><b>{{ tarifDate }}€</b></span>-->
      <span class="tarif-date" style="color: red" v-show="!(day.number < this.$parent.getActiveDay().number &&
                                                        day.currentMonth >= this.$parent.getActiveMonth().number &&
                                                        day.currentYear >= this.$parent.currentYear) &&
                                                        (this.$parent.closedDates &&
                                                           this.$parent.closedDates[this.$parent.getActiveMonth().number] &&
                                                           this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number] &&
                                                           this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear)
                                                        )"><b>FERMÉ</b></span>
      <span class="tarif-date" style="color: red" v-show="!(day.number < this.$parent.getActiveDay().number &&
                                                        day.currentMonth >= this.$parent.getActiveMonth().number &&
                                                        day.currentYear >= this.$parent.currentYear) &&
                                                        (this.$parent.closedDates &&
                                                          this.$parent.reservedDates[this.$parent.getActiveMonth().number] &&
                                                          this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number] &&
                                                          this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear)
                                                        )"><b>RÉSERVÉ</b></span>
    </div>
</template>


<script>
import { config } from '../../db/index.js';

const fb = require('../../db/index.js');

export default {
    name: 'PanelJourCalendrier',
    data () {
      return {
        tarif: 0,
        dayNumber: this.day.number,
        dayName: this.day.name,
      };
    },
    props: {
      day: Object
    },
    mounted() {
      let panelDay = this;
      fb.agendaRef.child('tarifParDate').on('child_added', function(snapshot) {
        fb.agendaRef.child('tarifParDate/tarifParDefaut').on('child_added', function(snapshot) {
          panelDay.tarif = snapshot.val();
        });
        fb.agendaRef.child('tarifParDate/tarifSpecial').on('child_added', function(snapshot) {
          if(snapshot.key == panelDay.$parent.getActiveMonth().number && snapshot.val().hasOwnProperty(panelDay.$parent.currentYear)) {
            if(snapshot.val() && snapshot.val()[panelDay.$parent.currentYear].hasOwnProperty(panelDay.day.number)) {
              panelDay.tarif = snapshot.val()[panelDay.$parent.currentYear][panelDay.day.number].tarif;
            }
          }
        });
      });
      fb.agendaRef.child('tarifParDate').on('child_changed', function(snapshot) {
        fb.agendaRef.child('tarifParDate/tarifParDefaut').on('child_added', function(snapshot) {
          panelDay.tarif = snapshot.val();
        });
        fb.agendaRef.child('tarifParDate/tarifSpecial').on('child_added', function(snapshot) {
          if(snapshot.key == panelDay.$parent.getActiveMonth().number && snapshot.val().hasOwnProperty(panelDay.$parent.currentYear)) {
            if(snapshot.val() && snapshot.val()[panelDay.$parent.currentYear].hasOwnProperty(panelDay.day.number)) {
              panelDay.tarif = snapshot.val()[panelDay.$parent.currentYear][panelDay.day.number].tarif;
              if(panelDay.day.selected) {
                panelDay.$store.commit('setTarif', panelDay.$store.getters.getTarif + panelDay.tarif);
              }
            }
          }
        });
      });
    },
    methods: {
      selectDay() {
        if(!this.day.selected) {
          this.$store.commit('unselectAllDays');
          this.$store.commit('setSelectedDay', this.dayNumber);
          console.log(this.$store.getters.getTarifTransportSimple);
          this.$store.commit('setTarif', this.$store.getters.getTarifTransportSimple + this.tarif);
          this.$store.commit('setDateDemenagement', [this.day.number, this.$parent.getActiveMonth().number, this.$parent.currentYear]);
        }
        else {
          this.$store.commit('unselectDay', this.dayNumber);
          this.$store.commit('setTarif', this.$store.getters.getTarif - this.tarif);
          this.$store.commit('setDateDemenagement', []);
          this.$store.commit('setCreneauDemenagement', '');
          this.$parent.$parent.isCreneauMatin = false;
          this.$parent.$parent.isCreneauSoir = false;
        }
      }

    },
    computed: {
      tarifDate() {
        return this.tarif;
      }
    }
}

</script>


<style lang="scss" scoped>

.styleInitial {
  background: #FFF;
  border: 1px solid #E85029;
  border-radius: 0;
  color: #E85029;
  cursor: pointer;

  padding: 10px;
  overflow: hidden;
  margin: 1px;

  height: 75px;
  max-height: 75px;
  width: 100px;
  max-width: 100px;

  .tarif-date {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    vertical-align: middle;
    line-height: 16px;
    font-size: 16px;
  }
  &:hover {
    transform: translateY(2px);
    background-color: #EFEFF0;
  }
}

.styleSelected {
  background-color: #EFEFF0;
  border: 4px solid red;
}

.styleInactive {
  pointer-events: none;
  opacity: 0.3;
}

.styleWeekend {
  background-color: #DBDBDE;
  &:hover {
    background-color: #B8B8B9;
  }
}

.styleSelectedWeekend {
  background-color: #B8B8B9;
  border:  4px solid red;
}

.styleReservedDate {
  pointer-events: none;
}

.styleClosedDate {
  pointer-events: none;
}

</style>
