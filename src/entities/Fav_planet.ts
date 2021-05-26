import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, OneToOne, JoinColumn, 
  BaseEntity, JoinTable
} from 'typeorm';

import {Users} from "./Users"
import {People} from "./People"
import { Planets } from './Planets';


@Entity()
export class Fav_planet extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>Users, users => users.fav_planet)
  users: Users;

  //@OneToOne(() => Users, users => users.fav_planet) // specify inverse side as a second parameter
    //@JoinColumn()
    //users: Users;

    @ManyToOne(()=>Planets, planets => planets.fav_planet)
  planets: Planets;
  
  //@OneToMany(()=>Planets, planets => planets.fav_planet)
    //planets: Planets[];
  
}