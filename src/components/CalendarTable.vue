<template>
  <div class="calendar">
    <div class="calendar__header">
      <h2>{{ months[month] }}</h2>
      <h3>Свободных мест {{ free }} из {{ all }}</h3>
    </div>
    <div class="calendar__wrapper">
      <calendar-view
        :enable-drag-drop="true"
        dropzone="true"
        @drop="dropHandler($event)"
        :show-date="date"
        :starting-day-of-week="1"
        class="theme-default">
        <template #dayContent="props">
          <div v-if="availableRecords[props.day]" class="available" :class="{ 'available_critical': availableRecords[props.day].isCritical }">
            <div class="available__day">{{ props.day.getDate() }}</div>
            <div class="available__num">{{ availableRecords[props.day].value }}</div>
          </div>
        </template>
      </calendar-view>
    </div>
  </div>
</template>
<script>
import { CalendarView } from "vue-simple-calendar"

import "../../node_modules/vue-simple-calendar/dist/style.css"

export default {
  name: 'CalendarTable',
  components: {
    CalendarView
  },
  props: {
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      weekDays: [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ],
      months: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
      free: 345,
      all: 1000
    }
  },
  computed: {
    date() {
      return new Date(this.year, this.month)
    },
    prevDate() {
      if (this.month === 0) {
        return new Date(this.year - 1, 11)
      } else return new Date(this.year, this.month - 1)
    },
    nextDate() {
      if (this.month === 11) {
        return new Date(this.year + 1, 0)
      } else return new Date(this.year, this.month + 1)
    },
    availableRecords() {
      const records = this.$store.state.records;
      const availableRecords = {}

      for (let rec of records) {
        availableRecords[rec.date] = {
          value: `${ rec.availableNum } из ${ rec.recordsNum }`,
          isCritical: rec.availableNum / rec.recordsNum <= 0.2
        }
      }

      return availableRecords
    },
    draggingEmp() {
      return this.$store.state.draggingEmp
    }
  },
  methods: {
    dropHandler(e) {
      if (e.target.classList.contains('available')) {
        this.recordEmp(e.target.firstChild.innerText)
      }
    },
    recordEmp(day) {
      this.$store.commit({
        type: 'recordEmp',
        day: day
      })
    }
  }
}
</script>
<style lang="scss">
.cv-wrapper,.cv-wrapper div{
    line-height: 21px;
    font-size: 14px;
    color: #999999;

    &.cv-header-day {
      color: #353535;
      font-size: 12px;
      line-height: 16px;
    }
}
.cv-header-days {
  border: none;
}
.cv-header-day{
    justify-content: flex-start;
    border: none;
    text-transform: capitalize;
    padding: 0;
    padding-bottom: 4px;
}
.cv-weeks{
    background-color: #F9F9F9;
    height: 316px;
}
.cv-weekdays{
    overflow-y: hidden;
}
.cv-day-number{
    padding: 9px;  
}
.cv-item{
    padding-left: 9px;
    padding-top: 22px;
}
.cv-header-days,.cv-header-day,.cv-weeks,.cv-week,.cv-day,.cv-item{
    border-color: #DBDADA;
}
 







.calendar {
  &__wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    
    margin-bottom: 16px;

    font-family: var(--font-medium);

    h2 {
      font-size: 20px;
      line-height: 28px;
      color: #E31243;
    }

    h3 {
      font-size: 16px;
      line-height: 22px;
      color: #06C270;
    }
  }
}

.cv-day .available {
  background-color: #FFFFFF;
  width: 100%;
  margin-left: -32px;
  padding: 9px;
  
  &__num {
    color: #06C270;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.02em;
  }

  &_critical .available__num {
    color: #FF8800;
  }

  &__day {
    color: #353535;
    margin-bottom: 10px;
  }
}
</style>