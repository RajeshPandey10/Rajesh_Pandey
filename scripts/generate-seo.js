import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate enhanced sitemap.xml
const generateSitemap = () => {
  const baseUrl = "https://rajeshpandey10.com.np";
  const currentDate = new Date().toISOString();

  const pages = [
    { url: "/", changefreq: "daily", priority: "1.0", lastmod: currentDate },
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

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  pages.forEach((page) => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

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

// Generate enhanced robots.txt
const generateRobotsTxt = () => {
  return `# Robots.txt for Rajesh Pandey Portfolio
# Enhanced for better SEO crawling

User-agent: *
Allow: /

# Allow major search engines
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

# Disallow sensitive areas
Disallow: /admin/
Disallow: /api/
Disallow: /.env
Disallow: /node_modules/

# Allow media files
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.pdf

# Sitemap location
Sitemap: https://rajeshpandey10.com.np/sitemap.xml

# Crawl delay
Crawl-delay: 1
Revisit-after: 7 days`;
};

// Main function to generate SEO files
const generateSEOFiles = () => {
  try {
    const publicDir = path.join(__dirname, "..", "public");

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate sitemap.xml
    const sitemap = generateSitemap();
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
    console.log("✅ Generated sitemap.xml");

    // Generate robots.txt
    const robotsTxt = generateRobotsTxt();
    fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
    console.log("✅ Generated robots.txt");

    // Create .htaccess for Apache (if needed)
    const htaccess = `# Apache configuration for Rajesh Pandey Portfolio
RewriteEngine On

# Redirect HTTP to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>`;

    fs.writeFileSync(path.join(publicDir, ".htaccess"), htaccess);
    console.log("✅ Generated .htaccess");

    console.log("\n🎉 SEO files generated successfully!");
    console.log("📊 Next steps:");
    console.log("1. Submit sitemap to Google Search Console");
    console.log(
      "2. Verify robots.txt at https://rajeshpandey10.com.np/robots.txt"
    );
    console.log("3. Test structured data with Google Rich Results Test");
    console.log('4. Monitor rankings for "Rajesh Pandey" keywords');
  } catch (error) {
    console.error("❌ Error generating SEO files:", error);
    process.exit(1);
  }
};

// Run the generator
generateSEOFiles();
