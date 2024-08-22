import { Page } from "@playwright/test";
import { AddUserPage } from "../pages/addUser.page";

class AddUserSteps {
  private addUserPage: AddUserPage;

  constructor(page: Page) {
    this.addUserPage = new AddUserPage(page);
  }

  async fillUserFields(gender: string, username: string, yearOfBirth: number) {
    await this.addUserPage.setUserName(username);
    await this.addUserPage.setYearOfBirth(yearOfBirth);
    await this.addUserPage.setGender(gender);
  }

  async addUser(gender: string, username: string, yearOfBirth: number) {
    await this.fillUserFields(gender, username, yearOfBirth);
    await this.addUserPage.clickCreateBtn();
  }
}

export default AddUserSteps;
