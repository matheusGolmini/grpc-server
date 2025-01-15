import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CarDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateCarDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}