import { Type } from "class-transformer";
import { IsNumber, Min, Max } from "class-validator";

export class ForecastParamsDto {
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  lon = 0;

  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  lat = 0;
}
