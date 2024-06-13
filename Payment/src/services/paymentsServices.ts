import axios from "axios";
import { PaymentDto } from "../schemas/payments";

export const createPayment = async (paymentDto: PaymentDto) => {
    const delay = Math.floor(Math.random() * 5000);

    const shouldFail = Math.random() < 0.2;

    await new Promise(resolve => setTimeout(resolve, delay));

    try {
        if (shouldFail) {
            await axios.post(
                paymentDto.callback,
                { error: 'Payment failed' },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.info('Payment failed');
            return { status: 'failed' };
        } else {
            await axios.post(
                paymentDto.callback,
                { success: 'Payment successful' },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.info('Payment successful');
            return { status: 'successful' };
        }
    } catch (error) {
        console.error('Error sending the request:', error);
        return { status: 'error', message: error };
    }
};
