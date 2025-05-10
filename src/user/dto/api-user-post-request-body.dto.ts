import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IsValidBirthDate } from 'src/commons/decorators/is-valid-birth-date.decorator';

export class ApiUserPostRequestBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @IsValidBirthDate({
    message: '생년월일은 1900-01-01 이후, 오늘 이전이어야 합니다.',
  })
  birth_date: string;
}
