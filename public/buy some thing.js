const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1463,
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
                x: 18.125,
                y: 18.5,
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
            targetPage.locator('::-p-aria(Email Address)'),
            targetPage.locator('#email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"email\\"])'),
            targetPage.locator(':scope >>> #email'),
            targetPage.locator('::-p-text(noblebarch@gmail.com)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 99.5,
                y: 13.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"password\\"])'),
            targetPage.locator(':scope >>> #password'),
            targetPage.locator('::-p-text(Nob13-Darm)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 37.5,
                y: 3.609375,
              },
            });
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
                x: 40.5,
                y: 11.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Apple iPhone 14[role=\\"image\\"])'),
            targetPage.locator('div.mt-2 div.row > div:nth-of-type(2) img'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div[2]/div/div[3]/div[1]/div[2]/div/a/img)'),
            targetPage.locator(':scope >>> div.mt-2 div.row > div:nth-of-type(2) img')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 86,
                y: 136.203125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(ADD TO CART )'),
            targetPage.locator('div.col-lg button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div/div[3]/div/div/div[5]/button)'),
            targetPage.locator(':scope >>> div.col-lg button'),
            targetPage.locator('::-p-text(Add to Cart)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 77.5,
                y: 9.734375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(PROCEED TO CHECKOUT)'),
            targetPage.locator('div.col-md-4 button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div[2]/div/div[2]/button)'),
            targetPage.locator(':scope >>> div.col-md-4 button'),
            targetPage.locator('::-p-text(Proceed To Checkout)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 37.5,
                y: 32.015625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Address)'),
            targetPage.locator('#address'),
            targetPage.locator('::-p-xpath(//*[@id=\\"address\\"])'),
            targetPage.locator(':scope >>> #address')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 126.5,
                y: 25.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(City)'),
            targetPage.locator('#city'),
            targetPage.locator('::-p-xpath(//*[@id=\\"city\\"])'),
            targetPage.locator(':scope >>> #city')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 62.5,
                y: 15.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Postal Code)'),
            targetPage.locator('#postalCode'),
            targetPage.locator('::-p-xpath(//*[@id=\\"postalCode\\"])'),
            targetPage.locator(':scope >>> #postalCode')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 23.5,
                y: 2.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Phone Number)'),
            targetPage.locator('#phoneNum'),
            targetPage.locator('::-p-xpath(//*[@id=\\"phoneNum\\"])'),
            targetPage.locator(':scope >>> #phoneNum')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 29.5,
                y: 2.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(CONTINUE)'),
            targetPage.locator('main button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div/form/button)'),
            targetPage.locator(':scope >>> main button'),
            targetPage.locator('::-p-text(Continue)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 29.5,
                y: 16.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(CONTINUE)'),
            targetPage.locator('main button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div/form/button)'),
            targetPage.locator(':scope >>> main button'),
            targetPage.locator('::-p-text(Continue)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 42.5,
                y: 22,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(PLACE ORDER   )'),
            targetPage.locator('main button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div[2]/div[2]/div/div/div[7]/button)'),
            targetPage.locator(':scope >>> main button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 45.5,
                y: 9.40625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(PAY NOW)'),
            targetPage.locator('main button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div[2]/div/div/div[6]/button)'),
            targetPage.locator(':scope >>> main button'),
            targetPage.locator('::-p-text(Pay now)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 61.5,
                y: 35.40625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Noble Biru) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('#root div:nth-of-type(3) > div span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"username\\"]/span)'),
            targetPage.locator(':scope >>> #root div:nth-of-type(3) > div span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 42.71875,
                y: 6.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Logout)'),
            targetPage.locator('div:nth-of-type(3) a:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"offcanvasNavbar-expand-md\\"]/div[2]/div[3]/div/div/a[2])'),
            targetPage.locator(':scope >>> div:nth-of-type(3) a:nth-of-type(2)'),
            targetPage.locator('::-p-text(Logout)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 53.71875,
                y: 24.0625,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
