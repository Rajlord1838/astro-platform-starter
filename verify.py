import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("http://localhost:4321")

        # Add to cart first
        buttons = await page.query_selector_all("button:has-text('Add to Cart')")
        if buttons:
            await buttons[0].click()
            await asyncio.sleep(1) # wait for event

        await page.screenshot(path="homepage.png")

        # Click the cart icon
        # Look for the cart modal trigger
        cart_button = await page.query_selector("button:has(svg.lucide-shopping-bag)")
        if not cart_button:
            cart_button = await page.query_selector("button:has(svg)")

        if cart_button:
            await cart_button.click()
            await asyncio.sleep(1) # wait for modal to open
            await page.screenshot(path="cart.png")
        else:
            print("Cart button not found")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
