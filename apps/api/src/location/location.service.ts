import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LocationService {
	constructor(private readonly prismaService: PrismaService) {}

	findAll() {
		return this.prismaService.location.findMany({
			where: { deletedAt: null },
			orderBy: [{ name: "asc" }],
		});
	}
}
