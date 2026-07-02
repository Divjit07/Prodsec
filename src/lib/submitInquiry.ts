import { getSupabase } from "./supabase";

export type InquiryType = "contact" | "quote" | "career";

export type InquiryInput = {
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  payload?: Record<string, unknown>;
};

/** Saves a website inquiry to Supabase. Email alerts are sent by a database webhook + Edge Function. */
export async function submitInquiry(input: InquiryInput) {
  const supabase = getSupabase();

  const { error } = await supabase.from("inquiries").insert({
    type: input.type,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    subject: input.subject?.trim() || null,
    message: input.message.trim(),
    payload: input.payload ?? {},
  });

  if (error) {
    throw new Error(error.message || "Could not send your message. Please try again.");
  }
}
