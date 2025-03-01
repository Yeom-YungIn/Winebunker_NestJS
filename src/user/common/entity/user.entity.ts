import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resource } from '../../../resource/entity/resource.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  issued: Date;

  @UpdateDateColumn()
  modified: Date;

  @OneToMany(() => Resource, (Resource) => Resource.user, { eager: false })
  @JoinColumn({ name: 'id' })
  resource: Resource[];
}
