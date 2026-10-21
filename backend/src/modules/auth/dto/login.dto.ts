import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class  LoginDto {
    @ApiProperty({required:true})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;      

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}