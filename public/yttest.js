const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1274,
            height: 931
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://www.youtube.com/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.ytSearchboxComponentInputBox'),
            targetPage.locator('::-p-xpath(//*[@id=\\"center\\"]/yt-searchbox/div[1])'),
            targetPage.locator(':scope >>> div.ytSearchboxComponentInputBox')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 241.5,
                y: 34,
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
            .fill('tamrat desta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('thumbnail-hover-overlay-view-model > div'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contents\\"]/yt-lockup-view-model[1]/div/div[1]/yt-collection-thumbnail-view-model/yt-collections-stack/div/div[3]/yt-thumbnail-view-model/thumbnail-hover-overlay-view-model/div)'),
            targetPage.locator(':scope >>> thumbnail-hover-overlay-view-model > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 423,
                y: 106,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('video'),
            targetPage.locator('::-p-xpath(//*[@id=\\"movie_player\\"]/div[1]/video)'),
            targetPage.locator(':scope >>> video')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 410,
                y: 250,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
