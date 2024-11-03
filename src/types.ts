export interface BookCustomization {
  id: string;
  asin: string;
  custom_title: string | null;
  custom_description: string | null;
  custom_image_url: string | null;
  custom_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface AmazonBook {
  ASIN: string;
  DetailPageURL: string;
  ItemInfo: {
    Title: {
      DisplayValue: string;
    };
    Description?: string;
    ByLineInfo?: {
      Contributors?: Array<{
        Name: string;
        Role: string;
      }>;
    };
  };
  Images?: {
    Primary: {
      Large: {
        URL: string;
      };
    };
  };
  Offers?: {
    Listings?: Array<{
      Price: {
        DisplayAmount: string;
      };
    }>;
  };
}

export interface SearchResults {
  SearchResult: {
    Items: AmazonBook[];
  };
}