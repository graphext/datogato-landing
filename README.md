# Gatodato · Landing SEO IA

Landing page desarrollada con Next.js (App Router) y Tailwind CSS 4.1. El proyecto replica la estética vintage del póster de lanzamiento y está optimizado para SEO enfocado en visibilidad dentro de motores de inteligencia artificial.

## Stack
- Next.js 16 con TypeScript
- Tailwind CSS 4.1 + diseño personalizado Gatodato
- Bun como package manager y runtime
- API Route para recepción de leads (`/api/contact`)

## Comandos

```bash
bun install    # Instala dependencias
bun dev        # Levanta entorno local en http://localhost:3000
bun run lint   # Ejecuta ESLint
bun run build  # Compila para producción (requerido antes de desplegar)
```

## Personalización
- Contenido centralizado en `src/lib/content.ts`.
- Secciones bajo `src/sections/` y gráficos SVG en `src/components/graphics/`.
- Colores y estilos globales en `src/app/globals.css`.
- Assets estáticos (póster original) en `public/assets/`.
- Documentación de referencia en `data/sidn.es-wizard-config-2025-10-23.json`.

## SEO
- Metadata principal en `src/app/layout.tsx`.
- `robots.txt` y `sitemap.xml` generados vía `src/app/robots.ts` y `src/app/sitemap.ts`.
- Script JSON-LD (Organization + Offer) inyectado en el layout.

## Despliegue en Vercel
1. Ejecuta `bun run build` para validar la build.
2. Conecta el repositorio en Vercel (raíz del repo actual).
3. Variables de entorno opcionales: ninguna requerida actualmente.

Para integrar con un CRM o servicio de email, edita `src/app/api/contact/route.ts` y reemplaza el `console.info` por la lógica deseada.
