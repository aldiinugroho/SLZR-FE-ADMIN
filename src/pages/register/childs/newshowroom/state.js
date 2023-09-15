import { create } from 'zustand'

const storeListShowroom = create((set) => ({
  data: [],
  loading: false,
  setloading: () => set({
    data: [],
    loading: true
  }),
  setdata: (data = [new ModelShowroom({})]) => {
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

class ModelShowroom {
  showroomId = ""
  showroomName = ""
  showroomAddress = ""
  showroomPhone = ""
  constructor({
    showroomId = "",
    showroomName = "",
    showroomAddress = "",
    showroomPhone = ""
  }) {
    this.showroomId = showroomId
    this.showroomName = showroomName
    this.showroomAddress = showroomAddress
    this.showroomPhone = showroomPhone
  }
}

export {
  storeListShowroom,
  ModelShowroom
}