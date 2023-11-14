import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {Resource} from "../../resource/entity/resource.entity";

@Entity('user')
@Unique(['userName'])
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'user_name'})
    userName: string;

    @Column()
    password: string;

    @CreateDateColumn()
    issued: Date;

    @UpdateDateColumn()
    modified: Date;

    @OneToMany(() => Resource, Resource => Resource.user, {eager: false})
    resource: Resource[];
}