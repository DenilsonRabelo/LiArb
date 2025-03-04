import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class usuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto): Promise<any> {
    const data: Prisma.UsuarioCreateInput = {
      ...createUserDto,
      password: await bcrypt.hashSync(createUserDto.password, 10),
    };

    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
       return {
        StatusCode: HttpStatus.CONFLICT,
        message: 'User already exists',
      };
    }

    const createdUser = await this.prisma.usuario.create({ data });
    
    return {
      ...createdUser,
      password: undefined,
    };
  }
  
  async findByEmail(email : string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}