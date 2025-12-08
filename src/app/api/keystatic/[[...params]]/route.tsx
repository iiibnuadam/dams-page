import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

const clientId =
  process.env.KEYSTATIC_GITHUB_CLIENT_ID ||
  process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
const secret = process.env.KEYSTATIC_SECRET;

if (!clientId || !clientSecret || !secret) {
  console.error("⚠️ Keystatic Config Missing ⚠️");
  console.error("ClientId:", clientId ? "Set" : "Missing");
  console.error("ClientSecret:", clientSecret ? "Set" : "Missing");
  console.error("Secret:", secret ? "Set" : "Missing");
}

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: clientId || "",
  clientSecret: clientSecret || "",
  secret: secret || "",
});
