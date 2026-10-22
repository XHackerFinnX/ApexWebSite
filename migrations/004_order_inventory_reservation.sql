-- Old orders never reserved stock; their refunds must not add stock again.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS inventory_reserved BOOLEAN NOT NULL DEFAULT false;
