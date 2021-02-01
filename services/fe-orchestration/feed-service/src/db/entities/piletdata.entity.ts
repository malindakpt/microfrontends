import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Pilet } from 'src/types';

@Entity('piletData')
export default class PiletData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  version: string;

  @Column('simple-json')
  pilet: Pilet
}