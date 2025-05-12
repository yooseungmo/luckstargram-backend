import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiShareGetResponseDto {
  @Expose()
  @ApiProperty({
    example: 'b20f6cbaf77c5e60bcec9523d7945517',
    description: '결과 uuid',
  })
  uuid: string;

  @Expose()
  @ApiProperty({
    example: '유승모',
    description: '이름',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: '97-01-01',
    description: '생년월일',
  })
  birth_date: string;

  @Expose()
  @ApiProperty({
    example: '25-05-10',
    description: '운세날짜',
  })
  fortune_date: string;

  @Expose()
  @ApiProperty({
    example: '말조심하기!',
    description: '운세 팁',
  })
  action_tip: string;

  @Expose()
  @ApiProperty({
    example:
      '오늘은 작은 오해가 큰 갈등으로 이어질 수 있어요. 대화 전에 한 번 더 생각하세요 🤐',
    description: '운세 메시지',
  })
  message: string;
}
