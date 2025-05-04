import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CompeticaoService } from './competicao.service';
import { CompeticaoController } from './competicao.controller';

@Module({
  controllers: [CompeticaoController],
  providers: [CompeticaoService, PrismaService],
  exports: [CompeticaoService],
})
export class CompeticaoModule {}
