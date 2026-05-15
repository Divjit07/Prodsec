const ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormPayload = Record<string, string | number | boolean | string[] | undefined | null>;

export async function submitWeb3Form(body: Web3FormPayload) {
  const access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!access_key) {
    throw new Error(
      "Add a free Web3Forms key in .env as VITE_WEB3FORMS_ACCESS_KEY (see .env.example).",
    );
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key, ...body }),
  });
  const data: { success?: boolean; message?: string } = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Could not send your message. Please try again.");
  }
}
