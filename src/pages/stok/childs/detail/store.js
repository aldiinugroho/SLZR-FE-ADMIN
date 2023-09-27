import { create } from 'zustand'
import { ModelResponseStok } from '../liststok/state'

const storeStokDetail = create((set) => ({
  data: null,
  loading: false,
  setloading: () => set({
    data: null,
    loading: true
  }),
  setdata: (data = new ModelResponseStok({})) => {
    set({
      data: data,
      loading: false
    })
  },
  reset: () => set({
    data: null,
    loading: false
  })
}))

export {
  storeStokDetail
}