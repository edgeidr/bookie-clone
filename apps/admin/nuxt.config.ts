import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	devServer: {
		port: 3012,
	},
	modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxtjs/i18n", "@vueuse/nuxt", "@primevue/nuxt-module"],
	ssr: false,
	css: ["~/assets/css/main.css"],
	vite: {
		plugins: [tailwindcss()],
	},
	app: {
		head: {
			title: process.env.APP_PREFIX + " " + process.env.APP_NAME,
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},
	runtimeConfig: {
		public: {
			appName: process.env.APP_PREFIX + " " + process.env.APP_NAME || "",
			brandName: process.env.BRAND_NAME || "",
			apiBaseUrl: process.env.API_BASE_URL || "",
			toastLife: Number(process.env.TOAST_LIFE) || 5000,
		},
	},
	pages: {
		pattern: ["**/*.vue", "!**/_components/**"],
	},
	routeRules: {
		"/": { redirect: "/layout-editor" },
	},
	components: [
		{
			path: "@/components",
			pathPrefix: false,
		},
	],
	fonts: {
		families: [{ name: "Inter" }],
	},
	primevue: {
		importTheme: { from: "@/primevue/theme", as: "globalTheme" },
		importPT: { from: "@/primevue/passthrough", as: "globalPassthrough" },
		options: {
			ptOptions: { mergeProps: true },
			ripple: true,
			inputVariant: "filled",
		},
		components: {
			exclude: ["ColorPicker"],
		},
	},
	i18n: {
		locales: [{ code: "en", language: "en-US", file: "en.json" }],
		defaultLocale: "en",
		restructureDir: "",
		strategy: "no_prefix",
		langDir: "../../packages/i18n/locales",
	},
});
