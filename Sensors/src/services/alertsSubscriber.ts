import { AlertDto, alertSchema } from "../schemas/alert";
import amqp, { Message } from 'amqplib';
import dotenv from 'dotenv';

const QUEUE = 'alerts';
const MAX_PRIORITY = 10;
dotenv.config();

export const processAlerts = async () => {
    const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost`);
    const channel = await connection.createChannel();
    try {
        await channel.assertQueue(QUEUE, { durable: true, maxPriority: MAX_PRIORITY });

        channel.consume(QUEUE, async (msg: Message | null) => {
            if (msg !== null) {
                const alert = JSON.parse(msg.content.toString());
                await sendAlert(alert);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error(error);
        channel.nack(error as Message, false, true);
    }
};

export const sendAlert = async (alert: AlertDto) => {
    // enviar por mail
    console.log(`Sending alert (mail) for sensor ${alert.id}: ${alert.message}`);
};
