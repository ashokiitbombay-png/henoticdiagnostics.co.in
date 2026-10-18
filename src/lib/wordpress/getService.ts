import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { GET_SERVICE_BY_SLUG } from "@/lib/wordpress/queries";
import type { WordPressService, GetServiceResponse } from "@/types/cms";
import { getFailsafeData, saveFailsafeData } from "@/lib/wordpress/failsafeStore";
import { wpCacheThrough } from "@/lib/cache/wp-cache";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { payloadFindBySlug } from "@/lib/payload/client";

/**
 * Converts Payload 3.0 Lexical RichText JSON into HTML string for frontend templates
 */
function lexicalToHtml(content: unknown, fallbackExcerpt?: string): string {
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
 * Dual-CMS Service Fetcher (Payload CMS Primary -> WordPress GraphQL Secondary -> Failsafe Store)
 */
async function _getService(slug: string): Promise<WordPressService | null> {
  try {
    // 1. Primary Source: Payload CMS Headless API (if PAYLOAD_CMS_URL is configured)
    if (process.env.PAYLOAD_CMS_URL) {
      const fetchPayloadWithTags = unstable_cache(
        async () => {
          const payloadDoc = await payloadFindBySlug("services", slug, 1, 86400);
          if (!payloadDoc) return null;

          const htmlContent = lexicalToHtml(payloadDoc.content, payloadDoc.excerpt);
          return {
            title: payloadDoc.title,
            slug: payloadDoc.slug,
            content: htmlContent,
          } as WordPressService;
        },
        ["payload-service", slug],
        {
          tags: [CACHE_TAGS.service(slug), CACHE_TAGS.servicesList],
          revalidate: 86400,
        }
      );

      const payloadService = await fetchPayloadWithTags();
      if (payloadService) {
        saveFailsafeData(slug, { title: payloadService.title, content: payloadService.content });
        return payloadService;
      }
    }

    // 2. Secondary Source: WordPress GraphQL (with 3-layer cache)
    const fetchWithTags = unstable_cache(
      async () => {
        return wpCacheThrough<WordPressService | null>(
          "service",
          slug,
          async () => {
            const client = getClient();
            const { data } = await client.query<GetServiceResponse>({
              query: GET_SERVICE_BY_SLUG,
              variables: { slug },
              fetchPolicy: "no-cache",
            });
            return data?.service ?? null;
          }
        );
      },
      ["wp-service", slug],
      {
        tags: [CACHE_TAGS.service(slug), CACHE_TAGS.servicesList],
        revalidate: 86400,
      }
    );

    let service = await fetchWithTags();

    if (!service) {
      try {
        const client = getClient();
        const { data } = await client.query<GetServiceResponse>({
          query: GET_SERVICE_BY_SLUG,
          variables: { slug },
          fetchPolicy: "no-cache",
        });
        if (data?.service) {
          service = data.service;
        }
      } catch (directErr) {
        console.warn(`[getService] Direct fetch retry failed for slug ${slug}:`, directErr);
      }
    }

    if (service) {
      saveFailsafeData(slug, { title: service.title, content: service.content });
      return service;
    }

    // 3. Tertiary Source: Local Failsafe Mirror
    const fallback = getFailsafeData(slug);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored service content for slug "${slug}".`);
      return fallback;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch service data for slug ${slug}:`, error);
    const fallback = getFailsafeData(slug);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored service content for slug "${slug}" after error.`);
      return fallback;
    }
    return null;
  }
}

export const getService = cache(_getService);
