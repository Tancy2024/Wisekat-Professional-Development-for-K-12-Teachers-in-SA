"use client";

import React, { useState } from "react";
import axios from "axios";

const TextSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const summarizeText = async () => {
    if (!inputText) return;
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/summary/generate`, {
        text: inputText,
        style: "concise",
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Summarization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Text Summarizer</h2>
      <p className="text-gray-600 mb-6">
        Summarize long text into key points with one click.
      </p>

      <div className="space-y-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={8}
          placeholder="Enter or paste text here..."
          className="w-full border p-2 rounded-md"
        />
        <button
          onClick={summarizeText}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
        {summary && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Summary</h3>
            <p className="border p-4 bg-gray-50 rounded-md whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSummarizer;