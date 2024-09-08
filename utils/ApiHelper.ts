import { APIRequestContext, APIResponse } from "@playwright/test";
import UserDTO from "./UserDTO";

class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
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
    const users = await this.request.get(`api/User`);
    return users.json();
  }

  async getUserID(userDTO: UserDTO): Promise<string | null> {
    const users = await this.getUsers();

    const user = users.find(
      (user) => user.name === userDTO.getUsername() && user.yearOfBirth === userDTO.getYearOfBirth()
    );

    return user ? user.id : null;
  }

  async createUser(userDTO: UserDTO): Promise<APIResponse> {
    const response = await this.request.post(`api/User`, {
      data: {
        name: userDTO.getUsername(),
        yearOfBirth: userDTO.getYearOfBirth(),
        gender: userDTO.getGenderNumber(),
      },
    });
    return response;
  }

  async getUser(userDTO: UserDTO): Promise<APIResponse> {
    const id = await this.getUserID(userDTO);
    const response = await this.request.get(`api/User/${id}`);
    return response;
  }

  async deleteUser(userDTO: UserDTO): Promise<APIResponse> {
    const id = await this.getUserID(userDTO);
    const response = await this.request.delete(`api/User/${id}`);
    return response;
  }

  async updateUser(userDTO: UserDTO): Promise<APIResponse> {
    const userID = await this.getUserID(userDTO);
    const response = await this.request.put(`api/User/${userID}`, {
      data: {
        name: userDTO.getUsername(),
        yearOfBirth: userDTO.getYearOfBirth(),
        gender: userDTO.getGenderNumber(),
      },
    });
    return response;
  }
}

export default ApiHelper;
