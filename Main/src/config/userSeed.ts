import { User } from "../models/User";
const sequelize = require('./database');

const seedUsers = async () => {

    const users = [
        {
            document: 'ABC123-456.789',
            documentType: 'C.I',
            name: 'John',
            surname: 'Doe',
            password: 'password',
            mail: 'johndoe@example.com',
            phone: '+12345678901',
            role: 'Admin'
        },
        {
            document: 'DEF456-789.123',
            documentType: 'DNI',
            name: 'Jane',
            surname: 'Smith',
            password: 'password',
            mail: 'janesmith@example.com',
            phone: '+19876543210',
            role: 'Operator'
        },
        {
            document: 'GHI789-123.456',
            documentType: 'C.I',
            name: 'Alice',
            surname: 'Johns',
            password: 'password',
            mail: 'alice.johnson@example.com',
            phone: '+11234567890',
            role: 'Owner'
        },
        {
            document: 'JKL012-345.678',
            documentType: 'DNI',
            name: 'Bobo',
            surname: 'Brown',
            password: 'password',
            mail: 'bob.brown@example.com',
            phone: '+10987654321',
            role: 'Tenant'
        },
        {
            document: 'MNO345-678.901',
            documentType: 'C.I',
            name: 'Charlie',
            surname: 'Davis',
            password: 'password',
            mail: 'charlie.davis@example.com',
            phone: '+12223334444',
            role: 'Admin'
        },
        {
            document: 'PQR678-901.234',
            documentType: 'DNI',
            name: 'Dave',
            surname: 'Mille',
            password: 'password',
            mail: 'dave.miller@example.com',
            phone: '+15556667777',
            role: 'Operator'
        },
        {
            document: 'STU901-234.567',
            documentType: 'C.I',
            name: 'Eve',
            surname: 'Garcia',
            password: 'password',
            mail: 'eve.garcia@example.com',
            phone: '+19998887777',
            role: 'Owner'
        },
        {
            document: 'VWX234-567.890',
            documentType: 'DNI',
            name: 'Frank',
            surname: 'Martinez',
            password: 'password',
            mail: 'frank.martinez@example.com',
            phone: '+18887776666',
            role: 'Tenant'
        }
    ];

    for (const user of users) {
        await User.create(user);
    }

    console.info('Datos de usuarios insertados correctamente');
    process.exit(0);
};

seedUsers().catch(err => {
    console.error('Error insertando datos de usuarios:', err);
    process.exit(1);
});
