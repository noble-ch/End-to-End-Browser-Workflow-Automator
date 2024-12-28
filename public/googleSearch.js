import puppeteer from "puppeteer";

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const timeout = 50000;
  page.setDefaultTimeout(timeout);
  console.log(`Set default timeout to ${timeout}ms`);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 714,
      height: 931,
    });
    console.log("Set viewport to width 714 and height 931");
  }
  {
    const targetPage = page;
    console.log("Navigating to chrome://new-tab-page/");
    await targetPage.goto("chrome://new-tab-page/");
  }
  {
    const targetPage = page;
    console.log("Navigating to https://noblebiru.vercel.app/");
    await targetPage.goto("https://noblebiru.vercel.app/");
  }

  console.log("Closing browser...");
  await browser.close();
  console.log("Browser closed");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
