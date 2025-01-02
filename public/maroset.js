const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 950,
            height: 931
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://maroset.com/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(What is Maroset?[role=\\"button\\"])'),
            targetPage.locator('#accordionFlushExample > div:nth-of-type(1) button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"flush-headingOne\\"]/button)'),
            targetPage.locator(':scope >>> #accordionFlushExample > div:nth-of-type(1) button'),
            targetPage.locator('::-p-text(What is Maroset?)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 599,
                y: 46.96875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(What types of jobs are posted on Maroset?[role=\\"button\\"])'),
            targetPage.locator('div:nth-of-type(2) button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"flush-headingTwo\\"]/button)'),
            targetPage.locator(':scope >>> div:nth-of-type(2) button'),
            targetPage.locator('::-p-text(What types of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 588,
                y: 41.96875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(How do I apply for a remote job listing on Maroset?[role=\\"button\\"])'),
            targetPage.locator('#accordionExample div:nth-of-type(4) button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"flush-headingFour\\"]/button)'),
            targetPage.locator(':scope >>> #accordionExample div:nth-of-type(4) button'),
            targetPage.locator('::-p-text(How do I apply)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 578,
                y: 32.96875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria([role=\\"button\\"])'),
            targetPage.locator('nav > button'),
            targetPage.locator('::-p-xpath(/html/body/div[1]/nav/button)'),
            targetPage.locator(':scope >>> nav > button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 9,
                y: 29.5,
              },
            });
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(LOGIN)'),
            targetPage.locator('a.d-lg-none'),
            targetPage.locator('::-p-xpath(//*[@id=\\"navbarCollapse\\"]/div/a[5])'),
            targetPage.locator(':scope >>> a.d-lg-none'),
            targetPage.locator('::-p-text(login)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 54,
                y: 25,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Email)'),
            targetPage.locator("input[type='email']"),
            targetPage.locator('::-p-xpath(//*[@id=\\"container\\"]/div/form/input[2])'),
            targetPage.locator(":scope >>> input[type='email']")
        ])
            .setTimeout(timeout)
            .fill('noblebarch@gmail.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator("input[type='password']"),
            targetPage.locator('::-p-xpath(//*[@id=\\"container\\"]/div/form/input[3])'),
            targetPage.locator(":scope >>> input[type='password']")
        ])
            .setTimeout(timeout)
            .fill('root');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(SIGN IN)'),
            targetPage.locator('div.wbody button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"container\\"]/div/form/button)'),
            targetPage.locator(':scope >>> div.wbody button'),
            targetPage.locator('::-p-text(Sign In)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 74.32537841796875,
                y: 31.1500244140625,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter OTP)'),
            targetPage.locator("input[type='text']"),
            targetPage.locator('::-p-xpath(//*[@id=\\"container\\"]/div/form/input[2])'),
            targetPage.locator(":scope >>> input[type='text']")
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 144.5,
                y: 13.25,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter OTP)'),
            targetPage.locator("input[type='text']"),
            targetPage.locator('::-p-xpath(//*[@id=\\"container\\"]/div/form/input[2])'),
            targetPage.locator(":scope >>> input[type='text']")
        ])
            .setTimeout(timeout)
            .fill('893703');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(VERIFY OTP)'),
            targetPage.locator('div.wbody button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"container\\"]/div/form/button)'),
            targetPage.locator(':scope >>> div.wbody button'),
            targetPage.locator('::-p-text(Verify OTP)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 57.080078125,
                y: 18.1500244140625,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(  3 )'),
            targetPage.locator('nav > div:nth-of-type(1) > div > a'),
            targetPage.locator('::-p-xpath(/html/body/div/nav/div[1]/div/a)'),
            targetPage.locator(':scope >>> nav > div:nth-of-type(1) > div > a')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 40.328125,
                y: 26.28125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(  3 )'),
            targetPage.locator('nav > div:nth-of-type(1) > div > a'),
            targetPage.locator('::-p-xpath(/html/body/div/nav/div[1]/div/a)'),
            targetPage.locator(':scope >>> nav > div:nth-of-type(1) > div > a')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 40.328125,
                y: 26.28125,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
