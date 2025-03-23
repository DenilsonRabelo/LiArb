import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MembroService } from './membro.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMembroDto } from './dto/create-membro-dto ';

@Controller('membros')
export class MembroController {
  constructor(private readonly membroService: MembroService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMembroDto: CreateMembroDto) {
    return this.membroService.createMembro(createMembroDto);
  }

  @Get()
  async findAll() {
    return this.membroService.findAllMembros();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membroService.findOneMembro(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateMembroDto>,
  ) {
    return this.membroService.updateMembro(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.membroService.deleteMembro(id);
  }

  @Get('paginado/:page/:limit')
  async findMembrosPaginados(
    @Param('page', ParseIntPipe) page: number,
    @Param('limit', ParseIntPipe) limit: number,
  ) {
    return this.membroService.findMembrosPaginados(page, limit);
  }
}
