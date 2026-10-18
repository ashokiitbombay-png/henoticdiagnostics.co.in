import { cache } from "react";
import { unstable_cache } from "next/cache";
import { payloadFindBySlug } from "@/lib/payload/client";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { formatSlug } from "@/lib/utils";

export interface PayloadServiceContent {
  title: string;
  slug: string;
  content: string;
}

/**
 * Converts Payload 3.0 Lexical RichText JSON into an HTML string for frontend templates.
 */
export function lexicalToHtml(content: unknown, fallbackExcerpt?: string): string {
  if (!content) return fallbackExcerpt ? `<p>${fallbackExcerpt}</p>` : "";
  if (typeof content === "string") return content;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const root = (content as any)?.root;
    if (root && Array.isArray(root.children)) {
      const paragraphs = root.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((node: any) => {
          if (Array.isArray(node.children)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const text = node.children.map((c: any) => c.text || "").join("");
            return text ? `<p>${text}</p>` : "";
          }
          return "";
        })
        .filter(Boolean);

      if (paragraphs.length > 0) {
        return paragraphs.join("\n");
      }
    }
  } catch {
    // Fallback to excerpt if JSON parsing fails
  }

  return fallbackExcerpt ? `<p>${fallbackExcerpt}</p>` : "";
}

/**
 * Fetches service details from Payload CMS.
 * Falls back to structured clinical defaults if Payload CMS is not reachable.
 */
async function _getService(slug: string): Promise<PayloadServiceContent | null> {
  const formattedTitle = formatSlug(slug);

  try {
    const fetchPayloadWithTags = unstable_cache(
      async () => {
        const payloadDoc = await payloadFindBySlug("services", slug, 1, 86400);
        if (!payloadDoc) return null;

        const htmlContent = lexicalToHtml(payloadDoc.content, payloadDoc.excerpt);
        return {
          title: payloadDoc.title || formattedTitle,
          slug: payloadDoc.slug,
          content: htmlContent,
        };
      },
      ["payload-service", slug],
      {
        tags: [CACHE_TAGS.service(slug), CACHE_TAGS.servicesList],
        revalidate: 86400,
      }
    );

    const service = await fetchPayloadWithTags();
    if (service) return service;
  } catch (error) {
    console.warn(`[Payload CMS] Failed to fetch service for slug "${slug}":`, error);
  }

  // Graceful clinical fallback when Payload CMS is offline or document not yet seeded
  return {
    title: formattedTitle,
    slug,
    content: `<p><strong>${formattedTitle}</strong> at Henotic Diagnostics is performed using state-of-the-art NABL, ISO, PCPNDT, and AERB accredited diagnostic equipment across India.</p><p>Our specialist radiologists and MD pathologists ensure high-precision imaging and laboratory accuracy with same-day digital reporting and dedicated clinical consultation.</p>`,
  };
}

export const getService = cache(_getService);
