import { create } from 'zustand'

const storeShowroomForm = create((set) => ({
  data: null,
  loading: false,
  setloading: () => set({
    data: null,
    loading: true
  }),
  setdata: (data = new ModelShowroomForm({})) => {
    set({
      data: data,
      loading: false
    })
  },
  reset: () => set({
    data: null,
    loading: false
  }),
}))

class ModelShowroomForm {
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
  storeShowroomForm,
  ModelShowroomForm
}