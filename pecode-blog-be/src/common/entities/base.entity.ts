import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity as TypeOrmBaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
