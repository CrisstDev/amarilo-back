import { 
 Injectable, 
 InternalServerErrorException, 
 BadRequestException } from '@nestjs/common';
import { encryptPassword, validateEncryptPassword } from '../../_helpers/encrypt.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async login(email: string, password: string) {
        try {

            email = email.toLocaleLowerCase();

            const user = await this.prisma.user.findUnique({
                where: { email }
            });

            if (!user) throw new BadRequestException('Lo sentimos, el usuario ingresado no existe.');

            const validatePassword = await validateEncryptPassword(password, user.password);

            if (!validatePassword) throw new BadRequestException('Lo sentimos, la contraseña es incorrecta.');

            return user;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(createUserDto: CreateUser) {
        try {
            const search_user = await this.prisma.user.findUnique({
                where: {
                    email: createUserDto.email
                }
            });

            if (search_user) throw new BadRequestException("El email registrado ya existe.")

            createUserDto.password = await encryptPassword(createUserDto.password);

            return await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    is_active: true
                }
            });

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll() {
        try {
            return await this.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    last_name: true,
                    email: true,
                    phone: true
                }
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: number, updateUserDto: any) {
        try {
            return this.prisma.user.update({
                data: updateUserDto,
                where: {
                    id
                }
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
