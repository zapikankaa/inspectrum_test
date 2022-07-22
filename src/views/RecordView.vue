<template>
  <div class="record">
    <section class="record__schedule schedule">
      <h1 class="schedule__title">Предварительный медицинский осмотр лиц, поступающих в учебные заведения гражданской авиации (ГА)</h1>
      <nav class="schedule__nav">
        <ul class="months-list">
          <li class="months-list__item"
              :class="{ active: calendarMonth === 4 }"
              @click="calendarMonth = 4">Май</li>
          <li class="months-list__item"
              :class="{ active: calendarMonth === 5 }"
              @click="calendarMonth = 5">Июнь</li>
          <li class="months-list__item"
              :class="{ active: calendarMonth === 6 }"
              @click="calendarMonth = 6">Июль</li>
          <li class="months-list__item"
              :class="{ active: calendarMonth === 7 }"
              @click="calendarMonth = 7">Август</li>
          <li class="months-list__item"
              :class="{ active: calendarMonth === 8 }"
              @click="calendarMonth = 8">Сентябрь</li>
          <li class="months-list__item"
              :class="{ active: calendarMonth === 9 }"
              @click="calendarMonth = 9">Октябрь</li>
          <li class="months-list__item"
              :class="{ active: calendarMonth === 10 }"
              @click="calendarMonth = 10">Ноябрь</li>
          <li class="months-list__item"
              :class="{ active: calendarMonth === 11 }"
              @click="calendarMonth = 11">Декабрь</li>
        </ul>
      </nav>
      <calendar-table class="schedule__calendar" :year="this.$store.state.currentYear" :month="calendarMonth"></calendar-table>
      <footer class="schedule__footer">
        <div class="records-num">
          <div class="records-num__item">
            <div class="records-num__title">Мест по договору</div>
            <div class="records-num__number">{{ recordsByContract.busy + recordsByContract.available }}</div>
          </div>
          <div class="records-num__item">
            <div class="records-num__title">Записанных</div>
            <div class="records-num__number records-num__number_blue">{{ recordsByContract.busy }}</div>
          </div>
          <div class="records-num__item">
            <div class="records-num__title">Свободных</div>
            <div class="records-num__number records-num__number_green">{{ recordsByContract.available }}</div>
          </div>
        </div>
        <div class="schedule__buttons">
          <button-base btn-style="blue">Распределить автоматически {{ autoCompleteAvailable }}</button-base>
          <button-base btn-style="red">Записать</button-base>
        </div>
      </footer>
    </section>

    <section class="record__employees employees">
      <div class="employees__buttons">
        <button-base class="employees__add-btn" btn-style="red">Добавить сотрудника</button-base>
        <button-base class="employees__remove-btn" btn-style="red-ghost">
          <img src="../assets/remove.svg" alt="" />
          <span>Удалить всех</span>
        </button-base>
      </div>
      <div class="employees__heading">
        <h2>Список сотрудников {{ employeesNum }}</h2>
        <h3>Записанных {{ recordedNum }}</h3>
      </div>
      <div class="employees__list list">
        <div class="row list__heading">
          <div class="row__left">ФИО</div>
          <div class="row__right">Дата записи</div>
        </div>
        <div v-for="dept in this.$store.getters.departments" :key="dept" class="dept">
          <div class="dept__header row" @click="departmentsExpanded[dept[0].department] = !departmentsExpanded[dept[0].department]">
            <div class="row__left">
              <img src="../assets/dnd.svg" alt="">
              <span>{{ dept[0].department }}</span>
              <span class="amount">{{ dept.length }}</span>
            </div>
            <div class="row__right">
              <img src="../assets/expand.svg" class="dept__icon" alt="">
            </div>
          </div>
          <div v-show="departmentsExpanded[dept[0].department]">
            <div draggable="true" @dragstart="dragstartHandler(emp.id)" v-for="emp in dept" :key="emp.id" class="row list__emp">
              <div class="row__left">
                <img src="../assets/dnd.svg" alt="">
                <span>{{ emp.name }}</span>
              </div>
              <div class="row__right">
                <span>{{ emp.date ? recDate(emp.date) : '--.--.----' }}</span>
                <img src="../assets/remove.svg" class="dept__icon dept__icon_remove" alt="">
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CalendarTable from '../components/CalendarTable.vue'
import ButtonBase from '../components/ButtonBase.vue'

export default {
  name: 'RecordView',
  components: {
    CalendarTable,
    ButtonBase
  },
  data() {
    return {
      departmentsExpanded: {},
      autoCompleteAvailable: 32,
      recordsByContract: {
        busy: 60,
        available: 40
      }
    }
  },
  computed: {
    calendarMonth() {
      return this.$store.state.currentMonth
    },
    employeesNum() {
      return this.$store.state.employees.length
    },
    recordedNum() {
      let n = 0

      for (let emp in this.$store.state.employees){
        if (emp.date) n++
      }

      return n
    },
    draggingEmp() {
      return this.$store.state.draggingEmp
    }
  },
  beforeMount() {
    for (let dept in this.$store.getters.departments) {
      this.departmentsExpanded[dept] = false
    }
  },
  methods: {
    dragstartHandler(empId) {
      this.$store.commit({
        type: 'setDraggingEmpId',
        empId: empId
      })
    },
    recDate(d) {
      return `${ d.getDate() }.${ d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() }.${ d.getFullYear() }`
    }
  }
}
</script>

<style lang="scss" scoped>
.record {
  display: flex;
  width: 100%;
  padding-left: 32px;
  padding-right: 22px;

  &__schedule {
    width: 60%;
    padding-right: 22px;

    &__title {
      font-family: var(--font-medium);
      font-size: 24px;
      line-height: 30px;
    }
  }

  &__employees {
    width: 40%;
    padding-left: 22px;
  }
}

.schedule {
  &__title {
    margin-bottom: 24px;
  }

  &__calendar {
    margin-bottom: 41px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__buttons {
    display: flex;

    div:first-child {
      margin-right: 16px;
    }
  }
}

.months-list {
  display: flex;
  margin-bottom: 16px;

  &__item {
    list-style: none;
    margin-right: 24px;
    cursor: pointer;

    color: #999999;
    font-size: 14px;
    line-height: 24px;
    font-family: var(--font-medium);

    &.active {
      color: #128BE3;
    }
  }
}

.employees {
  padding-top: 45px;

  &__buttons {
    display: flex;
    margin-bottom: 38px;
  }

  &__add-btn {
    margin-right: 16px;
  }

  &__remove-btn {
    span {
      margin-left: 8px;
    }
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: var(--font-medium);

    margin-bottom: 16px;

    h2 {
      color: #353535;
      font-size: 20px;
      line-height: 28px;
    }

    h3 {
      color: #128BE3;
      font-size: 16px;
      line-height: 22px;
    }
  }
}

.row {
  display: flex;
  justify-content: space-between;

  line-height: 40px;
  padding-right: 13px;
  cursor: pointer;

  &__left {
    width: 60%;

    display: flex;
    align-items: center;
  }

  &__right {
    width: 40%;
    padding-left: 8px;

    display: flex;
    justify-content: space-between;
  }

  &:hover {
    background-color: #F2F2F2;

    .dept__icon_remove {
      opacity: 1;
    }
  }
}

.list {
  &__heading {
    color: #999999;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.02em;

    border-bottom: 1px solid #DBDADA;
    padding-bottom: 8px;

    &.row {
      cursor: initial;

      &:hover {
        background: transparent;
      }
    }
  }

  &__emp .row__left {
    padding-left: 16px;
  }
}

.dept {
  .row {
    padding-right: 13px;
    border-bottom: 1px solid #DBDADA;

    font-family: var(--font-regular);
    font-size: 14px;
  }

  .row__left span {
    padding-left: 10px;
  }

  .amount {
    color: #E31243;
    padding-left: 4px;
  }

  &__header {
    &.row {
      padding-left: 0;
      line-height: 46px;
      border: none;

      font-family: var(--font-medium);
      font-size: 16px;
    }

    .row__right {
      justify-content: flex-end;
    }
  }

  &__icon {
    width: 10px;

    &_remove {
      opacity: 0;
    }
  }
}

.records-num {
  display: flex;

  &__item {
    margin-right: 19px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__title {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: #999999;
    margin-bottom: 4px;
  }

  &__number {
    font-size: 20px;
    line-height: 28px;
    font-family: var(--font-medium);
    color: #353535;

    &_blue {
      color: #128BE3;
    }

    &_green {
      color: #06C270;
    }
  }
}
</style>
