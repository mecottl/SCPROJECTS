import type { ImageMetadata } from "astro";

const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/proyectos/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  { eager: true }
);

const fallbackImages = Object.entries(projectImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, value]) => value.default);

function getGallery(slug: string): ImageMetadata[] {
  return Object.entries(projectImages)
    .filter(([path]) => path.includes(`/proyectos/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value.default);
}

function createProject(slug: string, data: Omit<Project, "cover" | "gallery" | "slug">): Project {
  const projectGallery = getGallery(slug);
  const gallery = projectGallery.length > 0 ? projectGallery : fallbackImages.slice(0, 1);
  const cover = gallery[0];

  if (!cover) {
    throw new Error(`Project "${slug}" needs at least one image in src/assets/proyectos/${slug}`);
  }

  return {
    ...data,
    slug,
    cover,
    gallery: gallery.map((img, i) => ({
      src: img,
      layout: i % 3 === 0 ? "wide" : i % 3 === 1 ? "tall" : "full"
    })),
  };
}

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  area: string;
  status: string;
  cover: ImageMetadata;
  size: "lg" | "md" | "sm";
  description: string[];
  gallery: { src: ImageMetadata; layout: "wide" | "tall" | "full" }[];
};

export const projects: Project[] = [
  createProject("quinta-montes-molina", {
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
  createProject("centro-internacional-congresos", {
    title: "Centro internacional de congresos de Yucatán",
    category: "Cultural",
    year: "2023",
    location: "Mérida, Yucatán",
    area: "1,200 m²",
    status: "Construido",
    size: "md",
    description: ["Obra de alto impacto en Mérida, Yucatán. trabajando en conjunto con la empresa lider Como subcontrato de albañilería, acabados y estructura clave. Nuestros alcances fueron de inicio a fin, hasta culminar el proyecto, Construimos con compromiso, administramos con precisión. Calidad, profesionalismo, impacto. SC Projects: Legados de alto impacto."],
  }),
];

export const featuredSlides = projects.slice(0, 4);
