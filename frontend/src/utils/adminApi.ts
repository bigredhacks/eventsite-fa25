import { supabase } from "../config/supabase";

export interface AdminRegistration {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  status: "pending" | "accepted" | "waitlisted" | "rejected";
  checked_in: boolean;
  checked_in_at: string | null;
  university: string | null;
  major: string | null;
  gender: string | null;
  dietary_restrictions: string | null;
  shirt_size: string | null;
  graduation_year: number | null;
  level_of_study: string | null;
  phone_number: string | null;
  age: number | null;
  created_at: string;
}

export interface AdminStats {
  total: number;
  by_status: Record<string, number>;
  checked_in: number;
  by_university: Record<string, number>;
  by_level_of_study: Record<string, number>;
  by_dietary_restrictions: Record<string, number>;
  by_graduation_year: Record<string, number>;
  by_gender: Record<string, number>;
}

export interface RegistrationListResponse {
  data: AdminRegistration[];
  total: number;
  page: number;
  limit: number;
}

async function authHeader(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  return { Authorization: `Bearer ${session.access_token}` };
}

export async function fetchRegistrations(params: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<RegistrationListResponse> {
  const headers = await authHeader();
  const qs = new URLSearchParams();
  if (params.status) qs.set("status", params.status);
  if (params.search) qs.set("search", params.search);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const res = await fetch(`/api/admin/registrations?${qs}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchStats(): Promise<AdminStats> {
  const headers = await authHeader();
  const res = await fetch("/api/admin/stats", { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateStatus(
  id: number,
  status: AdminRegistration["status"]
): Promise<AdminRegistration> {
  const headers = await authHeader();
  const res = await fetch(`/api/admin/registrations/${id}/status`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function toggleCheckin(
  id: number,
  checked_in: boolean
): Promise<AdminRegistration> {
  const headers = await authHeader();
  const res = await fetch(`/api/admin/registrations/${id}/checkin`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ checked_in }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function searchCheckin(q: string): Promise<AdminRegistration[]> {
  const headers = await authHeader();
  const res = await fetch(`/api/admin/checkin/search?q=${encodeURIComponent(q)}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function exportData(format: "json" | "csv"): Promise<void> {
  const headers = await authHeader();
  const res = await fetch(`/api/admin/export?format=${format}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = format === "csv" ? "registrations.csv" : "registrations.json";
  a.click();
  URL.revokeObjectURL(url);
}
