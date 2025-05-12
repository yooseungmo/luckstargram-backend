import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsFortuneYear2025(validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      name: 'IsFortuneYear2025',
      target: target.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (typeof value !== 'string') return false;

          const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
          if (!match) return false;

          const year = Number(match[1]);
          return year === 2025;
        },
        defaultMessage(args: ValidationArguments): string {
          return (
            args?.constraints?.[0] ||
            `${args.property}은 2025년 날짜여야 합니다. (YYYY-MM-DD)`
          );
        },
      },
    });
  };
}
