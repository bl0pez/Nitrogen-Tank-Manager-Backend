import { TankStatus } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateTankDto {
  @IsEnum(TankStatus)
  currentStatus: TankStatus;

  @IsString()
  code: string;

  @IsString()
  locationId: string;
}
