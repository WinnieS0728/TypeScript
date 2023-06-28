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
      "@data": resolve("src/data"),
      "@reducers": resolve("src/data/reducers"),
      "@actions": resolve("src/data/actions"),
      "@api": resolve("src/lib/api"),
      "@hooks": resolve("src/hooks"),
      "@layouts": resolve("src/layouts"),
      "@buttons": resolve("src/components/UI/buttons"),
      "types": resolve("src/types"),
    },
  },
});
