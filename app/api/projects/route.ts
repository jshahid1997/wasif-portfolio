import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const GOOGLE_SHEET_CSV_URL =
  process.env.GOOGLE_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTRGq6AFwFg97waY-C_NlvpSE7E6aJArMvnlxBQ6MwklZSqkn3sgnpsBFWH5Fie4HBcAMkekLPLhBKc/pub?gid=2096772918&single=true&output=csv";

type SheetRow = {
  order: string;
  section: string;
  title: string;
  youtubeUrl: string;
  published: string;
};

type Project = {
  id: number;
  title: string;
  url: string;
  videoId: string;
};

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(csv: string): SheetRow[] {
  const lines = csv
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);

    return headers.reduce((row, header, index) => {
      row[header as keyof SheetRow] = values[index] || "";
      return row;
    }, {} as SheetRow);
  });
}

function extractYouTubeId(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "");
    }

    if (parsedUrl.pathname.includes("/shorts/")) {
      return parsedUrl.pathname.split("/shorts/")[1]?.split("?")[0] || "";
    }

    if (parsedUrl.pathname.includes("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1]?.split("?")[0] || "";
    }

    return parsedUrl.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

function toProject(row: SheetRow, index: number): Project {
  return {
    id: Number(row.order) || index + 1,
    title: row.title,
    url: row.youtubeUrl,
    videoId: extractYouTubeId(row.youtubeUrl),
  };
}

export async function GET() {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Google Sheet responded with ${response.status}`);
    }

    const csv = await response.text();
    const rows = parseCsv(csv)
      .filter((row) => row.published.toLowerCase() === "true")
      .filter((row) => row.title && row.youtubeUrl)
      .sort((a, b) => Number(a.order) - Number(b.order));

    return NextResponse.json({
      motionDesignProjects: rows
        .filter((row) => row.section.toLowerCase() === "motion")
        .map(toProject),
      documentaryStyleProjects: rows
        .filter((row) => row.section.toLowerCase() === "documentary")
        .map(toProject),
      shortFormProjects: rows
        .filter((row) => row.section.toLowerCase() === "short")
        .map(toProject),
    });
  } catch (error) {
    console.error("Failed to fetch portfolio projects", error);

    return NextResponse.json(
      {
        motionDesignProjects: [],
        documentaryStyleProjects: [],
        shortFormProjects: [],
      },
      { status: 500 }
    );
  }
}
