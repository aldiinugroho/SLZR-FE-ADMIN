import { create } from "zustand"

class ModelDDShowroom {
  showroomId = ""
  showroomName = ""
  name = ""
  id = ""
  constructor({
    showroomId = "",
    showroomName = ""
  }) {
    this.showroomId = showroomId
    this.showroomName = showroomName
    this.id = showroomId
    this.name = showroomName
  }
}

class ModelDDBrand {
  carBrandId = ""
  carBrandName = ""
  name = ""
  id = ""
  constructor({
    carBrandId = "",
    carBrandName = ""
  }) {
    this.carBrandId = carBrandId
    this.carBrandName = carBrandName
    this.id = carBrandId
    this.name = carBrandName
  }
}

const storeDDShowroom = create((set) => ({
  data: [],
  loading: false,
  setloading: () => set({
    data: [],
    loading: true
  }),
  setdata: (data = [new ModelDDShowroom({})]) => {
    set({
      data: data,
      loading: false
    })
  },
  reset: () => set({
    data: [],
    loading: false
  }),
}))

const storeDDBrand = create((set) => ({
  data: [],
  loading: false,
  setloading: () => set({
    data: [],
    loading: true
  }),
  setdata: (data = [new ModelDDBrand({})]) => {
    set({
      data: data,
      loading: false
    })
  },
  reset: () => set({
    data: [],
    loading: false
  }),
}))

export {
  ModelDDShowroom,
  ModelDDBrand,
  storeDDShowroom,
  storeDDBrand
}