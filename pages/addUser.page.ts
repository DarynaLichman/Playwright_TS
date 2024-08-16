import { Page } from "@playwright/test";
import { BasePage } from "./page";

const GenderDropdownMenu = "#selectGender";
const userNameField = "#inputUserName";
const yearOfBirthField = "#inputYearOfBirth";
const createBtn = "[data-testid='button-Create']";
const cancelBtn = "[data-testid='button-Cancel']";
const userNameErrorMsg = "[data-testid='inputError-UserName']";
const yearOfBirthErrorMsg = "[data-testid='inputError-YearOfBirth']";
const lastUserInList = "//table[@data-testid='table-Users']/tbody/tr[last()]";
const userNameCell = "td[@data-testid='td-UserName']";
const yearOfBirthCell = "td[@data-testid='td-YearOfBirth']";
const genderCell = "td[@data-testid='td-Gender']";

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

  async setYearOfBirth(yearOfBirth: string, blur = false) {
    await this.setValue(yearOfBirthField, yearOfBirth, blur);
  }

  async clickCreateBtn() {
    await this.clickElement(createBtn);
  }

  async clickCancelBtn() {
    await this.clickElement(cancelBtn);
  }

  async getUserNameErrorMsg() {
    return await this.getElement(userNameErrorMsg);
  }

  async getYearOfBirthErrorMsg() {
    return await this.getElement(yearOfBirthErrorMsg);
  }

  async getLastuserNameInList() {
    return await (
      await this.getElement(lastUserInList + "/" + userNameCell)
    ).innerText();
  }

  async getLastUserYearOfBirth() {
    return (
      await this.getElement(lastUserInList + "/" + yearOfBirthCell)
    ).innerText();
  }

  async getLastUserGender() {
    return (
      await this.getElement(lastUserInList + "/" + genderCell)
    ).innerText();
  }
  async checkCreatedUser(
    userName: string,
    yearOfBirth: string,
    gender: string
  ) {
    const name = await this.getLastuserNameInList();
    const year = await this.getLastUserYearOfBirth();
    const gen = await this.getLastUserGender();
    return name === userName && yearOfBirth === year && gender === gen;
  }
}
export { AddUserPage };
