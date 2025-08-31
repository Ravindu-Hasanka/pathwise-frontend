import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a professional resume writer and designer. Create a polished, ATS-friendly, and visually appealing resume using the following candidate data:

Candidate Data:
${JSON.stringify(resumeData, null, 2)}

Requirements:
1. Output in clean text with styles
2. Layout: two-column design
   - Left column: Personal Info, Skills, Education
   - Right column: Professional Summary, Work Experience, Projects
3. Styling:
   - Font: Calibri or Arial, professional and readable
   - Colors: Navy blue (#1a237e) for headings, dark gray (#333) for text, subtle dividers in light gray (#ddd)
   - Headings: bold, 18pt, navy blue
   - Candidate name at the top: bold, 28pt
   - Use bullet points for work achievements, starting with strong action verbs
   - Group skills logically (Technical, Soft Skills, Certifications)
4. Readability:
   - Ensure enough white space between sections
   - Maintain ATS compatibility (avoid text in images or complex graphics)
5. Output format: HTML only, using inline CSS for colors, fonts, and spacing. Do not include any markdown or other tags.
`;


    const result = await model.generateContent(prompt);

    return NextResponse.json({
      resume: result.response.text(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
