"""
Alembic env.py — synchronous engine for migrations

* Auto-converts async DATABASE_URL (sqlite+aiosqlite / postgresql+asyncpg)
  to its sync counterpart so Alembic runs without MissingGreenlet.
"""

from __future__ import annotations

import sys
from pathlib import Path
from logging.config import fileConfig

from alembic import context
from sqlalchemy import create_engine, pool

# ────────────────── project import setup ──────────────────
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

from app.db import DATABASE_URL, Base
from app import models  # noqa: F401  (ensure all models are imported)

# ────────────────── make a **sync** URL ────────────────────
SYNC_DATABASE_URL = (
    DATABASE_URL
    .replace("sqlite+aiosqlite", "sqlite")
    .replace("postgresql+asyncpg", "postgresql")
)

engine = create_engine(SYNC_DATABASE_URL, future=True, poolclass=pool.NullPool)

# ────────────────── Alembic config ─────────────────────────
fileConfig(context.config.config_file_name)
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Generate SQL without a live DB connection (offline)."""
    context.configure(
        url=SYNC_DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations with a live synchronous connection."""
    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
