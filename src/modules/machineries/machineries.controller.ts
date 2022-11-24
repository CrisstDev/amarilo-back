import { Controller, Get, Post, Body, Put, Query, Patch } from '@nestjs/common';
import { CreateStock } from './dto/create-machinary.dto';
import { QueryMachinary } from './dto/query-machinary.dto';
import { MachineriesService } from './machineries.service';

@Controller('machineries')
export class MachineriesController {
    constructor(private readonly machineriesService: MachineriesService) 
    {}

    @Post()
    createStock(@Body() createStock: CreateStock) {
        return this.machineriesService.createStock(createStock);
    }

    @Get()
    findAll() {
        return this.machineriesService.findAll();
    }

    @Get('stock')
    findAllStock(@Query() query: QueryMachinary) {
        return this.machineriesService.findAllStock(query);
    }

    @Get('detail')
    findOne(@Query() query: { id: string }) {
        return this.machineriesService.findOne(parseInt(query.id));
    }

    @Put('turn-available')
    turnAvailable(@Query() params: { id: string }) {
        return this.machineriesService.turnAvailable(parseInt(params.id));
    }
}
