var assert = require('assert');
require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');
const chai = require("chai");
const expect = chai.expect;

describe("Test 1 - Trying to login with wrong data", function() {
    
    this.timeout(30000);

    it ("Shouldn't login", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://admin-web-app-si.herokuapp.com/login");

        // Login:
        await driver.findElement(By.xpath('//*[@id="normal_login_username"]')).sendKeys("root");
        await driver.findElement(By.xpath('//*[@id="normal_login_password"]')).sendKeys("1234567");
        await driver.findElement(By.xpath('//*[@id="normal_login"]/div[3]/div/div/div/button')).click();

        //If password is incorrect, it should show correct message
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/h3')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/h3')).getText()
            .then(textValue => { assert.equal('Login', textValue); }).then(() => driver.quit());
    });
});

describe("Test 2 - Logging in redirect on home page", function() {
    
    this.timeout(30000);

    it ("Shoud show button for adding new Merchant", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://admin-web-app-si.herokuapp.com/login");

        // Login:
        await driver.findElement(By.xpath('//*[@id="normal_login_username"]')).sendKeys("root");
        await driver.findElement(By.xpath('//*[@id="normal_login_password"]')).sendKeys("123456");
        await driver.findElement(By.xpath('//*[@id="normal_login"]/div[3]/div/div/div/button')).click();

        //Checking if there is Add Merchant and Business button 
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/button[1]/span')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/button[1]/span')).getText()
            .then(textValue => { assert.equal('Add Merchant and Business', textValue); }).then(() => driver.quit());
    });
});

describe("Test 3 - Logging out", function() {
    
    this.timeout(30000);

    it ("Shoud redirect to login page", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://admin-web-app-si.herokuapp.com/login");

        // Login:
        await driver.findElement(By.xpath('//*[@id="normal_login_username"]')).sendKeys("root");
        await driver.findElement(By.xpath('//*[@id="normal_login_password"]')).sendKeys("123456");
        await driver.findElement(By.xpath('//*[@id="normal_login"]/div[3]/div/div/div/button')).click();

        //Pressing logout button
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/header/div/div/div/span[2]/button')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/header/div/div/div/span[2]/button')).click();

        //Checking if we are on login page
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/h3')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/h3')).getText()
            .then(textValue => { assert.equal('Login', textValue); }).then(() => driver.quit());
    });
}); 

describe("Test 4 - Changing password, passwords doesn't match", function() {
    
    this.timeout(30000);

    it ("Shoud show error message", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://admin-web-app-si.herokuapp.com/changepassword");

        // Login:
        await driver.findElement(By.xpath('//*[@id="normal_login_username"]')).sendKeys("root");
        await driver.findElement(By.xpath('//*[@id="normal_login_password"]')).sendKeys("123456");
        await driver.findElement(By.xpath('//*[@id="normal_login"]/div[3]/div/div/div/button')).click();

        //Pressing change password button
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/button[2]')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/button[2]')).click();

        //Enterring new password:
        await driver.wait(until.elementLocated(By.xpath('//*[@id="password"]')), 15000);
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys("password123");
        await driver.wait(until.elementLocated(By.xpath('//*[@id="confirm"]')), 15000);
        await driver.findElement(By.xpath('//*[@id="confirm"]')).sendKeys("password");

        //Pressing submit button
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[3]/div/div/div/button')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[3]/div/div/div/button')).click();

        //Checking if there is warning message
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[2]/div[2]/div[2]/div')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[2]/div[2]/div[2]/div')).getText()
            .then(textValue => { assert.equal('The two passwords that you entered do not match!', textValue); }).then(() => driver.quit());
    });
}); 


describe("Test 5 - Changing password, new password too short", function() {
    
    this.timeout(30000);

    it ("Shoud show error message", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://admin-web-app-si.herokuapp.com/changepassword");

        // Login:
        await driver.findElement(By.xpath('//*[@id="normal_login_username"]')).sendKeys("root");
        await driver.findElement(By.xpath('//*[@id="normal_login_password"]')).sendKeys("123456");
        await driver.findElement(By.xpath('//*[@id="normal_login"]/div[3]/div/div/div/button')).click();

        //Pressing change password button
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/button[2]')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/button[2]')).click();

        //Enterring new password:
        await driver.wait(until.elementLocated(By.xpath('//*[@id="password"]')), 15000);
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys("pass");
        await driver.wait(until.elementLocated(By.xpath('//*[@id="confirm"]')), 15000);
        await driver.findElement(By.xpath('//*[@id="confirm"]')).sendKeys("pass");

        //Pressing submit button
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[3]/div/div/div/button')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[3]/div/div/div/button')).click();

        //Checking if there is warning message
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[1]/div[2]/div[2]/div')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/section/main/div/div/form/div[1]/div[2]/div[2]/div')).getText()
            .then(textValue => { assert.equal('Password must be at least 6 characters', textValue); }).then(() => driver.quit());
    });
}); 