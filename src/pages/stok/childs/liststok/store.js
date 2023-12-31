import { create } from 'zustand'
import { ModelResponseStok } from './state'

const storeListStok = create((set) => ({
  data: [],
  loading: false,
  setloading: () => set({
    data: [],
    loading: true
  }),
  setOnlyLoading: () => set({
    loading: true
  }),
  setdata: (data = [new ModelResponseStok({})]) => {
    set({
      data: data,
      loading: false
    })
  },
  reset: () => set({
    data: [],
    loading: false
  }),
  resetOnlyLoading: () => set({
    loading: false
  }),
}))

export {
  storeListStok
}