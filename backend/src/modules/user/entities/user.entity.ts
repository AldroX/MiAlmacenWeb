import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    isActive: boolean;
    @ApiProperty()
    role: string;
    @ApiProperty()
    createdAt: Date ;
    @ApiProperty()
    updatedAt: Date;
}
