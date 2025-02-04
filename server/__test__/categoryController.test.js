const { describe, expect, it, test, beforeEach, afterEach, afterAll, beforeAll} = require('@jest/globals');
const categoryController = require('../controllers/categoryController');
const connect = require('../config/db');

beforeAll(async () => {

    await new Promise((resolve, reject) => {
        connect.connect((err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    await new Promise((resolve, reject) => {
        connect.query("CREATE DATABASE IF NOT EXISTS test_vizsgaremek", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    await new Promise((resolve, reject) => {
        connect.query("USE test_vizsgaremek", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    await new Promise((resolve, reject) => {
        connect.query("CREATE TABLE IF NOT EXISTS category (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });


    await new Promise((resolve, reject) => {
        connect.query("INSERT INTO category (name) VALUES ('Category 1'), ('Category 2'), ('Category 3')", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
});

afterAll(async () => {

    await new Promise((resolve, reject) => {
        connect.query("DROP TABLE IF EXISTS category", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    await new Promise((resolve, reject) => {
        connect.end((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
});

describe('Category Controller tests', () => {
    test('should have a getAllCategories function', () => {
        expect(typeof categoryController.getAllCategories).toBe('function');
    });

    test('should have a getCategoryById function', () => {
        expect(typeof categoryController.getCategoryById).toBe('function');
    });

    test('should have a createCategory function', () => {
        expect(typeof categoryController.createCategory).toBe('function');
    });

    test('should have a deleteCategory function', () => {
        expect(typeof categoryController.deleteCategory).toBe('function');
    });

    it('should return category by Id', async () => {
        const req = {
            params: {
                id: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await categoryController.getCategoryById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Kategória sikeresen lekérve."
        }));
    });

    it('should create new category', async () => {
        const req = {
            body: {
                name: 'Category 4'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await categoryController.createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Kategória sikeresen létrehozva."
        }));
        
    });

    it('should delete category by Id', async () => {
        const req = {
            params: {
                id: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await categoryController.deleteCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Kategória sikeresen törölve."
        }));
    });

    it('should return all categories', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await categoryController.getAllCategories(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Kategóriák sikeresen lekérve."
        }));
    });
});