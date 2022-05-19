const { remote } = require("webdriverio");

describe("Russo-hate e2e test", () => {
  let browser;
  const selectors = {
    search: 'input[name="search"]',
    result: ".suggestions-result",
    header: "h1",
  };

  beforeAll(async () => {
    browser = await remote({ capabilities: { browserName: "chrome" } });
  });

  it("should redirect to article about russoend", async () => {
    await browser.navigateTo("https://uk.wikipedia.org/");

    await browser.$(selectors.search).waitForClickable({ timeout: 10000 });
    await browser.$(selectors.search).setValue("рашизм");
    await browser.$(selectors.result).waitForClickable({ timeout: 10000 });
    await browser.$(selectors.result).click();

    await browser.$(selectors.header).waitForDisplayed({ timeout: 10000 });
    const headerText = await browser.$(selectors.header).getText();

    expect(headerText).toEqual("Рашизм");
    // await browser.keys("Enter");
  });
});
