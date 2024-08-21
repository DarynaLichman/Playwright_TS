import { Locator, Page } from "@playwright/test";
import { BasePage } from "./page";

const GenderDropdownMenu = "//form/descendant::select[@data-testid='select-Gender']";
const userNameField = "//form/descendant::input[@data-testid='input-UserName']";
const yearOfBirthField = "//form/descendant::input[@data-testid='input-YearOfBirth']";
const createBtn = "button-Create";
const cancelBtn = "button-Cancel";
const userNameErrorMsg = "inputError-UserName";
const yearOfBirthErrorMsg = "inputError-YearOfBirth";
const lastUserInList = "//table[@data-testid='table-Users']/tbody/tr[last()]";
const userNameCell = "[data-testid='td-UserName']";
const yearOfBirthCell = "[data-testid='td-YearOfBirth']";
const genderCell = "[data-testid='td-Gender']";

class AddUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async setGender(gender: string) {
    await this.selectOption(GenderDropdownMenu, gender);
  }

  async setUserName(username: string, blur = false) {
    await this.setValue(userNameField, username, blur);
  }

  async setYearOfBirth(yearOfBirth: number, blur = false) {
    await this.setValue(yearOfBirthField, yearOfBirth.toString(), blur);
  }

  async clickCreateBtn() {
    await this.clickElement(createBtn);
  }

  async clickCancelBtn() {
    await this.clickElement(cancelBtn);
  }

  async getUserNameErrorMsg(): Promise<Locator> {
    return await this.getElementByTestID(userNameErrorMsg);
  }

  async getYearOfBirthErrorMsg(): Promise<Locator> {
    return await this.getElementByTestID(yearOfBirthErrorMsg);
  }

  async getLastuserNameInList(): Promise<string> {
    return await (await this.getNestedElement(lastUserInList, userNameCell)).innerText();
  }

  async getLastUserYearOfBirth(): Promise<string> {
    return await (await this.getNestedElement(lastUserInList, yearOfBirthCell)).innerText();
  }

  async getLastUserGender(): Promise<string> {
    return await (await this.getNestedElement(lastUserInList, genderCell)).innerText();
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
