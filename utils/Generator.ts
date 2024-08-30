import { faker } from "@faker-js/faker";
import UserDTO from "./UserDTO";

class Generator {
  getName(valid: boolean = true): string {
    if (valid) {
      return faker.person.firstName();
    } else {
      return faker.string.alpha(2);
    }
  }

  getYearOfBirth(valid: boolean = true): number {
    if (valid) {
      return faker.number.int({ min: 1900, max: 2005 });
    } else {
      return faker.number.int({ min: 2006 });
    }
  }

  getGender(): string {
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

  getTodayDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  getUuid(): RegExp {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  }
}

export default Generator;
