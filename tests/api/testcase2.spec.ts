import { test, expect } from '@playwright/test';

test('API 2 - POST To All Products List', async ({ request }) => {

  const response = await request.post('/api/productsList');

  console.log('HTTP Status Code:', response.status());

  const responseBody = await response.json();

  console.log('Response Body:', responseBody);

  // Validate HTTP status
  expect(response.status()).toBe(200);

  // Validate API response code
  expect(responseBody.responseCode).toBe(405);

  // Validate error message
  expect(responseBody.message).toBe(
    'This request method is not supported.'
  );
});