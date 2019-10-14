const assert = require('assert');
const path = require('path');
const API_URL = 'http://localhost:5000';
const BASE_URL = 'http://localhost:3000';

describe('Basic test on front end', () => {
    it('should have the right title', () => {
        browser.url('http://localhost:3000/');
        browser.setupInterceptor(); // capture ajax calls

        const title = browser.getTitle();
        assert.strictEqual(title, 'FireShare');
    });

    it('should be able to login using test account', () => {
        const email = $('input[name="email"]');
        const password = $('input[name="password"]');
        const login = $('button');

        email.setValue('test@gmail.com');
        password.setValue('aaaaaa');
        login.click();

        browser.expectRequest('GET', API_URL + '/user', 200);
    });

    it('should be able to upload file', () => {
        // Can't stimulate drag and drop
        const filePath = path.join(__dirname, '/assets/testFile.txt');

        const upload = $('button[name="upload"]');
        upload.click();

        const close = $('button[class="close"]');
        close.click();
    });

    it('should be able to share/unshare the file', () => {
        browser.pause(1000);

        const dropDown = $('#root > div > div:nth-child(2) > table > tbody > tr > td.text-center.actionIcon > div > button');
        dropDown.click();

        const shareBtn = $('#root > div > div:nth-child(2) > table > ' +
            'tbody > tr > td.text-center.actionIcon > div > div > a:nth-child(2)');
        shareBtn.click();
        const shareButtons = $('.userHolder button');

        shareButtons.click();

        const confirmBtn = $('.modal-footer button');
        confirmBtn.click();

        browser.expectRequest('GET', API_URL + '/user', 200);
    });


    it('should be able to log out', () => {
        const logout = $('#basic-navbar-nav > button');
        logout.click();

        let url = browser.getUrl();
        assert.strictEqual(url,BASE_URL + '/login');
    });
});