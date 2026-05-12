-- Master DB initialization
-- This creates the tenants table for the SaaS platform

CREATE DATABASE IF NOT EXISTS school_saas_master;
USE school_saas_master;

-- Grant broad privileges so the app can CREATE tenant databases at runtime
GRANT ALL PRIVILEGES ON *.* TO 'saas_admin'@'%';
FLUSH PRIVILEGES;
