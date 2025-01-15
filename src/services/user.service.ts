import * as grpc from '@grpc/grpc-js';
import { UserRepository } from '../repositories/user.repository';
import { GrpcService } from '../decorators/grpc.service.decorator';
import { CreateUserDto, DeleteDto, EmptyDto, GetDto, UpdateUserDto, UserDto } from '../dtos';
import { ValidateDto } from '../decorators/validate-dto.decorator';

@GrpcService("/user/user.proto", "example.user.UserService")
export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  @ValidateDto(CreateUserDto)
  createUser(call: grpc.ServerUnaryCall<CreateUserDto, UserDto>, callback: grpc.sendUnaryData<UserDto>) {
    const { name, age } = call.request;
    const user = this.repository.create(name, age);
    callback(null, user);
  }

  @ValidateDto(GetDto)
  getUser(call: grpc.ServerUnaryCall<GetDto, UserDto>, callback: grpc.sendUnaryData<UserDto>) {
    const { id } = call.request;
    const user = this.repository.findById(id);
    if (!user) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
    }
    callback(null, user);
  }

  listUsers(call: grpc.ServerWritableStream<EmptyDto, UserDto>) {
    const users = this.repository.findAll();
    users.forEach((user) => call.write(user));
    call.end();
  }

  @ValidateDto(UpdateUserDto)
  updateUser(call: grpc.ServerUnaryCall<UpdateUserDto, UserDto>, callback: grpc.sendUnaryData<UserDto>) {
    const { id, name, age } = call.request;
    const user = this.repository.update(id, name, age);
    if (!user) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
    }
    callback(null, user);
  }

  @ValidateDto(DeleteDto)
  deleteUser(call: grpc.ServerUnaryCall<DeleteDto, EmptyDto>, callback: grpc.sendUnaryData<EmptyDto>) {
    const { id } = call.request;
    const success = this.repository.delete(id);
    if (!success) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
    }
    callback(null, {});
  }
}