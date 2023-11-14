import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../auth/entity/user.entity";

@Entity('resource')
export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'publisher_id'})
    publisherId: string;

    @Column({name: 'vin_name'})
    vinName: string;

    @Column({name: 'vin_name_kor'})
    vinNameKor: string;

    @Column()
    price: number;

    @Column()
    store: string;

    @Column()
    capacity: string;

    @Column()
    description: string;

    @Column({name: 'purchase_date'})
    purchaseDate: Date;

    @CreateDateColumn()
    issued: Date;

    @UpdateDateColumn()
    modified: Date;

    @ManyToOne(() => User, User => User.resource, {eager: true})
    user: User;

}