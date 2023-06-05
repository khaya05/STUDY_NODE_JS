/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51NFHC0GShCk0Qi4gN2VtVmTPvYsjViI9CcvQi1K2gz5UeVPZ2DuwHDSTdm2EPxFtOX2y4xp917odfxRfVxmPxUTR004N4A8nsQ'
);

export const bookTour = async tourId => {
  try {
    // 1. get checkout session
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout/${tourId}`
    );
    console.log(session);
    // 2. create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
