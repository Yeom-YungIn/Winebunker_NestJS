import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from '../../../resource/entity/resource.entity';
import { DateEntity } from '@app/common/entity/date.entity';

@Entity('user')
export class User extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, comment: '이름' })
  userName: string;

  @Column({ type: 'varchar', length: 30, comment: '비밀번호' })
  password: string;

  @Column({ comment: 'refreshToken' })
  refreshToken: string;

  @OneToMany(() => Resource, (Resource) => Resource.user, { eager: false })
  @JoinColumn({ name: 'id' })
  resource: Resource[];
}
