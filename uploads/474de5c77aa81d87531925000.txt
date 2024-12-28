const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1356,
            height: 931
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Search[role=\\"combobox\\"])'),
            targetPage.locator('yt-searchbox input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"center\\"]/yt-searchbox/div[1]/form/input)'),
            targetPage.locator(':scope >>> yt-searchbox input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 373.5,
                y: 21,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Search[role=\\"combobox\\"])'),
            targetPage.locator('yt-searchbox input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"center\\"]/yt-searchbox/div[1]/form/input)'),
            targetPage.locator(':scope >>> yt-searchbox input')
        ])
            .setTimeout(timeout)
            .fill('next js ');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Search[role=\\"combobox\\"])'),
            targetPage.locator('yt-searchbox input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"center\\"]/yt-searchbox/div[1]/form/input)'),
            targetPage.locator(':scope >>> yt-searchbox input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 76.5,
                y: 11,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Search[role=\\"combobox\\"])'),
            targetPage.locator('yt-searchbox input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"center\\"]/yt-searchbox/div[1]/form/input)'),
            targetPage.locator(':scope >>> yt-searchbox input')
        ])
            .setTimeout(timeout)
            .fill('next js code');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
