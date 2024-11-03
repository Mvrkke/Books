export interface Database {
  public: {
    Tables: {
      book_customizations: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          asin: string;
          custom_title: string | null;
          custom_description: string | null;
          custom_image_url: string | null;
          affiliate_link: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          asin: string;
          custom_title?: string | null;
          custom_description?: string | null;
          custom_image_url?: string | null;
          affiliate_link?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          asin?: string;
          custom_title?: string | null;
          custom_description?: string | null;
          custom_image_url?: string | null;
          affiliate_link?: string | null;
        };
      };
    };
  };
}