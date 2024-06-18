import chokidar from 'chokidar';
import fs from 'fs';
import { checkAlerts } from '../services/alertService';
import { publishAlerts } from '../services/alertsPublisher';
import path from 'path';

export const filesWatcher = async () => {
    const filesPath = path.resolve(__dirname, '../../../files');
    console.log(`Watching directory: ${filesPath}`);

    const watcher = chokidar.watch(filesPath, {
        persistent: true,
        ignoreInitial: false,
        usePolling: true,
        interval: 1000,
        depth: 0
    });

    watcher.on('add', filePath => {
        console.log(`New file detected: ${filePath}`);
        processSensorFile(filePath);
    }).on('change', filePath => {
        console.log(`Modified file: ${filePath}`);
        processSensorFile(filePath);
    }).on('unlink', filePath => {
        console.log(`File deleted: ${filePath}`);
    }).on('error', error => {
        console.error(`Error in file watcher: ${error}`);
    });
};

export const processSensorFile = async (filePath: string) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const sensor = JSON.parse(data);
        const alerts = await checkAlerts(sensor);
        publishAlerts(alerts);
    } catch (error) {
        console.error(`Error when processing file: ${filePath}: ${error}`);
    }

};
