import { LayoutStatus } from "src/generated/prisma/enums";

export interface SaveLayoutInput {
	name: string;
	description?: string;
	locationId: number;
	status: LayoutStatus;
	data: string;
}
