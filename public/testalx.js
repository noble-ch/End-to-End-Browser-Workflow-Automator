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
        await targetPage.goto('https://www.google.com/search?q=intranet+alx&oq=intranet+alx&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMgYIARAjGCcyCAgCEAAYFhgeMggIAxAAGBYYHjINCAQQABiGAxiABBiKBTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDMzODZqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Intranet)'),
            targetPage.locator('#rso > div:nth-of-type(1) h3'),
            targetPage.locator('::-p-xpath(//*[@id=\\"ixcYae\\"]/div/div/div[1]/div/div/span/a/h3)'),
            targetPage.locator(':scope >>> #rso > div:nth-of-type(1) h3')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 10,
                y: 22.46875,
              },
            });
        await Promise.all(promises);
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
