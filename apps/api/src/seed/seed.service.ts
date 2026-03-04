import { Injectable } from "@nestjs/common";
import { locations } from "./seed-data/locations";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SeedService {
	constructor(private readonly prismaService: PrismaService) {}

	async seedLocations() {
		const count = await this.prismaService.location.count();
		if (count > 0) return;

		await this.prismaService.location.createMany({
			data: [...locations],
			skipDuplicates: true,
		});

		console.log("Locations seeded");
	}

	async runAllSeeds() {
		await this.seedLocations();
	}
}
