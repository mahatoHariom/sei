#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    -- Check if 'sei_institute' database exists, create if not
    SELECT 'CREATE DATABASE sei_institute'
    WHERE NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'sei_institute'
    )\gexec;

    -- Check if 'mahato' database exists, create if not
    SELECT 'CREATE DATABASE mahato'
    WHERE NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'mahato'
    )\gexec;

    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE sei_institute TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE mahato TO $POSTGRES_USER;
EOSQL
