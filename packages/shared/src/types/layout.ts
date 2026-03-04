import type { Location } from "./location";

export interface Layout {
	uuid: string;
	name: string;
	canvas?: string;
	description?: string;
	location?: Location;
	locationId?: number;
	status?: string;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}
