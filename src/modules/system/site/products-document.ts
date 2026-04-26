import type { PhotonDocument } from "../../../types";

export const photonSystemProductsDocument: PhotonDocument = {
	id: "photon-products",
	name: "Products",
	route: "/products",
	routePatterns: ["/products/:slug", "/:city/products/:slug"],
	updatedAt: "2026-04-26T00:00:00.000Z",
	blocks: [
		{
			id: "products-hero",
			module: "marketing-demo",
			type: "hero-spotlight",
			props: {
				eyebrow: "Route context demo",
				title: "Кофе {{ route.slug }} в {{ route.city }}",
				body: "Single document, two URL shapes — `/products/:slug` (default city) and `/:city/products/:slug` (overridden). The hero text resolves `{{ route.slug }}` and `{{ route.city }}` from the matched URL pattern, falling back to the city default `almaty` when the segment is omitted.",
				primaryLabel: "Try /astana/products/coffee",
				primaryHref: "/astana/products/coffee",
				secondaryLabel: "Default /products/coffee",
				secondaryHref: "/products/coffee",
				spotlightLabel: "Active city",
				spotlightValue: "{{ route.city }}",
			},
		},
	],
};
