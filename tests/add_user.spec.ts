import { test, expect } from "@playwright/test";
import { AddUserPage } from "../pages/addUser.page";
import ApiHelper from "../utils/ApiHelper";
import AddUserSteps from "../utils/addUserSteps";
import Generator from "../utils/generator";
import UserDTO from "../utils/UserDTO";

const generator = new Generator();

test.describe("Add User functional", () => {
  let user: UserDTO | undefined;

  test.beforeEach(async ({ page }) => {
    const addUserPage = new AddUserPage(page);
    await addUserPage.goto("Forms/AddUser");
  });

  test.afterEach(async ({ request, baseURL }) => {
    if (user) {
      const apiHelper = new ApiHelper(request, baseURL!);
      await apiHelper.deleteUser(user);
    }
  });

  test("Add User with valid data", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const addUserSteps = new AddUserSteps(page);

    user = generator.generateRandomUser();

    await addUserSteps.addUser(user);

    await expect(page).toHaveURL(baseURL!);
    const addedUser = await addUserPage.getCreatedUser(user.getUsername());
    expect(addedUser).toEqual(user);
  });

  test("Add User with empty data", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.clickCreateBtn();

    expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText("Name is requried");
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText("Year of Birth is requried");
  });

  test("Check user with invalid username can’t be added", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const addUserSteps = new AddUserSteps(page);

    const user = generator.generateRandomUser(false);

    await addUserSteps.fillUserFields(user);

    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText("Name is too short");
  });

  test("Check user with invalid year of birth can’t be added", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const addUserSteps = new AddUserSteps(page);

    const user = generator.generateRandomUser(true, false);

    await addUserSteps.fillUserFields(user);

    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText("Not valid Year of Birth is set");
  });

  test("Cancel adding user after filling all fields", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const addUserSteps = new AddUserSteps(page);

    const user = generator.generateRandomUser();

    await addUserSteps.fillUserFields(user);

    await addUserPage.clickCancelBtn();

    await expect(page).toHaveURL(baseURL!);
  });
});
