import { SERVICE_CATEGORIES } from '../src/config/categories';
import { REGION_NAMES, REGION_LOCATIONS } from '../src/config/locations';
import { services } from '../src/config/services';
import { CONDITIONS } from '../src/config/conditions';

function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(w => {
      const upper = w.toUpperCase();
      if (['MRI', 'CT', 'PET', 'USG', 'ECG', 'TMT', 'DEXA', 'CBC', 'DNA', 'RNA', 'NGS', 'NIPT', 'NIPS', 'HSG', 'SSG', 'BMD', 'ICU', 'ALS', 'BLS', 'KUB', 'PNS', 'HRCT', 'MRCP', 'DTPA', 'MAG3', 'FDG', 'PSMA', 'DOTA', 'FAPI', 'DVT', 'BPP', 'NT', '2D', '3D', 'GFR'].includes(upper)) {
        return upper;
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/henotic-payload';
  console.log('🌱 Connecting to MongoDB at:', uri);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mongodb = (await import('mongodb')) as any;
  const client = new mongodb.MongoClient(uri);
  await client.connect();
  const db = client.db();
  const now = new Date().toISOString();

  // 1. Seed Locations
  console.log('\n📍 1. Seeding Locations...');
  const locationsCol = db.collection('locations');
  const locationSlugToId = new Map<string, unknown>();

  const allLocationSlugs = new Set<string>();
  for (const locs of Object.values(REGION_LOCATIONS)) {
    for (const loc of locs) allLocationSlugs.add(loc);
  }

  for (const slug of allLocationSlugs) {
    const name = formatSlugToTitle(slug);
    await locationsCol.updateOne(
      { slug },
      {
        $set: { name, slug, isActive: true, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    const doc = await locationsCol.findOne({ slug });
    if (doc) locationSlugToId.set(slug, doc._id);
  }
  console.log(`   ✅ Upserted ${locationSlugToId.size} locations`);

  // 2. Seed Regions
  console.log('\n🗺️  2. Seeding Regions...');
  const regionsCol = db.collection('regions');
  const regionSlugToId = new Map<string, unknown>();
  const allRegionIds: unknown[] = [];

  for (const [regionSlug, regionName] of Object.entries(REGION_NAMES)) {
    const locSlugs = REGION_LOCATIONS[regionSlug] || [];
    const locIds = locSlugs.map(s => locationSlugToId.get(s)).filter(Boolean);

    await regionsCol.updateOne(
      { slug: regionSlug },
      {
        $set: {
          name: regionName,
          slug: regionSlug,
          locations: locIds,
          isActive: true,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    const doc = await regionsCol.findOne({ slug: regionSlug });
    if (doc) {
      regionSlugToId.set(regionSlug, doc._id);
      allRegionIds.push(doc._id);
    }
  }
  console.log(`   ✅ Upserted ${regionSlugToId.size} regions`);

  // 3. Seed Categories
  console.log('\n📂 3. Seeding Categories...');
  const categoriesCol = db.collection('categories');
  const categorySlugToId = new Map<string, unknown>();
  const serviceToCategorySlug = new Map<string, string>();

  for (const cat of SERVICE_CATEGORIES) {
    await categoriesCol.updateOne(
      { slug: cat.id },
      {
        $set: {
          name: cat.title,
          slug: cat.id,
          description: cat.description,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    const doc = await categoriesCol.findOne({ slug: cat.id });
    if (doc) categorySlugToId.set(cat.id, doc._id);

    for (const sSlug of cat.services) {
      serviceToCategorySlug.set(sSlug, cat.id);
    }
  }
  const defaultCategoryId = categorySlugToId.values().next().value;
  console.log(`   ✅ Upserted ${categorySlugToId.size} categories`);

  // 4. Seed Services
  console.log('\n🩺 4. Seeding Services...');
  const servicesCol = db.collection('services');
  const serviceSlugToId = new Map<string, unknown>();

  for (const slug of services) {
    const title = formatSlugToTitle(slug);
    const catSlug = serviceToCategorySlug.get(slug);
    const categoryId = (catSlug ? categorySlugToId.get(catSlug) : defaultCategoryId) || defaultCategoryId;

    await servicesCol.updateOne(
      { slug },
      {
        $set: {
          title,
          slug,
          excerpt: `Book ${title} at Henotic Diagnostics with NABL & AERB accredited precision and same-day reporting.`,
          category: categoryId,
          regions: allRegionIds,
          pricing: {
            mrp: 2500,
            sellingPrice: 1500,
            currency: 'INR',
            discountPercentage: 40,
          },
          seo: {
            title: `${title} in Navi Mumbai & Mumbai | Henotic Diagnostics`,
            description: `Get accurate ${title} at Henotic Diagnostics. State-of-the-art 3T MRI, 128-Slice CT & NABL lab with fast reports.`,
          },
          isActive: true,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    const doc = await servicesCol.findOne({ slug });
    if (doc) serviceSlugToId.set(slug, doc._id);
  }
  console.log(`   ✅ Upserted ${serviceSlugToId.size} services`);

  // 5. Seed Conditions
  console.log('\n🧬 5. Seeding Conditions...');
  const conditionsCol = db.collection('conditions');
  let conditionCount = 0;

  for (const cond of CONDITIONS) {
    const relatedIds = (cond.recommendedServices || [])
      .map(s => serviceSlugToId.get(s))
      .filter(Boolean);

    await conditionsCol.updateOne(
      { slug: cond.id },
      {
        $set: {
          title: cond.title,
          slug: cond.id,
          relatedServices: relatedIds,
          seo: {
            title: `${cond.title} Diagnostic Tests & Scans | Henotic Diagnostics`,
            description: cond.description,
            keywords: (cond.symptoms || []).join(', '),
          },
          isActive: true,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    conditionCount++;
  }
  console.log(`   ✅ Upserted ${conditionCount} medical conditions`);

  await client.close();
  console.log('\n🎉 Seeding Complete! Refresh http://localhost:3001/admin to view all records.');
}

main().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
