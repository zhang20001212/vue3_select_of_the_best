import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用@代替./src
      },
    },
    // Scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
  };
});
