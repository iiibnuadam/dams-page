import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractLocalizedData<T = unknown>(data: unknown, lang: "en" | "id"): T {
  if (!data) return data as T;

  // If the data is an object with 'en' and 'id' keys, return the specific language version
  if (typeof data === "object" && data !== null && "en" in data && "id" in data) {
    return (data as Record<string, unknown>)[lang] as T;
  }

  // If it's an array, map through it
  if (Array.isArray(data)) {
    return data.map((item) => extractLocalizedData(item, lang)) as unknown as T;
  }

  // If it's an object (but not the localized container), recurse through values
  if (typeof data === "object" && data !== null) {
    const result: Record<string, unknown> = {};
    for (const key in data) {
      result[key] = extractLocalizedData((data as Record<string, unknown>)[key], lang);
    }
    return result as unknown as T;
  }

  return data as T;
}
