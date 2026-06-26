import{test, expect, Locator, Page} from "@playwright/test";
test('cocobhai', async({page}) =>
    {
        await page.goto("https://.............");
        await expect(page).toHaveURL("https://................");
        const logo: Locator = page.locator("div[data-id='fe29496']> *");
        await logo.isVisible();
        const Count: Locator = page.locator("#menu-1-e0ec0fe>.menu-item");
        const allname = await Count.count();
        console.log("Element Count Is:- ", allname);
        for(let i=0; i < await Count.count(); i++)
        {
            console.log(await Count.nth(i).innerText());
        }
//check the redirection contactUs page
        await Count.last().click();
        const currenturl = await page.url();
        console.log("CurrentUrl ", currenturl);
        await page.waitForURL("https://..............");
        await expect(page).toHaveURL("https://.................");  
        console.log(await page.title());
        await page.goBack();
        
//check the redirection of aboutUs
        await Count.nth(3).click();
        const abtUrl = await page.url();
        console.log("About Us ", abtUrl);
        await expect(page).toHaveURL("https://................");
        console.log(await page.title());
        await page.goBack();

//check the redirection of internship page
        await Count.nth(2).click();
        const internUrl = await page.url();
        console.log("Intern ", internUrl);
        await expect(page).toHaveURL("https://.............");
        console.log(await page.title());
        await page.goBack();

//check the redirection of job page
        await Count.nth(1).click();
        const jobUrl = await page.url();
        console.log("Job ", jobUrl);
        await expect(page).toHaveURL("https://....................");
        console.log(await page.title());
        


    });
