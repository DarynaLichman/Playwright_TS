import { type Page } from "@playwright/test";

class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getElement(element: string) {
    return this.page.locator(element);
  }

  async clickElement(element: string) {
    await (await this.getElement(element)).click();
  }

  async setValue(element: string, value: string, blur = false) {
    await (await this.getElement(element)).fill(value);
    if (blur) {
      await (await this.getElement(element)).blur();
    }
  }

  async selectOption(element: string, option: string) {
    await this.page.selectOption(element, { label: option });
  }
}

export { BasePage };
