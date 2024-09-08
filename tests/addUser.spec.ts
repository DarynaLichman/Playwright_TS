import { test, expect } from "@playwright/test";
import { AddUserPage } from "../pages/AddUserPage";
import ApiHelper from "../utils/ApiHelper";
import AddUserSteps from "../utils/AddUserSteps";
import Generator from "../utils/Generator";
import UserDTO from "../utils/UserDTO";

const generator = new Generator();

test.describe("Add User functional", () => {
  let user: UserDTO | undefined;
  let addUserPage: AddUserPage;
  let addUserSteps: AddUserSteps;

  test.beforeEach(async ({ page }) => {
    addUserPage = new AddUserPage(page);
    addUserSteps = new AddUserSteps(page);
    await addUserPage.goto("Forms/AddUser");
  });

  test("Add User with valid data", async ({ page, baseURL }) => {
    user = generator.generateRandomUser();

    await addUserSteps.addUser(user);

    await expect(page).toHaveURL(baseURL!);
    const addedUser = await addUserPage.getCreatedUser(user.getUsername());
    expect(addedUser).toEqual(user);
  });

  test("Add User with empty data", async ({ page, baseURL }) => {
    await addUserPage.clickCreateBtn();

    expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText("Name is requried");
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText("Year of Birth is requried");
  });

  test("Check user with invalid username can't be added", async ({ page, baseURL }) => {
    const user = generator.generateRandomUser(false);

    await addUserSteps.fillUserFields(user);
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText("Name is too short");

    await addUserPage.clickCreateBtn();
    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
  });

  test("Check user with invalid year of birth can't be added", async ({ page, baseURL }) => {
    const user = generator.generateRandomUser(true, false);

    await addUserSteps.fillUserFields(user);
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText("Not valid Year of Birth is set");

    await addUserPage.clickCreateBtn();
    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
  });

  test("Cancel adding user after filling all fields", async ({ page, baseURL }) => {
    const user = generator.generateRandomUser();

    await addUserSteps.fillUserFields(user);
    await addUserPage.clickCancelBtn();

    await expect(page).toHaveURL(baseURL!);
  });

  test.afterEach(async ({ request }) => {
    if (user) {
      const apiHelper = new ApiHelper(request);
      await apiHelper.deleteUser(user);
    }
  });
});
