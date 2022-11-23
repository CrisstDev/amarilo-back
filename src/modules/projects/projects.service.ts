import { Injectable, 
    InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProject } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create (createProjectDto: CreateProject) {
        try {
            return await this.prisma.project.create({
                data: createProjectDto
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async findAll() {
        try {
            return await this.prisma.project.findMany({
                select: {
                    id: true,
                    name: true,
                    location: true,
                    status: true,
                    init_date: true,
                    finish_date: true
                }
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
