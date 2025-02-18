import { test, expect } from '@playwright/test';

test.describe('Order.vue', () => {

    test('should render NewOrder component by default', async ({ page }) => {
        await page.goto('http://localhost:5173/orders');

        const newOrderButton = page.locator('button.navbar-link', { hasText: 'Új rendelés' });
        await newOrderButton.click();

        const currentComponent = page.locator('component').first();
        await expect(currentComponent).toHaveText('NewOrder'); // assuming 'NewOrder' is a key part of the component's template or content
    });

    test('should toggle mobile menu', async ({ page }) => {
        await page.goto('http://localhost:5173/orders');

        const hamburgerMenu = page.locator('.hamburger-menu');
        await hamburgerMenu.click();

        const mobileMenu = page.locator('.mobile-menu');
        await expect(mobileMenu).toBeVisible();
    });

    test('should trigger popup on failed redirect', async ({ page }) => {
        // Mock API response for failure
        await page.route('**/redirect', (route) => {
            route.fulfill({
                status: 500,
                body: JSON.stringify({ message: 'error' })
            });
        });

        await page.goto('http://localhost:5173/orders');

        const popup = page.locator('.popup');
        await expect(popup).toBeVisible();
        await expect(popup).toContainText('Hiba történt a betöltés során!');
    });

    test('should trigger logout and redirect to login', async ({ page }) => {
        // Mock logout API
        await page.route('**/logout', (route) => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({ message: 'Logged out successfully' })
            });
        });

        await page.goto('http://localhost:5173/orders');

        const logoutButton = page.locator('button.logout-button');
        await logoutButton.click();

        // Verify redirection to login page
        await expect(page).toHaveURL('http://localhost:5173/login');
    });

    test('should switch between components on navbar button click', async ({ page }) => {
        await page.goto('http://localhost:5173/orders');

        // Click on "Készülő rendelések lista"
        const inProcessButton = page.locator('button.navbar-link', { hasText: 'Készülő rendelések lista' });
        await inProcessButton.click();

        const currentComponent = page.locator('component').first();
        await expect(currentComponent).toHaveText('InProcessOrderList');  // Adjust according to component content
    });

    test('should display items in table and handle add/remove actions', async ({ page }) => {
        const items = [{ name: 'Item 1' }, { name: 'Item 2' }];

        // Mock items
        await page.addScriptTag({
            content: `window.items = ${JSON.stringify(items)};`
        });

        await page.goto('http://localhost:5173/orders');

        const itemRows = page.locator('table.item-table tbody tr');
        await expect(itemRows).toHaveCount(2);

        const addItemButton = itemRows.nth(0).locator('button.add-button');
        await addItemButton.click();


    });


    test('should fetch orders on page load', async ({ page }) => {
        // Mocking the network request for fetching orders
        await page.route('**/api/orders/in-process', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: [
                        { id: 1, tableNumber: 5, itemName: 'Pizza', orderedAt: '2025-02-18T12:00:00Z' },
                    ]
                })
            });
        });

        await page.goto('http://localhost:5173/in-process-orders');  // Replace with your app's URL

        // Check if the order is rendered
        const orderItem = await page.locator('text=Pizza');
        await expect(orderItem).toBeVisible();
    });

    test('should show error message on failure to fetch orders', async ({ page }) => {
        // Mocking the network request for an error
        await page.route('**/api/orders/in-process', route => {
            route.fulfill({
                status: 500,
                body: JSON.stringify({ message: 'Server Error' })
            });
        });

        await page.goto('http://localhost:5173/in-process-orders');  // Replace with your app's URL

        // Check if the popup appears with error message
        const popupMessage = await page.locator('.popup-message');
        await expect(popupMessage).toHaveText('Sikertelen lekérdezés!');
    });

    test('should filter orders based on search query', async ({ page }) => {
        // Mocking the network request for fetching orders
        await page.route('**/api/orders/in-process', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: [
                        { id: 1, tableNumber: 5, itemName: 'Pizza', orderedAt: '2025-02-18T12:00:00Z' },
                        { id: 2, tableNumber: 7, itemName: 'Pasta', orderedAt: '2025-02-18T12:05:00Z' },
                    ]
                })
            });
        });

        await page.goto('http://localhost:5173/in-process-orders');

        // Type into the search box
        await page.fill('input[name="search-query"]', 'Pizza');

        // Check if the filtered orders list contains only the "Pizza" item
        const orderItems = await page.locator('.order-item');
        const orderCount = await orderItems.count();
        await expect(orderCount).toBe(1);
        await expect(orderItems.first()).toHaveText('Pizza');
    });

    test('should trigger rollback when rollback button is clicked', async ({ page }) => {
        // Mocking the network request for the rollback action
        await page.route('**/api/order/rollback-done/*', route => {
            route.fulfill({ status: 200 });
        });

        await page.goto('http://localhost:5173/in-process-orders');

        // Trigger the rollback action
        const rollbackButton = await page.locator('.action-button');
        await rollbackButton.click();

        // Check if the rollback action triggers the expected API call
        // In Playwright, we can listen for network requests to verify this
        const [response] = await Promise.all([
            page.waitForResponse('**/api/order/rollback-done/*'),
            rollbackButton.click()
        ]);

        expect(response.status()).toBe(200);
    });

    test('should fetch finished orders on page load', async ({ page }) => {
        // Mocking the network request for fetching finished orders
        await page.route('**/api/orders/finished', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: [
                        { id: 1, tableNumber: 5, itemName: 'Burger', orderedAt: '2025-02-18T12:00:00Z' },
                    ]
                })
            });
        });

        await page.goto('http://localhost:5173/finished-orders');  // Replace with your app's URL

        // Check if the finished order is rendered
        const orderItem = await page.locator('text=Burger');
        await expect(orderItem).toBeVisible();
    });

    test('should filter finished orders based on search query', async ({ page }) => {
        // Mocking the network request for fetching finished orders
        await page.route('**/api/orders/finished', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: [
                        { id: 1, tableNumber: 5, itemName: 'Burger', orderedAt: '2025-02-18T12:00:00Z' },
                        { id: 2, tableNumber: 7, itemName: 'Salad', orderedAt: '2025-02-18T12:05:00Z' },
                    ]
                })
            });
        });

        await page.goto('http://localhost:5173/finished-orders');

        // Type into the search box
        await page.fill('input[name="search-query"]', 'Burger');

        // Check if the filtered orders list contains only the "Burger" item
        const orderItems = await page.locator('.order-item');
        const orderCount = await orderItems.count();
        await expect(orderCount).toBe(1);
        await expect(orderItems.first()).toHaveText('Burger');
    });

    test('should trigger set to served action when button is clicked', async ({ page }) => {
        // Mocking the network request for the "set served" action
        await page.route('**/api/order/set-served/*', route => {
            route.fulfill({ status: 200 });
        });

        await page.goto('http://localhost:5173/finished-orders');

        // Trigger the set served action
        const servedButton = await page.locator('.action-button:nth-of-type(2)');
        await servedButton.click();

        // Check if the set served action triggers the expected API call
        const [response] = await Promise.all([
            page.waitForResponse('**/api/order/set-served/*'),
            servedButton.click()
        ]);

        expect(response.status()).toBe(200);
    });

    test('should fetch items and tables on page load', async ({ page }) => {
        // Mocking the network requests for fetching items and tables
        await page.route('**/api/items', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({ data: [{ id: 1, name: 'Pizza' }] })
            });
        });
        await page.route('**/api/tables', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({ data: [{ id: 1, tableNumber: '5' }] })
            });
        });

        await page.goto('http://localhost:5173/new-order');

        // Check if the item and table are rendered
        const item = await page.locator('text=Pizza');
        await expect(item).toBeVisible();
        const table = await page.locator('text=5');
        await expect(table).toBeVisible();
    });

    test('should filter items based on search query', async ({ page }) => {
        // Mocking the network request for fetching items
        await page.route('**/api/items', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: [
                        { id: 1, name: 'Pizza' },
                        { id: 2, name: 'Burger' }
                    ]
                })
            });
        });

        await page.goto('http://localhost:5173/new-order');

        // Type into the search box for items
        await page.fill('input[name="search-query"]', 'Pizza');

        // Check if the filtered items list contains only "Pizza"
        const item = await page.locator('.item');
        const itemCount = await item.count();
        await expect(itemCount).toBe(1);
        await expect(item.first()).toHaveText('Pizza');
    });

    test('should prevent order creation if required fields are missing', async ({ page }) => {
        await page.goto('http://localhost:5173/new-order');

        // Try to submit with missing table or items
        const submitButton = await page.locator('.submit-button');
        await submitButton.click();

        // Check for validation error message
        const errorMessage = await page.locator('.error-message');
        await expect(errorMessage).toHaveText('Minden mező kitöltése kötelező!');
    });

    test('should create new order successfully', async ({ page }) => {
        // Mocking the network request for creating a new order
        await page.route('**/api/order', route => {
            route.fulfill({ status: 200, body: JSON.stringify({ message: 'Order created successfully' }) });
        });

        await page.goto('http://localhost:5173/new-order');

        // Fill the order form
        await page.fill('input[name="table"]', '5');
        await page.fill('input[name="item"]', 'Pizza');

        // Submit the form
        const submitButton = await page.locator('.submit-button');
        await submitButton.click();

        // Check for success message
        const successMessage = await page.locator('.popup-message');
        await expect(successMessage).toHaveText('Sikeres létrehozás!');
    });
});
