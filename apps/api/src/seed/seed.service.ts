import { Injectable } from "@nestjs/common";
import { locations } from "./seed-data/locations";
import { PrismaService } from "src/prisma/prisma.service";
import { bookingTypes } from "./seed-data/booking-types";

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

	async seedBookingTypes() {
		const count = await this.prismaService.bookingType.count();
		if (count > 0) return;

		await this.prismaService.bookingType.createMany({
			data: [...bookingTypes],
			skipDuplicates: true,
		});

		console.log("Booking Types seeded");
	}

	async runAllSeeds() {
		await Promise.all([this.seedLocations(), this.seedBookingTypes()]);
	}
}
