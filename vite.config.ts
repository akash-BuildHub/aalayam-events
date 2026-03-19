import path from "path";
import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plugins: [
		// mocha plugins removed — project is standalone
		react(),
		// Enable Cloudflare plugin only if the referenced wrangler config exists locally
		...(function () {
			const workerConfigPath = path.resolve(__dirname, "emails-service/wrangler.json");
			if (fs.existsSync(workerConfigPath)) {
				return [
					cloudflare({
						auxiliaryWorkers: [{ configPath: workerConfigPath }],
					}),
				];
			}
			return [];
		})(),
	],
	  server: {
	    allowedHosts: true,
	  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
