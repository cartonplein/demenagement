<template>
    <div id="panel-jour-calendrier" @click="selectDay"
      v-bind:class="{ 'styleInitialPanel': true,
                      'styleTodayPanel': day.number == this.$parent.currentDay && day.currentMonth == this.$parent.activeMonth.number && day.currentYear == this.$parent.currentYear,
                      'styleSelectedPanel':  day.selected == true,
                      'styleUnselectedPanel': day.selected == false,
                      'styleSelectedTodayPanel': day.active == true && day.selected == true,
                      'styleInactivePanel': day.number < this.$parent.activeDay.number && day.currentMonth >= this.$parent.activeMonth.number && day.currentYear >= this.$parent.currentYear,
                      'styleReservedDatePanel': isReserved == true,
                      'styleClosedDatePanel' : isClosed == true,
                      }"
      >
      <div class="day-banner has-text-justified has-text-black"><b>{{ day.number }}</b> {{ day.name }}</div>
      <div class="day-banner has-text-centered has-text-danger" v-show="isClosed"><b>FERMÉ</b></div>
      <div class="day-banner has-text-centered has-text-danger" v-show="isReserved"><b>RÉSERVÉ</b></div>
    </div>
</template>


<script>
import { store } from '../store.js';

export default {
    name: 'PanelJourCalendrier',
    data () {
      return {
        dayNumber: this.day.number,
        dayName: this.day.name,
        isClosed: this.$parent.closedDates.includes(this.day.number),
        isReserved: this.$parent.reservedDates.includes(this.day.number),
      };
    },
    props: {
      day: Object
    },
    methods: {
      selectDay() {
        store.unselectAllDays();
        //this.day.selected = !this.day.selected;
        store.setSelectedDay(this.dayNumber);
        let date = ""+this.day.number+" "+this.$parent.activeMonth.title+" "+this.$parent.currentYear+"";
        store.selectDateDemenagement(date);
      }

    }
}

</script>


<style lang="scss" scoped>

.styleInitialPanel {
  background: #f6b26bff;
  //border: 2px solid black;
  border-radius: 0;

  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  overflow: hidden;
  margin-top: 5px;

  height: 95px;
  max-height: 95px;
  width: 95px;
  max-width: 95px;

  &:hover {
    background: darken(#e69138ff,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #e69138ff;
  }
}

.styleSelectedPanel {
  background-color: #e69138ff;
  border:  4px solid red;
}
.styleUnselectedPanel {
  background-color: #f6b26bff;
  //border:  2px solid black;
}

.styleTodayPanel {
  background-color: #E2C96A;
  //border:  3px solid black;
}

.styleSelectedTodayPanel {
  background-color: #e69138ff;
  border:  4px solid red;
}

.styleInactivePanel {
  background-color: #F4DDC3;
  pointer-events: none;
  opacity: 0.6;
}

.styleReservedDatePanel {
  background-color: #5A94B8;
  pointer-events: none;
}

.styleClosedDatePanel {
  background-color: #5AB897;
  pointer-events: none;
}

</style>
