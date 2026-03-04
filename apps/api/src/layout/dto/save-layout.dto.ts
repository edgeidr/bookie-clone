import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { LayoutStatus } from "src/generated/prisma/enums";

export class SaveLayoutDto {
	@IsOptional()
	uuid?: string;

	@IsNotEmpty({ message: "common.validation.required" })
	name: string;

	@IsOptional()
	description?: string;

	@IsNotEmpty({ message: "common.validation.required" })
	locationId: number;

	@IsNotEmpty({ message: "common.validation.required" })
	@IsEnum(LayoutStatus, { message: "common.validation.invalidOption" })
	status: LayoutStatus;

	@IsObject()
	data: Record<string, any>;
}
