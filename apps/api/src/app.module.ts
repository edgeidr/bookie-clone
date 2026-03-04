import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { LayoutModule } from "./layout/layout.module";
import { LocationModule } from './location/location.module';
import { SeedModule } from './seed/seed.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, LayoutModule, LocationModule, SeedModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
