import { APIRequestContext } from "@playwright/test";

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

  async getUserID(username: string, yearOfBirth: number): Promise<string | null> {
    try {
      const users = await this.getUsers();

      const user = users.find((user) => user.name === username && user.yearOfBirth === yearOfBirth);

      if (!user) {
        throw new Error(`User with name ${username} and year of birth ${yearOfBirth} not found.`);
      }

      return user.id;
    } catch (error) {
      console.error("Error in getUserID:", error);
      return null;
    }
  }

  async deleteUser(username: string, yearOfBirth: number): Promise<void> {
    const id = await this.getUserID(username, yearOfBirth);
    await this.request.delete(`${this.baseURL}/api/User/${id}`);
  }
}

export default ApiHelper;
