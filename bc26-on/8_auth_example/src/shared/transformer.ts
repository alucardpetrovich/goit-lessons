import { ClassConstructor, plainToInstance } from "class-transformer";

export function transform(cls: ClassConstructor<any>, obj: any) {
  return plainToInstance(cls, obj, { excludeExtraneousValues: true });
}
