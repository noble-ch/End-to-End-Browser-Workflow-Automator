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
        await targetPage.goto('https://chatgpt.com/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Stay logged out)'),
            targetPage.locator("[data-testid='dismiss-welcome']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"dismiss-welcome\\"])'),
            targetPage.locator(":scope >>> [data-testid='dismiss-welcome']"),
            targetPage.locator('::-p-text(Stay logged out)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 50.09375,
                y: 13.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(New chat Model selector, current model is 4o mini Log in Sign up What can I help with? Attach files is unavailable Send prompt Create image Summarize text Code Surprise me Get advice More By messaging ChatGPT, you agree to our Terms and have read our Privacy Policy.) >>>> ::-p-aria([role=\\"paragraph\\"])'),
            targetPage.locator('p'),
            targetPage.locator('::-p-xpath(//*[@id=\\"prompt-textarea\\"]/p)'),
            targetPage.locator(':scope >>> p')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 206,
                y: 16.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#prompt-textarea'),
            targetPage.locator('::-p-xpath(//*[@id=\\"prompt-textarea\\"])'),
            targetPage.locator(':scope >>> #prompt-textarea')
        ])
            .setTimeout(timeout)
            .fill('what is a woman');
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
            targetPage.locator('::-p-aria(New chat Model selector, current model is 4o mini Log in Sign up What can I help with? Attach files is unavailable Send prompt Create image Summarize text Code Surprise me Get advice More By messaging ChatGPT, you agree to our Terms and have read our Privacy Policy.) >>>> ::-p-aria([role=\\"paragraph\\"])'),
            targetPage.locator('p'),
            targetPage.locator('::-p-xpath(//*[@id=\\"prompt-textarea\\"]/p)'),
            targetPage.locator(':scope >>> p')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 186,
                y: 1,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#prompt-textarea'),
            targetPage.locator('::-p-xpath(//*[@id=\\"prompt-textarea\\"])'),
            targetPage.locator(':scope >>> #prompt-textarea')
        ])
            .setTimeout(timeout)
            .fill('thank you');
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
