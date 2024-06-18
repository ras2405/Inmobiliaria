import chokidar from 'chokidar';
import fs from 'fs';
import { checkAlerts } from '../services/alertService';
import { publishAlerts } from '../services/alertsPublisher';

export const filesWatcher = async () => {
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
};

export const processSensorFile = async (filePath: string) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const sensor = JSON.parse(data);
    const alerts = await checkAlerts(sensor);
    publishAlerts(alerts);
};
