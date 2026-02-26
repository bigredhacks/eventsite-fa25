const optionsCache = new Map<string, Promise<string[]>>();

function parseLine(line: string): string {
  const trimmed = line.trim().replace(/^\uFEFF/, "");
  if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
    return trimmed.slice(1, -1).replace(/""/g, "\"").trim();
  }
  return trimmed;
}

function parseCsvOptions(csvText: string): string[] {
  const options = csvText
    .split(/\r?\n/)
    .map(parseLine)
    .filter(Boolean)
    .filter((value) => !value.startsWith("#"))
    .filter((value) => value.toLowerCase() !== "school")
    .filter((value) => !value.toLowerCase().startsWith("below is a list of all schools"));

  return [...new Set(options)];
}

async function fetchCsvOptions(url: string): Promise<string[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load CSV options from ${url}`);
  }

  const csvText = await response.text();
  return parseCsvOptions(csvText);
}

export function loadCsvOptions(url: string): Promise<string[]> {
  const existingPromise = optionsCache.get(url);
  if (existingPromise) {
    return existingPromise;
  }

  const optionsPromise = fetchCsvOptions(url).catch((error) => {
    optionsCache.delete(url);
    throw error;
  });
  optionsCache.set(url, optionsPromise);
  return optionsPromise;
}
