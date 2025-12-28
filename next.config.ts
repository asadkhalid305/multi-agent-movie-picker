/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Conditional basePath Configuration for Subdirectory Deployment
   *
   * This configuration supports both local/educational use AND production deployment
   * under a subdirectory path using environment variables.
   *
   * Local Development & Learning (Default):
   * - No basePath is applied by default
   * - Access the app at: http://localhost:3000
   * - Perfect for workshops, tutorials, and learning multi-agent systems
   *
   * Production Deployment (Environment-Based):
   * - Set NEXT_PUBLIC_BASE_PATH=/apps/streamwise-ai in Vercel
   * - Primary domain: https://www.asadullahkhalid.com
   * - App accessible at: https://www.asadullahkhalid.com/apps/streamwise-ai
   *
   * How Production Setup Works:
   * - Portfolio site rewrites /apps/streamwise-ai → multi-agent-movie-picker.vercel.app
   * - Environment variable triggers basePath, ensuring all assets (JS, CSS) are correctly prefixed
   * - No impact on learners cloning the repo
   *
   * To Deploy with basePath:
   * - Add environment variable in your deployment platform: NEXT_PUBLIC_BASE_PATH=/apps/streamwise-ai
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  ...(process.env.NEXT_PUBLIC_BASE_PATH && {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  }),
};

export default nextConfig;
