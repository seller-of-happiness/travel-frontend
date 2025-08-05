export interface Photo {
  id: string;
  originalUrl: string;
  previewUrl: string;
  webpUrl: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  prevRouteId: string;
  nextRouteId: string;
  cover: Photo;
}

export interface Point {
  description: string;
  id: string;
  lat: number;
  lng: number;
  name: string;
  photos: Array<{
    previewUrl: string;
    webpUrl: string;
  }>;
}

export interface ArticleDetail {
  id: string;
  title: string;
  description: string;
  prevRouteId: string;
  nextRouteId: string;
  images: string[];
  points: Array<Point>;
}
