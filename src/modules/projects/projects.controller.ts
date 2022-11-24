import { Controller, Get, Post, Body, Put, Query } from '@nestjs/common';
import { AsignMachinery } from './dto/asignMachinery.dto';
import { CreateProject } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) 
    {}
    
    @Post()
    create(@Body() payload: CreateProject) {
        return this.projectsService.create(payload);
    }

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Post('asign-machine')
    asignMachinery(@Body() asignMachinery: AsignMachinery) {
        return this.projectsService.asignMachinery(asignMachinery);
    }

    @Put('finish')
    finishProject(@Query() query: { id: string }) {
        return this.projectsService.finishProject(parseInt(query.id));
    }

}
