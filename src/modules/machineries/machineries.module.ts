import { Module } from '@nestjs/common';
import { MachineriesService } from './machineries.service';
import { MachineriesController } from './machineries.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MachineriesService],
  controllers: [MachineriesController]
})
export class MachineriesModule {}
