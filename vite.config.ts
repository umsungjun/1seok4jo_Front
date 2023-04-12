import {defineConfig, loadEnv} from 'vite'
import {createHtmlPlugin} from 'vite-plugin-html'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode}) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            mapClientId: env.VITE_KAKAO_MAP_API_KEY,
          },
        },
      }),
    ],
  }
}
