import { test, expect } from '@playwright/test';

test.describe('Products API Tests', () => {

    test('API 1 - Get All Products List', async ({ request }) => {

        const response = await request.get('/api/productsList');

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log('Status Code:', response.status());
        console.log('Response Body:', responseBody);

        expect(responseBody).toHaveProperty('products');
        expect(Array.isArray(responseBody.products)).toBeTruthy();
        expect(responseBody.products.length).toBeGreaterThan(0);
    });
});