import { create } from 'zustand'

const storeCarDetail = create((set) => ({
  data: null,
  loading: false,
  setloading: () => set({
    data: null,
    loading: true
  }),
  setdata: (data = new ModelCarDetail({})) => {
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

class ModelCarDetailOtherPrices {
  carOtherPriceId = ""
  carOtherPriceName = ""
  carOtherPrice = ""
  constructor({
    carOtherPriceId = "",
    carOtherPriceName = "",
    carOtherPrice = ""
  }) {
    this.carOtherPriceId = carOtherPriceId
    this.carOtherPriceName = carOtherPriceName
    this.carOtherPrice = carOtherPrice
  }
}

class ModelCarDetailImages {
  carImageId = ""
  carImage = ""
  constructor({
    carImageId = "",
    carImage = ""
  }) {
    this.carImageId = carImageId
    this.carImage = carImage
  }
}

class ModelCarDetailShowroom {
  showroomId = ""
  showroomName = ""
  id = ""
  name = ""
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

class ModelCarDetailBrand {
  carBrandId = ""
  carBrandName = ""
  constructor({
    carBrandId = "",
    carBrandName = ""
  }) {
    this.carBrandId = carBrandId
    this.carBrandName = carBrandName
  }
}

class ModelCarDetail {
  carId = ""
  carPlate = ""
  carName = ""
  carDescription = ""
  carTransmission = ""
  carYear = new Date()
  carFuel = ""
  carTax = new Date()
  carSTNK = false
  carBPKB = false
  carSellPrice = ""
  carBuyPrice = ""
  carShowroom = new ModelCarDetailShowroom({})
  carBrand = new ModelCarDetailBrand({})
  carImage = [new ModelCarDetailImages({})]
  carOtherPrice = [new ModelCarDetailOtherPrices({})]
  constructor({
    carId = "",
    carPlate = "",
    carName = "",
    carDescription = "",
    carTransmission = "",
    carYear = new Date(),
    carFuel = "",
    carTax = new Date(),
    carSTNK = false,
    carBPKB = false,
    carSellPrice = "",
    carBuyPrice = "",
    carShowroom = new ModelCarDetailShowroom({}),
    carBrand = new ModelCarDetailBrand({}),
    carImage = [new ModelCarDetailImages({})],
    carOtherPrice = [new ModelCarDetailOtherPrices({})]
  }) {
    this.carId = carId
    this.carPlate = carPlate
    this.carName = carName
    this.carDescription = carDescription
    this.carTransmission = carTransmission
    this.carYear = carYear
    this.carFuel = carFuel
    this.carTax = carTax
    this.carSTNK = carSTNK
    this.carBPKB = carBPKB
    this.carSellPrice = carSellPrice
    this.carBuyPrice = carBuyPrice
    this.carShowroom = new ModelCarDetailShowroom(carShowroom)
    this.carBrand = new ModelCarDetailBrand(carBrand)
    this.carImage = carImage.map((i) => new ModelCarDetailImages(i))
    this.carOtherPrice = carOtherPrice.map((i) => new ModelCarDetailOtherPrices(i))
  }
}

export {
  storeCarDetail,
  ModelCarDetail,
  ModelCarDetailShowroom,
  ModelCarDetailBrand,
  ModelCarDetailImages,
  ModelCarDetailOtherPrices
}