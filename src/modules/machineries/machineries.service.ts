import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStock, StatusStock } from './dto/create-machinary.dto';
import { QueryMachinary } from './dto/query-machinary.dto';

@Injectable()
export class MachineriesService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createStock(createStock: CreateStock) {
        try {

            return await this.prisma.stock.create({
                data: createStock
            });

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async findAll() {
        try {
            return await this.prisma.machinery.findMany();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /**Obtener todo el stock de maquinas
     * @query contiene o el estado o el id de la maquina o ambos
     */
    async findAllStock(query: QueryMachinary) {
        try {
            return await this.prisma.stock.findMany({
                where: {
                    ...query,
                    status: StatusStock[query.status] || StatusStock.DISPONIBLE
                },
                include: {
                    machinery_relation: {
                        select: {
                            id: true,
                            weight: true,
                            type: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /**Obtener todo el stock de un tipo de maquina
     * @param id id de la maquina
     */
    async findOne(id: number) {
        try {
            return await this.prisma.stock.findMany({
                where: {
                    machinery: id
                },
                include: {
                    machinery_relation: {
                        select: {
                            id: true,
                            weight: true,
                            type: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /**Colocar disponible el stock de la maquina */
    async turnAvailable(stockId: number) {
        try {

            return await this.prisma.stock.update({
                where: { id: stockId },
                data: {
                    status: StatusStock.DISPONIBLE
                }
            });

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

}
