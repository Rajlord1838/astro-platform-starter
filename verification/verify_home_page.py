from playwright.sync_api import Page, expect, sync_playwright
import time

def test_home_page(page: Page):
  # 1. Wait for server to start and navigate
  time.sleep(3) # Ensure server is up
  page.goto("http://localhost:4321")

  # 2. Wait for page to load
  page.wait_for_load_state("networkidle")

  # 4. Take full page screenshot
  page.screenshot(path="verification/home_page.png", full_page=True)

  # 5. Test adding an item to the cart
  add_to_cart_buttons = page.locator("text=Add to Cart")
  add_to_cart_buttons.first.click()

  # 6. Click on the cart to open it
  # The cart button contains the total items text
  cart_button = page.locator("button", has_text="1").first
  cart_button.click()

  # 8. Take screenshot of cart open
  page.screenshot(path="verification/cart_open.png")

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_home_page(page)
    finally:
      browser.close()
