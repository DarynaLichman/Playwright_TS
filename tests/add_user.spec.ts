import { test, expect } from "@playwright/test";
import { AddUserPage } from "../pages/addUser.page";
import ApiHelper from "../utils/ApiHelper";
import AddUserSteps from "../utils/addUserSteps";
import Generator from "../utils/generator";
import UserDTO from "../utils/UserDTO";

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

    const gender = generator.getGender();
    const username = generator.getName();
    const yearOfBirth = generator.getYearOfBirth();

    const user = new UserDTO(gender, username, yearOfBirth);

    try {
      await addUserSteps.addUser(user);

      await expect(page).toHaveURL(baseURL!);
      const addedUser = await addUserPage.getCreatedUser();
      expect(addedUser).toEqual({
        username: user.getUsername(),
        yearOfBirth: user.getYearOfBirth(),
        gender: user.getGender(),
      });
    } finally {
      await apiHelper.deleteUser(user.getUsername(), user.getYearOfBirth()!);
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

    const user = new UserDTO(generator.getGender(), generator.getName(false));

    await addUserPage.setGender(user.getGender());
    await addUserPage.setUserName(user.getUsername(), true);

    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText("Name is too short");
  });

  test("Check user with invalid year of birth can’t be added", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const generator = new Generator();

    const user = new UserDTO(generator.getGender(), generator.getName(), generator.getYearOfBirth(false));

    await addUserPage.setGender(user.getGender());
    await addUserPage.setUserName(user.getUsername());
    await addUserPage.setYearOfBirth(user.getYearOfBirth()!, true);

    await expect(page).toHaveURL(`${baseURL}Forms/AddUser`);
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText("Not valid Year of Birth is set");
  });

  test("Cancel adding user after filling all fields", async ({ page, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const addUserSteps = new AddUserSteps(page);
    const generator = new Generator();

    const user = new UserDTO(generator.getGender(), generator.getName(), generator.getYearOfBirth());

    await addUserSteps.fillUserFields(user);

    await addUserPage.clickCancelBtn();

    await expect(page).toHaveURL(baseURL!);
  });
});
