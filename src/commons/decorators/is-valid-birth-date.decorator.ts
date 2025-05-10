import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

/** 1900-01-01 이후, 오늘 00:00 이전 날짜만 허용하는 커스텀 데코레이터 */
export function IsValidBirthDate(validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidBirthDate',
      target: target.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          // 1) 문자열 여부 + 포맷 검사
          if (typeof value !== 'string') return false;
          const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
          if (!match) return false;

          // 2) 연·월·일 숫자로 파싱
          const [, y, m, d] = match.map(Number);
          const year = Number(match[1]);
          const month = Number(match[2]);
          const day = Number(match[3]);

          // 3) 월(1~12), 일(1~각 월 마지막) 범위 체크
          if (month < 1 || month > 12) return false;
          const lastDay = new Date(year, month, 0).getDate(); // 해당 월 마지막 일
          if (day < 1 || day > lastDay) return false;

          // 4) Date 객체 생성 & 유효성 검사
          const date = new Date(year, month - 1, day);
          if (isNaN(date.getTime())) return false;

          // 5) 최소/최대 범위 비교
          const minDate = new Date(1900, 0, 1); // 1900-01-01
          const today = new Date();
          today.setHours(0, 0, 0, 0); // 오늘 자정
          return date >= minDate && date < today;
        },
        defaultMessage(args: ValidationArguments): string {
          return (
            args?.constraints?.[0] ||
            `${args.property}은 YYYY-MM-DD 포맷이며, 1900-01-01 이후 · 오늘 이전 날짜여야 합니다.`
          );
        },
      },
    });
  };
}
