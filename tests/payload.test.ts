import { describe, it, expect, vi } from 'vitest';
import { lexicalToHtml, getService } from '@/lib/payload/services';
import { getBlogPost, getBlogPosts } from '@/lib/payload/posts';

describe('Payload CMS Integration', () => {
  describe('lexicalToHtml', () => {
    it('converts lexical rich text JSON nodes into HTML paragraphs', () => {
      const lexicalJson = {
        root: {
          children: [
            {
              children: [{ text: 'Advanced 3.0T MRI at Henotic Diagnostics.' }],
            },
            {
              children: [{ text: 'Accurate clinical diagnostics across India.' }],
            },
          ],
        },
      };

      const html = lexicalToHtml(lexicalJson);
      expect(html).toContain('<p>Advanced 3.0T MRI at Henotic Diagnostics.</p>');
      expect(html).toContain('<p>Accurate clinical diagnostics across India.</p>');
    });

    it('returns raw string if already HTML', () => {
      const input = '<p>Custom HTML body</p>';
      expect(lexicalToHtml(input)).toBe(input);
    });

    it('uses fallback excerpt when content is empty', () => {
      expect(lexicalToHtml(null, 'Clinical diagnostic test summary')).toBe(
        '<p>Clinical diagnostic test summary</p>'
      );
    });
  });

  describe('getService', () => {
    it('returns clinical fallback data when CMS is offline', async () => {
      const service = await getService('mri-scan');
      expect(service).not.toBeNull();
      expect(service?.title).toBe('MRI Scan');
      expect(service?.slug).toBe('mri-scan');
      expect(service?.content).toContain('Henotic Diagnostics');
    });

    it('formats title correctly from hyphenated slug', async () => {
      const service = await getService('pet-ct-scan');
      expect(service?.title).toBe('PET-CT Scan');
      expect(service?.slug).toBe('pet-ct-scan');
    });
  });

  describe('getBlogPost and getBlogPosts', () => {
    it('returns blog posts list with default posts when CMS is offline', async () => {
      const response = await getBlogPosts(5);
      expect(response).not.toBeNull();
      expect(response?.nodes.length).toBeGreaterThan(0);
      expect(response?.nodes[0].slug).toBe('understanding-3t-mri-scans');
    });

    it('returns a single blog post by slug with clinical content', async () => {
      const post = await getBlogPost('understanding-3t-mri-scans');
      expect(post).not.toBeNull();
      expect(post?.title).toContain('3.0T MRI');
      expect(post?.slug).toBe('understanding-3t-mri-scans');
      expect(post?.content).toContain('Tesla');
    });

    it('returns null for an unknown post slug', async () => {
      const post = await getBlogPost('non-existent-blog-post-slug-xyz');
      expect(post).toBeNull();
    });
  });
});
