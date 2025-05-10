import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fortune' })
export class FortuneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 32, nullable: false, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  action_tip: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  message: string;
}
