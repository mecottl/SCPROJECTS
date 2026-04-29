// ⚠️ YA NO usamos astro:assets
// ❌ import type { ImageMetadata } from "astro";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  area: string;
  status: string;
  cover: string; // ✅ ahora es string
  size: "lg" | "md" | "sm";
  description: string[];
  gallery: { src: string; layout: "wide" | "tall" | "full" }[];
};

// 👇 genera rutas automáticamente desde /public
function getGallery(slug: string, total: number) {
  return Array.from({ length: total }, (_, i) => ({
    src: `/proyectos/${slug}/${String(i + 1).padStart(2, "0")}.webp`,
    layout: (
      i % 3 === 0 ? "wide" :
      i % 3 === 1 ? "tall" :
      "full"
    ) as "wide" | "tall" | "full"
  }));
}

function createProject(
  slug: string,
  totalImages: number,
  data: Omit<Project, "cover" | "gallery" | "slug">
): Project {

  const gallery = getGallery(slug, totalImages);

  const cover = gallery[0]?.src;

  if (!cover) {
    throw new Error(`Project "${slug}" needs at least one image in public/proyectos/${slug}`);
  }

  return {
    ...data,
    slug,
    cover,
    gallery
  };
}

export const projects: Project[] = [
  createProject("quinta-montes-molina", 40, {
    title: "Ampliación Quinta Montes Molina",
    category: "Residencial",
    year: "2024",
    location: "Mérida, Yucatán",
    area: "640 m²",
    status: "finalizado",
    size: "lg",
    description: [
      "Obra de alto impacto en Mérida, Yucatán..."
    ],
  }),

  createProject("centro-internacional-congresos", 40, {
    title: "Centro internacional de congresos de Yucatán",
    category: "Cultural",
    year: "2023",
    location: "Mérida, Yucatán",
    area: "1,200 m²",
    status: "Construido",
    size: "md",
    description: [
      "Obra de alto impacto en Mérida, Yucatán. trabajando en conjunto con la empresa lider Como subcontrato de albañilería, acabados y estructura clave. Nuestros alcances fueron de inicio a fin, hasta culminar el proyecto, Construimos con compromiso, administramos con precisión. Calidad, profesionalismo, impacto. SC Projects: Legados de alto impacto."
    ],
  }),
];

export const featuredSlides = projects.slice(0, 4);