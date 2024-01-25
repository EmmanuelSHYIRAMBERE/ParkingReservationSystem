import { Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

const PaypackJs = require("paypack-js").default;
require("dotenv").config();

const paypack = PaypackJs.config({
  client_id: process.env.packID,
  client_secret: process.env.packScret,
});

export const cashIn = catchAsyncError(async (req, res) => {
  const id = req.params.id;

  const reservation = await Reservations.findById({ _id: id });

  if (!reservation) {
    return new errorHandler(`Reservation with id: ${id} not found.`, 404);
  }

  const payableAmount = reservation.totalPrice;

  try {
    const response = await paypack.cashin({
      number: req.body.number,
      amount: payableAmount,
      environment: "development",
    });

    if (response && response.data) {
      reservation.paymentRef = response.data.ref;
      await reservation.save();

      console.log(response.data);

      res.status(201).json({
        status: "payment request sent to your phone number, please confirm it.",
        data: response.data,
        reserveDetails: reservation,
      });
    } else {
      throw new Error("Unexpected response structure: missing data property");
    }
  } catch (error) {
    console.log("Failure proceeding payment", error);
    res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
    });
  }
});

export const cashOut = catchAsyncError(async (req, res) => {
  const response = await paypack.cashout({
    number: req.body.number,
    amount: req.body.amount,
    environment: "development",
  });
  res.status(200).json({
    status: "withdrawn successful",
    data: response.data,
  });
});

export const acountTransactions = catchAsyncError(async (req, res) => {
  const response = await paypack.transactions({ offset: 0, limit: 100 });
  res.status(200).json({
    status: "successful transactions",
    data: response.data,
  });
});

export const accountEvents = catchAsyncError(async (req, res) => {
  const response = await paypack.events({ offset: 0, limit: 100 });
  res.status(200).json({
    status: "successful events",
    data: response.data,
  });
});

export const accountInfo = catchAsyncError(async (req, res) => {
  const response = await paypack.me();
  res.status(200).json({
    status: "successful account info",
    data: response.data,
  });
});

export const callback = catchAsyncError(async (req, res) => {
  let info = req.body;

  console.log(info);

  const paymentStatus = info && info.data && info.data.status;

  console.log(paymentStatus);
  let paymentRef = info.data.ref;

  console.log(paymentRef);
  const reservation = await Reservations.findOne({ paymentRef: paymentRef });

  if (info.data.ref) {
    if (paymentStatus === "successful") {
      reservation.Status = "Paid";
      await reservation.save();
    }
  }
  return res.json(info);
});
