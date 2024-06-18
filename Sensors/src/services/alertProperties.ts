export const getPriority = async (measurement: string) => {
    const priorityMap: { [key: string]: number; } = {
        'temperature': 1,
        'humidity': 2,
    };
    return (priorityMap[measurement] as number) || 5;
};

export const getRegex = async (measurement: string) => {
    const rules: { [key: string]: string; } = {
        'temperature': '^(1[5-9]|2[0-5])$', // temperaturas de 15-25 grados
        'humidity': '^(3[0-9]|[4-5][0-9]|60)$', // humedad en rango de 30-60 %
    };
    return new RegExp(rules[measurement]);
};
