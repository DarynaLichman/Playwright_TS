import { APIRequestContext } from "@playwright/test";
import UserDTO from "./UserDTO";

class ApiHelper {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async getUsers(): Promise<
    {
      id: string;
      name: string;
      yearOfBirth: number;
      gender: number;
      created: Date;
    }[]
  > {
    const users = await this.request.get(`${this.baseURL}api/User`);
    return await users.json();
  }

  async getUserID(userDTO: UserDTO): Promise<string | null> {
    const users = await this.getUsers();

    const user = users.find(
      (user) => user.name === userDTO.getUsername() && user.yearOfBirth === userDTO.getYearOfBirth()
    );

    return user ? user.id : null;
  }

  async deleteUser(userDTO: UserDTO): Promise<void> {
    const id = await this.getUserID(userDTO);
    await this.request.delete(`${this.baseURL}/api/User/${id}`);
  }
}

export default ApiHelper;
