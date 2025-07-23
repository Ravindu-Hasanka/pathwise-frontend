'use client';

import VapiWidget from "@/components/ui/agent";
import Agent from "@/components/ui/agent";
import React from "react";
import Navbar from "@/components/ui/navbar";

const InterviewPage = () => {
  return (
    <>
      <Navbar currentPage="interview" />
      <div>
        <VapiWidget
          apiKey={process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ""}
          assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ""}
          interviewPosition="Senior Frontend Developer"
          userName="John Doe"
        />
      </div>
    </>
  );
}

export default InterviewPage;