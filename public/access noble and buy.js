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
            targetPage.locator('::-p-aria(Xbox Series X XBOX SERIES X \\($499.99\\)) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div.active div'),
            targetPage.locator('::-p-xpath(//*[@id=\\"carousel\\"]/div[2]/div[5]/a/div)'),
            targetPage.locator(':scope >>> div.active div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 226.703125,
                y: 171.484375,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
