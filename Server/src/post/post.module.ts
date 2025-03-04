import { PrismaService } from '../database/prisma.service';
import { Module } from '@nestjs/common';
import { postController } from './post.controller';
import { postService } from './post.service';


@Module({
  controllers: [postController],
  providers: [postService, PrismaService],
  exports: [postService],
})
export class postModule {}