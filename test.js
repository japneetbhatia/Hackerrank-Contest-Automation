const puppy = require("puppeteer");
const id = "hafacor406@0pppp.com";
const pass = "hafacor";
let dataToType = "randomDataInput";

let moderators = [
    "japneetk1111",
    "harmeetkaur1203",
    "nocidi6371",
    "gopowo7793",
    "sibaje3329"
]

async function main(){
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximize"]
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click("button[type='submit']");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".username.text-ellipsis");
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible: true});
    let administrationButtons = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await administrationButtons[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    }, createChallengeButton);
    for(let i = 0; i < 5; i++){
        await createChallenge("https://www.hackerrank.com" + createChallengeUrl,tab);
    }
    // await tab.waitForSelector(".btn.btn-primary", {visible : true});
    // await tab.click(".btn.btn-primary");
    await browser.close();
}

async function createChallenge(url,tab){
    await tab.goto(url);
    await tab.waitForSelector("#name");
    await tab.type("#name",dataToType);
    await tab.type("#preview",dataToType);
    await tab.waitForSelector(".CodeMirror textarea", {visible: true});
    let fourBoxes = await tab.$$(".CodeMirror textarea");
    for(let i = 0; i < fourBoxes.length; i++){
        await fourBoxes[i].type(dataToType);
    }freebirdFormeditorViewItemTitleInputWrapper
    await tab.waitForSelector("#tags_tag", {visible: true});
    await tab.type("#tags_tag", dataToType);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");
    await tab.waitForSelector("li[data-tab='moderators']");
    await tab.click("li[data-tab='moderators']");
    await tab.waitForSelector("#moderator", {visible: true});
    for(let i = 0; i < moderators.length; i++){
        await tab.type("#moderator",moderators[i]);
        await tab.keyboard.press("Enter");
    }
    await tab.click(".save-challenge.btn.btn-green");
}

main();