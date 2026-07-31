import { Given } from "@cucumber/cucumber";

Given("test", async function(){
    await this.page.goto("https://www.saucedemo.com/")

})