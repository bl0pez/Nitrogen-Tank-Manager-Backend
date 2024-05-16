import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  public constructor(private readonly prismaService: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    return this.prismaService.location.create({
      data: createLocationDto,
    });
  }

  findAll() {
    return this.prismaService.location.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
