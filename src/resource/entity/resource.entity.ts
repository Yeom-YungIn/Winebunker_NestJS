import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../auth/entity/user.entity";
import {Vin} from "../../vin/entity/vin.entity";

@Entity('resource')
export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'vin_sn'})
    vinSn: number;

    @Column({name: 'publisher_id'})
    publisherId: string;

    @Column()
    price: number;

    @Column()
    vintage: number;

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

    @ManyToOne(() => Vin, User => User.resource, {eager: true})
    vin: Vin;

}