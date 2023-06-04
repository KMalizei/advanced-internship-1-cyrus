import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51NFA3vD7glSKtpchnJmHPsSSzuZiK9vO5W36ttJyM4fF3TFurbw1lbnetqjo59MPWrXpnIeiAlJqFKlacdkahvuJ00sdfldEGv" ||
        ""
    );
  }
  return stripePromise;
};

export default initializeStripe;
