const request = require('supertest');
const express = require('express');
const reservedTableController = require('../controllers/reservedTableController');
const { beforeAll, afterAll, beforeEach, afterEach, describe, it, expect } = require('@jest/globals');
const connect = require('../config/db');
const app = express();

app.use(express.json());
app.get('/api/reservedTables', reservedTableController.getAllReservations);
app.get('/api/reservedTables/:id', reservedTableController.getReservationById);
app.get('/api/reservedTables/reservations-on-day', reservedTableController.getAllReservationsOnDay);
app.post('/api/reservedTables', reservedTableController.createReservation);
app.delete('/api/reservedTables/:id', reservedTableController.deleteReservation);

describe('Reserved Table Controller', () => {
    beforeAll((done) => {
        connect.connect((err) => {
            if (err) return done(err);
            done();
        });
    });

    afterAll((done) => {
        connect.end((err) => {
            if (err) return done(err);
            done();
        });
    });

    beforeEach((done) => {
        connect.query(`
            CREATE TABLE IF NOT EXISTS tables (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tableNumber INT NOT NULL
            );
        `, (err) => {
            if (err) return done(err);
            connect.query(`
                CREATE TABLE IF NOT EXISTS reservedtable (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    tableId INT NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    numberOfCustomers INT NOT NULL,
                    reservedAt DATETIME NOT NULL,
                    reservedUntil DATETIME NOT NULL,
                    FOREIGN KEY (tableId) REFERENCES tables(id)
                );
            `, (err) => {
                if (err) return done(err);
                connect.query(`
                    INSERT INTO tables (tableNumber) VALUES (1), (2);
                `, (err) => {
                    if (err) return done(err);
                    connect.query(`
                        INSERT INTO reservedtable (tableId, name, numberOfCustomers, reservedAt, reservedUntil) VALUES
                    (1, 'John Doe', 4, '2024-11-03 12:00:00', '2024-11-03 15:00:00'),
                    (2, 'Jane Doe', 2, '2024-11-03 13:00:00', '2024-11-03 17:00:00');
                    `,  (err) => {
                        if (err) return done(err);
                        done();
                    });
                });
            });
        });
    });

    afterEach((done) => {
        connect.query(`DROP TABLE IF EXISTS reservedtable;`, (err) => {
            if (err) return done(err);
            connect.query(`DROP TABLE IF EXISTS tables;`, (err) => {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('GET /api/reservedTables', () => {
        it('should get all reserved tables', async () => {
            const res = await request(app).get('/api/reservedTables');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        });
    });

    describe('GET /api/reservedTables/:id', () => {
        it('should get a reserved table by the given id', async () => {
            const reservedTableId = 1;
            const res = await request(app).get(`/api/reservedTables/${reservedTableId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data[0]).toHaveProperty('id', reservedTableId);
        });
    });

    describe('GET /api/reservedTables/reservations-on-day', () => {
        it('should not get all reservations for a specific table on a given day', async () => {
            const tableNumber = 1;
            const fromDate = '2024-11-03 12:00:00'; // Get today's date in YYYY-MM-DD format
            const res = await request(app).get(`/api/reservedTables/reservations-on-day?tableNumber=${tableNumber}&fromDate=${fromDate}`);
            expect(res.statusCode).toEqual(204);
        });
    });

    describe('POST /api/reservedTables', () => {
        it('should create a new reserved table', async () => {
            const reservedTable = {
                tableNumber: 3,
                name: 'Alice',
                numberOfCustomers: 3,
                reservedAt: new Date(),
                reservedUntil: new Date(new Date().getTime() + 60 * 60 * 1000) // 1 hour later
            };
            const res = await request(app).post('/api/reservedTables').send(reservedTable);
            expect(res.statusCode).toEqual(204);
        });
    });

    describe('DELETE /api/reservedTables/:id', () => {
        it('should delete a reserved table by the given id', async () => {
            const reservedTableId = 1;
            const res = await request(app).delete(`/api/reservedTables/${reservedTableId}`);
            expect(res.statusCode).toEqual(200);
        });
    });
});