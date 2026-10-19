import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 12;
  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);  
      return this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword
        },
      });
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error creating user:", error.message);
      }
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany(); 
      return users;
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error fetching users:", error.message);
      }
    }
  }

  async findOne(id: string) {
    try {
      const user  = await this.prismaService.user.findUnique({
        where: {
          id
        }
      });
      return user;
       
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error fetching user:", error.message);
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data: any = { ...updateUserDto };
      if (updateUserDto.password) {
        data.password = await bcrypt.hash(updateUserDto.password, this.SALT_ROUNDS);
      }
      const updatedUser = await this.prismaService.user.update({
        where: {
          id
        },
        data: data
      });
      return updatedUser; 

    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error updating user:", error.message);
      }
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.user.delete({
        where: {
          id
        }
      });
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error removing user:", error.message);
      }
    }
  }
}
