class UserDTO {
  private gender: string;
  private username: string;
  private yearOfBirth?: number | undefined;

  constructor(gender: string, username: string, yearOfBirth?: number) {
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

  getYearOfBirth(): number | undefined {
    return this.yearOfBirth;
  }
}

export default UserDTO;
