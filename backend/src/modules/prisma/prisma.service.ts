import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@prisma/client/extension";
// Load dynamically to avoid depending on a generated named export declaration.


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const adapter = new PrismaPg({

        })
        super({ adapter, log: ["query", "info", "warn", "error"] });
    }
    async onModuleInit() {
        try {
            await this.$connect();
        }
        catch (error: any) {
            if (error instanceof Error) {
                console.error("Error connecting to the database:", error.message);
            }
        }
    }
}