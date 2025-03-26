import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateEvent } from './dto/create-event-dto';

@Injectable()
export class eventService {
  constructor(private readonly prisma: PrismaService) { }


  async create(data: CreateEvent) {
    try {
      await this.prisma.events.create({
        data: {
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
        }
      });
      return { statusCode: HttpStatus.CREATED, message: 'Evento criado com sucesso!' };
    } catch (error) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Erro ao criar evento! ' + error };
    }
  }

    async findEventsPaginated(page: number, perPage: number) {
        const skipAmount = (page - 1) * perPage;
        try {
        const events = await this.prisma.events.findMany({
            skip: skipAmount,
            take: perPage,
            orderBy: {
            date: 'desc'
            }
        });
    
        const totalEvents = await this.prisma.events.count();
        const totalPages = Math.ceil(totalEvents / perPage);
    
        return { events, totalPages };
        } catch (error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Error while fetching events! ' + error.message
        };
        }
    }

    async deleteEvent(id: number) {
        try {
        await this.prisma.events.delete({
            where: {
            id: id
            }
        });
    
        return { statusCode: HttpStatus.OK, message: 'Evento deletado com sucesso!' };
        } catch (error) {
        return { statusCode: HttpStatus.BAD_REQUEST, message: 'Erro ao deletar evento! ' + error };
        }
    }

    async findEventById(id: number) {
        try {
        const event = await this.prisma.events.findUnique({
            where: {
            id: id
            }
        });
    
        return event
        } catch (error) {
        return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Erro ao buscar evento! ' + error };
        }
    
    }

    async editEvent(id: number, data: CreateEvent) {
        try {
        await this.prisma.events.update({
            where: {
            id: id
            },
            data: {
            title: data.title,
            description: data.description,
            date: data.date,
            location: data.location
            }
        });
    
        return { statusCode: HttpStatus.OK, message: 'Evento editado com sucesso!' };
        } catch (error) {
        return { statusCode: HttpStatus.BAD_REQUEST, message: 'Erro ao editar evento! ' + error };
        }
    }
}