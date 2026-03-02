import { Body, Controller, Get, Post } from "@nestjs/common";
import { LayoutService } from "./layout.service";
import { SaveLayoutDto } from "./dto/save-layout.dto";
import { SaveLayoutInput } from "./inputs/save-layout.input";

@Controller("layouts")
export class LayoutController {
	constructor(private readonly layoutService: LayoutService) {}

	@Post()
	save(@Body() dto: SaveLayoutDto) {
		const payload: SaveLayoutInput = {
			name: dto.name,
			description: dto.description,
			locationId: dto.locationId,
			status: dto.status,
			data: dto.data,
		};

		return this.layoutService.save(payload);
	}

	@Get()
	fetchAll() {
		return this.layoutService.findAll();
	}
}
