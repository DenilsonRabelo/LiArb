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
import { CompeticaoService } from './competicao.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCompeticaoDto } from './dto/create-competicao-dto ';

@Controller('competicoes')
export class CompeticaoController {
  constructor(private readonly competicaoService: CompeticaoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCompeticaoDto: CreateCompeticaoDto) {
    return this.competicaoService.createCompeticao(createCompeticaoDto);
  }
}
