import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { MembroService } from './membro.service';
import { MembroController } from './membro.controller';

@Module({
  controllers: [MembroController],
  providers: [MembroService, PrismaService],
  exports: [MembroService],
})
export class MembroModule {}
