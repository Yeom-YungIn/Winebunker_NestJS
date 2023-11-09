import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

}