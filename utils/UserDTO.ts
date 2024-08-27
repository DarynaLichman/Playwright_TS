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
}

export default UserDTO;
