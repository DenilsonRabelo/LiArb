export class CreateUserDto {
  id ?: number;
  email: string;
  password: string | undefined;
  name: string;
}