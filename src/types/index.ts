export interface RouterType {
  title: string;
  path: string;
  element: React.ReactElement;
}

export interface Thumbnail {
  lqip: string;
  height: number;
  width: number;
  alt_text: string;
}

export interface Artwork {
  id: number;
  title: string;
  artist_title: string | null;
  main_reference_number: string;
  date_display: string;
  place_of_origin: string;
  credit_line: string;
  dimensions: string;
  image_id: string;
  thumbnail: Thumbnail;
  is_public_domain: boolean;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface ArtworksResponse {
  data: Artwork[];
  pagination: Pagination;
}

export interface SearchResponse {
  objectIDs?: number[];
}

export interface ArtworksContextType {
  setArtworks: (data: Artwork[]) => void;
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
}
