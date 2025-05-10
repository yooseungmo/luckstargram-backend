import { createHmac } from 'crypto';
import { ApiFortuneGetRequestQueryDto } from 'src/fortune/dto/api-fortune-get-request-query.dto';

export function getCryptoAlgorithm(dto: ApiFortuneGetRequestQueryDto): number {
  const { name, birth_date: birthDate, fortune_date: fortuneDate } = dto;

  const hmac = createHmac('sha256', fortuneDate);
  hmac.update(`${name}-${birthDate}`);
  // 상위 8자리만 잘라 32비트 정수로 변환
  const hex = hmac.digest('hex').slice(0, 8);
  const intHash = parseInt(hex, 16);
  return (intHash % 500) + 1;
}
