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
    try {
      const users = await this.getUsers();

      const user = users.find(
        (user) => user.name === userDTO.getUsername() && user.yearOfBirth === userDTO.getYearOfBirth()
      );

      if (!user) {
        throw new Error(
          `User with name ${userDTO.getUsername()} and year of birth ${userDTO.getYearOfBirth()} not found.`
        );
      }
      return user.id;
    } catch (error) {
      console.error("Error in getUserID:", error);
      return null;
    }
  }

  async deleteUser(userDTO: UserDTO): Promise<void> {
    const id = await this.getUserID(userDTO);
    await this.request.delete(`${this.baseURL}/api/User/${id}`);
  }
}

export default ApiHelper;
