<template>
    <div id="panel-jour-calendrier" @click="selectDay"
      v-bind:class="{ 'styleInitial': true,
                      'styleWeekend' : (day.name == 'Sam' || day.name == 'Dim') && !(day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear),
                      'styleToday': day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear,
                      'styleSelected':  day.selected,
                      'styleUnselected': !day.selected,
                      'styleSelectedToday': (day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear) && day.selected,
                      'styleInactive': day.number < this.$parent.getActiveDay().number && day.currentMonth >= this.$parent.getActiveMonth().number && day.currentYear >= this.$parent.currentYear,
                      'styleSelectedWeekend' : (day.name == 'Sam' || day.name == 'Dim') && day.selected && !(day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear),
                      'styleReservedDate': this.$parent.reservedDates &&
                                  this.$parent.reservedDates[this.$parent.getActiveMonth().number] &&
                                  this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number] &&
                                  this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear),
                      'styleClosedDate' : this.$parent.closedDates &&
                                this.$parent.closedDates[this.$parent.getActiveMonth().number] &&
                                this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number] &&
                                this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear),
                      }"
      >
      <div class="day-banner has-text-justified has-text-black"><b>{{ day.number }}</b></div>
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
        let date = ""+this.day.number+" "+this.$parent.getActiveMonth().name+" "+this.$parent.currentYear+"";
        store.selectDateDemenagement(date);
      }

    }
}

</script>


<style lang="scss" scoped>

.styleInitial {
  background: #f6b26bff;
  //border: 2px solid black;
  border-radius: 0;

  padding: 10px;
  overflow: hidden;
  margin: 1px;

  height: 75px;
  max-height: 75px;
  width: 100px;
  max-width: 100px;

  &:hover {
    background: darken(#e69138ff,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #e69138ff;
  }
}

.styleSelected {
  background-color: #e69138ff;
  border:  4px solid red;
}
.styleUnselected {
  background-color: #f6b26bff;
  //border:  2px solid black;
}

.styleToday {
  background-color: #F1875F;
  &:hover {
    background: darken(#E4612F,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #E4612F;
  }
}

.styleSelectedToday {
  background-color: #E4612F;
  border:  4px solid red;
}

.styleInactive {
  background-color: #F4DDC3;
  pointer-events: none;
  opacity: 0.3;
}

.styleWeekend {
  background-color: #CFA87A;
  &:hover {
    background: darken(#BC8544,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #BC8544;
  }
}

.styleSelectedWeekend {
  background-color: #BC8544;
  border:  4px solid red;
}

.styleReservedDate {
  background-color: #5A94B8;
  pointer-events: none;
}

.styleClosedDate {
  background-color: #5AB897;
  pointer-events: none;
}

</style>
