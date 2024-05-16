import { Module } from '@nestjs/common';
import { TanksService } from './tanks.service';
import { TanksController } from './tanks.controller';

@Module({
  controllers: [TanksController],
  providers: [TanksService],
})
export class TanksModule {}
