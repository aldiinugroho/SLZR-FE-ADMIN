import { create } from 'zustand'

const storeMarkSold = create((set) => ({
  loading: false,
  setloading: () => set({
    loading: true
  }),
  setdata: () => {
    set({
      loading: false
    })
  },
  reset: () => set({
    loading: false
  })
}))

export {
  storeMarkSold
}