import { Page } from "@playwright/test";

class ApiHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getUsers() {
    return (
      await this.page.request.get(
        "https://traineeautomation.azurewebsites.net/api/User"
      )
    ).json();
  }
  async getUserID(username: string, yearOfBirth: string) {
    const users = await this.getUsers();
    let id: string | null = null;
    for (const user of users) {
      if (user.name === username && user.yearOfBirth == yearOfBirth) {
        id = user.id;
      }
    }
    return id;
  }

  async deleteUser(username: string, yearOfBirth: string) {
    const id = await this.getUserID(username, yearOfBirth);
    await this.page.request.delete(
      `https://traineeautomation.azurewebsites.net/api/User/${id}`
    );
  }
}

export { ApiHelper };
