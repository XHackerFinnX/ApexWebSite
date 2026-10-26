-- Existing members keep access; new public registrations are created after OTP.
ALTER TABLE customers ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;
UPDATE customers SET email_verified_at=created_at WHERE email_verified_at IS NULL;
CREATE TABLE security_counters (
    key TEXT NOT NULL, bucket BIGINT NOT NULL, count INTEGER NOT NULL DEFAULT 1,
    expires_at TIMESTAMPTZ NOT NULL, PRIMARY KEY(key,bucket)
);
CREATE INDEX security_counters_expiry ON security_counters(expires_at);
CREATE TABLE captcha_challenges (
    id UUID PRIMARY KEY,
    purpose TEXT NOT NULL CHECK(purpose IN ('register','login','reset','checkout')),
    binding TEXT NOT NULL, context TEXT NOT NULL, answer_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0, proof_hash TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), expires_at TIMESTAMPTZ NOT NULL,
    verified_at TIMESTAMPTZ, consumed_at TIMESTAMPTZ
);
CREATE INDEX captcha_challenges_expiry ON captcha_challenges(expires_at);
CREATE TABLE pending_registrations (
    email TEXT PRIMARY KEY, id UUID NOT NULL UNIQUE, name TEXT NOT NULL,
    password_hash TEXT NOT NULL, code_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX pending_registrations_expiry ON pending_registrations(expires_at);
CREATE TABLE password_reset_tokens (
    token_hash TEXT PRIMARY KEY, id UUID NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ
);
CREATE INDEX password_reset_expiry ON password_reset_tokens(expires_at);
CREATE TABLE email_outbox (
    id UUID PRIMARY KEY, context_id UUID NOT NULL,
    kind TEXT NOT NULL CHECK(kind IN ('registration','password_reset')),
    payload_encrypted TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','running','done','expired')),
    attempts INTEGER NOT NULL DEFAULT 0,
    due_at TIMESTAMPTZ NOT NULL DEFAULT now(), expires_at TIMESTAMPTZ NOT NULL,
    locked_at TIMESTAMPTZ, lease_id UUID, last_error TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX email_outbox_due ON email_outbox(state,due_at);
