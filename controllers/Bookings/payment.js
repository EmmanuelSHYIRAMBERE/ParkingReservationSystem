import Stripe from "stripe";
import { Tours } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

const stripe = new Stripe(process.env.stripeSecret);

export const getCheckOutSession = catchAsyncError(async (req, res, next) => {
  //Get the currently booked tour

  const tourID = req.params.id;
  const tour = await Tours.findById({ _id: tourID });

  //Create checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${req.get(
      "host"
    )}/holidays/tours/gettour/${tourID}`,
    cancel_url: `${req.protocol}://${req.get("host")}/holidays/tours/gettours`,
    customer_email: req.userEmail,
    client_reference_id: tourID,
    line_items: [
      {
        // name: `${tour.title} Tour`,
        // description: tour.description,
        // images: [
        //   `https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.uniquerwandavacations.com%2Fwp-content%2Fuploads%2F2022%2F07%2Fnyungwe.jpg&tbnid=QLFoKLxJCZicSM&vet=12ahUKEwiiub6ln7GCAxV6pycCHdkdBzkQMygoegUIARDDAQ..i&imgrefurl=https%3A%2F%2Fwww.uniquerwandavacations.com%2Fnyungwe-forest-national-park%2F&docid=QPbuxO11cAAyRM&w=1000&h=600&q=nyungwe%20forest&ved=2ahUKEwiiub6ln7GCAxV6pycCHdkdBzkQMygoegUIARDDAQ`,
        // ],
        price_data: {
          currency: "usd",
          unit_amount: 20020,
          product_data: {
            name: `${tour.title} Tour`,
            description: " tour.description",
            images: [
              `https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.uniquerwandavacations.com%2Fwp-content%2Fuploads%2F2022%2F07%2Fnyungwe.jpg&tbnid=QLFoKLxJCZicSM&vet=12ahUKEwiiub6ln7GCAxV6pycCHdkdBzkQMygoegUIARDDAQ..i&imgrefurl=https%3A%2F%2Fwww.uniquerwandavacations.com%2Fnyungwe-forest-national-park%2F&docid=QPbuxO11cAAyRM&w=1000&h=600&q=nyungwe%20forest&ved=2ahUKEwiiub6ln7GCAxV6pycCHdkdBzkQMygoegUIARDDAQ`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  //Create a session as response

  res.status(200).json({
    status: "success",
    session,
  });
});
