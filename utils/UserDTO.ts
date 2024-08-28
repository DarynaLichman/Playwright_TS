class UserDTO {
  private gender: string;
  private username: string;
  private yearOfBirth: number;

  constructor(gender: string, username: string, yearOfBirth: number) {
    this.gender = gender;
    this.username = username;
    this.yearOfBirth = yearOfBirth;
  }

  getGender(): string {
    return this.gender;
  }

  getUsername(): string {
    return this.username;
  }

  getYearOfBirth(): number {
    return this.yearOfBirth;
  }

  getGenderNumber(): number {
    const genders = ["Male", "Female"];
    const gen = this.getGender();
    return genders.indexOf(gen) + 1;
  }
}

export default UserDTO;
