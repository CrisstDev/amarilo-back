import { Module } from '@nestjs/common';
import { MachineriesService } from './machineries.service';

@Module({
  providers: [MachineriesService]
})
export class MachineriesModule {}
