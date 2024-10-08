import { AlertDto } from "../schemas/alert";

const amqp = require('amqplib');

const QUEUE = 'alerts';
const MAX_PRIORITY = 10;

export const publishAlerts = async (alerts: AlertDto[]) => {
    try {
        const connection = await amqp.connect(
            `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost`);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, { durable: true, maxPriority: MAX_PRIORITY });

        alerts.forEach(alert => {
            console.info(`Publishing alert for sensor ${alert.id}: ${alert.message}`);
            channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(alert)), { priority: alert.priority, persistent: true });
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(error);
    }
};
