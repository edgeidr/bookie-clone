import { Icons } from "@repo/assets";
import type { Location } from "@repo/shared";

export const useLocations = () => {
	const locations = useState<Location[] | null>("locations");

	const { execute: fetchAll, pending: isFetchingAll } = useCustomFetch("locations", {
		method: "GET",
		onResponse: ({ response }) => {
			if (!response.ok) return;

			const responseData = response._data as Location[];
			locations.value = responseData;
		},
	});

	const getCountryFlag = (countryCode: string) => {
		const icon = Icons?.[`flag${countryCode}`] ?? "flagPH";
		return icon;
	};

	return { locations, fetchAll, isFetchingAll, getCountryFlag };
};
