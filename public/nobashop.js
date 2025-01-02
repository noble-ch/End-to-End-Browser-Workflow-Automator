const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1669,
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
            targetPage.locator('::-p-aria(Samsung Smart TV)'),
            targetPage.locator('div.bg-onador div:nth-of-type(2) img'),
            targetPage.locator('::-p-xpath(//*[@id=\\"card\\"]/a/img)'),
            targetPage.locator(':scope >>> div.bg-onador div:nth-of-type(2) img')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 128.3800048828125,
                y: 107.60311889648438,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(ADD TO CART )'),
            targetPage.locator('main button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div/div[3]/div/div/div[5]/button)'),
            targetPage.locator(':scope >>> main button'),
            targetPage.locator('::-p-text(Add to Cart)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 87.5,
                y: 25.640625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('main'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main)'),
            targetPage.locator(':scope >>> main')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 767,
                y: 453,
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
                x: 78.5,
                y: 27.015625,
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
            targetPage.locator('::-p-aria(Register)'),
            targetPage.locator('main a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div[1]/div/div/div/div[2]/div/a)'),
            targetPage.locator(':scope >>> main a'),
            targetPage.locator('::-p-text(Register)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 39.171875,
                y: 8.609375,
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
            targetPage.locator('::-p-aria(Name)'),
            targetPage.locator('#name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"name\\"])'),
            targetPage.locator(':scope >>> #name')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 57.5,
                y: 30.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Name)'),
            targetPage.locator('#name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"name\\"])'),
            targetPage.locator(':scope >>> #name')
        ])
            .setTimeout(timeout)
            .fill('noble');
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
                x: 49.5,
                y: 28.609375,
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
            targetPage.locator('::-p-aria(Email Address)'),
            targetPage.locator('#email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"email\\"])'),
            targetPage.locator(':scope >>> #email'),
            targetPage.locator('::-p-text(noblebarch@gmail.com)')
        ])
            .setTimeout(timeout)
            .fill('nobleb@');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('2');
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
            .fill('nobleb@gmail.com');
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
                x: 70.5,
                y: 11.609375,
              },
            });
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
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"password\\"])'),
            targetPage.locator(':scope >>> #password'),
            targetPage.locator('::-p-text(Nob13-Darm)')
        ])
            .setTimeout(timeout)
            .fill('nob');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Confirm Password)'),
            targetPage.locator('#passwordConfirm'),
            targetPage.locator('::-p-xpath(//*[@id=\\"passwordConfirm\\"])'),
            targetPage.locator(':scope >>> #passwordConfirm')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 90.5,
                y: 24.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Confirm Password)'),
            targetPage.locator('#passwordConfirm'),
            targetPage.locator('::-p-xpath(//*[@id=\\"passwordConfirm\\"])'),
            targetPage.locator(':scope >>> #passwordConfirm')
        ])
            .setTimeout(timeout)
            .fill('nob');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(REGISTER)'),
            targetPage.locator('main button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/main/div/div/div/div/form/button)'),
            targetPage.locator(':scope >>> main button'),
            targetPage.locator('::-p-text(Register)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 68.5,
                y: 16.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('header div:nth-of-type(3) span.fas'),
            targetPage.locator('::-p-xpath(//*[@id=\\"offcanvasNavbar-expand-md\\"]/div[2]/div[3]/a/span[1])'),
            targetPage.locator(':scope >>> header div:nth-of-type(3) span.fas')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 5.890625,
                y: 7.5,
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
                x: 83.5,
                y: 34.015625,
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
                x: 86.5,
                y: 13.609375,
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
            .fill('eth');
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
                x: 57.5,
                y: 9.609375,
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
            .fill('eth');
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
                x: 57.5,
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
                x: 37.5,
                y: 12.609375,
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
            .fill('123');
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
                x: 35.5,
                y: 9.609375,
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
                x: 62.5,
                y: 30,
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
                x: 35.5,
                y: 15.40625,
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
                x: 55.5,
                y: 29.40625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Noble) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('#root div:nth-of-type(3) > div span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"username\\"]/span)'),
            targetPage.locator(':scope >>> #root div:nth-of-type(3) > div span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 36.1875,
                y: 11.5,
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
                x: 43.1875,
                y: 10.0625,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
