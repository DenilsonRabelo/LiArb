import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { usuarioModule } from './usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { postModule } from './post/post.module';
import { AppService } from './app.service';

@Module({
  imports: [usuarioModule, AuthModule, postModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule { }
