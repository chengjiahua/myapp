import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: {
      // http://localhost:3000/api -> http://localhost:3000/api
      // http://localhost:3000/api/foo -> http://localhost:3000/api/foo
      "/v1": "http://127.0.0.1:8080",
    },
  },
});
