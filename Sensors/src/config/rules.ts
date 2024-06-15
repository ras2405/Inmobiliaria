import * as fs from 'fs';

const rulesPath = './rules.json';

export interface Rules {
    [key: string]: {
        Alert: string;
    };
}

export function loadRules(): Rules {
    const rawdata = fs.readFileSync(rulesPath, 'utf-8');
    return JSON.parse(rawdata);
}
// REVISAR TODO
