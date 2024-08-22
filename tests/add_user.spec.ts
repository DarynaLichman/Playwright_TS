import { test, expect } from "@playwright/test";
import { AddUserPage } from "../pages/addUser.page";
import ApiHelper from "../utils/ApiHelper";
import AddUserSteps from "../utils/addUserSteps";
import Generator from "../utils/generator";

test.describe("Add User functional", () => {
  test.beforeEach(async ({ page }) => {
    const addUserPage = new AddUserPage(page);
    await addUserPage.goto("Forms/AddUser");
  });

  test("Add User with valid data", async ({ page, request, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const apiHelper = new ApiHelper(request, baseURL!);
    const addUserSteps = new AddUserSteps(page);
    const generator = new Generator();

    const username = await generator.randomValidName();
    const yearOfBirth = await generator.randomValidYearOfBirth();
    const gender = "Male";

    try {
      await addUserSteps.addUser(gender, username, yearOfBirth);

      await expect(page).toHaveURL(baseURL!);
      const addedUser = await addUserPage.getCreatedUser();
      expect(addedUser).toEqual({ username, yearOfBirth, gender });
    } finally {
      await apiHelper.deleteUser(username, yearOfBirth);
    }
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
    const generator = new Generator();

    await addUserPage.setGender("Male");
    await addUserPage.setUserName(await generator.randomInvalidName(), true);

    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText("Name is too short");
  });

  test("Check user with invalid year of birth can’t be added", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const generator = new Generator();

    await addUserPage.setGender("Male");
    await addUserPage.setUserName(await generator.randomValidName());
    await addUserPage.setYearOfBirth(await generator.randomInvalidYearOfBirth(), true);

    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText("Not valid Year of Birth is set");
  });

  test("Cancel adding user after filling all fields", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const addUserSteps = new AddUserSteps(page);
    const generator = new Generator();

    const username = await generator.randomValidName();
    const yearOfBirth = await generator.randomValidYearOfBirth();
    const gender = "Male";

    await addUserSteps.fillUserFields(gender, username, yearOfBirth);

    await addUserPage.clickCancelBtn();

    await expect(page).toHaveURL(baseURL!);
  });
});
