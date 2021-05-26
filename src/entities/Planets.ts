import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm"
import {Fav_planet} from "./Fav_planet"

@Entity()
export class Planets extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    Name: string

    @Column()
    Climate: string

    @Column()
    Population: number

    @Column()
    OrbitalPeriod: number

    @Column()
    RotationPeriod: number

    @Column()
    Diameter: number

    @OneToMany(() => Fav_planet, fav_planet => fav_planet.planets)
    fav_planet: Fav_planet[];
}