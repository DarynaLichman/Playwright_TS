import { faker } from "@faker-js/faker";

class Generator {
  async randomValidName() {
    return faker.person.firstName();
  }

  async randomValidYearOfBirth() {
    return faker.number.int({ min: 1900, max: 2005 });
  }

  async randomInvalidName() {
    return faker.string.alpha(2);
  }

  async randomInvalidYearOfBirth() {
    return faker.number.int({ min: 2006 });
  }
}
export default Generator;
