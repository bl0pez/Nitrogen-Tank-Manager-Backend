import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TanksModule } from './tanks/tanks.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [AuthModule, PrismaModule, TanksModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
