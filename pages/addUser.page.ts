import { Locator, Page } from "@playwright/test";
import { BasePage } from "./page";

const GenderDropdownMenuByXPath = "//form/descendant::select[@data-testid='select-Gender']";
const userNameFieldByXPath = "//form/descendant::input[@data-testid='input-UserName']";
const yearOfBirthFieldByXPath = "//form/descendant::input[@data-testid='input-YearOfBirth']";
const createBtnByTestId = "button-Create";
const cancelBtnByTestId = "button-Cancel";
const userNameErrorMsgByTestId = "inputError-UserName";
const yearOfBirthErrorMsgByTestId = "inputError-YearOfBirth";
const userNameCellByCSS = "[data-testid='td-UserName']";
const yearOfBirthCellByCSS = "[data-testid='td-YearOfBirth']";
const genderCellByCSS = "[data-testid='td-Gender']";
const createdUserInListByXpath = (name: string): string => {
  return `//tr[td[@data-testid='td-UserName' and normalize-space(text())="${name}"]]`;
};

class AddUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async setGender(gender: string) {
    await this.selectOption(GenderDropdownMenuByXPath, gender);
  }

  async setUserName(username: string) {
    await this.setValue(userNameFieldByXPath, username);
  }

  async setYearOfBirth(yearOfBirth: number) {
    await this.setValue(yearOfBirthFieldByXPath, yearOfBirth.toString());
  }

  async clickCreateBtn() {
    const createBtn = await this.getElementByTestID(createBtnByTestId);
    await this.clickElement(createBtn);
  }

  async clickCancelBtn() {
    const cancelBtn = await this.getElementByTestID(cancelBtnByTestId);
    await this.clickElement(cancelBtn);
  }

  async getUserNameErrorMsg(): Promise<Locator> {
    return await this.getElementByTestID(userNameErrorMsgByTestId);
  }

  async getYearOfBirthErrorMsg(): Promise<Locator> {
    return await this.getElementByTestID(yearOfBirthErrorMsgByTestId);
  }

  async getCreateduserNameInList(element: Locator): Promise<string> {
    return await (await this.getNestedElement(element, userNameCellByCSS)).innerText();
  }

  async getCreatedUserYearOfBirth(element: Locator): Promise<string> {
    return await (await this.getNestedElement(element, yearOfBirthCellByCSS)).innerText();
  }

  async getCreatedUserGender(element: Locator): Promise<string> {
    return await (await this.getNestedElement(element, genderCellByCSS)).innerText();
  }

  async getCreatedUser(name: string): Promise<
    | {
        username: string;
        yearOfBirth: number;
        gender: string;
      }
    | undefined
  > {
    const userRow = await this.getElement(createdUserInListByXpath(name));

    const username = await this.getCreateduserNameInList(userRow);
    const yearOfBirth = parseInt(await this.getCreatedUserYearOfBirth(userRow), 10);
    const gender = await this.getCreatedUserGender(userRow);

    return { username, yearOfBirth, gender };
  }
}
export { AddUserPage };
