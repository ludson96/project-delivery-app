const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMywibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoidGVzdGU5QHRlc3RlLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2Nzc2MTY5MjYsImV4cCI6MTY3ODIyMTcyNn0.YjeyGuAfTct-RgTrjq882gYD0WngAIJKnl6LhoTO_50";

const validInput = {
  email: "ludson_ps28@hotmail.com",
  password: "1234567",
}

const validataValues = {
  dataValues: {
    name:"Delivery App Admin",
    email: "ludson_ps28@hotmail.com",
    password: "1234567",
    role: "customer"
  }
}

const invalidEmail = {
  name:"Delivery App Admin",
  email: "ludson_ps28hotmail.com",
  password: "1234567",
  role: "customer"
}

const invalidPwd = {
  name:"Delivery App Admin",
  email: "ludson_ps28@hotmail.com",
  password: "123",
  role: "customer"
}

module.exports = {
  token,
  validInput,
  validataValues,
  invalidEmail,
  invalidPwd,
}