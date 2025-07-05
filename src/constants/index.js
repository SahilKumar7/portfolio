import {
  gamedev,
  backend,
  art,
  frontend,
  javascript,
  typescript,
  reactjs,
  nextjs,
  tailwind,
  python,
  fastapi,
  nodejs,
  postgresql,
  mongodb,
  git,
  docker,
  jenkins,
  aws,
  redis,
  linux,
  jest,
  pytest,
  unity,
  godot,
  blender,
  krita,
  amdocs,
  tvshowsearch,
  spaceblaster,
  spacebrawl,
  proTrackr,
  uc
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Game Developer",
    icon: gamedev,
  },
  {
    title: "3D & Pixel Artist",
    icon: art,
  },
];

const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React",
    icon: reactjs,
  },
  {
    name: "Next.js",
    icon: nextjs,
  },
  {
    name: "Tailwind",
    icon: tailwind,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "FastAPI",
    icon: fastapi,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Jenkins",
    icon: jenkins,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "Redis",
    icon: redis,
  },
  {
    name: "Linux",
    icon: linux,
  },
  {
    name: "Jest",
    icon: jest,
  },
  {
    name: "Pytest",
    icon: pytest,
  },
  {
    name: "Unity",
    icon: unity,
  },
  {
    name: "Godot",
    icon: godot,
  },
  {
    name: "Blender",
    icon: blender,
  },
  {
    name: "Krita",
    icon: krita,
  },
];

const experiences = [
  {
    title: "Software Developer",
    company_name: "Amdocs",
    icon: amdocs,
    iconBg: "#E6DEDD",
    date: "Aug 2023 - Present",
    points: [
      "Led design and development of a large-scale responsive web application using React 18, migrating a legacy Java Swing desktop app to browser-based access for 50+ internal users",
      "Built reusable React component library (React Hook Form, TanStack Table) and implemented React Query for server state management, reducing new feature development time by 60% and API calls by 35%",
      "Built interactive data visualization using React Flow and Recharts, reducing configuration errors by 25%",
      "Designed and implemented scalable backend services using Python FastAPI with JWT authentication and Redis caching, reducing API response time by 40% and database queries by 35%",
      "Migrated 150+ database entities from Java/Hibernate to SQLAlchemy 2.0 with async operations; created OpenAPI/Swagger documentation reducing frontend integration time by 50%",
      "Set up CI/CD pipeline with Jenkins and Docker, reducing deployment time from 4 hours to 20 minutes; wrote unit and integration tests achieving 80%+ code coverage",
    ],
  },
];


const projects = [
  {
    name: "Estate Explorer",
    description:
      "A dynamic real estate platform that enables users to buy, sell, and rent properties while providing an intuitive interface for seamless property listings and inquiries.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "expressjs",
        color: "pink-text-gradient",
      },
    ],
    image: uc,
    source_code_link: "",
  },{
    name: "ProTrackr",
    description:
      "A web app solution that allows users to efficiently track and manage project progress, tasks and deadlines.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "expressjs",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: proTrackr,
    source_code_link: "https://xyz.github.io/ProTrackr/",
  },
  {
    name: "Space Brawl",
    description:
      "A captivating space-themed platformer that challenges players to navigate an alien ship, gather crucial resources, and outsmart foes in a pixel art universe.",
    tags: [
      {
        name: "C#",
        color: "blue-text-gradient",
      },
      {
        name: "Unity",
        color: "green-text-gradient",
      },
      {
        name: "WebGL",
        color: "pink-text-gradient",
      },
    ],
    image: spacebrawl,
    source_code_link: "https://sahil-kumar.itch.io/space-brawl",
  },
  {
    name: "Space Blaster",
    description:
      "A fast-paced multi-directional shooting game where players navigate through space, battling enemies and dodging asteroids in a thrilling quest for survival.",
    tags: [
      {
        name: "C#",
        color: "blue-text-gradient",
      },
      {
        name: "Unity",
        color: "green-text-gradient",
      },
      {
        name: "WebGL",
        color: "pink-text-gradient",
      },
    ],
    image: spaceblaster,
    source_code_link: "https://sahil-kumar.itch.io/space-blaster",
  },
  {
    name: "TV Show Search",
    description:
      "An intuitive TV show and movie search platform that enables users to discover, explore, and track their favorite entertainment titles effortlessly.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "axios",
        color: "green-text-gradient",
      },
      {
        name: "bulma",
        color: "pink-text-gradient",
      },
    ],
    image: tvshowsearch,
    source_code_link: "https://xyz.github.io/TV-Show-Search/",
  },
];

export { services, technologies, experiences, projects };
