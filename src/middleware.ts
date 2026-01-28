import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next();

    const headers = response.headers;

    // X-Frame-Options: Prevent clickjacking
    headers.set("X-Frame-Options", "SAMEORIGIN");

    // X-Content-Type-Options: Prevent MIME type sniffing
    headers.set("X-Content-Type-Options", "nosniff");

    // Referrer-Policy: Control referrer information
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Strict-Transport-Security: Enforce HTTPS
    // max-age=31536000 (1 year), includeSubDomains, preload
    if (import.meta.env.PROD) {
        headers.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
        );
    }

    // Permissions-Policy: restrict advanced features
    headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(self)"
    );

    // Note: Content-Security-Policy is complex to add without potential breakage
    // We can add a basic one, or rely on the above for now.
    // Adding a basic CSP often breaks inline scripts/styles which Astro uses eagerly.
    // We'll skip CSP for now unless strictly required, as X-Frame-Options helps with Clickjacking.

    return response;
});
