const puppeteer = require("puppeteer"); // v23.0.0 or later
const fs = require("node:fs/promises");
const path = require("node:path");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const timeout = 50000;
  page.setDefaultTimeout(timeout);
  const outputDir = path.join(__dirname, "/output/67723d5566e63ca4722b4d10/");
  await fs.mkdir(outputDir, { recursive: true });
  let step = 1;

  const takeScreenshot = async (description) => {
    const filename = `${outputDir}step${step++}_${description}.png`;
    await page.screenshot({ path: filename });
  };

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1372,
      height: 931,
    });
    await takeScreenshot("viewport");
  }
  {
    const targetPage = page;
    await targetPage.goto("chrome://new-tab-page/");
    await takeScreenshot("navigation");
  }
  {
    const targetPage = page;
    await targetPage.goto("https://intranet.alxswe.com/auth/sign_in");
    await takeScreenshot("navigation");
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
    await takeScreenshot("email_fill");
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
    await takeScreenshot("password_fill");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Password)"),
      targetPage.locator("#user_password"),
      targetPage.locator('::-p-xpath(//*[@id=\\"user_password\\"])'),
      targetPage.locator(":scope >>> #user_password"),
      targetPage.locator("::-p-text(noba the killer)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 84.5,
          y: 11,
        },
      });
    await takeScreenshot("password_click");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Control");
    await takeScreenshot("control_down");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("a");
    await takeScreenshot("a_down");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("a");
    await takeScreenshot("a_up");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Control");
    await takeScreenshot("control_up");
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
    await takeScreenshot("password_refill");
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Log in)"),
      targetPage.locator("div.actions > input"),
      targetPage.locator('::-p-xpath(//*[@id=\\"new_user\\"]/div[4]/input)'),
      targetPage.locator(":scope >>> div.actions > input"),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 29.875,
          y: 18,
        },
      });
    await Promise.all(promises);
    await takeScreenshot("login");
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Webstack - Portfolio Project)"),
      targetPage.locator(
        "div.student-home > div > div > div:nth-of-type(1) > div:nth-of-type(2) a"
      ),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"content\\"]/article/div[2]/div/div/div[1]/div[2]/ul/li/div/div/a)'
      ),
      targetPage.locator(
        ":scope >>> div.student-home > div > div > div:nth-of-type(1) > div:nth-of-type(2) a"
      ),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 159.640625,
          y: 6.46875,
        },
      });
    await Promise.all(promises);
    await takeScreenshot("project_select");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#input_11805"),
      targetPage.locator('::-p-xpath(//*[@id=\\"input_11805\\"])'),
      targetPage.locator(":scope >>> #input_11805"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 260,
          y: 15.03125,
        },
      });
    await takeScreenshot("input_click");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#input_11805"),
      targetPage.locator('::-p-xpath(//*[@id=\\"input_11805\\"])'),
      targetPage.locator(":scope >>> #input_11805"),
    ])
      .setTimeout(timeout)
      .fill("https:");
    await takeScreenshot("https_fill");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up(";");
    await takeScreenshot("semicolon_up");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#input_11805"),
      targetPage.locator('::-p-xpath(//*[@id=\\"input_11805\\"])'),
      targetPage.locator(":scope >>> #input_11805"),
    ])
      .setTimeout(timeout)
      .fill("https://hello.com");
    await takeScreenshot("url_fill");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#task-num-0 div.input-group button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"task-11805\\"]/div[3]/div/div/div[1]/span/button)'
      ),
      targetPage.locator(":scope >>> #task-num-0 div.input-group button"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 29.0625,
          y: 15.03125,
        },
      });
    await takeScreenshot("button_click");
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
