import path from "path";
import fs from "fs";

const SENSORS_FOLDER_PATH = path.resolve(__dirname, '../config');

export const validateSignal = async (observableProperties: string, signal: any) => { // sacar any
    try {
        const jsonPath = observableProperties;

        if (!jsonPath) {
            throw new Error('Observable properties path is not defined.'); // REVISAR
        }

        const rulesPath = path.resolve(SENSORS_FOLDER_PATH, jsonPath);
        const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));

        for (const key in signal) {
            if (rules[key] && rules[key].Alert) {
                const regex = new RegExp(rules[key].Alert);
                if (!regex.test(signal[key])) {
                    throw new Error(`Signal ${key} does not match the rule ${rules[key].Alert}`); // REVISAR
                }
            }
        }
        return true;
    } catch (error: any) { // SACAR
        throw new Error(`Error validating signal: ${error.message}`); // revisar
    }
};
