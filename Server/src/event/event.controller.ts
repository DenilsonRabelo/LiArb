import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch,UseGuards, Post } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { eventService } from "./event.service";
import { CreateEvent } from "./dto/create-event-dto";


@Controller("evento")
export class eventController {
    constructor(private EventService: eventService) { }

    @UseGuards(JwtAuthGuard)
    @Post("criar")
    createEvent(@Body() event: CreateEvent) {
        return this.EventService.create(event)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("deletar/:id")
    deleteEvent(@Param('id', ParseIntPipe) id: number) {
        return this.EventService.deleteEvent(id);
    }

    @Get("buscar/:id")
    findEventById(@Param('id', ParseIntPipe) id: number) {
        return this.EventService.findEventById(id)
    }

    @Get('buscar/paginado/:page/:perPage')
    findEventsPaginated(
        @Param('page', ParseIntPipe) page: number,
        @Param('perPage', ParseIntPipe) perPage: number
    ) {
        if (page < 1 || perPage < 1) {
            throw new HttpException('Os parâmetros de paginação devem ser números positivos.', HttpStatus.BAD_REQUEST);
        }

        return this.EventService.findEventsPaginated(page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('editar/:id')
    updateEvent(@Param('id', ParseIntPipe) id: number, @Body() event: CreateEvent) {
        return this.EventService.editEvent(id, event);
    }
}
