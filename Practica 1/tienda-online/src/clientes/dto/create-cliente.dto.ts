import { IsEmail, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombres: string;

  @IsString()
  paterno: string;

  @IsString()
  materno: string;

  @IsEmail()
  email: string;
}