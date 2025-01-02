const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1461,
            height: 931
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://nobashop.vercel.app/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(3) > a.d-flex > span:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"offcanvasNavbar-expand-md\\"]/div[2]/div[3]/a[2]/span[2])'),
            targetPage.locator(':scope >>> div:nth-of-type(3) > a.d-flex > span:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 20.90625,
                y: 1.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Email Address)'),
            targetPage.locator('#email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"email\\"])'),
            targetPage.locator(':scope >>> #email')
        ])
            .setTimeout(timeout)
            .fill('noblebarch@gmail.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"password\\"])'),
            targetPage.locator(':scope >>> #password')
        ])
            .setTimeout(timeout)
            .fill('Nob13-Darm');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(SIGN IN[role=\\"button\\"])'),
            targetPage.locator('main button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div[1]/div/div/div/form/button)'),
            targetPage.locator(':scope >>> main button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 42.5,
                y: 19.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(7) div:nth-of-type(2) img'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div[7]/div/div/div[2]/div/a/img)'),
            targetPage.locator(':scope >>> div:nth-of-type(7) div:nth-of-type(2) img')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 113.5,
                y: 97.203125,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
