import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FortuneEntity } from 'src/entities/fortune.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FortuneQueryRepository {
  constructor(
    @InjectRepository(FortuneEntity)
    private repository: Repository<FortuneEntity>,
  ) {}

  async findOne(idx: number): Promise<FortuneEntity> {
    return this.repository.findOneOrFail({
      where: { id: idx },
    });
  }
}
