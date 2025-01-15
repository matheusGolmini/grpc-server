import { v4 as uuidv4 } from 'uuid';

export interface AuditInfo {
    createdAt: string;
    updatedAt: string;
}

export interface Car {
  id: string;
  name: string;
  auditInfo: AuditInfo;
}

export class CarRepository {
  private cars: Record<string, Car> = {};

  create(name: string): Car {
    const id = uuidv4();
    const user = { 
        id, 
        name, 
        auditInfo: {
            createdAt: 'test',
            updatedAt: 'test',
      
        }, 
    };
    this.cars[id] = user;
    return user;
  }

  findById(id: string): Car | null {
    return this.cars[id] || null;
  }

  findAll(): Car[] {
    return Object.values(this.cars);
  }

  update(id: string, name: string): Car | null {
    if (!this.cars[id]) return null;
    const updatedCar = { 
        id, 
        name, 
        auditInfo: {
            createdAt: 'test',
            updatedAt: 'test',
      
        }, 
    };
    this.cars[id] = updatedCar;
    return updatedCar;
  }

  delete(id: string): boolean {
    if (!this.cars[id]) return false;
    delete this.cars[id];
    return true;
  }
}