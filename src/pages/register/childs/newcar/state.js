import { create } from 'zustand'

const storeListCar = create((set) => ({
  data: [],
  loading: false,
  setloading: () => set({
    data: [],
    loading: true
  }),
  setdata: (data = [new ModelCar({})]) => {
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

class ModelCar {
  carId = ""
  carName = ""
  carPlate = ""
  carTax = ""
  carYear = ""
  carTransmission = ""
  constructor({
    carId = "",
    carName = "",
    carPlate = "",
    carTax = "",
    carYear = "",
    carTransmission = ""
  }) {
    this.carId = carId
    this.carName = carName
    this.carPlate = carPlate
    this.carTax = carTax
    this.carYear = carYear
    this.carTransmission = carTransmission
  }
}

export {
  storeListCar,
  ModelCar
}