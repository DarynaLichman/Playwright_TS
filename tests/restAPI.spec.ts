import { test, expect } from "@playwright/test";
import Generator from "../utils/Generator";
import ApiHelper from "../utils/ApiHelper";
import UserDTO from "../utils/UserDTO";

const generator = new Generator();
let apiHelper: ApiHelper;

test.describe("API requests", () => {
  let user: UserDTO | undefined;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
  });

  test("POST user", async () => {
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

  test("GET user", async () => {
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

  test("PUT user", async () => {
    user = generator.generateRandomUser();
    await apiHelper.createUser(user);

    const newUser = generator.generateRandomUser();
    const res = await apiHelper.updateUser(newUser);

    expect(res.status()).toEqual(200);
  });

  test("DELETE user", async () => {
    user = generator.generateRandomUser();

    await apiHelper.createUser(user);

    const res = await apiHelper.deleteUser(user);

    expect(res.status()).toEqual(200);
  });

  test.afterEach(async () => {
    if (user) {
      await apiHelper.deleteUser(user);
    }
  });
});
