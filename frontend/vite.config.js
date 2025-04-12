// // // import path from "path"
// // // import react from "@vitejs/plugin-react"
// // // import { defineConfig } from "vite"
// // // import imagemin from 'vite-plugin-imagemin'

// // // export default defineConfig({
// // //   plugins:[imagetools()][react()],
// // //   resolve: {
// // //     alias: {
// // //       "@": path.resolve(__dirname, "./src"),
// // //     },
// // //   },
// // //   build: {
// // //     target: 'esnext', // Modern JavaScript
// // //     minify: 'terser',  // Minify with Terser
// // //     cssCodeSplit: true, // Split CSS
// // //     sourcemap: false, // Disable sourcemaps in production
// // //     outDir: 'dist', // Output directory
// // //     rollupOptions: {
// // //       output: {
// // //         manualChunks: {
// // //           vendor: ['react', 'react-dom', 'react-router-dom', 'redux'],
// // //         },
// // //       },
// // //     },
// // //   },
// // // })
// // import path from "path"
// // import react from "@vitejs/plugin-react"
// // import { defineConfig } from "vite"
// // import imagemin from 'vite-plugin-imagemin'

// // export default defineConfig({
// //   plugins: [
// //     react(), // Correct usage of the React plugin
// //     imagemin({ // Correct configuration for imagemin plugin
// //       pngquant: { quality: [0.6, 0.8] },
// //       mozjpeg: { quality: 75 },
// //       gifsicle: { optimizationLevel: 3 },
// //     })
// //   ],
// //   resolve: {
// //     alias: {
// //       "@": path.resolve(__dirname, "./src"), // Alias for @ to point to src folder
// //     },
// //   },
// //   build: {
// //     chunkSizeWarningLimit: 800,

// //     target: 'esnext', // Modern JavaScript
// //     minify: 'terser',  // Minify with Terser
// //     cssCodeSplit: true, // Split CSS
// //     sourcemap: false, // Disable sourcemaps in production
// //     outDir: 'dist', // Output directory
// //     rollupOptions: {
// //       output: {
// //         manualChunks: {
// //           'react-icons': ['react-icons'],
// //           vendor: ['react', 'react-dom', 'react-router-dom', 'redux'], // Separate vendor chunks
// //         },
// //       },
// //     },
// //   },
// // })
// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"
// import imagemin from 'vite-plugin-imagemin'

// export default defineConfig({
//   plugins: [
//     react(),
//     imagemin({
//       pngquant: { quality: [0.6, 0.8] },
//       mozjpeg: { quality: 75 },
//       gifsicle: { optimizationLevel: 3 },
//     })
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     }
//   },
//   build: {
//     target: 'esnext',
//     minify: 'terser',
//     cssCodeSplit: true,
//     sourcemap: true,
//     outDir: 'dist',
//     rollupOptions: {
//       external: ['react-icons'],
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'react-router-dom'],
//           icons: ['react-icons']
//         }
//       }
//     }
//   },
//   optimizeDeps: {
//     include: ['react', 'react-dom', 'react-router-dom'],
//     exclude: ['react-icons']
//   }
// })
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      pngquant: { quality: [0.6, 0.8] },
      mozjpeg: { quality: 75 },
      gifsicle: { optimizationLevel: 3 },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: true,
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'react-icons': ['react-icons/fa'],
          'router': ['react-router-dom'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
})
