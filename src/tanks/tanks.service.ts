import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TanksService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create(createTankDto: CreateTankDto) {
    return await this.prismaService.tank.create({
      data: createTankDto,
    });
  }

  public async findAll() {
    const thermos = await this.prismaService.tank.findMany({
      include: {
        location: true,
        historyEntries: true,
      },
    });

    return thermos.map((t) => ({
      id: t.id,
      code: t.code,
      location: t.location.name,
      currentStatus: t.currentStatus,
    }));
  }

  public async findAllHistory() {
    const history = await this.prismaService.tankHistory.findMany({
      include: {
        tank: true,
        location: true,
      },
    });

    return history.map((h) => ({
      id: h.id,
      tank: h.tank.code,
      location: h.location.name,
      status: h.status,
      eventTimestamp: h.eventTimestamp,
    }));
  }

  public async findOne(id: string) {
    return await this.prismaService.tank.findUnique({
      where: { id },
      include: {
        location: true,
      },
    });
  }

  public async update(id: string, updateTankDto: UpdateTankDto) {
    const tank = await this.prismaService.tank.findUnique({
      where: { id },
    });

    if (tank.currentStatus === updateTankDto.currentStatus) {
      throw new BadRequestException(
        'The status is the same as the current one',
      );
    }

    try {
      return await this.prismaService.$transaction(async (tx) => {
        const update = await tx.tank.update({
          where: { id },
          data: updateTankDto,
        });

        await tx.tankHistory.create({
          data: {
            status: update.currentStatus,
            locationId: update.locationId,
            tankId: update.id,
          },
        });

        return update;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating tank');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} tank`;
  }
}
