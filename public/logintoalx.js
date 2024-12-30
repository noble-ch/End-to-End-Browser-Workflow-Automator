const puppeteer = require("puppeteer"); // v23.0.0 or later

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1620,
      height: 931,
    });
  }
  {
    const targetPage = page;
    await targetPage.goto("chrome://new-tab-page/");
  }
  {
    const targetPage = page;
    await targetPage.goto("https://intranet.alxswe.com/auth/sign_in");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Email)"),
      targetPage.locator("#user_email"),
      targetPage.locator('::-p-xpath(//*[@id=\\"user_email\\"])'),
      targetPage.locator(":scope >>> #user_email"),
    ])
      .setTimeout(timeout)
      .fill("noblebiru@yahoo.com");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Password)"),
      targetPage.locator("#user_password"),
      targetPage.locator('::-p-xpath(//*[@id=\\"user_password\\"])'),
      targetPage.locator(":scope >>> #user_password"),
    ])
      .setTimeout(timeout)
      .fill("noba the killer");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Control");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("a");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("a");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Control");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Email)"),
      targetPage.locator("#user_email"),
      targetPage.locator('::-p-xpath(//*[@id=\\"user_email\\"])'),
      targetPage.locator(":scope >>> #user_email"),
      targetPage.locator("::-p-text(noblebiru@yahoo.com)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 102.5,
          y: 20,
        },
      });
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Control");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("a");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("a");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Control");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Email)"),
      targetPage.locator("#user_email"),
      targetPage.locator('::-p-xpath(//*[@id=\\"user_email\\"])'),
      targetPage.locator(":scope >>> #user_email"),
      targetPage.locator("::-p-text(noblebiru@yahoo.com)"),
    ])
      .setTimeout(timeout)
      .fill("noblebiru");
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
