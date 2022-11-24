import { BadRequestException, Injectable, 
    InternalServerErrorException } from '@nestjs/common';
import { StatusStock } from '../machineries/dto/create-machinary.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AsignMachinery } from './dto/asignMachinery.dto';
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

    /**Con el fin de asignar maquinaria al proyecto */
    async asignMachinery(asignMachinery: AsignMachinery) {
        try {
            await this.prisma.machinery_has_project.create({
                data: asignMachinery
            })
            
            await this.prisma.stock.update({
                where: { 
                    id: asignMachinery.stock
                 },
                 data: {
                    status: StatusStock.OCUPADA
                 }
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /**Finalizar el projecto, colocar las maquinas en reparacion 
     * @param id id del proyecto
    */
    async finishProject(id: number) {
        try {
            const machinaries = await this.prisma.machinery_has_project.
            findMany({ 
                where: { 
                    project: id
                }
            });

            await Promise.all(machinaries.map(async (el)=>{
                await this.prisma.stock.update({
                    where: {
                        id: el.stock
                    },
                    data: {
                        status: StatusStock.REPARACION
                    }
                })
            }));
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
