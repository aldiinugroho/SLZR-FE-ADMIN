import { create } from 'zustand'
import { ModelResponseStokCarBookKeeping } from '../liststok/state'

const storeDetailBookKeepingWebsite = create((set) => ({
  data: null,
  loading: false,
  setloading: () => set({
    data: null,
    loading: true
  }),
  setdata: (data = new ModelResponseStokCarBookKeeping({})) => {
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

export {
  storeDetailBookKeepingWebsite
}