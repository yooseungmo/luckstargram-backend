import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

/** 오늘(포함)까지, 2달 전(포함)부터의 날짜만 허용하는 커스텀 데코레이터 */
export function IsValidFortuneDate(validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidFortuneDate',
      target: target.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
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
          const lastDay = new Date(year, month, 0).getDate();
          if (day < 1 || day > lastDay) return false;

          // 4) Date 객체 생성 & 유효성 검사
          const date = new Date(year, month - 1, day);
          if (isNaN(date.getTime())) return false;

          // 5) 최소/최대 범위 비교
          const today = new Date();
          today.setHours(23, 59, 59, 999);

          const min = new Date();
          min.setMonth(min.getMonth() - 2);
          min.setHours(0, 0, 0, 0);

          return date >= min && date <= today;
        },
        defaultMessage(args: ValidationArguments): string {
          return (
            args?.constraints?.[0] ||
            `${args.property}은 YYYY-MM-DD 포맷이며, 오늘부터 2달 뒤까지의 날짜여야 합니다.`
          );
        },
      },
    });
  };
}
