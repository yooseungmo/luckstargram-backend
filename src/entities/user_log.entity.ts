import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_log' })
export class UserLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 32, nullable: false, unique: true })
  uuid: string;

  @Column({ type: 'char', length: 32, nullable: false, unique: true })
  user_uuid: string;

  @Column({ type: 'char', length: 32, nullable: false, unique: true })
  fortune_uuid: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
