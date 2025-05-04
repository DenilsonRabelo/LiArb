import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompeticaoDto {
  @IsString()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  dataInicio: string;

  @IsDate()
  dataFim: Date;

  @IsString()
  @IsOptional()
  local: string;

  @IsString()
  @IsOptional()
  premio: string;


  colocacoes?: CreateColocacaoDto[];

}


export class CreateColocacaoDto {
  @IsNumber()
  posicao: number;

  @IsNumber()
  ano: number;

  @IsDate()
  data: Date;
  
}
