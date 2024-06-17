import cron from 'node-cron';
import { Op } from 'sequelize';
import { Property } from '../models/Property';
import { PaymentStatus } from '../constants/payments';

const PAYMENT_TIMEOUT_MINUTES = parseInt(process.env.PAYMENT_TIMEOUT_MINUTES || '1440', 10); // 1440 minutos = 24 horas

console.log('>>>> ', PAYMENT_TIMEOUT_MINUTES);

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

    console.info('>>> Payment cron job executed');
};

cron.schedule('* * * * *', checkPendingPayments);

console.log('Cron job scheduled to check for pending payments every minute');
