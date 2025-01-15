import * as grpc from '@grpc/grpc-js';
import { CarRepository } from '../repositories/car.repository';
import { GrpcService } from '../decorators/grpc.service.decorator';
import { CarDto, CreateCarDto, DeleteDto, EmptyDto, GetDto, UpdateCarDto } from '../dtos';
import { ValidateDto } from '../decorators/validate-dto.decorator';

@GrpcService("/car/car.proto", "example.car.CarService")
export class CarService {
  private repository: CarRepository;

  constructor() {
    this.repository = new CarRepository();
  }

  @ValidateDto(CreateCarDto)
  createCar(call: grpc.ServerUnaryCall<CreateCarDto, CarDto>, callback: grpc.sendUnaryData<CarDto>) {
    const { name } = call.request;
    const user = this.repository.create(name);
    callback(null, user);
  };

  @ValidateDto(GetDto)
  getCar(call: grpc.ServerUnaryCall<GetDto, CarDto>, callback: grpc.sendUnaryData<CarDto>) {
    const { id } = call.request;
    const user = this.repository.findById(id);
    if (!user) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
    }
    callback(null, user);
  };

  listCars(call: grpc.ServerWritableStream<EmptyDto, CarDto>) {
    const users = this.repository.findAll();
    users.forEach((user) => call.write(user));
    call.end();
  };

  
  updateCar(call: grpc.ServerUnaryCall<UpdateCarDto, CarDto>, callback: grpc.sendUnaryData<CarDto>) {
    const { id, name } = call.request;
    const user = this.repository.update(id, name);
    if (!user) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
    }
    callback(null, user);
  };

  @ValidateDto(DeleteDto)
  deleteCar(call: grpc.ServerUnaryCall<DeleteDto, EmptyDto>, callback: grpc.sendUnaryData<EmptyDto>) {
    const { id } = call.request;
    const success = this.repository.delete(id);
    if (!success) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
    }
    callback(null, new EmptyDto());
  };
}