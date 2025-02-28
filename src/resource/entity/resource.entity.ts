import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn
} from "typeorm";
import { User } from "../../user/common/entity/user.entity";
import { Vin } from "../../vin/common/entity/vin.entity";

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
    purchaseDate: string;

    @CreateDateColumn()
    issued: Date;

    @UpdateDateColumn()
    modified: Date;

    @ManyToOne(() => User, User => User.resource, {eager: false})
    @JoinColumn({name: "user_name"})
    user: User;

    @ManyToOne(() => Vin, (Vin) => Vin.resource, {eager: false})
    @JoinColumn({name: 'vin_sn'})
    vin: Vin;

}