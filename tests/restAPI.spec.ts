import { test, expect } from "@playwright/test";
import Generator from "../utils/generator";
import ApiHelper from "../utils/ApiHelper";
import { AddUserPage } from "../pages/addUser.page";
import UserDTO from "../utils/UserDTO";

const generator = new Generator();

test.describe("API requests", () => {
  let user: UserDTO | undefined;

  test.afterEach(async ({ request, baseURL }) => {
    if (user) {
      const apiHelper = new ApiHelper(request, baseURL!);
      await apiHelper.deleteUser(user);
    }
  });

  test("create user", async ({ page, request, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const apiHelper = new ApiHelper(request, baseURL!);

    user = generator.generateRandomUser();

    const res = await apiHelper.createUser(user);

    expect(res.status()).toEqual(200);

    await addUserPage.goto("");

    const addedUser = await addUserPage.getCreatedUser(user.getUsername());
    expect(addedUser).toEqual(user);
  });

  test("get user", async ({ request, baseURL }) => {
    const apiHelper = new ApiHelper(request, baseURL!);

    user = generator.generateRandomUser();

    await apiHelper.createUser(user);

    const res = await apiHelper.getUser(user);
    const responseBody = await res.json();

    expect(res.status()).toEqual(200);

    expect(responseBody.name).toEqual(user.getUsername());
    expect(responseBody.yearOfBirth).toEqual(user.getYearOfBirth());
  });

  test("update user", async ({ page, request, baseURL }) => {
    const addUserPage = new AddUserPage(page);
    const apiHelper = new ApiHelper(request, baseURL!);

    user = generator.generateRandomUser();
    await apiHelper.createUser(user);

    const newUser = generator.generateRandomUser();
    const res = await apiHelper.updateUser(newUser);

    expect(res.status()).toEqual(200);

    await addUserPage.goto("");

    const addedUser = await addUserPage.getCreatedUser(user.getUsername());
    expect(addedUser).toEqual(user);
  });

  test("delete user", async ({ request, baseURL }) => {
    const apiHelper = new ApiHelper(request, baseURL!);

    user = generator.generateRandomUser();

    await apiHelper.createUser(user);

    const res = await apiHelper.deleteUser(user);

    expect(res.status()).toEqual(200);
  });
});
