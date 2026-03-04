import { LayoutStatus } from "src/generated/prisma/enums";

export interface SaveLayoutInput {
	uuid?: string;
	name: string;
	description?: string;
	locationId: number;
	status: LayoutStatus;
	data: Record<string, any>;
}
