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

  getGenderNumber(): number | undefined {
    const genderMap = new Map<string, number>([
      ["Male", 0],
      ["Female", 1],
    ]);
    let index = genderMap.get(this.getGender());

    return index;
  }
}

export default UserDTO;
