import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDoesNotExistException } from 'src/common/exceptions/PostDoesNotExistException';

describe('PostService', () => {
  let service: PostService;
  let repo: Repository<Post>;

  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post.',
    author: 'Author Name',
  };

  const mockPostDto: CreatePostDto = {
    title: 'Test Post',
    content: 'This is a test post.',
    author: 'Author Name',
  };

  const mockUpdatePostDto: UpdatePostDto = {
    title: 'Updated Test Post',
    content: 'This is an updated test post.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            create: jest.fn().mockReturnValue(mockPost),
            save: jest.fn().mockReturnValue(mockPost),
            find: jest.fn().mockReturnValue([mockPost]),
            findOneBy: jest.fn().mockReturnValue(mockPost),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repo = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const result = await service.create(mockPostDto);

      expect(repo.create).toHaveBeenCalledWith(mockPostDto);
      expect(repo.save).toHaveBeenCalledWith(mockPost);
      expect(result).toEqual(mockPost);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual([mockPost]);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      const result = await service.findOne('1');

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockPost);
    });

    it('should throw an error if post does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockReturnValue(undefined);

      await expect(service.findOne('2')).rejects.toThrow(PostDoesNotExistException);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const result = await service.update('1', mockUpdatePostDto);

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repo.update).toHaveBeenCalledWith('1', mockUpdatePostDto);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockPost);
    });

    it('should throw an error if post does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockReturnValue(undefined);

      await expect(service.update('2', mockUpdatePostDto)).rejects.toThrow(
        PostDoesNotExistException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const result = await service.remove('1');

      expect(repo.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({ status: 200 });
    });
  });
});
