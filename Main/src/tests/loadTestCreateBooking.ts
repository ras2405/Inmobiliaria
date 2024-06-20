import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 1 },
    ],
};

const startDateInitial = new Date('2024-01-01');
const endDateInitial = new Date('2024-01-02');


let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiYm9iLmJyb3duQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE4OTA3NjcyLCJleHAiOjE3MTg5OTQwNzJ9.yl9Zz_u3d5EfAI4vab4UQMi52z9Z6SIuF75066Qi_dE';

export default function () {
    const vuIndex = __VU;
    const iterIndex = __ITER;

    const startDate = new Date(startDateInitial);
    startDate.setDate(startDate.getDate() + (iterIndex * 2));

    const endDate = new Date(endDateInitial);
    endDate.setDate(endDate.getDate() + (iterIndex * 2));

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const url = 'http://localhost:3001/api/bookings';
    const payload = JSON.stringify({
        document: "123456789",
        documentType: "passport",
        name: "Johns",
        surname: "Does",
        mail: "john.doe@example.com",
        phone: "+1234567890",
        country: "USA",
        state: "California",
        adults: 1,
        kids: 1,
        propertyId: 1,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    };

    const res = http.post(url, payload, params);

    sleep(1);
}
