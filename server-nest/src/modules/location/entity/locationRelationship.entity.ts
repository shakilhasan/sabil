import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Location } from './location.entity';

@Entity()
export class LocationRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Location, (location) => location.ancestor_relationships)
  @JoinColumn({ name: 'ancestor_id', referencedColumnName: 'id' })
  ancestor: Location;

  @ManyToOne(() => Location, (location) => location.descendant_relationships)
  @JoinColumn({ name: 'descendant_id', referencedColumnName: 'id' })
  descendant: Location;

  @Column()
  distance: number;
}
