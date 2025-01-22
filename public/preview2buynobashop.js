const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1526,
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
            targetPage.locator('div:nth-of-type(3) > a.d-flex > span.fas'),
            targetPage.locator('::-p-xpath(//*[@id=\\"offcanvasNavbar-expand-md\\"]/div[2]/div[3]/a[2]/span[1])'),
            targetPage.locator(':scope >>> div:nth-of-type(3) > a.d-flex > span.fas')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 8.75,
                y: 10.5,
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
            targetPage.locator('form > div:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div[1]/div/div/div/form/div[1])'),
            targetPage.locator(':scope >>> form > div:nth-of-type(1)'),
            targetPage.locator('::-p-text(Email Addressnoblebarch@gmail.com)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 89,
                y: 29.609375,
              },
            });
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
                x: 89,
                y: 5.609375,
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
                x: 72,
                y: 7.609375,
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
                x: 47,
                y: 10.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Apple iPhone 14[role=\\"image\\"])'),
            targetPage.locator('div.mt-2 div.row > div:nth-of-type(3) img'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div[2]/div/div[3]/div[1]/div[3]/div/a/img)'),
            targetPage.locator(':scope >>> div.mt-2 div.row > div:nth-of-type(3) img')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 92,
                y: 158.203125,
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
                x: 48,
                y: 20.015625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Address)'),
            targetPage.locator('#address'),
            targetPage.locator('::-p-xpath(//*[@id=\\"address\\"])'),
            targetPage.locator(':scope >>> #address'),
            targetPage.locator('::-p-text(ethh)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 67,
                y: 20.609375,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('a');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Address)'),
            targetPage.locator('#address'),
            targetPage.locator('::-p-xpath(//*[@id=\\"address\\"])'),
            targetPage.locator(':scope >>> #address'),
            targetPage.locator('::-p-text(ethh)')
        ])
            .setTimeout(timeout)
            .fill('ethiopia');
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
                x: 49,
                y: 24.609375,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
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
            .fill('adis');
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
                x: 42,
                y: 5.609375,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
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
            .fill('123');
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
                x: 30,
                y: 18.609375,
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
            .fill('12345');
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
                x: 30,
                y: 3.609375,
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
                x: 59,
                y: 21,
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
                x: 64,
                y: 12.40625,
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
                x: 77,
                y: 17.40625,
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
                x: 52.21875,
                y: 3.5,
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
                x: 37.21875,
                y: 12.0625,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
