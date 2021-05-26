import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn,  
  BaseEntity, JoinTable
} from 'typeorm';

import {Users} from "./Users"
import {People} from "./People"

@Entity()
export class Fav_people extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(()=>Users, users => users.fav_people)
  users: Users;

  //@OneToOne(() => Users, users => users.fav_people) // specify inverse side as a second parameter
    //@JoinColumn()
    //users: Users;

    @ManyToOne(()=>People, people => people.fav_people)
  people: People;

  //@OneToMany(()=>People, people => people.fav_people)
    //people: People[];
  
}