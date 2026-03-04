import { IsEnum, IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { LayoutStatus } from "src/generated/prisma/enums";

export class SaveLayoutDto {
	@IsString()
	uuid?: string;

	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsInt()
	locationId: number;

	@IsEnum(LayoutStatus)
	status: LayoutStatus;

	@IsObject()
	data: Record<string, any>;
}
