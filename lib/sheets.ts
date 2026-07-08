// Fetch and parse project data from Google Sheets CSV

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTRGq6AFwFg97waY-C_NlvpSE7E6aJArMvnlxBQ6MwklZSqkn3sgnpsBFWH5Fie4HBcAMkekLPLhBKc/pub?gid=2096772918&single=true&output=csv";

export interface SheetProject {
  order: number;
  section: string;
  title: string;
  youtubeUrl: string;
  videoId: string;
  published: boolean;
}

/**
 * Extract a YouTube video ID from various URL formats:
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
function extractVideoId(url: string): string {
  try {
    // youtu.be short links
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return shortMatch[1];

    // youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return shortsMatch[1];

    // youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];

    return "";
  } catch {
    return "";
  }
}

/**
 * Parse a CSV line, handling quoted fields that may contain commas.
 */
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

/**
 * Fetch projects from the published Google Sheet CSV.
 * Returns only published projects, sorted by order.
 */
export async function fetchProjects(): Promise<SheetProject[]> {
  const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet data: ${res.status}`);
  }

  const text = await res.text();
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  // Skip header row
  const dataLines = lines.slice(1);

  const projects: SheetProject[] = dataLines
    .map((line) => {
      const fields = parseCSVLine(line);
      // Expected columns: order, section, title, youtubeUrl, published
      const [orderStr, section, title, youtubeUrl, publishedStr] = fields;

      return {
        order: parseInt(orderStr, 10),
        section: section?.toLowerCase().trim() ?? "",
        title: title?.trim() ?? "",
        youtubeUrl: youtubeUrl?.trim() ?? "",
        videoId: extractVideoId(youtubeUrl?.trim() ?? ""),
        published: publishedStr?.trim().toUpperCase() === "TRUE",
      };
    })
    .filter((p) => p.published && p.videoId !== "")
    .sort((a, b) => a.order - b.order);

  return projects;
}

/**
 * Group projects by section for the UI.
 */
export function groupProjects(projects: SheetProject[]) {
  return {
    motion: projects.filter((p) => p.section === "motion"),
    documentary: projects.filter((p) => p.section === "documentary"),
    short: projects.filter((p) => p.section === "short"),
  };
}
