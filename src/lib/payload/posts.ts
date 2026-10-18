import { cache } from "react";
import { unstable_cache } from "next/cache";
import { payloadFind, payloadFindBySlug } from "@/lib/payload/client";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { lexicalToHtml } from "@/lib/payload/services";
import type { BlogPost, BlogPostCard, GetBlogPostsResponse } from "@/types/cms";

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Understanding 3.0T MRI Scans: Accuracy, Safety, and Patient Preparation",
    slug: "understanding-3t-mri-scans",
    excerpt: "Discover why 3.0 Tesla MRI scanners provide superior clarity for neurological, spinal, and musculoskeletal imaging without radiation.",
    content: "<p>3.0 Tesla MRI imaging represents the pinnacle of modern diagnostic radiology. By doubling the magnetic field strength of standard 1.5T scanners, 3.0T systems deliver extraordinary spatial resolution and contrast differentiation.</p><h3>Why Field Strength Matters in Neuro and Spine Imaging</h3><p>With 3T MRI, radiologists can detect minute brain lesions, subtle microvascular ischemic changes, and early nerve root compressions that may remain invisible on conventional scans.</p><h3>Zero Ionizing Radiation</h3><p>Unlike CT scans or X-rays, MRI uses safe magnetic fields and radiofrequency waves. Consequently, it is completely radiation-free and safe for regular follow-up scans.</p>",
    date: new Date().toISOString(),
    author: { node: { name: "Dr. Ashok Kumar" } },
    categories: { nodes: [{ name: "Radiology & Imaging", slug: "radiology" }] },
    featuredImage: {
      node: {
        sourceUrl: "https://cdn.henoticdiagnostics.co.in/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp",
        altText: "3.0T MRI Scanner at Henotic Diagnostics",
      },
    },
  },
  {
    id: "post-2",
    title: "Whole-Body PET-CT: The Gold Standard in Precision Oncology & Staging",
    slug: "whole-body-pet-ct-cancer-staging",
    excerpt: "Learn how digital PET-CT scanning maps metabolic cellular activity to diagnose, stage, and evaluate treatment response for oncological conditions.",
    content: "<p>Positron Emission Tomography combined with Computed Tomography (PET-CT) is one of the most powerful diagnostic tools in modern oncology. By combining molecular metabolic data with cross-sectional anatomical structures, PET-CT enables physicians to detect malignancies at cellular stages.</p><h3>How FDG Tracers Detect Malignant Cells</h3><p>Cancer cells consume glucose at substantially higher rates than healthy tissue. When Fluorodeoxyglucose (FDG) is administered, tumor cells absorb the tracer, creating vivid highlights on digital PET scans.</p>",
    date: new Date().toISOString(),
    author: { node: { name: "Henotic Diagnostics Clinical Team" } },
    categories: { nodes: [{ name: "Nuclear Medicine", slug: "nuclear-medicine" }] },
    featuredImage: {
      node: {
        sourceUrl: "https://cdn.henoticdiagnostics.co.in/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp",
        altText: "Digital PET-CT Scanner at Henotic Diagnostics",
      },
    },
  },
  {
    id: "post-3",
    title: "Mid-Pregnancy Anomaly Scan: A Crucial 20-Week Health Check for Expectant Mothers",
    slug: "mid-pregnancy-anomaly-scan-guide",
    excerpt: "An essential clinical guide to Level-2 anomaly sonography, structural fetal evaluations, and international ISUOG imaging standards.",
    content: "<p>The mid-pregnancy anomaly ultrasound (frequently termed Level-2 scan) is conducted between 18 and 22 weeks of pregnancy. This detailed structural evaluation examines every major anatomical system of your developing baby.</p><h3>Key Systems Evaluated</h3><p>Our fetal medicine specialists evaluate the four chambers of the heart, intracranial ventricles, kidneys, spine, limbs, and placental blood flow using high-resolution 3D/4D ultrasound.</p>",
    date: new Date().toISOString(),
    author: { node: { name: "Dr. Ashok Kumar" } },
    categories: { nodes: [{ name: "Ultrasound & Fetal Medicine", slug: "ultrasound" }] },
    featuredImage: {
      node: {
        sourceUrl: "https://cdn.henoticdiagnostics.co.in/Sonography/anomaly-scan-nt-scan-henotic-diagnostics-kharghar.webp",
        altText: "Anomaly Scan Ultrasound Sonography at Henotic Diagnostics",
      },
    },
  },
];

/**
 * Fetches published blog posts from Payload CMS.
 */
async function _getBlogPosts(
  first: number = 12,
  after?: string
): Promise<GetBlogPostsResponse["posts"] | null> {
  try {
    const fetchWithTags = unstable_cache(
      async () => {
        const payloadData = await payloadFind("posts", {
          limit: first,
          sort: "-publishedDate",
          where: { isActive: { equals: true } },
        });

        if (payloadData && payloadData.docs.length > 0) {
          const nodes: BlogPostCard[] = payloadData.docs.map((doc) => {
            const rawImg = doc.featuredImageUrl || (doc.featuredImage as any)?.url || "";
            return {
              id: doc.id,
              title: doc.title,
              slug: doc.slug,
              excerpt: doc.excerpt || "",
              date: doc.publishedDate || doc.createdAt,
              author: { node: { name: doc.author || "Henotic Diagnostics Clinical Team" } },
              categories: {
                nodes: [
                  {
                    name: (doc.category as any)?.name || "Diagnostic Health",
                    slug: (doc.category as any)?.slug || "health",
                  },
                ],
              },
              featuredImage: rawImg
                ? { node: { sourceUrl: rawImg, altText: doc.title } }
                : undefined,
            };
          });

          return {
            pageInfo: {
              hasNextPage: payloadData.hasNextPage,
              endCursor: String(payloadData.page),
            },
            nodes,
          };
        }

        // Return fallback posts if Payload CMS has no posts yet
        return {
          pageInfo: { hasNextPage: false, endCursor: "1" },
          nodes: DEFAULT_POSTS,
        };
      },
      ["payload-posts-list", String(first), after || "start"],
      {
        tags: [CACHE_TAGS.postsList],
        revalidate: 3600,
      }
    );

    return await fetchWithTags();
  } catch (error) {
    console.warn("[Payload CMS] Failed to fetch blog posts:", error);
    return {
      pageInfo: { hasNextPage: false, endCursor: "1" },
      nodes: DEFAULT_POSTS,
    };
  }
}

/**
 * Fetches a single blog post by its slug from Payload CMS.
 */
async function _getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fetchWithTags = unstable_cache(
      async () => {
        const doc = await payloadFindBySlug("posts", slug);
        if (doc) {
          const content = doc.contentHtml || lexicalToHtml(doc.content, doc.excerpt);
          const rawImg = doc.featuredImageUrl || (doc.featuredImage as any)?.url || "";

          return {
            id: doc.id,
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt || "",
            content,
            date: doc.publishedDate || doc.createdAt,
            author: { node: { name: doc.author || "Henotic Diagnostics Clinical Team" } },
            categories: {
              nodes: [
                {
                  name: (doc.category as any)?.name || "Diagnostic Health",
                  slug: (doc.category as any)?.slug || "health",
                },
              ],
            },
            featuredImage: rawImg
              ? { node: { sourceUrl: rawImg, altText: doc.title } }
              : undefined,
          };
        }

        // Check fallback posts
        const defaultPost = DEFAULT_POSTS.find((p) => p.slug === slug);
        return defaultPost || null;
      },
      ["payload-post", slug],
      {
        tags: [CACHE_TAGS.post(slug), CACHE_TAGS.postsList],
        revalidate: 86400,
      }
    );

    return await fetchWithTags();
  } catch (error) {
    console.warn(`[Payload CMS] Failed to fetch post for slug "${slug}":`, error);
    return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
  }
}

export const getBlogPosts = cache(_getBlogPosts);
export const getBlogPost = cache(_getBlogPost);
