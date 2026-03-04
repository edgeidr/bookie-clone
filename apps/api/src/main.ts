import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationError } from "class-validator";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import * as express from "express";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const host = configService.get<string>("API_HOST", "0.0.0.0");
	const port = configService.get<number>("API_PORT", 3011);
	const corsAllowedOriginRaw = configService.get<string>("CORS_ALLOWED_ORIGIN", "");
	const corsAllowedOrigin = corsAllowedOriginRaw.split(",").map((origin) => origin.trim());

	app.enableCors({
		origin: corsAllowedOrigin,
		credentials: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				return new BadRequestException(
					validationErrors.map((error) => ({
						field: error.property,
						error: error.constraints ? Object.values(error.constraints) : "",
					})),
				);
			},
		}),
	);
	app.use(express.json({ limit: "5mb" }));
	app.use(express.urlencoded({ limit: "5mb", extended: true }));

	await app.listen(port, host);
}

void bootstrap();
