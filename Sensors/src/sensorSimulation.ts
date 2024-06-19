type SensorData = {
    sensorId: string;
    HumedadAmbiente: {
        value: string;
    };
    Temperatura: {
        Unidad: string;
        value: string;
    };
};

class SensorSimulator {
    private intervalId: NodeJS.Timeout | null = null;
    private requestRatePerMinute: number;
    private sensors: string[];

    constructor(requestRatePerMinute: number, sensors: string[]) {
        this.requestRatePerMinute = requestRatePerMinute;
        this.sensors = sensors;
    }

    private generateSensorData(sensorId: string): SensorData {
        return {
            sensorId: sensorId,
            HumedadAmbiente: {
                value: (Math.random() * 100).toFixed(2)
            },
            Temperatura: {
                Unidad: "Celsius",
                value: (Math.random() * 40).toFixed(2)
            }
        };
    }

    public start(): void {
        if (this.intervalId) {
            console.log("Simulator is already running");
            return;
        }

        const interval = (60 / this.requestRatePerMinute) * 1000;
        this.intervalId = setInterval(() => {
            this.sensors.forEach(sensorId => {
                const data = this.generateSensorData(sensorId);
                console.log(JSON.stringify(data));
            });
        }, interval);
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public setRequestRatePerMinute(rate: number): void {
        this.requestRatePerMinute = rate;
        if (this.intervalId) {
            this.stop();
            this.start();
        }
    }

    public setSensors(sensors: string[]): void {
        this.sensors = sensors;
    }
}

export default SensorSimulator;
