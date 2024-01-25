import Stripe from "stripe";
import { catchAsyncError } from "../../utility";

const stripe = new Stripe(process.env.stripeSecret);

export const createCustomer = catchAsyncError(async (req, res) => {
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
  });

  res.status(200).send(customer);
});

export const addNewCard = catchAsyncError(async (req, res) => {
  const {
    customer_id,
    card_name,
    card_Expyear,
    card_ExpyMonth,
    card_Number,
    card_CVC,
  } = req.body;

  const card_token = await stripe.tokens.create({
    card: {
      name: card_name,
      number: card_Number,
      exp_year: card_Expyear,
      exp_month: card_ExpyMonth,
      cvc: card_CVC,
    },
  });

  const card = await stripe.customers.createSource(customer_id, {
    source: `${card_token.id}`,
  });

  res.status(200).send({ card: card.id });
});

export const createCharges = catchAsyncError(async (req, res) => {
  const createCharge = await stripe.charges.create({
    receipt_email: "holidaysplanners30@gmail.com",
    amount: parseInt(req.body.amount) * 100,
    currency: "rwf",
    customer: req.body.customer_id,
  });
  res.status(200).send(createCharge);
});
