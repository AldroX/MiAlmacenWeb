import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiBody({type:LoginDto})
  @Post('login')
  async Login(
    @Body() loginDto: LoginDto
  ) {
   const userToken = await this.authService.validateUser(loginDto)

    if(!userToken)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return userToken
  }

}
