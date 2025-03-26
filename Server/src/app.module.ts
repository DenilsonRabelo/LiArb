import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { usuarioModule } from './usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { postModule } from './post/post.module';
import { AppService } from './app.service';
import { MembroModule } from './membro/membro.module';
import { eventModule } from './event/event.module';

@Module({
  imports: [usuarioModule, AuthModule, postModule, MembroModule, eventModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule { }
