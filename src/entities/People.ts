import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm"
import {Fav_people} from "./Fav_people"

@Entity()
export class People extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    Name: string

    @Column()
    BirthYear: string

    @Column()
    Gender: string

    @Column()
    Height: number

    @Column()
    SkinColor: string

    @Column()
    EyeColor: string

    @ManyToOne(()=>Fav_people, fav_people => fav_people.people)
  fav_people: Fav_people;
}