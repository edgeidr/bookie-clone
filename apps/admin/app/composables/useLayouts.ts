import type { Layout } from "@repo/shared";

export const useLayouts = () => {
	const layouts = useState<Layout[] | null>("layouts");

	const { execute: fetchAll, pending: isFetchingAll } = useCustomFetch("layouts", {
		method: "GET",
		onResponse: ({ response }) => {
			if (!response.ok) return;

			const responseData = response._data as Layout[];
			layouts.value = responseData;
		},
	});

	const getLayoutsCount = (locationId?: number) => {
		if (!layouts.value) return 0;
		if (!locationId) return layouts.value.length;

		return layouts.value.filter((layout) => layout.location?.id === locationId).length;
	};

	return { layouts, fetchAll, isFetchingAll, getLayoutsCount };
};
