import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { LayoutStatus } from "src/generated/prisma/enums";

export class SaveLayoutDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsInt()
	locationId: number;

	@IsEnum(LayoutStatus)
	status: LayoutStatus;

	@IsString()
	data: string;
}
