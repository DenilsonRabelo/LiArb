import { Module } from "@nestjs/common";
import { eventController } from "./event.controller";
import { eventService } from "./event.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
  controllers: [eventController],
  providers: [eventService, PrismaService],
  exports: [eventService],
})
export class eventModule {}