import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Resource } from "../../../resource/entity/resource.entity";

@Entity()
export class Vin {
    @PrimaryGeneratedColumn({name: 'vin_sn'})
    vinSn: number;

    @Column({name: 'vin_name'})
    vinName: string;

    @Column({name: 'vin_name_kor'})
    vinNameKor: string;

    @Column()
    region: string;

    @OneToMany(() => Resource, Resource => Resource.vin, {eager: false})
    resource: Resource[];
}