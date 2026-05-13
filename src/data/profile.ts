export const chapters = [
  {
    number: 1,
    period: "Sep 2011 – Feb 2014",
    company: "Crifa CIA. Ltda.",
    location: "Quito, Ecuador",
    role: "Developer",
    questTitle: "The Apprentice's First Scroll",
    bullets: [
      "Built a full bar administration system: recipe management, multi-level inventory control, and unit transformation logic (e.g., one bottle = 12 shot glasses), enabling real-time cost tracking and stock visibility.",
      "Designed and developed a movie theater management platform: film cataloging, schedule administration, online payment, multi-format access (mobile, desktop, self-service kiosk), and an interactive room mapping module powering numbered seat selection.",
    ],
    tags: ["PHP", "MySQL", "Web Development"],
  },
  {
    number: 2,
    period: "Feb 2014 – Dec 2017",
    company: "PPM",
    location: "Quito, Ecuador",
    role: "Senior Developer",
    questTitle: "The Loyalty Trials",
    bullets: [
      "Achieved a 90% reduction in query response time on a high-frequency banking reporting module by replacing date-range timestamp comparisons with string-based substring matching — eliminating an index bypass that made the indexed column ineffective.",
      "Designed, implemented, and maintained loyalty programs for banking, insurance, and e-commerce clients, supporting high-volume customer transaction processing.",
      "Designed relational database schemas for multiple client platforms, ensuring normalization, query efficiency, and long-term maintainability.",
    ],
    tags: ["PHP", "MySQL", "PostgreSQL", "Banking", "Insurance", "eCommerce"],
  },
  {
    number: 3,
    period: "Dec 2017 – Mar 2020",
    company: "PPM",
    location: "Quito, Ecuador",
    role: "Chief Developer",
    questTitle: "Rise of the Warlord",
    teamSize: 18,
    bullets: [
      "Scaled an 18-person engineering organization by restructuring into rotating 4-person cells — each led by a rotating team lead — distributing decision-making authority and creating leadership opportunities for every engineer.",
      "Implemented Agile methodology across a previously ad-hoc development process, improving delivery predictability and cross-team coordination across multiple concurrent client projects.",
      "Resolved a critical data processing bottleneck for a banking client: replaced PHP-based large CSV ingestion with MySQL LOAD DATA INFILE combined with stored procedures and triggers, enabling reliable processing of banking files previously impossible to handle at scale.",
      "Owned software architecture design, time estimation, talent allocation, and client relationship management across all active projects.",
    ],
    tags: ["PHP", "MySQL", "Agile", "Team Leadership", "Banking", "Architecture"],
  },
  {
    number: 4,
    period: "Mar 2020 – Oct 2020",
    company: "Skypostal",
    location: "Remote · Miami, USA",
    role: "Senior Developer",
    questTitle: "The Distant Realm",
    bullets: [
      "Designed and implemented a reports module surfacing real-time performance indicators for logistics service providers, giving operations teams direct visibility into service-level metrics.",
      "Executed external system integrations and maintained existing local systems.",
    ],
    tags: ["PHP", "MySQL", "Logistics", "Remote"],
  },
  {
    number: 5,
    period: "Oct 2020 – Oct 2021",
    company: "Trade Systems",
    location: "Quito, Ecuador",
    role: "Team Lead – Senior Developer",
    questTitle: "The Trade Fortress",
    teamSize: 5,
    bullets: [
      "Led a 5-person backend team through full product delivery cycles, from technical design to client handoff, across new product implementations and external system integrations.",
      "Managed client relationships directly, translating business requirements into technical roadmaps and communicating sprint progress to non-technical stakeholders.",
      "Onboarded and trained new team members through structured onboarding and pair programming sessions.",
    ],
    tags: ["PHP", "MySQL", "Team Leadership", "Client Management"],
  },
  {
    number: 6,
    period: "Nov 2021 – Present",
    company: "Ballast Lane Applications",
    location: "Remote · Boston, USA",
    role: "Senior Backend Developer",
    questTitle: "The Ballast Seas",
    bullets: [
      "Contributing to the AI-assisted migration of a legacy monolith onto an event-driven CQRS architecture — DynamoDB as the write source-of-truth with AWS Lambda triggers synchronizing state to PostgreSQL read models, enabling optimized query performance across list, search, and reporting operations.",
      "Delivered software architecture design, new product implementation, and continuous development across financial, pharmaceutical, and real estate client platforms.",
      "Integrated third-party services — Auth0, HubSpot, Twilio, SendGrid, Contentful — across multiple client platforms.",
      "Drove 100% AI-accelerated development workflow using Cursor IDE and agentic tooling across the full development lifecycle.",
      "Deployed and maintained microservices on Kubernetes, leveraging SQS and RabbitMQ for resilient asynchronous messaging.",
    ],
    tags: ["TypeScript", "Node.js", "NestJS", "CQRS", "DynamoDB", "PostgreSQL", "AWS Lambda", "Kubernetes", "Cursor IDE"],
  },
];

export type SkillTier = "EXPERT" | "PROFICIENT" | "FAMILIAR";

export interface Skill {
  name: string;
  tier: SkillTier;
  spellName: string;
  iconIndex: number; // 0-based index in the 5×3 sprite grid
}

export const skills: Skill[] = [
  // Expert
  { name: "TypeScript", tier: "EXPERT",    spellName: "Strict Binding Rune",         iconIndex: 2  },
  { name: "MySQL",      tier: "EXPERT",    spellName: "Grand Tome of Relational Order", iconIndex: 0 },
  { name: "PHP",        tier: "EXPERT",    spellName: "Lightning Codex",               iconIndex: 1 },
  { name: "C# / .NET",  tier: "EXPERT",    spellName: "Imperial Framework",            iconIndex: 4  },
  // Proficient
  { name: "PostgreSQL",    tier: "PROFICIENT", spellName: "Crystal Chronicle",           iconIndex: 3  },
  { name: "Node.js / NestJS", tier: "PROFICIENT", spellName: "Swiftscript Citadel",     iconIndex: 5  },
  { name: "MongoDB",       tier: "PROFICIENT", spellName: "Shapeshifter Archive",        iconIndex: 6  },
  { name: "CQRS + Lambda", tier: "PROFICIENT", spellName: "The Split Realm Protocol",   iconIndex: 7  },
  { name: "Kubernetes",    tier: "PROFICIENT", spellName: "Legion Deployment",           iconIndex: 8  },
  { name: "GraphQL",       tier: "PROFICIENT", spellName: "Query Familiar",              iconIndex: 9  },
  { name: "RabbitMQ / SQS", tier: "PROFICIENT", spellName: "Messenger Raven Protocol", iconIndex: 10 },
  { name: "MCP / Anthropic API", tier: "PROFICIENT", spellName: "Grimoire Binding",     iconIndex: 13 },
  // Familiar
  { name: "AWS",           tier: "FAMILIAR",   spellName: "Cloud Citadel",              iconIndex: 11 },
  { name: "Apache TinkerPop", tier: "FAMILIAR", spellName: "Web of Connections",        iconIndex: 12 },
  { name: "Cursor IDE",    tier: "FAMILIAR",   spellName: "Arcane Cursor",               iconIndex: 14 },
];

export const projects = [
  {
    name: "knowledge-mcp",
    questName: "The Grimoire of Agent Knowledge",
    description:
      "Open-source MCP server enabling AI coding agents to maintain structured knowledge bases across projects. Ships 9 tools covering design, generation, search, and planning. Integrates Anthropic Claude API and local Ollama models.",
    tags: ["TypeScript", "MCP", "Anthropic API", "Ollama", "Node.js"],
    github: "https://github.com/wisemancer/knowledge-mcp",
  },
  {
    name: "Amazon Data Integration",
    questName: "The Merchant Pipeline",
    description:
      "End-to-end e-commerce product data integration: NestJS service pulling from Rainforest API, populating MongoDB, and pushing structured records to a client platform via batch API. Rewrote the sync layer in C# .NET 8 with multi-threaded parallel batch workers, cursor-based fault-tolerant resumption, and thread-safe auth token caching via SemaphoreSlim.",
    tags: ["NestJS", "TypeScript", "C#", ".NET 8", "MongoDB", "Docker", "Rainforest API", "Parallel processing"],
    github: "https://github.com/wisemancer",
  },
];

export const achievements = [
  {
    title: "ACM ICPC South America",
    questName: "Ancient Tournament of Algorithms",
    description: "Honorable Mention · Latin America's premier algorithmic programming competition",
    years: ["Bogotá, Nov 2007", "Bogotá, Oct 2009"],
    icon: "🏆",
  },
  {
    title: "AWS Cloud Practitioner",
    questName: "Cloud Citadel Mastery Seal",
    description: "Amazon Web Services certified",
    years: ["November 2024"],
    icon: "☁️",
  },
];

export const interests = [
  { name: "Mountains",          lore: "The Andes are home. Cotopaxi never gets old."          },
  { name: "Pottery",            lore: "Throwing clay teaches patience the compiler cannot."    },
  { name: "Photography",        lore: "d.lightmancer — light captured in a single frame."     },
  { name: "Specialty Coffee",   lore: "The alchemist's mana potion. Filtrado V60, caturra honey."  },
  { name: "Magic: The Gathering", lore: "Every deck is an architecture decision."             },
];

// Numbered 1 (bottom/base) → 6 (Cotopaxi temple): career climbs the mountain
export const mapMarkers = [
  { id: 1, label: "Ch. 1",  top: "84%", left: "82%", chapter: 0 },  // Crifa
  { id: 2, label: "Ch. 2",  top: "80%", left: "23%", chapter: 1 },  // PPM Senior
  { id: 3, label: "Ch. 3",  top: "50%", left: "83%", chapter: 2 },  // PPM Chief
  { id: 4, label: "Ch. 4",  top: "52%", left: "34%", chapter: 3 },  // Skypostal
  { id: 5, label: "Ch. 5",  top: "31%", left: "22%", chapter: 4 },  // Trade Systems
  { id: 6, label: "Ch. 6",  top: "28%", left: "66%", chapter: 5 },  // Ballast Lane — Cotopaxi temple
];

// Hidden 7th marker: MTG easter egg. Invisible — discovered by hovering near the shrine.
export const hiddenShrineMarker = { top: "15%", left: "74%" };
