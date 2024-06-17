import chokidar from 'chokidar';
import fs from 'fs';
import { checkAlerts } from '../services/sensorValueService';
import { publishAlerts } from '../services/alertsService';

const watcher = chokidar.watch('../../sensors', {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 1000
});

watcher.on('add', filePath => {
    console.log(`Nuevo archivo detectado: ${filePath}`);
    processSensorFile(filePath);
});

export const processSensorFile = async (filePath: string) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const sensor = JSON.parse(data);
    const alerts = await checkAlerts(sensor);
    publishAlerts(alerts);
};
