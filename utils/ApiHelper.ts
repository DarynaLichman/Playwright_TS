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

  async createUser(userDTO: UserDTO) {
    const response = await this.request.post(`${this.baseURL}api/User`, {
      data: {
        name: userDTO.getUsername(),
        yearOfBirth: userDTO.getYearOfBirth(),
        gender: userDTO.getGenderNumber(),
      },
    });
    return response;
  }

  async getUser(userDTO: UserDTO) {
    const id = await this.getUserID(userDTO);
    const response = await this.request.get(`${this.baseURL}/api/User/${id}`);
    return response;
  }

  async deleteUser(userDTO: UserDTO) {
    const id = await this.getUserID(userDTO);
    const response = await this.request.delete(`${this.baseURL}/api/User/${id}`);
    return response;
  }

  async updateUser(userDTO: UserDTO) {
    const userID = await this.getUserID(userDTO);
    const response = await this.request.put(`${this.baseURL}api/User/${userID}`, {
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
