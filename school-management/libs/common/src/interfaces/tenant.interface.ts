export interface ITenant {
  id: string;
  name: string;
  slug: string;
  domain: string;
  dbName: string;
  status: string;
  plan: string;
}

export interface ITenantContext {
  tenantId: string;
  tenantSlug: string;
  dbName: string;
}
