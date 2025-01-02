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
        await targetPage.goto('chrome://newtab/');
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
                x: 328.5,
                y: 32,
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
            targetPage.locator('#video-preview video'),
            targetPage.locator('::-p-xpath(//*[@id=\\"inline-preview-player\\"]/div[1]/video)'),
            targetPage.locator(':scope >>> #video-preview video')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 417,
                y: 119.2265625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Seek slider)'),
            targetPage.locator('div.ytp-progress-bar'),
            targetPage.locator('::-p-xpath(//*[@id=\\"movie_player\\"]/div[27]/div[1]/div[2])'),
            targetPage.locator(':scope >>> div.ytp-progress-bar')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 343,
                y: 0.4375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('ytd-app > div:nth-of-type(1) video'),
            targetPage.locator('::-p-xpath(//*[@id=\\"movie_player\\"]/div[1]/video)'),
            targetPage.locator(':scope >>> ytd-app > div:nth-of-type(1) video')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 437,
                y: 170,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('ytd-watch-metadata like-button-view-model div.yt-spec-touch-feedback-shape__fill'),
            targetPage.locator('::-p-xpath(//*[@id=\\"top-level-buttons-computed\\"]/segmented-like-dislike-button-view-model/yt-smartimation/div/div/like-button-view-model/toggle-button-view-model/button-view-model/button/yt-touch-feedback-shape/div/div[2])'),
            targetPage.locator(':scope >>> ytd-watch-metadata like-button-view-model div.yt-spec-touch-feedback-shape__fill')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 37.140625,
                y: 15.4375,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
