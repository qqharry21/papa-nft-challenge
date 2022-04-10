/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'cdn.sanity.io', 'cdn.hackernoon.com'],
  },
  env: {
    SANITY_API_TOKEN:
      'sk0sY9KwhwfheDN0NCME7KPP33bFlVAXiZwabX3hIgO4SoIw2GmUDXv6ffSCgkbRAkXpbR5Yld00zlardHwoykiEym6tfbasZKnYVoDfdQJyF2suxUz84Q5FhmwJrVrXqKoqwDcBMTrwxQF9gNzUBjtQDZdastOugfAeleMkEx3Nx1aocZ9M',
  },
};

module.exports = nextConfig;
