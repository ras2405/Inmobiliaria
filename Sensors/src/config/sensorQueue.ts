import { AlertDto, alertSchema } from "../schemas/alert";
import { alerts } from "../services/sensorValueService";
import amqp, { Message } from 'amqplib';

const QUEUE = 'alerts';

export const processAlerts = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });

    channel.consume(QUEUE, async (msg: Message | null) => {
        if (msg !== null) {
            const alert = JSON.parse(msg.content.toString());
            await sendAlert(alert);
            channel.ack(msg);
        }
    });
};

export const sendAlert = async (alert: AlertDto) => {
    // enviar por mail
    console.log(`Sending alert for sensor ${alert.id}: ${alert.measurement} value ${alert.value}`);
};

processAlerts();
