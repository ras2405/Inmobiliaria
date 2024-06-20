export const getPriority = async (measurement: string) => {
    const priorityMap: { [key: string]: number; } = {
        'temperature': 1,
        'humidity': 2,
        'electricity': 3,
        'doorLock': 4,
        'windowLock': 4,
        'water': 5,
        'gas': 5,
        'smoke': 5,
    };
    return (priorityMap[measurement] as number) || 5;
};

export const getRegex = async (measurement: string | undefined) => {
    if (!measurement) {
        return new RegExp('No regex');
    } else {
        const rules: { [key: string]: string; } = {
            'celsius': '^(1[5-9]|2[0-5])$', // temperaturas de rango aceptable de 15-25 grados
            'farhenheit': '^(5[9-9]|6[0-9]|7[0-9]|80)$', // temperaturas de rango aceptable de 59-80 grados
            'percentage': '^(3[0-9]|[4-5][0-9]|60)$', // humedad en rango aceptable de 30-60 %
            'watt': '^(0|[1-9]\d?|1[0-9]\d|2[0-4]\d|250)$', // consumo de energia hasta 250 watts
            'boolean': '^(false|0)$', // si es false o 0 se activa alarma
            'liters': '^(0|[1-9]\d?|1[0-9]\d|2[0-9]\d|3[0-9]\d|5[0-9]\d)$', // consumo de agua hasta 500 litros
        };
        return new RegExp(rules[measurement]);
    }
};
