import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCompeticaoDto } from './dto/create-competicao-dto ';

@Injectable()
export class CompeticaoService {
  constructor(private readonly prisma: PrismaService) {}

  async createCompeticao(createCompeticaoDto: CreateCompeticaoDto) {
    try {
      const { colocacoes, ...competicaoData } = createCompeticaoDto;
  
      const competicao = await this.prisma.competicao.create({
        data: {
          ...competicaoData,
          colocacao: {
            create: colocacoes, 
          },
        },
        include: {
          colocacao: true,
        },
      });
      return competicao;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar competição.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllCompeticoes() {
    try {
      const competicoes = await this.prisma.competicao.findMany({
        include: {
          colocacao: true,
        },
      });
      return competicoes;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar competições.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findCompeticaoById(id: number) {
    try {
      const competicao = await this.prisma.competicao.findUnique({
        where: { id },
        include: {
          colocacao: true,
        },
      });
      if (!competicao) {
        throw new HttpException('Competição não encontrada.', HttpStatus.NOT_FOUND);
      }
      return competicao;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar competição.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCompeticao(id: number, data: Partial<CreateCompeticaoDto>) {
    try {
      const competicao = await this.prisma.competicao.update({
        where: { id },
        data,
      });
      return competicao;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar competição.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCompeticao(id: number) {
    try {
      await this.prisma.competicao.delete({
        where: { id },
      });
      return { message: 'Competição excluída com sucesso.' };
    } catch (error) {
      throw new HttpException(
        'Erro ao excluir competição.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findCompeticoesByPage(page: number, pageSize: number) {
    try {
      const competicoes = await this.prisma.competicao.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          colocacao: true,
        },
      });
      return competicoes;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar competições.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
