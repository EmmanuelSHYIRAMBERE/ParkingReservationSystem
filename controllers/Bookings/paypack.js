import Paypack from "paypack";

const paypack = new Paypack({ client_id: "", client_secret: "" });

// Cashin
paypack
  .cashin({
    number: "07xxxxxxx",
    amount: 100,
    environment: "development/production",
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// Cashout
paypack
  .cashout({
    number: "07xxxxxxx",
    amount: 100,
    environment: "development/production",
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// Transactions
paypack
  .transactions({ offset: 0, limit: 100 })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// Events
paypack
  .events({ offset: 0, limit: 100 })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// Account Information
paypack
  .me()
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
