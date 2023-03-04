const validInput = {
  userId: 1,
  sellerId: 2,
  totalPrice: 10,
  deliveryAddress: "xablau",
  deliveryNumber: "3",
  status: "Pendente",
}

const validOutput = {
    saleDate: "2023-03-02T14:43:26.802Z",
    id: 1,
    userId: 1,
    sellerId: 2,
    totalPrice: 10,
    deliveryAddress: "xablau",
    deliveryNumber: 3,
    status: "Pendente",
}

module.exports = {
  validInput,
  validOutput,
}