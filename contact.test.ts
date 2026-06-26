import {test, expect } from "@playwright/test";
import { contactUs} from "../pages/contactUs";

const baseUrl = "https://dev.bestseoproviders.com/cocobhaii/contact-us/";
test.beforeEach(async({page})=>
    {
        await page.goto(baseUrl);
    }); 
const contactData = 
[
    
  ['   ', "test@example.com", "1234567890", "Hello, I have a question."],
        // 1. Email blank/spaces chhod diya
  ['John Doe', '   ', '1234567890', 'Hello, I have a question.'],
  
  // 2. Email mein '@' missing hai
  ['John Doe', 'testexample.com', '1234567890', 'Hello, I have a question.'],
  
  // 3. Email mein domain extension (.com/.in) missing hai
  ['John Doe', 'test@example', '1234567890', 'Hello, I have a question.'],
  
  // 4. Email mein double @@ laga diya
  ['John Doe', 'test@@example.com', '1234567890', 'Hello, I have a question.'],
  
  // 5. Email ke beech mein invalid character daal diya
  ['John Doe', 'test!#$@example.com', '1234567890', 'Hello, I have a question.'],
  
  // 1. Phone number blank/spaces chhod diya
  ['John Doe', 'test@example.com', '   ', 'Hello, I have a question.'],
  
  // 2. Phone mein numbers ki jagah alphabets daal diye
  ['John Doe', 'test@example.com', 'abcdefghijk', 'Hello, I have a question.'],
  
  // 3. Phone mein alphabets aur numbers mix kar diye
  ['John Doe', 'test@example.com', '+1 373abcd3783', 'Hello, I have a question.'],
  
  // 4. Phone number bohot chhota daal diya (Too short)
  ['John Doe', 'test@example.com', '123', 'Hello, I have a question.'],
  
  // 5. Phone number bohot bada daal diya (Too long)
  ['John Doe', 'test@example.com', '999999999999999999', 'Hello, I have a question.'],

  // 1. Name field mein HTML code daal diya (HTML Injection check)
  ["<script>alert('hack')</script>", 'test@example.com', '1234567890', 'Hello, I have a question.'],
  
  // 2. Message field mein SQL command daal di (SQL Injection check)
  ['John Doe', 'test@example.com', '1234567890', "' OR '1'='1"]
    
]

const valid_data = [
    ['John Doe', 'test@example.com', '999999999999999999', 'Hello, I have a question.']
]

for(const [name, email, phone, message] of contactData){
test(`contact invalid data ${name}|${email}|${phone}|${message}`,async ({page})=>
{
    const contact = new contactUs(page);
    await expect(contact.form_heading).toBeVisible();

    // 1. Listen for API response
    const apiResponsePromise = page.waitForResponse(response => 
      response.url().includes('admin-ajax'),
      { timeout: 15000 }
    );

    // 2. Fill and submit form
    await contact.getconnect(name, email, phone, message);
    await contact.verifythedropdown();

    // 3. Check for HTML5 validation errors only on contact form
    const htmlValidationErrors = await page.evaluate(() => {
      const errors: string[] = [];
      const seenErrors = new Set<string>();
      // Find form near "Send us a Message" heading
      const heading = Array.from(document.querySelectorAll('*')).find(el => 
        el.textContent?.includes('Send us a Message')
      );
      let container: HTMLElement | Document = document;
      if (heading) {
        // Find nearest parent div/section that has inputs
        let current: Node | null = heading;
        while (current && current !== document.body) {
          if ((current as HTMLElement).querySelectorAll) {
            const inputs = (current as HTMLElement).querySelectorAll('input, select, textarea');
            if (inputs.length > 5) {
              container = current as HTMLElement;
              break;
            }
          }
          current = current.parentNode;
        }
      }

      const inputs = container.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const htmlInput = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (!htmlInput.validity.valid) {
          const errorKey = `${htmlInput.name || htmlInput.id}: ${htmlInput.validationMessage}`;
          if (!seenErrors.has(errorKey)) {
            seenErrors.add(errorKey);
            errors.push(errorKey);
          }
        }
      });
      return errors;
    });

    console.log(`\n==== FRONTEND HTML VALIDATION ERRORS: ${name}|${email}|${phone}|${message} ====`);
    console.log(JSON.stringify(htmlValidationErrors, null, 2));

    // 4. Get API response
    try {
      const response = await apiResponsePromise;
      const statusCode = response.status();
      
      console.log(`\n==== BACKEND API LOG FOR INVALID DATA: ${name}|${email}|${phone}|${message} ====`);
      console.log(`API URL: ${response.url()}`);
      console.log(`Status Code: ${statusCode}`);

      const responseBody = await response.text();
      console.log(`Response Body: ${responseBody}`);

    } catch (error) {
      console.error(`\n==== NO BACKEND RESPONSE (POSSIBLE FRONTEND VALIDATION STOPPED SUBMIT): ${name}|${email}|${phone}|${message} ====`);
      console.error('API timeout or error:', error);
    }

});
}

for(const [name, email, phone, message] of valid_data)
{
  test(`contact with valid data ${name}|${email}|${phone}|${message}`, async({ page }) => {
    const contact = new contactUs(page);
    await expect(contact.form_heading).toBeVisible();

    // 1. Listen for API response
    const apiResponsePromise = page.waitForResponse(response => 
      response.url().includes('admin-ajax'),
      { timeout: 15000 }
    );

    // 2. Fill and submit form
    await contact.getconnect(name, email, phone, message);
    await contact.verifythedropdown();

    // 3. Check for HTML5 validation errors only on contact form
    const htmlValidationErrors = await page.evaluate(() => {
      const errors: string[] = [];
      const seenErrors = new Set<string>();
      // Find form near "Send us a Message" heading
      const heading = Array.from(document.querySelectorAll('*')).find(el => 
        el.textContent?.includes('Send us a Message')
      );
      let container: HTMLElement | Document = document;
      if (heading) {
        // Find nearest parent div/section that has inputs
        let current: Node | null = heading;
        while (current && current !== document.body) {
          if ((current as HTMLElement).querySelectorAll) {
            const inputs = (current as HTMLElement).querySelectorAll('input, select, textarea');
            if (inputs.length > 5) {
              container = current as HTMLElement;
              break;
            }
          }
          current = current.parentNode;
        }
      }

      const inputs = container.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const htmlInput = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (!htmlInput.validity.valid) {
          const errorKey = `${htmlInput.name || htmlInput.id}: ${htmlInput.validationMessage}`;
          if (!seenErrors.has(errorKey)) {
            seenErrors.add(errorKey);
            errors.push(errorKey);
          }
        }
      });
      return errors;
    });

    console.log(`\n==== FRONTEND HTML VALIDATION ERRORS: ${name}|${email}|${phone}|${message} ====`);
    console.log(JSON.stringify(htmlValidationErrors, null, 2));

    // 4. Get API response
    const response = await apiResponsePromise;
    const statusCode = response.status();
    
    console.log(`\n==== BACKEND API LOG FOR VALID DATA: ${name}|${email}|${phone}|${message} ====`);
    console.log(`API URL: ${response.url()}`);
    console.log(`Status Code: ${statusCode}`);

    const responseBody = await response.text();
    console.log(`Response Body: ${responseBody}`);

    expect(response.ok()).toBeTruthy(); 
  });
}
