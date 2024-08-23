import { Locator, type Page } from "@playwright/test";

abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getElement(element: string): Promise<Locator> {
    return this.page.locator(element);
  }

  async getElementByTestID(dataTestId: string): Promise<Locator> {
    return this.page.getByTestId(dataTestId);
  }

  async getNestedElement(parent: string, ...children: string[]): Promise<Locator> {
    let element = await this.getElement(parent);
    for (const child of children) {
      element = element.locator(child);
    }
    return element;
  }

  async clickElement(element: Locator) {
    await element.click();
  }

  async setValue(element: string, value: string, blur = false) {
    await (await this.getElement(element)).fill(value);
    if (blur) {
      this.blur(element);
    }
  }

  async blur(element: string) {
    await (await this.getElement(element)).blur();
  }

  async selectOption(element: string, option: string) {
    await this.page.selectOption(element, { label: option });
  }
}

export { BasePage };
