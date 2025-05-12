import { FortuneEntity } from 'src/entities/fortune.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_log' })
export class UserLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 32, nullable: false, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  user_name: string;

  @Column({ type: 'char', length: 32, nullable: false, unique: true })
  user_uuid: string;

  @Column({ type: 'char', length: 32, nullable: false, unique: true })
  fortune_uuid: string;

  @Column({ type: 'date', nullable: false })
  fortune_date: Date;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user: UserEntity;

  @ManyToOne(() => FortuneEntity)
  @JoinColumn({ name: 'fortune_uuid', referencedColumnName: 'uuid' })
  fortune: FortuneEntity;
}
