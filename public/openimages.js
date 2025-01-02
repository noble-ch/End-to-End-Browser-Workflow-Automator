const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1458,
            height: 931
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://www.google.com/search?q=mobile+phones&oq=mobile+phones&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDINCAIQLhjHARjRAxiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDY5NThqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Images[role=\\"link\\"]) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div.crJ18e > div > div:nth-of-type(2) div'),
            targetPage.locator('::-p-xpath(//*[@id=\\"hdtb-sc\\"]/div/div/div[1]/div/div[2]/a/div)'),
            targetPage.locator(':scope >>> div.crJ18e > div > div:nth-of-type(2) div')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 40.4375,
                y: 6,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(I13 Max Unlocked Smartphone with Face ...[role=\\"image\\"])'),
            targetPage.locator('#dimg_7OR0Z6f_J8W2hbIPwc3RmQI_19'),
            targetPage.locator('::-p-xpath(//*[@id=\\"dimg_7OR0Z6f_J8W2hbIPwc3RmQI_19\\"])'),
            targetPage.locator(':scope >>> #dimg_7OR0Z6f_J8W2hbIPwc3RmQI_19')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 100,
                y: 80,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Which Mobile Phones Work Best for ...[role=\\"image\\"])'),
            targetPage.locator('#dimg_7OR0Z6f_J8W2hbIPwc3RmQI_403'),
            targetPage.locator('::-p-xpath(//*[@id=\\"dimg_7OR0Z6f_J8W2hbIPwc3RmQI_403\\"])'),
            targetPage.locator(':scope >>> #dimg_7OR0Z6f_J8W2hbIPwc3RmQI_403')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 145.328125,
                y: 73,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(The 5 Best Android Phones of 2024 ...[role=\\"image\\"])'),
            targetPage.locator('#dimg_7OR0Z6f_J8W2hbIPwc3RmQI_17'),
            targetPage.locator('::-p-xpath(//*[@id=\\"dimg_7OR0Z6f_J8W2hbIPwc3RmQI_17\\"])'),
            targetPage.locator(':scope >>> #dimg_7OR0Z6f_J8W2hbIPwc3RmQI_17')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 105.65625,
                y: 77.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Cheap Mobile Phones, 5.0 Inch, Android ...[role=\\"image\\"])'),
            targetPage.locator('#dimg_7OR0Z6f_J8W2hbIPwc3RmQI_269'),
            targetPage.locator('::-p-xpath(//*[@id=\\"dimg_7OR0Z6f_J8W2hbIPwc3RmQI_269\\"])'),
            targetPage.locator(':scope >>> #dimg_7OR0Z6f_J8W2hbIPwc3RmQI_269')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 99.5,
                y: 77,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
