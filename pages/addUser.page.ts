import { Locator, Page } from "@playwright/test";
import { BasePage } from "./page";

const GenderDropdownMenuByXPath = "//form/descendant::select[@data-testid='select-Gender']";
const userNameFieldByXPath = "//form/descendant::input[@data-testid='input-UserName']";
const yearOfBirthFieldByXPath = "//form/descendant::input[@data-testid='input-YearOfBirth']";
const createBtnByTestId = "button-Create";
const cancelBtnByTestId = "button-Cancel";
const userNameErrorMsgByTestId = "inputError-UserName";
const yearOfBirthErrorMsgByTestId = "inputError-YearOfBirth";
const lastUserInListByXPath = "//table[@data-testid='table-Users']/tbody/tr[last()]";
const userNameCellByCSS = "[data-testid='td-UserName']";
const yearOfBirthCellByCSS = "[data-testid='td-YearOfBirth']";
const genderCellByCSS = "[data-testid='td-Gender']";

class AddUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async setGender(gender: string) {
    await this.selectOption(GenderDropdownMenuByXPath, gender);
  }

  async setUserName(username: string, blur = false) {
    await this.setValue(userNameFieldByXPath, username, blur);
  }

  async setYearOfBirth(yearOfBirth: number, blur = false) {
    await this.setValue(yearOfBirthFieldByXPath, yearOfBirth.toString(), blur);
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

  async getLastuserNameInList(): Promise<string> {
    return await (await this.getNestedElement(lastUserInListByXPath, userNameCellByCSS)).innerText();
  }

  async getLastUserYearOfBirth(): Promise<string> {
    return await (await this.getNestedElement(lastUserInListByXPath, yearOfBirthCellByCSS)).innerText();
  }

  async getLastUserGender(): Promise<string> {
    return await (await this.getNestedElement(lastUserInListByXPath, genderCellByCSS)).innerText();
  }

  async getCreatedUser(): Promise<{
    username: string;
    yearOfBirth: number;
    gender: string;
  }> {
    const username = await this.getLastuserNameInList();
    const yearOfBirth = parseInt(await this.getLastUserYearOfBirth());
    const gender = await this.getLastUserGender();

    return { username, yearOfBirth, gender };
  }
}
export { AddUserPage };
