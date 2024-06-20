import http from 'k6/http';
import { sleep } from 'k6';

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiYm9iLmJyb3duQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE4OTA3NjcyLCJleHAiOjE3MTg5OTQwNzJ9.yl9Zz_u3d5EfAI4vab4UQMi52z9Z6SIuF75066Qi_dE';

export let options = {
    stages: [
        { duration: '1m', target: 1000 }
    ],
};

export default function () {
    let url = 'http://localhost:3001/api/properties';
    let headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    http.get(url, { headers: headers });
    sleep(1);
};
