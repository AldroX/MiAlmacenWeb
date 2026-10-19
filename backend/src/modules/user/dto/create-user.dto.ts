import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;
    
    @IsBoolean()
    @ApiProperty()
    isActive!: boolean;

    @ApiProperty()
    role!: string;
}
