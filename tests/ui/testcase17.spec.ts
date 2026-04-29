import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CartPage } from '../../pages/cart.page';
import { ProductsPage } from '../../pages/products.page';
import { registerUser } from '../../utils/signuphelper';


test ('Test Case 17: Remove products from cart', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);
    const product = new ProductsPage(page);
    const email = `test${Date.now()}@mail.com`;

    await registerUser (page, email);
    await home.navigate();
    await home.verifyHomePageVisible();
    await home.goToProducts();
    await product.addFirstProductToCart();
    await product.clickContinueShopping();
    await product.addSecondProductToCart();
    await product.clickContinueShopping();
    await home.goToCart();
    await cart.verifyCartPageVisible();
    const beforeCount = await cart.getCartProductCount();
    await cart.deleteProduct();
    const afterCount = await cart.getCartProductCount();
    expect(afterCount).toBeLessThan(beforeCount);


})