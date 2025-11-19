import { BaseRepository } from './BaseRepository';
import { User } from '@/types/User';

export class UserRepository extends BaseRepository {
  constructor() {
    super('https://api.example.com/users');
  }

  async getAllUsers(): Promise<User[]> {
    return this.get<User[]>('/');
  }

  async getUserById(id: string): Promise<User> {
    return this.get<User>(`/${id}`);
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.post<User>('/', user);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return this.put<User>(`/${id}`, user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.delete<void>(`/${id}`);
  }
}

