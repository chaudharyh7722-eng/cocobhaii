import {Page, Locator, expect} from "@playwright/test"
export class internship_page
{
    readonly page:Page;
    readonly Internship_Jobs_heading: Locator;
    readonly inf_para: Locator;
    readonly intern_count: Locator;
    readonly search_bar: Locator;
    readonly search_jobs_btn: Locator;
    readonly active_job_box: Locator;
    readonly Hiring_Companies: Locator;
    readonly Open_For_Freshers: Locator;
    readonly Work_From_Home: Locator;
    readonly inter_card: Locator;
    readonly not_result:Locator;
    readonly filter_panel:Locator
    readonly filter_list:Locator;
    readonly apply_button:Locator;
    readonly clear_button:Locator;

constructor (page:Page)
{
  this.page = page;  
  this.Internship_Jobs_heading = page.locator(".cjp-ap-hero__title");
  this.inf_para = page.locator(".cjp-ap-hero__desc");
  this.intern_count = page.locator(".cjp-ap-hero__badge");
  this.search_bar = page.locator("#cjp-ap-search-input");
  this.search_jobs_btn = page.locator("//button[normalize-space()='Search Jobs']");
  this.active_job_box = page.locator("//strong[normalize-space()='1']");
  this.Hiring_Companies = page.locator("(//strong[contains(text(),'0')])[1]");
  this.Open_For_Freshers = page.locator("(//strong[contains(text(),'0')])[2]");
  this.Work_From_Home = page.locator("(//strong[contains(text(),'0')])[3]");
  this.inter_card = page.locator("div.cjp-jobs-list.cjp-ap-jobs-list");
  this.not_result = page.locator("//p[text() = 'No jobs found.']");
  this.filter_panel = page.locator('#cjp-ap-filters-panel');
  this.filter_list = page.locator('.cjp-ap-filters__list-item');
  this.apply_button = page.locator("//button[text()='Apply Filters']");
  this.clear_button = page.locator("//button[text()='Clear All']");
}

async check_internship_heading(){
   if (await this.Internship_Jobs_heading.isVisible()){console.log(await this.Internship_Jobs_heading.innerText())}
   else{console.log("Internship Heading Not Displayed")};
}
async check_inf_para(){
    if(await this.inf_para.isVisible()){console.log(await this.inf_para.innerText())}
    else{console.log("Information Para Not Visible")}; 
}
async check_intern_count(){
    const internVisible = await this.intern_count.isVisible();
    console.log(internVisible + " Internship count visible");
}
async check_search_bar(text : string){
    const visible = await this.search_bar.isVisible();
    console.log(visible + "Search Bar visible");
    await this.search_bar.fill(text);
    
}
async check_search_btn(){
    await this.search_jobs_btn.isVisible();
    await this.search_jobs_btn.click();
}
async check_active_job_box(){
    const activeBoxVisibilty = await this.active_job_box.isVisible();
    console.log(activeBoxVisibilty + " Active box is visible ")
}
async check_Hiring_Companies(){
    const hiringComponyVisibilty = await this.Hiring_Companies.isVisible();
    console.log(hiringComponyVisibilty + "Hiring Compony box is visible");
}
async check_Open_For_Freshers(){
    const openFresherbox = await this.Open_For_Freshers.isVisible();
    console.log(openFresherbox + " Open Fresher Box is Visible")
}
async check_Work_From_Home(){
    const WFH = await this.Work_From_Home.isVisible();
    console.log(WFH + "Work From Home Box Is Visible");
}
async check_inter_card(){
    const Internship_card = await this.inter_card.isVisible();
    console.log(Internship_card + "Internship Card Is Visible");
}
async check_No_result()
{
    const not = await this.not_result.isVisible();
    console.log(not + " Not result found")
    
}
async check_filters_panel(){
    const filters = await this.filter_panel.isVisible();
    console.log(filters + " visible fitler panel");
} 
async check_filter_list(){
    await this.filter_panel.scrollIntoViewIfNeeded();
    const list_count = await this.filter_list.count();
    console.log("Total Count: " + list_count);
    expect(list_count).toBeGreaterThan(0);
    for(let i=0; i<list_count;i++){
        await this.filter_list.nth(i).click();
        console.log(await this.filter_list.nth(i).innerText());
    }
}
async check_apply_button(){
    await this.apply_button.click();
}
async check_clear_button(){
    await this.clear_button.click();
}

async verify_element_visiblity(txt: string)
{
    await this.check_internship_heading();
    await this.check_inf_para();
    await this.check_intern_count();
    await this.check_search_bar(txt);
    await this.check_search_btn();
    await this.check_active_job_box();
    await this.check_Hiring_Companies();
    await this.check_Open_For_Freshers();
    await this.check_Work_From_Home();
    await this.check_inter_card();
    await this.check_filters_panel();

}



}