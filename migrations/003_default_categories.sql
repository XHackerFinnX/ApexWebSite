INSERT INTO categories(name,slug)
SELECT seed.name, seed.slug
FROM (VALUES ('Худи','hoodies'),('Куртки','jackets'),('Футболки','tees')) AS seed(name,slug)
WHERE NOT EXISTS (SELECT 1 FROM categories c WHERE c.name=seed.name OR c.slug=seed.slug)
ON CONFLICT (slug) DO UPDATE SET name=excluded.name;
