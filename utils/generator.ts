import { faker } from "@faker-js/faker";
import UserDTO from "./UserDTO";

class Generator {
  getName(valid: boolean = true) {
    if (valid) {
      return faker.person.firstName();
    } else {
      return faker.string.alpha(2);
    }
  }

  getYearOfBirth(valid: boolean = true) {
    if (valid) {
      return faker.number.int({ min: 1900, max: 2005 });
    } else {
      return faker.number.int({ min: 2006 });
    }
  }

  getGender() {
    const genders = ["Male", "Female"];
    const randomIndex = Math.floor(Math.random() * genders.length);
    return genders[randomIndex];
  }

  generateRandomUser(isValidName: boolean = true, isValidYearOfBirth: boolean = true): UserDTO {
    const gender = this.getGender();
    const username = this.getName(isValidName);
    const yearOfBirth = this.getYearOfBirth(isValidYearOfBirth);
    return new UserDTO(gender, username, yearOfBirth);
  }
}

export default Generator;
