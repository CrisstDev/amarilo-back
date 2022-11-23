import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
