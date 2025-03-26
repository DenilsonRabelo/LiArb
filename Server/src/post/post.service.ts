import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePost } from './dto/create-post-dto';

@Injectable()
export class postService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreatePost) {
    try {
      await this.prisma.post.create({
        data: {
          title: data.title,
          image: data.image,
          subtitle: data.subtitle,
          content: data.content,
          published: data.published,
          author: data.author,
          tags: data.tags.map(tag => tag.toString())
        }
      });

      return { statusCode: HttpStatus.CREATED, message: 'Post criado com sucesso!' };
    } catch (error) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Erro ao criar post! ' + error };
    }
  }

  async findPostsPaginated(page: number, perPage: number) {
    const skipAmount = (page - 1) * perPage;
    try {
      const posts = await this.prisma.post.findMany({
        skip: skipAmount,
        take: perPage,
        orderBy: {
          published: 'desc'
        }
      });

      const totalPosts = await this.prisma.post.count();
      const totalPages = Math.ceil(totalPosts / perPage);

      return { posts, totalPages };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching posts! ' + error.message
      };
    }
  }


  async findPostById(id: number) {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: id
        }
      });

      return post
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Erro ao buscar post! ' + error };
    }

  }


  async findPostByAuthor(author: string) {
    console.log(author)
    try {
      const post = await this.prisma.post.findMany({
        where: {
          author: { contains: author, mode: 'insensitive' }
        }
      });

      return post;
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Erro ao buscar post! ' + error };
    }
  }


  async deletePost(id: number) {
    try {
      await this.prisma.post.delete({
        where: {
          id: id
        }
      });

      return { statusCode: HttpStatus.OK, message: 'Post deletado com sucesso!' };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Erro ao deletar post! ' + error };
    }
  }

  async updatePost(id: number, data: CreatePost) {
    try {
      const post = await this.prisma.post.update({
        where: {
          id: id
        },
        data: {
          content: data.content,
          image: data.image,
          published: data.published,
          subtitle: data.subtitle,
          tags: data.tags.map(tag => tag.toString()),
          title: data.title,
          author: data.author
        }


      });

      return { statusCode: HttpStatus.OK, message: 'Post atualizado com sucesso!' };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Erro ao atualizar post! ' + error };
    }
  }

}