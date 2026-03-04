import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seed.module";
import { SeedService } from "./seed.service";

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(SeedModule);

	const seedService = app.get(SeedService);

	try {
		await seedService.runAllSeeds();
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await app.close();
		console.log("Seeding done");
	}
}

bootstrap();
