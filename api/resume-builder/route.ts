import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a professional resume writer. Using the following details, create a polished, 
      ATS-friendly resume. Format with clear sections (Summary, Experience, Education, Skills, Projects).
      
      User Resume Data:
      ${JSON.stringify(resumeData, null, 2)}

      Return the result as well-structured plain text (no markdown).
    `;

    const result = await model.generateContent(prompt);

    return NextResponse.json({
      resume: result.response.text(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
