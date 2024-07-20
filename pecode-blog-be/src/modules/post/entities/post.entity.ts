import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @ApiProperty({ example: 'JavaScript', description: 'Title of the blog' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'JavaScript is a programming lanugage...',
    description: 'Content of the blog',
  })
  @Column({ type: 'longtext' })
  content: string;

  @ApiProperty({ example: 'Vasyl Harastei', description: 'Author of the blog' })
  @Column()
  author: string;
}
