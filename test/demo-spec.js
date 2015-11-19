'use strict';

describe('Twitter login form', function() {

    beforeEach(function() {
        browser.get('http://localhost:8080/')
    })

    it('should have a page title of "Twitter"', function() {
        //assertion, expecting title to be Twitter
        expect(browser.getTitle()).toEqual('Twitter');
    });

    it('should let the user sign in to an account', function() {
        var emailInput = element(by.model('email'));
        emailInput.sendKeys('test@example.com');
        var passwordInput = element(by.model('password'));
        passwordInput.sendKeys('password');
        var signInButton = element(by.buttonText('Sign-in'));
        signInButton.click();     
    }) 

    it('sign in button should work properly', function() {
        var emailInput = element(by.model('email'));
        var passwordInput = element(by.model('password'));
        var signInButton = element(by.buttonText('Sign-in'));

        expect(signInButton.isEnabled()).toBe(false); //unable to sign-up with no pass/email

        emailInput.sendKeys('test@example.com');
        passwordInput.sendKeys('password'); 

        expect(signInButton.isEnabled()).toBe(true); //enable to sign-up with pass/email
    })

});