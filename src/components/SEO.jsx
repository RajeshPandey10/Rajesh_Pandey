import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({
  title = "Rajesh Pandey | Full Stack Web Developer Nepal | MERN Stack Expert | Portfolio 2025",
  description = "Rajesh Pandey - Leading Full Stack Web Developer from Nepal. Expert in MERN Stack, React.js, Node.js, JavaScript. Computer Engineering student with 3+ years experience. Professional web development services in Kathmandu, Nepal. Contact Rajesh Pandey for modern web solutions.",
  keywords = "Rajesh Pandey, Rajesh Pandey Nepal, Rajesh Pandey Developer, Rajesh Pandey Web Developer, Rajesh Pandey Full Stack Developer, Rajesh Pandey MERN Stack, Rajesh Pandey React Developer, Rajesh Pandey Node.js Developer, Rajesh Pandey JavaScript Developer, Rajesh Pandey Software Engineer, Rajesh Pandey Portfolio, Rajesh Pandey GitHub, Rajesh Pandey LinkedIn, Rajesh Pandey CV, Rajesh Pandey Resume, rajesh pandey nuwakot, rajesh pandey covosys, rajesh pandey lunar it, Full Stack Developer Nepal, MERN Stack Developer Nepal, React Developer Nepal, Node.js Developer Nepal, Web Developer Kathmandu, Software Engineer Kathmandu, Computer Engineer Nepal, JavaScript Developer Nepal, MongoDB Developer Nepal, Express.js Developer Nepal, Frontend Developer Nepal, Backend Developer Nepal, Freelance Developer Nepal, Web Development Services Nepal, rajeshpandey10.com.np, rajeshpandey10",
  image = "https://rajeshpandey10.com.np/assets/rajesh-pandey-profile.jpg",
  url = "https://rajeshpandey10.com.np",
  type = "website",
  structuredData = null,
  page = null,
  breadcrumbs = null,
  canonicalUrl = null,
  author = "Rajesh Pandey",
}) => {
  const siteTitle = "Rajesh Pandey | Full Stack Web Developer Nepal";
  const fullTitle = title.includes("Rajesh Pandey")
    ? title
    : `${title} | ${siteTitle}`;
  const finalUrl = canonicalUrl || url;

  // Enhanced structured data for Rajesh Pandey with better SEO
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rajesh Pandey",
    alternateName: [
      "Rajesh Pandey Nepal",
      "Rajesh Pandey Developer",
      "Rajesh Pandey Web Developer",
      "Rajesh Pandey Full Stack Developer",
      "Rajesh Pandey MERN Stack",
      "rajeshpandey10",
      "Rajesh Pandey Software Engineer",
    ],
    description:
      "Professional Full Stack Web Developer and Computer Engineering Student from Nepal specializing in MERN Stack development",
    url: "https://rajeshpandey10.com.np",
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
      caption: "Rajesh Pandey - Full Stack Web Developer from Nepal",
    },
    sameAs: [
      "https://github.com/rajeshpandey10",
      "https://linkedin.com/in/rajeshpandey10",
      "https://twitter.com/rajeshpandey",
      "https://instagram.com/rajeshpandey",
      "https://facebook.com/rajeshpandey",
    ],
    jobTitle: "Full Stack Web Developer",
    worksFor: [
      {
        "@type": "Organization",
        name: "Covosys",
        url: "https://covosys.com",
      },
      {
        "@type": "Organization",
        name: "Lunar IT",
        url: "https://lunarit.com.np",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Computer Engineering College",
      address: {
        "@type": "PostalAddress",
        addressCountry: "Nepal",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "Nepal",
    },
    email: "imrajesh2005@gmail.com",
    telephone: "+977-9841208969",
    birthPlace: {
      "@type": "Place",
      name: "Nuwakot",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nuwakot",
        addressCountry: "Nepal",
      },
    },
    knowsAbout: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "JavaScript",
      "Python",
      "Full Stack Development",
      "Web Development",
      "MERN Stack",
      "Software Engineering",
      "Database Design",
      "RESTful APIs",
      "Git",
      "GitHub",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      description: "Full Stack Web Developer specializing in MERN Stack",
      occupationLocation: {
        "@type": "Country",
        name: "Nepal",
      },
      skills: "React.js, Node.js, MongoDB, Express.js, JavaScript, Python",
    },
    award: [
      "Dean's List",
      "Programming Competition Winner",
      "Science Fair Participant",
    ],
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rajesh Pandey Portfolio",
    alternateName: [
      "Rajesh Pandey Official Website",
      "Rajesh Pandey Developer Portfolio",
    ],
    url: "https://rajeshpandey10.com.np",
    description:
      "Official portfolio website of Rajesh Pandey - Full Stack Web Developer from Nepal",
    author: {
      "@type": "Person",
      name: "Rajesh Pandey",
    },
    creator: {
      "@type": "Person",
      name: "Rajesh Pandey",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rajeshpandey10.com.np/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@id": "https://rajeshpandey10.com.np/#person",
    },
  };

  // Professional service structured data
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rajesh Pandey Web Development Services",
    description:
      "Professional web development services including MERN stack development, React.js applications, and full-stack solutions by Rajesh Pandey",
    provider: {
      "@type": "Person",
      name: "Rajesh Pandey",
      url: "https://rajeshpandey10.com.np",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Nepal",
      },
      {
        "@type": "Place",
        name: "Global",
      },
    ],
    serviceType: "Web Development",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services by Rajesh Pandey",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Development",
            description:
              "Complete web application development using MERN Stack",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "React.js Development",
            description: "Modern React.js application development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Node.js Backend Development",
            description: "Scalable backend API development with Node.js",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MongoDB Database Design",
            description: "NoSQL database design and optimization",
          },
        },
      ],
    },
  };

  // Page-specific structured data
  const pageStructuredData = page
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: fullTitle,
        description: description,
        url: finalUrl,
        isPartOf: {
          "@type": "WebSite",
          name: "Rajesh Pandey Portfolio",
          url: "https://rajeshpandey10.com.np",
        },
        about: {
          "@type": "Person",
          name: "Rajesh Pandey",
        },
        author: {
          "@type": "Person",
          name: "Rajesh Pandey",
        },
        dateModified: new Date().toISOString(),
        inLanguage: "en-US",
      }
    : null;

  // Breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      }
    : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={finalUrl} />

      {/* Enhanced SEO Meta Tags */}
      <meta name="subject" content="Full Stack Web Developer Portfolio" />
      <meta
        name="topic"
        content="Web Development, MERN Stack, React.js, Node.js"
      />
      <meta
        name="summary"
        content="Rajesh Pandey - Professional Full Stack Web Developer from Nepal"
      />
      <meta
        name="classification"
        content="Technology, Web Development, Portfolio"
      />
      <meta name="designer" content="Rajesh Pandey" />
      <meta name="owner" content="Rajesh Pandey" />
      <meta name="url" content={finalUrl} />
      <meta name="identifier-URL" content={finalUrl} />
      <meta name="category" content="Web Development" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />

      {/* Geographic SEO */}
      <meta name="geo.region" content="NP-3" />
      <meta name="geo.placename" content="Kathmandu, Nepal" />
      <meta name="geo.position" content="27.7172;85.3240" />
      <meta name="ICBM" content="27.7172, 85.3240" />

      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="language" content="English" />

      {/* Open Graph Enhanced */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Rajesh Pandey - Full Stack Web Developer"
      />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Rajesh Pandey Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Professional Networks */}
      <meta property="profile:first_name" content="Rajesh" />
      <meta property="profile:last_name" content="Pandey" />
      <meta property="profile:username" content="rajeshpandey10" />

      {/* Twitter Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rajeshpandey" />
      <meta name="twitter:creator" content="@rajeshpandey" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Rajesh Pandey - Full Stack Web Developer"
      />

      {/* Additional Social Meta */}
      <meta property="article:author" content="Rajesh Pandey" />
      <meta
        property="article:publisher"
        content="https://rajeshpandey10.com.np"
      />

      {/* Verification */}
      <meta name="google-site-verification" content="googlec0e6b63fcec91321" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(serviceStructuredData)}
      </script>

      {pageStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(pageStructuredData)}
        </script>
      )}

      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  structuredData: PropTypes.object,
  page: PropTypes.string,
  breadcrumbs: PropTypes.array,
  canonicalUrl: PropTypes.string,
  author: PropTypes.string,
};

export default SEO;

// SEO utility functions for Rajesh Pandey portfolio
export const generatePageSEO = (page) => {
  const pageTitles = {
    home: "Rajesh Pandey - Full Stack Web Developer | MERN Stack Expert Nepal | Computer Engineer",
    about:
      "About Rajesh Pandey - Full Stack Developer from Nepal | Computer Engineering Student",
    skills:
      "Rajesh Pandey Skills - MERN Stack, React.js, Node.js, MongoDB | Technical Expertise",
    portfolio:
      "Rajesh Pandey Portfolio - Web Development Projects | MERN Stack Applications",
    experience:
      "Rajesh Pandey Experience - Covosys, Lunar IT | Professional Journey",
    contact:
      "Contact Rajesh Pandey - Hire Full Stack Developer Nepal | Web Development Services",
  };

  const pageDescriptions = {
    home: "Rajesh Pandey - Professional Full Stack Web Developer from Nepal. MERN Stack Expert, React.js Developer, Computer Engineering Student. Available for freelance projects. Contact for web development services.",
    about:
      "Learn about Rajesh Pandey - Full Stack Web Developer from Nuwakot, Nepal. Computer Engineering student with 2+ years experience in MERN Stack development. Currently working at Covosys and Lunar IT.",
    skills:
      "Explore Rajesh Pandey's technical skills: React.js (90%), Node.js (85%), MongoDB (80%), JavaScript (95%), Python (85%). MERN Stack expertise with modern web development technologies.",
    portfolio:
      "View Rajesh Pandey's web development portfolio. MERN Stack projects, React.js applications, Node.js backends. Real-world projects showcasing full-stack development skills.",
    experience:
      "Rajesh Pandey's professional experience: Associate Backend Developer at Covosys, MERN Stack Intern at Lunar IT. Computer Engineering student with hands-on industry experience.",
    contact:
      "Contact Rajesh Pandey for web development services. Full Stack Developer available for MERN Stack projects, React.js applications, Node.js backends. Based in Kathmandu, Nepal.",
  };

  const pageKeywords = {
    home: "Rajesh Pandey, Rajesh Pandey Nepal, Full Stack Developer Nepal, MERN Stack Expert, React Developer Nepal, Node.js Developer, Computer Engineer Nepal",
    about:
      "Rajesh Pandey About, Rajesh Pandey Background, Rajesh Pandey Biography, Nepal Developer Story, Computer Engineering Student Nepal",
    skills:
      "Rajesh Pandey Skills, React.js Expert Nepal, Node.js Developer, MongoDB Expert, JavaScript Developer Nepal, MERN Stack Skills",
    portfolio:
      "Rajesh Pandey Portfolio, Rajesh Pandey Projects, MERN Stack Projects Nepal, React.js Applications, Web Development Portfolio Nepal",
    experience:
      "Rajesh Pandey Experience, Covosys Developer, Lunar IT Intern, Backend Developer Nepal, MERN Stack Experience",
    contact:
      "Contact Rajesh Pandey, Hire Rajesh Pandey, Full Stack Developer for Hire Nepal, Web Development Services Nepal",
  };

  const defaultTitle = `Rajesh Pandey - ${
    page.charAt(0).toUpperCase() + page.slice(1)
  } | Full Stack Developer Nepal`;
  const defaultDescription = `Rajesh Pandey ${page} page. Professional Full Stack Web Developer from Nepal specializing in MERN Stack development.`;
  const defaultKeywords = `Rajesh Pandey ${page}, Rajesh Pandey Nepal, Full Stack Developer Nepal, MERN Stack Expert`;

  return {
    title: pageTitles[page.toLowerCase()] || defaultTitle,
    description: pageDescriptions[page.toLowerCase()] || defaultDescription,
    keywords: pageKeywords[page.toLowerCase()] || defaultKeywords,
    page: page,
    breadcrumbs: [
      { name: "Home", url: "https://rajeshpandey10.com.np/" },
      {
        name: page.charAt(0).toUpperCase() + page.slice(1),
        url: `https://rajeshpandey10.com.np/${page.toLowerCase()}`,
      },
    ],
  };
};

export const generateProjectSEO = (project) => {
  const projectName = project.title || "Project";

  const title = `${projectName} - Rajesh Pandey Portfolio | MERN Stack Project`;

  const description = project.description
    ? `${project.description.slice(
        0,
        120
      )}... Full Stack project by Rajesh Pandey using MERN Stack technologies.`
    : `${projectName} - Web development project by Rajesh Pandey. Built with MERN Stack (MongoDB, Express.js, React.js, Node.js).`;

  const keywords = [
    `${projectName} Rajesh Pandey`,
    "Rajesh Pandey Projects",
    "MERN Stack Projects Nepal",
    "React.js Projects",
    "Node.js Applications",
    "Full Stack Development Nepal",
    project.technologies?.join(", ") || "",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title,
    description,
    keywords,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: projectName,
      description: project.description,
      author: {
        "@type": "Person",
        name: "Rajesh Pandey",
      },
      url: project.demoLink,
      image: project.image,
      dateCreated: project.createdAt,
      programmingLanguage: project.technologies || [
        "JavaScript",
        "React.js",
        "Node.js",
      ],
    },
  };
};
