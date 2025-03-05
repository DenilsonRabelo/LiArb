import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateMembroDto } from './dto/create-membro-dto ';

@Injectable()
export class MembroService {
  constructor(private readonly prisma: PrismaService) {}

  async createMembro(createMembroDto: CreateMembroDto) {
    const existing = await this.prisma.membro.findUnique({
      where: { email: createMembroDto.email },
    });

    if (existing) {
      throw new HttpException(
        'Já existe um membro com este e-mail',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const novoMembro = await this.prisma.membro.create({
        data: {
          nome: createMembroDto.nome,
          email: createMembroDto.email,
          cargo: createMembroDto.cargo,
          fotoUrl: createMembroDto.fotoUrl,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Membro criado com sucesso!',
        data: novoMembro,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao criar membro: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllMembros() {
    return this.prisma.membro.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneMembro(id: number) {
    const membro = await this.prisma.membro.findUnique({
      where: { id },
    });

    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }

    return membro;
  }

  async updateMembro(id: number, updateData: Partial<CreateMembroDto>) {
    try {
      const membroAtualizado = await this.prisma.membro.update({
        where: { id },
        data: {
          ...updateData,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Membro atualizado com sucesso!',
        data: membroAtualizado,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar membro: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteMembro(id: number) {
    const membro = await this.prisma.membro.findUnique({ where: { id } });
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.membro.delete({ where: { id } });
      return {
        statusCode: HttpStatus.OK,
        message: 'Membro deletado com sucesso!',
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar membro: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMembrosPaginados(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [membros, totalCount] = await Promise.all([
      this.prisma.membro.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.membro.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: membros,
      totalPages,
      currentPage: page,
    };
  }
}
