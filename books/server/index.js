const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Temporary trending books endpoint with sample data
app.get('/api/trending', async (req, res) => {
  const trendingBooks = [
    {
      ASIN: "1",
      DetailPageURL: "#",
      ItemInfo: {
        Title: { DisplayValue: "Iron Flame" },
        ByLineInfo: { Contributors: [{ Name: "Rebecca Yarros", Role: "Author" }] }
      },
      Images: {
        Primary: {
          Large: { URL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800&h=1200" }
        }
      }
    },
    {
      ASIN: "2",
      DetailPageURL: "#",
      ItemInfo: {
        Title: { DisplayValue: "Fourth Wing" },
        ByLineInfo: { Contributors: [{ Name: "Rebecca Yarros", Role: "Author" }] }
      },
      Images: {
        Primary: {
          Large: { URL: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800&h=1200" }
        }
      }
    },
    {
      ASIN: "3",
      DetailPageURL: "#",
      ItemInfo: {
        Title: { DisplayValue: "Tomorrow, and Tomorrow, and Tomorrow" },
        ByLineInfo: { Contributors: [{ Name: "Gabrielle Zevin", Role: "Author" }] }
      },
      Images: {
        Primary: {
          Large: { URL: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800&h=1200" }
        }
      }
    }
  ];

  res.json({ SearchResult: { Items: trendingBooks } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});