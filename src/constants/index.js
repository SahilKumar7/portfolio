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

const techCategories = [
  { id: "frontend", name: "Frontend", color: "#38bdf8" },
  { id: "backend", name: "Backend", color: "#a855f7" },
  { id: "devops", name: "DevOps & Tools", color: "#fb7185" },
  { id: "creative", name: "Game Dev & Art", color: "#f59e0b" },
];

const technologies = [
  { name: "JavaScript", icon: javascript, category: "frontend" },
  { name: "TypeScript", icon: typescript, category: "frontend" },
  { name: "React", icon: reactjs, category: "frontend" },
  { name: "Next.js", icon: nextjs, category: "frontend" },
  { name: "Tailwind", icon: tailwind, category: "frontend" },
  { name: "Python", icon: python, category: "backend" },
  { name: "FastAPI", icon: fastapi, category: "backend" },
  { name: "Node.js", icon: nodejs, category: "backend" },
  { name: "PostgreSQL", icon: postgresql, category: "backend" },
  { name: "MongoDB", icon: mongodb, category: "backend" },
  { name: "Git", icon: git, category: "devops" },
  { name: "Docker", icon: docker, category: "devops" },
  { name: "Jenkins", icon: jenkins, category: "devops" },
  { name: "AWS", icon: aws, category: "devops" },
  { name: "Redis", icon: redis, category: "devops" },
  { name: "Linux", icon: linux, category: "devops" },
  { name: "Jest", icon: jest, category: "devops" },
  { name: "Pytest", icon: pytest, category: "devops" },
  { name: "Unity", icon: unity, category: "creative" },
  { name: "Godot", icon: godot, category: "creative" },
  { name: "Blender", icon: blender, category: "creative" },
  { name: "Krita", icon: krita, category: "creative" },
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
      "A full-stack project management app for tracking tasks, deadlines, and team progress with real-time updates and a responsive dashboard.",
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
      "A TV show discovery app built with Vue 3 and Vuetify. Features debounced search suggestions, recent search history, keyboard navigation, and request cancellation — powered by the TVmaze API.",
    tags: [
      {
        name: "vue",
        color: "blue-text-gradient",
      },
      {
        name: "vuetify",
        color: "green-text-gradient",
      },
      {
        name: "pinia",
        color: "pink-text-gradient",
      },
    ],
    image: tvshowsearch,
    source_code_link: "https://xyz.github.io/TV-Show-Search/",
  },
];

export { services, technologies, techCategories, experiences, projects };
