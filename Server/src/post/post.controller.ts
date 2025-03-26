import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePost } from './dto/create-post-dto';
import { postService } from "./post.service";

@Controller("post")
export class postController {
    constructor(private postService: postService) { }

    @UseGuards(JwtAuthGuard)
    @Post("criar")
    criarpostADM(@Body() user: CreatePost) {
        return this.postService.create(user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("deletar/:id")
    deletarPost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.deletePost(id);
    }

    @Get("buscar/por-id/:id")
    buscarPostPorId(@Param('id', ParseIntPipe) id: number) {
        return this.postService.findPostById(id)
    }

    @Get('buscar/paginado/:page/:perPage')
    buscarPostsPaginados(
        @Param('page', ParseIntPipe) page: number,
        @Param('perPage', ParseIntPipe) perPage: number
    ) {
        if (page < 1 || perPage < 1) {
            throw new HttpException('Os parâmetros de paginação devem ser números positivos.', HttpStatus.BAD_REQUEST);
        }

        return this.postService.findPostsPaginated(page, perPage);
    }

    @Get('buscar/por-autor')
    buscarPostPorAutor(@Body('author') author: string) {
        console.log(author);
        return this.postService.findPostByAuthor(author);
    }

    @Patch('editar/:id')
    editarPost(@Param('id', ParseIntPipe) id: number, @Body() post: CreatePost) {
        return this.postService.updatePost(id, post);
    }
}
