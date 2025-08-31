'use client';

import VapiWidget from "@/components/ui/agent";
import React from "react";

const InterviewPage = () => {
    return (
        <div>
            <VapiWidget
                apiKey={process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ""}
                assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ""}
                interviewPosition="Senior Frontend Developer"
                userName="John Doe"
            />
        </div>
    );
}

export default InterviewPage;