import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService
  ) {}
  

  async validateUser(user:LoginDto){
     const foundUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email
      }
     })

     if(!foundUser) return null;

     if(foundUser.password === user.password){
      return this.jwtService.sign({
        id:foundUser.id,
        email: foundUser.email,
        role: foundUser.role
      });
     }
  }

  async register(registerDto: RegisterDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });
    if (user) {
      throw new Error('User already exists');
    }
    await this.prismaService.user.create({
      data: registerDto,
    });
    return { message: 'User registered successfully' };
  }
}
 