// sanityClient.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'oja7rnse', // Replace with your project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-05-30', // Use the current date
});
