import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  age: number;
}

export class UserRepository {
  private users: Record<string, User> = {};

  create(name: string, age: number): User {
    const id = uuidv4();
    const user = { id, name, age };
    this.users[id] = user;
    return user;
  }

  findById(id: string): User | null {
    return this.users[id] || null;
  }

  findAll(): User[] {
    return Object.values(this.users);
  }

  update(id: string, name: string, age: number): User | null {
    if (!this.users[id]) return null;
    const updatedUser = { id, name, age };
    this.users[id] = updatedUser;
    return updatedUser;
  }

  delete(id: string): boolean {
    if (!this.users[id]) return false;
    delete this.users[id];
    return true;
  }
}