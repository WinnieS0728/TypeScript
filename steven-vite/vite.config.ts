import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function resolve(dir: string) {
  return path.join(__dirname, "/", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve("src"),
      "@styles": resolve("src/assets/styles"),
      "@pages": resolve("src/pages"),
      "@components": resolve("src/components"),
      "@layouts": resolve("src/layouts"),
      "@img": resolve("src/assets/images"),
      "@practice": resolve("src/practice"),
      types: resolve("src/types"),
    },
  },
});
