// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Plugin } from 'vite';

const appVersion = Date.now(); 

function fcFrameMeta(): Plugin {
  return {
    name: 'inject-fc-frame-meta',
    transformIndexHtml(html: string) {
      const config = {
        version: 'next',
        imageUrl: 'ummyho.vercel.app/logo.png',
        button: {
          title: '🚩 Start',
          action: {
            type: 'launch_frame',
            name: 'HelloWorld',
            url: `ummyho.vercel.app/?v=${appVersion}`, 
            splashImageUrl: 'ummyho.vercel.app/logo.png'
          },
        },
      };

      const metaTag = `<meta name="fc:frame" content='${JSON.stringify(config)}'>`;
      return html.replace('</head>', `${metaTag}\n</head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), fcFrameMeta()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  server: {
    port: 3000,
    allowedHosts: [
      'ummyho.vercel.app'
    ],
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': 'frame-ancestors *',
    },
  },
});
