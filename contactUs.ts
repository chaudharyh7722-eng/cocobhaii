import { Page, Locator } from "@playwright/test";
export class contactUs {
  readonly page: Page;
  readonly form_heading: Locator;
  readonly name: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectDropdown: Locator;
  readonly messageInput: Locator;
  readonly termsCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form_heading = page.getByText('Send us a Message', { exact: true });
    this.name = page.locator('input[id="form-field-name"]');
    this.emailInput = page.locator('input[id="form-field-email"][placeholder="e.g. hello@deverust.com"]');
    this.phoneInput = page.locator('input[id="form-field-field_9f649f5"]');
    this.subjectDropdown = page.locator('select[id="form-field-field_9991da5"]');
    this.messageInput = page.locator('textarea[id="form-field-message"]');
    this.termsCheckbox = page.locator('input[id="form-field-field_7c681ce"]');
    this.submitButton = page.getByRole('button', { name: 'Send Message' });
  }

  async getconnect(name: string, email: string, phone: string, message: string) {
    // Use Playwright locators + evaluate to set all values safely
    // Fill name normally
    await this.name.fill(name);

    // Fill ALL elements with id form-field-email
    await this.page.evaluate((emailVal) => {
      const allEmails = document.querySelectorAll('input[id="form-field-email"]');
      allEmails.forEach((el) => {
        const inputEl = el as HTMLInputElement;
        inputEl.value = emailVal;
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }, email);

    // Handle phone number (type=number can't accept non-digits via normal fill)
    await this.phoneInput.evaluate((el, val) => {
      const inputEl = el as HTMLInputElement;
      inputEl.value = val;
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      inputEl.dispatchEvent(new Event('change', { bubbles: true }));
    }, phone);

    // Set subject
    await this.subjectDropdown.selectOption({ label: 'Technical Issue' });

    // Fill message
    await this.messageInput.fill(message);

    // Check terms
    await this.termsCheckbox.check();

    // Submit
    await this.submitButton.click();
  }

  async verifythedropdown() {
    const options = this.subjectDropdown.locator('option');
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      console.log(text?.trim());
    }
  }
}