import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateMembroDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;
}
