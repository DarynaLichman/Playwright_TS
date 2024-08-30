import { test, expect } from "@playwright/test";
import Generator from "../utils/generator";
import ApiHelper from "../utils/ApiHelper";
import UserDTO from "../utils/UserDTO";

const generator = new Generator();

test.describe("API requests", () => {
  let user: UserDTO | undefined;

  test.only("POST user", async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    user = generator.generateRandomUser();

    const res = await apiHelper.createUser(user);

    expect(res.status()).toEqual(200);

    const responseBody = await res.json();

    const uuidRegex = generator.getUuid();
    const resDate = responseBody.created.split("T")[0];

    expect(responseBody.id).toMatch(uuidRegex);
    expect(responseBody.name).toEqual(user.getUsername());
    expect(responseBody.yearOfBirth).toEqual(user.getYearOfBirth());
    expect(responseBody.gender).toEqual(user.getGenderNumber());
    expect(resDate).toBe(generator.getTodayDate());
  });

  test("GET user", async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    user = generator.generateRandomUser();

    await apiHelper.createUser(user);

    const res = await apiHelper.getUser(user);

    expect(res.status()).toEqual(200);

    const responseBody = await res.json();

    const uuidRegex = generator.getUuid();
    const resDate = responseBody.created.split("T")[0];

    expect(responseBody.id).toMatch(uuidRegex);
    expect(responseBody.name).toEqual(user.getUsername());
    expect(responseBody.yearOfBirth).toEqual(user.getYearOfBirth());
    expect(responseBody.gender).toEqual(user.getGenderNumber());
    expect(resDate).toBe(generator.getTodayDate());
  });

  test("PUT user", async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    user = generator.generateRandomUser();
    await apiHelper.createUser(user);

    const newUser = generator.generateRandomUser();
    const res = await apiHelper.updateUser(newUser);

    expect(res.status()).toEqual(200);
  });

  test("DELETE user", async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    user = generator.generateRandomUser();

    await apiHelper.createUser(user);

    const res = await apiHelper.deleteUser(user);

    expect(res.status()).toEqual(200);
  });

  test.afterEach(async ({ request }) => {
    if (user) {
      const apiHelper = new ApiHelper(request);
      await apiHelper.deleteUser(user);
    }
  });
});
