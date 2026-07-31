import { Given,Then,When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

 

Given('visiter le site {string}',async function(this: CustomWorld,s: string)  {
     await this.page.goto(s)

})
Given('remplir le password {string}', async function(this: CustomWorld,s: string)  {
    await this.page.locator("#user-name").fill("s")
})

When('click sur button login', async function(this: CustomWorld,) {
})

Given('remplir le username {string}',async  function(this: CustomWorld,s: string) {
})

Then('je suis dans la page accueil', async function(this: CustomWorld,) {
})
