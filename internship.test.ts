import{test, expect, Page} from  "@playwright/test";
import{internship_page} from "../pages/Internship";

const baseUrl = "https://dev.bestseoproviders.com/cocobhaii/job-type/internship/";
test.beforeEach(async({page})=>
    {
        const start = Date.now();
        await page.goto(baseUrl, {waitUntil: "domcontentloaded"});
        const end = Date.now();
        console.log(`Page Load Time: ${end - start} ms`);
        await expect(page).toHaveURL(baseUrl);
    });

const search_data = 
[
    ['ravan'],
    ['Tower Research Capital Off Campus Drive 2026']
]
const search_data2 = 
[
    ['jbsjhbdfhsbisiv'],
]

for(const [text] of search_data)
{
    test(`Verfy the intership page ${text}`, async({page})=>
        {
            const internship = new internship_page(page);
            await internship.verify_element_visiblity(text);
            //verify shorting dropdown
            const shorting = await page.locator("#cjp-ap-sort");
            await shorting.selectOption({value:"oldest"});
            await expect(shorting).toHaveValue("oldest");        
        });
}
for(const[text] of search_data2){
    test(`verify the search bar ${text}`, async({page})=>
        {
            const internship = new internship_page(page);
            await internship.check_search_bar(text);
            await internship.check_search_btn();
            await page.waitForTimeout(1000);
            await internship.check_No_result();
            await internship.check_filter_list();
            await internship.check_apply_button();
            await page.waitForTimeout(2000);
            await internship.check_clear_button();
            await internship.check_No_result();

            
            

        });
    }