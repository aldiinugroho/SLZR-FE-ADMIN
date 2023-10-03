class ModelResponseStokCarBookKeepingCarLeasing {
  carLeasingId = ""
  carLeasing = ""
  constructor({
    carLeasingId = "",
    carLeasing = ""
  }) {
    this.carLeasingId = carLeasingId
    this.carLeasing = carLeasing
  }
}

class ModelResponseStokCarBookKeepingCarBuyFrom {
  carBuyFromId = ""
  carBuyFrom = ""
  constructor({
    carBuyFromId = "",
    carBuyFrom = ""
  }) {
    this.carBuyFromId = carBuyFromId
    this.carBuyFrom = carBuyFrom
  }
}

class ModelResponseStokCarBookKeepingPaymentTools {
  carBookKeepingPaymentTools = ""
  carBookKeepingPaymentToolsId = ""
  constructor({
    carBookKeepingPaymentTools = "",
    carBookKeepingPaymentToolsId = ""
  }) {
    this.carBookKeepingPaymentTools = carBookKeepingPaymentTools
    this.carBookKeepingPaymentToolsId = carBookKeepingPaymentToolsId
  }
}

class ModelResponseStokCarBookKeepingTransactionPayment {
  transactionPaymentId = ""
  midtransTransactionId = ""
  transactionPaymentStatus = ""
  transactionPaymentBank = ""
  transactionPaymentAmount = 0
  transactionPaymentVA = ""
  transactionPaymentExpiry = ""
  constructor({
    transactionPaymentId = "",
    midtransTransactionId = "",
    transactionPaymentStatus = "",
    transactionPaymentBank = "",
    transactionPaymentAmount = 0,
    transactionPaymentVA = "",
    transactionPaymentExpiry = ""
  }) {
    this.transactionPaymentId = transactionPaymentId
    this.midtransTransactionId = midtransTransactionId
    this.transactionPaymentStatus = transactionPaymentStatus
    this.transactionPaymentBank = transactionPaymentBank
    this.transactionPaymentAmount = transactionPaymentAmount
    this.transactionPaymentVA = transactionPaymentVA
    this.transactionPaymentExpiry = transactionPaymentExpiry
  }
}

class ModelResponseStokCarBookKeeping {
  carBookKeepingId = ""
  carId = ""
  carBookKeepingName = ""
  carBookKeepingKTP = ""
  carBookKeepingPaymentToolsId = ""
  carBookKeepingPhone = ""
  carBookKeepingSoldPrice = 0
  carBookKeepingBookedFee = 0
  carBookKeepingStatus = ""
  carBuyFromId = ""
  carBookKeepingPaymentTools = null
  carBookKeepingCarBuyFrom = new ModelResponseStokCarBookKeepingCarBuyFrom({})
  carLeasing = null
  transactionPayment = new ModelResponseStokCarBookKeepingTransactionPayment({})
  createdAt = new Date()
  constructor({
    carBookKeepingId = "",
    carId = "",
    carBookKeepingName = "",
    carBookKeepingKTP = "",
    carBookKeepingPaymentToolsId = "",
    carBookKeepingPhone = "",
    carBookKeepingSoldPrice = 0,
    carBookKeepingBookedFee = 0,
    carBookKeepingStatus = "",
    carBuyFromId = "",
    carBookKeepingPaymentTools = new ModelResponseStokCarBookKeepingPaymentTools({}),
    carBookKeepingCarBuyFrom = new ModelResponseStokCarBookKeepingCarBuyFrom({}),
    carLeasing = new ModelResponseStokCarBookKeepingCarLeasing({}),
    transactionPayment = new ModelResponseStokCarBookKeepingTransactionPayment({}),
    createdAt = new Date()
  }) {
    this.carBookKeepingId = carBookKeepingId
    this.carId = carId
    this.carBookKeepingName = carBookKeepingName
    this.carBookKeepingKTP = carBookKeepingKTP
    this.carBookKeepingPaymentToolsId = carBookKeepingPaymentToolsId
    this.carBookKeepingPhone = carBookKeepingPhone
    this.carBookKeepingSoldPrice = carBookKeepingSoldPrice
    this.carBookKeepingBookedFee = carBookKeepingBookedFee
    this.carBookKeepingStatus = carBookKeepingStatus
    this.carBuyFromId = carBuyFromId
    this.carBookKeepingPaymentTools = carBookKeepingPaymentTools === null ? null : new ModelResponseStokCarBookKeepingPaymentTools(carBookKeepingPaymentTools)
    this.carBookKeepingCarBuyFrom = new ModelResponseStokCarBookKeepingCarBuyFrom(carBookKeepingCarBuyFrom)
    this.carLeasing = carLeasing === null ? null : new ModelResponseStokCarBookKeepingCarLeasing(carLeasing)
    this.transactionPayment = transactionPayment === null ? null : new ModelResponseStokCarBookKeepingTransactionPayment(transactionPayment)
    this.createdAt = createdAt
  }
}

class ModelResponseStokCarOtherPrice {
  carOtherPriceId = ""
  carOtherPriceName = ""
  carOtherPrice = 0
  constructor({
    carOtherPriceId = "",
    carOtherPriceName = "",
    carOtherPrice = 0
  }) {
    this.carOtherPriceId = carOtherPriceId
    this.carOtherPriceName = carOtherPriceName
    this.carOtherPrice = carOtherPrice
  }
}

class ModelResponseStokCarShowroom {
  showroomId = ""
  showroomName = ""
  showroomPhone = ""
  showroomAddress = ""
  constructor({
    showroomId = "",
    showroomName = "",
    showroomPhone = "",
    showroomAddress = ""
  }) {
    this.showroomId = showroomId
    this.showroomName = showroomName
    this.showroomPhone = showroomPhone
    this.showroomAddress = showroomAddress
  }
}

class ModelResponseStokCarImage {
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

class ModelResponseStokCarBrand {
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

class ModelResponseStok {
  carId = ""
  carBrandId = ""
  carBPKB = false
  carSTNK = false
  carBuyPrice = 0
  carDescription = ""
  carFuel = ""
  carName = ""
  carPlate = ""
  carSellPrice = 0
  carStatus = ""
  carTax = new Date()
  carTransmission = ""
  carYear = ""
  showroomId = ""
  carBrand = new ModelResponseStokCarBrand({})
  carImage = []
  showroom = new ModelResponseStokCarShowroom({})
  carOtherPrice = []
  carBookKeeping = []
  constructor({
    carId = "",
    carBrandId = "",
    carBPKB = false,
    carSTNK = false,
    carBuyPrice = 0,
    carDescription = "",
    carFuel = "",
    carName = "",
    carPlate = "",
    carSellPrice = 0,
    carStatus = "",
    carTax = new Date(),
    carTransmission = "",
    carYear = "",
    showroomId = "",
    carBrand = new ModelResponseStokCarBrand({}),
    carImage = [new ModelResponseStokCarImage({})],
    showroom = new ModelResponseStokCarShowroom({}),
    carOtherPrice = [new ModelResponseStokCarOtherPrice({})],
    carBookKeeping = [new ModelResponseStokCarBookKeeping({})]
  }) {
    this.carId = carId
    this.carBrandId = carBrandId
    this.carBPKB = carBPKB
    this.carSTNK = carSTNK
    this.carBuyPrice = carBuyPrice
    this.carDescription = carDescription
    this.carFuel = carFuel
    this.carName = carName
    this.carPlate = carPlate
    this.carSellPrice = carSellPrice
    this.carStatus = carStatus
    this.carTax = carTax
    this.carTransmission = carTransmission
    this.carYear = carYear
    this.showroomId = showroomId
    this.carBrand = new ModelResponseStokCarBrand(carBrand)
    this.carImage = carImage.map((i) => new ModelResponseStokCarImage(i))
    this.showroom = new ModelResponseStokCarShowroom(showroom)
    this.carOtherPrice = carOtherPrice.map((i) => new ModelResponseStokCarOtherPrice(i))
    this.carBookKeeping = carBookKeeping.map((i) => new ModelResponseStokCarBookKeeping(i))
  }
}

export {
  ModelResponseStok,
  ModelResponseStokCarBookKeeping,
  ModelResponseStokCarBookKeepingCarBuyFrom,
  ModelResponseStokCarBookKeepingCarLeasing,
  ModelResponseStokCarBookKeepingPaymentTools,
  ModelResponseStokCarBrand,
  ModelResponseStokCarImage,
  ModelResponseStokCarOtherPrice,
  ModelResponseStokCarShowroom,
  ModelResponseStokCarBookKeepingTransactionPayment
}