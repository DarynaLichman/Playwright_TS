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

  async getUserID(username: string, yearOfBirth: number): Promise<string> {
    const users = <
      [
        {
          id: string;
          name: string;
          yearOfBirth: number;
          gender: number;
          created: Date;
        },
      ]
    >await this.getUsers();

    return users.filter((user) => user.name === username && user.yearOfBirth == yearOfBirth)[0].id;
  }

  async deleteUser(username: string, yearOfBirth: number): Promise<void> {
    const id = await this.getUserID(username, yearOfBirth);
    await this.request.delete(`${this.baseURL}/api/User/${id}`);
  }
}

export default ApiHelper;
