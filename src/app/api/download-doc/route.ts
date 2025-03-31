import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type")

  // Determine which documentation to generate
  const url =
  type === "technical"
    ? "http://localhost:3000/documentation/technique"
    : "http://localhost:3000/documentation/utilisateur";


  const filename =
    type === "technical" ? "documentation-technique-stagedirect.pdf" : "documentation-utilisateur-stagedirect.pdf"

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    // Navigate to the documentation page
    await page.goto(url, { waitUntil: "networkidle2" })

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    })

    await browser.close()

    // Return the PDF as a response
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

