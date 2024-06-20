import cron from 'node-cron';
import { Op } from 'sequelize';
import { Property } from '../models/Property';
import { BookingStatus, PaymentStatus } from '../constants/payments';
import { Booking } from '../models/Booking';

const PAYMENT_TIMEOUT_MINUTES = parseInt(process.env.PAYMENT_TIMEOUT_MINUTES || '1440', 10); // 1440 minutos = 24 horas

const checkPendingPayments = async () => {
    const expirationTime = new Date(Date.now() - PAYMENT_TIMEOUT_MINUTES * 60 * 1000);

    await Property.update(
        { status: PaymentStatus.CANCELLED },
        {
            where: {
                status: PaymentStatus.PENDING,
                createdAt: {
                    [Op.lt]: expirationTime
                }
            }
        }
    );
    
    await Booking.update(
        { status: BookingStatus.CANCELLED_NON_PAYMENT },
        {
            where: {
                status: BookingStatus.PENDING,
                createdAt: {
                    [Op.lt]: expirationTime
                }
            }
        }
    );

    console.info('>>> Payment cron job executed');
};

cron.schedule('* * * * *', checkPendingPayments);

console.log('Cron job scheduled to check for pending payments every minute');
