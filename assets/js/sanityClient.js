// sanityClient.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'oja7rnse', // Replace with your project ID
  dataset: 'production1',
  useCdn: true,
  apiVersion: '2025-06-09', // Use the current date
});
