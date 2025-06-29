import fs from "fs";
import path from "path";

// Enhanced sitemap generator for better SEO
const generateSitemap = () => {
  const baseUrl = "https://rajeshpandey10.com.np";
  const currentDate = new Date().toISOString();

  // Define all pages with their priorities and update frequencies
  const pages = [
    {
      url: "/",
      changefreq: "daily",
      priority: "1.0",
      lastmod: currentDate,
    },
    {
      url: "/about",
      changefreq: "weekly",
      priority: "0.9",
      lastmod: currentDate,
    },
    {
      url: "/portfolio",
      changefreq: "weekly",
      priority: "0.9",
      lastmod: currentDate,
    },
    {
      url: "/contact",
      changefreq: "monthly",
      priority: "0.8",
      lastmod: currentDate,
    },
    {
      url: "/services",
      changefreq: "weekly",
      priority: "0.9",
      lastmod: currentDate,
    },
    {
      url: "/rajesh-pandey",
      changefreq: "monthly",
      priority: "0.8",
      lastmod: currentDate,
    },
  ];

  // Generate XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

  pages.forEach((page) => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

    // Add images for main pages
    if (page.url === "/") {
      sitemap += `
    <image:image>
      <image:loc>${baseUrl}/assets/mymainphoto.png</image:loc>
      <image:title>Rajesh Pandey - Full Stack Web Developer</image:title>
      <image:caption>Professional photo of Rajesh Pandey, Full Stack Web Developer from Nepal</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/assets/my2photo.jpeg</image:loc>
      <image:title>Rajesh Pandey Profile Picture</image:title>
      <image:caption>Rajesh Pandey - MERN Stack Developer and Computer Engineering Student</image:caption>
    </image:image>`;
    }

    sitemap += `
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};

// Generate robots.txt
const generateRobotsTxt = () => {
  const baseUrl = "https://rajeshpandey10.com.np";

  return `# Robots.txt for Rajesh Pandey Portfolio
# Enhanced for better SEO crawling

User-agent: *
Allow: /

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /.env
Disallow: /package.json
Disallow: /package-lock.json
Disallow: /node_modules/

# Disallow low-value pages
Disallow: /404
Disallow: /error
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?source=*

# Allow CSS and JS files
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.webp
Allow: /*.svg
Allow: /*.pdf

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (be respectful)
Crawl-delay: 1

# Cache directive
# Visit weekly for updated content
Revisit-after: 7 days`;
};

// Generate structured data for different page types
const generateStructuredData = (pageType) => {
  const baseUrl = "https://rajeshpandey10.com.np";

  const commonPerson = {
    "@type": "Person",
    name: "Rajesh Pandey",
    url: baseUrl,
    image: `${baseUrl}/assets/mymainphoto.png`,
    jobTitle: "Full Stack Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "Nepal",
    },
    email: "imrajesh2005@gmail.com",
    sameAs: [
      "https://github.com/rajeshpandey10",
      "https://linkedin.com/in/rajeshpandey10",
      "https://facebook.com/rajeshpandey10",
      "https://instagram.com/rajeshpandey10",
    ],
  };

  switch (pageType) {
    case "homepage":
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            ...commonPerson,
            description:
              "Rajesh Pandey is a Full Stack Web Developer from Nepal specializing in MERN Stack development with 3+ years of experience.",
            knowsAbout: [
              "React.js",
              "Node.js",
              "MongoDB",
              "Express.js",
              "JavaScript",
              "Full Stack Development",
              "Web Development",
              "MERN Stack",
            ],
          },
          {
            "@type": "WebSite",
            name: "Rajesh Pandey Portfolio",
            url: baseUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
        ],
      };

    case "services":
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Full Stack Web Development Services",
        provider: commonPerson,
        description:
          "Professional web development services including MERN stack development, React.js applications, and custom web solutions.",
        serviceType: "Web Development",
        areaServed: {
          "@type": "Country",
          name: "Nepal",
        },
        offers: [
          {
            "@type": "Offer",
            name: "Full Stack Development",
            description: "Complete MERN stack applications",
            price: "500-2000",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "React.js Development",
            description: "Modern React applications",
            price: "300-800",
            priceCurrency: "USD",
          },
        ],
      };

    default:
      return commonPerson;
  }
};

// Export functions for use in build scripts
export { generateSitemap, generateRobotsTxt, generateStructuredData };
