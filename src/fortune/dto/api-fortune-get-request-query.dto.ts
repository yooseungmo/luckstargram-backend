import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IsValidBirthDate } from 'src/commons/decorators/is-valid-birth-date.decorator';
import { IsValidFortuneDate } from 'src/commons/decorators/is-valid-fortune-date.decorator';

export class ApiFortuneGetRequestQueryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '유승모', description: '이름' })
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @IsValidBirthDate()
  @ApiProperty({ example: '1997-01-01', description: '생년월일' })
  birth_date: string;

  @IsNotEmpty()
  @IsDateString()
  @IsValidFortuneDate()
  @ApiProperty({ example: '2025-05-10', description: '운세날짜' })
  fortune_date: string;
}
