import { createStore } from 'vuex'

export default createStore({
  state: {
    currentPageTitle: '1205-20 от 01.01.2020',
    currentMonth: 4,
    currentYear: 2020,
    draggingEmpId: null,
    account: {
      name: 'ООО "Технониколь"',
      userpic: '',
      cart: [ 'Товар 1', 'Товар 2', 'Товар 3', 'Товар 4' ]
    },
    records: [
      {
        date: new Date(2020, 4, 20),
        availableNum: 50,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 22),
        availableNum: 50,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 23),
        availableNum: 50,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 24),
        availableNum: 26,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 25),
        availableNum: 50,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 26),
        availableNum: 10,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 27),
        availableNum: 50,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 28),
        availableNum: 11,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 29),
        availableNum: 50,
        recordsNum: 50
      },
      {
        date: new Date(2020, 4, 30),
        availableNum: 50,
        recordsNum: 50
      }
    ],
    employees: [
      {
        id: 0,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 1,
        name: 'Иванов Иван Иванович',
        department: 'Склад',
        date: null
      },
      {
        id: 2,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 3,
        name: 'Иванов Иван Иванович',
        department: 'Склад',
        date: null
      },
      {
        id: 4,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 5,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 6,
        name: 'Иванов Иван Иванович',
        department: 'Склад',
        date: null
      },
      {
        id: 7,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 8,
        name: 'Иванов Иван Иванович',
        department: 'Бухгалтерия',
        date: null
      },
      {
        id: 9,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 10,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 11,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      },
      {
        id: 12,
        name: 'Иванов Иван Иванович',
        department: 'Отдел продаж',
        date: null
      }
    ]
  },
  getters: {
    departments(state) {
      const deps = {}

      for (let emp of state.employees) {
        if (deps[emp.department]) {
          deps[emp.department].push(emp)
        } else {
          deps[emp.department] = []
          deps[emp.department].push(emp)
        }
      }

      return deps
    }
  },
  mutations: {
    setDraggingEmpId: (state, payload) => {
      state.draggingEmpId = payload.empId
    },
    recordEmp (state, payload) {
      const d = new Date(state.currentYear, state.currentMonth, payload.day)
      state.employees.find(emp => {
        return emp.id === state.draggingEmpId
      }).date = d

      state.records.find(rec => {
        return rec.date - d === 0
      }).availableNum--
    }
  },
  actions: {
  },
  modules: {
  }
})
