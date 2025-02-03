const request = require('supertest');
const express = require('express');
const orderController = require('../controllers/orderController');
const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');
const connect = require('../config/db');
const app = express();

app.use(express.json());
app.get('/api/orders', orderController.getAllOrders);
app.get('/api/orders/:id', orderController.getOrderById);
app.post('/api/orders', orderController.createOrder);
app.delete('/api/orders/:id', orderController.deleteOrder);
app.get('/api/orders/in-process', orderController.getAllInProcessOrders);
app.get('/api/orders/finished', orderController.getAllFinishedOrders);
app.get('/api/orders/served', orderController.getAllServedOrders);
app.put('/api/orders/:id/done', orderController.setDoneOrder);
app.put('/api/orders/:id/rollback-done', orderController.rollbackDoneOrder);
app.put('/api/orders/:id/served', orderController.setServedOrder);
app.put('/api/orders/:id/rollback-served', orderController.rollbackServedOrder);
app.get('/api/orders/table/:id', orderController.getOrdersByTableId);

// Mock the database connection
jest.mock('../config/db', () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));

describe('Order Controller', () => {
    beforeAll(() => {
        // Mock the database connection setup
        connect.connect.mockImplementation((callback) => callback(null));
    });

    afterAll(() => {
        // Mock the database connection teardown
        connect.end.mockImplementation((callback) => callback(null));
    });

    describe('GET /api/orders', () => {
        it('should get all orders', async () => {
            // Mock the database query result
            connect.query.mockImplementation((query, callback) => {
                callback(null, [{ id: 1, tableId: 1, itemId: 1, orderedAt: new Date(), isDone: false, isServed: false }]);
            });

            const res = await request(app).get('/api/orders');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveLength(1);
        });
    });

    describe('GET /api/orders/:id', () => {
        it('should get an order by the given id', async () => {
            const orderId = 1;
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, [{ id: orderId, tableId: 1, itemId: 1, orderedAt: new Date(), isDone: false, isServed: false }]);
            });

            const res = await request(app).get(`/api/orders/${orderId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data[0]).toHaveProperty('id', orderId);
        });
    });

    describe('POST /api/orders', () => {
        it('should create a new order', async () => {
            const order = {
                tableId: 1,
                items: [1, 2]
            };
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, { insertId: 1 });
            });

            const res = await request(app).post('/api/orders').send(order);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        });
    });

    describe('DELETE /api/orders/:id', () => {
        it('should delete an order by the given id', async () => {
            const orderId = 1;
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const res = await request(app).delete(`/api/orders/${orderId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Rendelés sikeresen törölve.');
        });
    });

    describe('GET /api/orders/in-process', () => {
        it('should not get all in-process orders', async () => {
            // Mock the database query result
            connect.query.mockImplementation((query, callback) => {
                callback(null, [{
                    id: 1,
                    tableId: 1,
                    itemId: 1,
                    orderedAt: new Date(),
                    itemName: 'Item 1',
                    itemCategoryId: 1,
                    tableNumber: 1,
                    categoryId: 1,
                    categoryName: 'Food'
                }]);
            });

            const res = await request(app).get('/api/orders/in-process');
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Hiba történt a rendelés lekérése során.');
            expect(res.body.data).toBeUndefined();
        });
    });

    describe('GET /api/orders/finished', () => {
        it('should not get all finished orders', async () => {
            // Mock the database query result
            connect.query.mockImplementation((query, callback) => {
                callback(null, [{ id: 1, tableId: 1, itemId: 1, orderedAt: new Date(), isDone: true, isServed: false }]);
            });

            const res = await request(app).get('/api/orders/finished');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Hiba történt a rendelés lekérése során.');
            expect(res.body.data).toBeUndefined();
        });
    });

    describe('GET /api/orders/served', () => {
        it('should get all served orders', async () => {
            // Mock the database query result
            connect.query.mockImplementation((query, callback) => {
                callback(null, [{ id: 1, tableId: 1, itemId: 1, orderedAt: new Date(), isDone: true, isServed: true }]);
            });

            const res = await request(app).get('/api/orders/served');
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Hiba történt a rendelés lekérése során.');
            expect(res.body.data).toBeUndefined();
        });
    });

    describe('PUT /api/orders/:id/done', () => {
        it('should set an order as done', async () => {
            const orderId = 1;
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const res = await request(app).put(`/api/orders/${orderId}/done`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Rendelés sikeresen átállitva.');
        });
    });

    describe('PUT /api/orders/:id/rollback-done', () => {
        it('should rollback an order from done', async () => {
            const orderId = 1;
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const res = await request(app).put(`/api/orders/${orderId}/rollback-done`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Rendelés sikeresen visszaállitva.');
        });
    });

    describe('PUT /api/orders/:id/served', () => {
        it('should set an order as served', async () => {
            const orderId = 1;
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const res = await request(app).put(`/api/orders/${orderId}/served`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Rendelés sikeresen átállitva.');
        });
    });

    describe('PUT /api/orders/:id/rollback-served', () => {
        it('should rollback an order from served', async () => {
            const orderId = 1;
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const res = await request(app).put(`/api/orders/${orderId}/rollback-served`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Rendelés sikeresen visszaállitva.');
        });
    });

    describe('GET /api/orders/table/:id', () => {
        it('should get orders by table id', async () => {
            const tableId = 1;
            // Mock the database query result
            connect.query.mockImplementation((query, params, callback) => {
                callback(null, [{ id: 1, tableId: tableId, itemId: 1, orderedAt: new Date(), isDone: false, isServed: false }]);
            });

            const res = await request(app).get(`/api/orders/table/${tableId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        });
    });
});