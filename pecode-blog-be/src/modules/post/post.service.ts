import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDoesNotExistException } from 'src/common/exceptions/PostDoesNotExistException';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);

    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new PostDoesNotExistException();

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new PostDoesNotExistException();

    await this.postRepository.update(id, updatePostDto);

    return this.postRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.postRepository.delete(id);

    return { status: HttpStatus.OK };
  }
}
