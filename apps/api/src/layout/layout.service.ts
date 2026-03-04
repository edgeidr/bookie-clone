import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SaveLayoutInput } from "./inputs/save-layout.input";

@Injectable()
export class LayoutService {
	constructor(private readonly prismaService: PrismaService) {}

	async save(input: SaveLayoutInput) {
		if (input.uuid) {
			await this.prismaService.layout.update({
				where: { uuid: input.uuid },
				data: {
					name: input.name,
					description: input.description,
					locationId: input.locationId,
					status: input.status,
					canvas: input.data,
				},
			});

			return { uuid: input.uuid };
		} else {
			const { uuid } = await this.prismaService.layout.create({
				data: {
					name: input.name,
					description: input.description,
					locationId: input.locationId,
					status: input.status,
					canvas: input.data,
				},
			});

			return { uuid };
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

	async findOne(uuid: string) {
		return await this.prismaService.layout.findUniqueOrThrow({
			where: { uuid },
			include: { location: true },
		});
	}
}
