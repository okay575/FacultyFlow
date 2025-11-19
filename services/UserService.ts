import { UserRepository } from '@/repositories/UserRepository';
import { User } from '@/types/User';

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      return await this.repository.getAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async fetchUserById(id: string): Promise<User> {
    try {
      return await this.repository.getUserById(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(user: Partial<User>): Promise<User> {
    try {
      return await this.repository.createUser(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      return await this.repository.updateUser(id, user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.repository.deleteUser(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default new UserService();

