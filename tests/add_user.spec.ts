import { test, expect, Page } from "@playwright/test";
import { AddUserPage } from "../pages/addUser.page";
import { ApiHelper } from "../APIhelper";

test.describe("Add User functional", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    const addUserPage = new AddUserPage(page);
    await addUserPage.goto("Forms/AddUser");
  });

  test("Add User with valid data", async ({ page }: { page: Page }) => {
    const addUserPage = new AddUserPage(page);
    const apiHelper = new ApiHelper(page);

    const username = "JohnDoe";
    const yearOfBirth = "1996";
    const gender = "Male";

    await addUserPage.setGender(gender);
    await addUserPage.setUserName(username);
    await addUserPage.setYearOfBirth(yearOfBirth);

    await addUserPage.clickCreateBtn();

    expect(page.url()).toBe("https://traineeautomation.azurewebsites.net/");
    expect(
      await addUserPage.checkCreatedUser(username, yearOfBirth, gender)
    ).toBeTruthy();

    await apiHelper.deleteUser(username, yearOfBirth);
  });

  test("Add User with empty data", async ({ page }: { page: Page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.clickCreateBtn();

    expect(page.url()).toBe(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser"
    );
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText(
      "Name is requried"
    );
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText(
      "Year of Birth is requried"
    );
  });

  test("Check user with invalid username can’t be added", async ({
    page,
  }: {
    page: Page;
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.setGender("Male");
    await addUserPage.setUserName("Jo", true);

    expect(page.url()).toBe(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser"
    );
    await expect(await addUserPage.getUserNameErrorMsg()).toHaveText(
      "Name is too short"
    );
  });

  test("Check user with invalid year of birth can’t be added", async ({
    page,
  }: {
    page: Page;
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.setGender("Male");
    await addUserPage.setUserName("Joahn");
    await addUserPage.setYearOfBirth("19", true);

    expect(page.url()).toBe(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser"
    );
    await expect(await addUserPage.getYearOfBirthErrorMsg()).toHaveText(
      "Not valid Year of Birth is set"
    );
  });

  test("Cancel adding user after filling all fields", async ({
    page,
  }: {
    page: Page;
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.setGender("Male");
    await addUserPage.setUserName("JohnDoe");
    await addUserPage.setYearOfBirth("1996");

    await addUserPage.clickCancelBtn();

    expect(page.url()).toBe("https://traineeautomation.azurewebsites.net/");
  });
});
