CREATE USER adonis with encrypted password 'postgres';
CREATE DATABASE "control-bill";
GRANT ALL PRIVILEGES ON DATABASE "control-bill" TO postgres;