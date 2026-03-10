import { BookingTypeCreateManyInput } from "src/generated/prisma/models";

export const bookingTypes: BookingTypeCreateManyInput[] = [
	{
		name: "Instant",
		description: "Bookings are confirmed immediately",
		icon: "hugeicons:zap",
	},
	{
		name: "Requires Approval",
		description: "Bookings must be approved before confirmation",
		icon: "hugeicons:hourglass",
	},
];
