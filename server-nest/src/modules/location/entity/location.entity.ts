import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { LocationRelationship } from './locationRelationship.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building: string;

  @Column()
  location_name: string;

  @Column()
  location_number: string;

  @Column()
  area: string;

  @OneToMany(
    () => LocationRelationship,
    (locationRelationship) => locationRelationship.ancestor,
  )
  ancestor_relationships: LocationRelationship[];

  @OneToMany(
    () => LocationRelationship,
    (locationRelationship) => locationRelationship.descendant,
  )
  descendant_relationships: LocationRelationship[];
}
