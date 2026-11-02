
export async function POST(request: Request) {
  const backendUrl = process.env.API_INTERNAL_URL;

  if (!backendUrl) {
    console.error("API_INTERNAL_URL is not configured.");
    return Response.json(
      { detail: "Calculation backend is not configured." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(`${backendUrl}/api/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: await request.text(),
      cache: "no-store",
    });

    const responseBody = await response.text();

    return new Response(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Backend proxy error:", error);

    return Response.json(
      { detail: "Unable to connect to the calculation backend." },
      { status: 502 }
    );
  }
}
