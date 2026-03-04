import { LocationCreateManyInput } from "src/generated/prisma/models";

export const locations: LocationCreateManyInput[] = [
	{ name: "Manila", countryCode: "PH" },
	{ name: "Tacloban", countryCode: "PH" },
	{ name: "Mexico", countryCode: "MX" },
	{ name: "South Africa", countryCode: "ZA" },
	{ name: "Canada", countryCode: "CA" },
	{ name: "US", countryCode: "US" },
];
