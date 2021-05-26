import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, 
  BaseEntity, JoinTable
} from 'typeorm';

import {Fav_planet} from "./Fav_planet"
import {Fav_people} from "./Fav_people"

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  //@OneToOne(() => Fav_people, fav_people => fav_people.users) // specify inverse side as a second parameter
    //fav_people: Fav_people;

    //@OneToOne(() => Fav_planet, fav_planet => fav_planet.users) // specify inverse side as a second parameter
    //fav_planet: Fav_planet;

  @OneToMany(()=>Fav_planet, fav_planet => fav_planet.users)
    fav_planet: Fav_planet[];

    @OneToMany(()=>Fav_people, fav_people => fav_people.users)
    fav_people: Fav_people[];

  // @ManyToMany(() => Planet)
  // @JoinTable()
  // planets: Planet[];
  
}