import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SaveLayoutInput } from "./inputs/save-layout.input";

@Injectable()
export class LayoutService {
	constructor(private readonly prismaService: PrismaService) {}

	async save(input: SaveLayoutInput) {
		await this.prismaService.layout.create({
			data: {
				name: input.name,
				description: input.description,
				locationId: input.locationId,
				status: input.status,
				canvas: input.data,
			},
		});
		return;
		if (await this.findOne()) {
			await this.prismaService.layout.updateMany({
				data: {
					name: input.name,
					description: input.description,
					locationId: input.locationId,
					status: input.status,
					canvas: input.data,
				},
			});
		} else {
			await this.prismaService.layout.create({
				data: {
					name: input.name,
					description: input.description,
					locationId: input.locationId,
					status: input.status,
					canvas: input.data,
				},
			});
		}
	}

	findAll() {
		return this.prismaService.layout.findMany({
			where: { deletedAt: null },
			select: {
				uuid: true,
				name: true,
				location: true,
				status: true,
				description: true,
				updatedAt: true,
			},
			orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
		});
	}

	async findOne() {
		return await this.prismaService.layout.findFirst();
	}
}
