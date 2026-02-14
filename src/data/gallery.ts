import galleryData from "./gallery.json";

export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export interface GalleryData {
  categories: GalleryCategory[];
}

export const gallery = galleryData as GalleryData;
