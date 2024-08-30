import { Page } from "@playwright/test";
import UserDTO from "./UserDTO";
import { AddUserPage } from "../pages/AddUserPage";

class AddUserSteps {
  private addUserPage: AddUserPage;

  constructor(page: Page) {
    this.addUserPage = new AddUserPage(page);
  }

  async fillUserFields(user: UserDTO) {
    await this.addUserPage.setUserName(user.getUsername());
    await this.addUserPage.setYearOfBirth(user.getYearOfBirth()!);
    await this.addUserPage.setGender(user.getGender());
  }

  async addUser(user: UserDTO) {
    await this.fillUserFields(user);
    await this.addUserPage.clickCreateBtn();
  }
}

export default AddUserSteps;
