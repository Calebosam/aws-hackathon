CREATE DATABASE lizodb;

CREATE TABLE documents(
    document_uid UUID NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    download_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(
    user_uid UUID NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(125) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(25) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    document_uid UUID UNIQUE REFERENCES documents(document_uid),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* Constraints */
ALTER TABLE users ADD CONSTRAINT role_constraint CHECK(role='admin' or role='user');

/*Extensions*/
/* CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; */
-- Use: uuid_generate_v4()