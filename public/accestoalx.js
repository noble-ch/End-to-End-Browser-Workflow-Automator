const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1372,
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
                x: 84.5,
                y: 11,
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
                x: 29.875,
                y: 18,
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
                x: 159.640625,
                y: 6.46875,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#input_11805'),
            targetPage.locator('::-p-xpath(//*[@id=\\"input_11805\\"])'),
            targetPage.locator(':scope >>> #input_11805')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 260,
                y: 15.03125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#input_11805'),
            targetPage.locator('::-p-xpath(//*[@id=\\"input_11805\\"])'),
            targetPage.locator(':scope >>> #input_11805')
        ])
            .setTimeout(timeout)
            .fill('https:');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up(';');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#input_11805'),
            targetPage.locator('::-p-xpath(//*[@id=\\"input_11805\\"])'),
            targetPage.locator(':scope >>> #input_11805')
        ])
            .setTimeout(timeout)
            .fill('https://hello.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#task-num-0 div.input-group button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"task-11805\\"]/div[3]/div/div/div[1]/span/button)'),
            targetPage.locator(':scope >>> #task-num-0 div.input-group button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 29.0625,
                y: 15.03125,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
