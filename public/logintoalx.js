const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1605,
            height: 931
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://intranet.alxswe.com/auth/sign_in');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Email)'),
            targetPage.locator('#user_email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"user_email\\"])'),
            targetPage.locator(':scope >>> #user_email')
        ])
            .setTimeout(timeout)
            .fill('noblebiru@yahoo.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#user_password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"user_password\\"])'),
            targetPage.locator(':scope >>> #user_password')
        ])
            .setTimeout(timeout)
            .fill('noba the killer');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('a');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Email)'),
            targetPage.locator('#user_email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"user_email\\"])'),
            targetPage.locator(':scope >>> #user_email'),
            targetPage.locator('::-p-text(noblebiru@yahoo.com)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 110,
                y: 18,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Email)'),
            targetPage.locator('#user_email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"user_email\\"])'),
            targetPage.locator(':scope >>> #user_email'),
            targetPage.locator('::-p-text(noblebiru@yahoo.com)')
        ])
            .setTimeout(timeout)
            .fill('noblebiru@yahoo.com');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Control');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#user_password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"user_password\\"])'),
            targetPage.locator(':scope >>> #user_password'),
            targetPage.locator('::-p-text(noba the killer)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 46,
                y: 18,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#user_password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"user_password\\"])'),
            targetPage.locator(':scope >>> #user_password'),
            targetPage.locator('::-p-text(noba the killer)')
        ])
            .setTimeout(timeout)
            .fill('noba the killer');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Log in)'),
            targetPage.locator('div.actions > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"new_user\\"]/div[4]/input)'),
            targetPage.locator(':scope >>> div.actions > input')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 56.375,
                y: 8,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Webstack - Portfolio Project)'),
            targetPage.locator('div.student-home > div > div > div:nth-of-type(1) > div:nth-of-type(2) a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"content\\"]/article/div[2]/div/div/div[1]/div[2]/ul/li/div/div/a)'),
            targetPage.locator(':scope >>> div.student-home > div > div > div:nth-of-type(1) > div:nth-of-type(2) a')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 151.640625,
                y: 3.46875,
              },
            });
        await Promise.all(promises);
    }
    {
        const target = await browser.waitForTarget(t => t.url() === 'https://www.youtube.com/embed/PWsDWYTOW2U', { timeout });
        const targetPage = await target.page();
        targetPage.setDefaultTimeout(timeout);
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Play)'),
            targetPage.locator('div.ytp-cued-thumbnail-overlay > button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"movie_player\\"]/div[4]/button)'),
            targetPage.locator(':scope >>> div.ytp-cued-thumbnail-overlay > button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 41,
                y: 43.5,
              },
            });
    }
    {
        const target = await browser.waitForTarget(t => t.url() === 'https://www.youtube.com/embed/PWsDWYTOW2U', { timeout });
        const targetPage = await target.page();
        targetPage.setDefaultTimeout(timeout);
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Pause keyboard shortcut k)'),
            targetPage.locator('div.ytp-left-controls > button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"movie_player\\"]/div[26]/div[2]/div[1]/button)'),
            targetPage.locator(':scope >>> div.ytp-left-controls > button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 25,
                y: 34,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
