"use client";

import React, { useState } from "react";
import axios from "axios";

const ChatGPTQA = () => {
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const handleChatSubmit = async () => {
    if (!chatPrompt) return;
    setChatLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/chatgpt/chat`, {
        prompt: chatPrompt,
      });
      setChatResponse(res.data.response);
    } catch (err) {
      console.error("ChatGPT error:", err);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Chat with GPT</h2>
      <p className="text-gray-600 mb-6">
        Ask any question and get intelligent responses from GPT.
      </p>

      <div className="space-y-4">
        <textarea
          value={chatPrompt}
          onChange={(e) => setChatPrompt(e.target.value)}
          placeholder="Ask ChatGPT a question..."
          className="w-full p-2 border rounded-md"
          rows={4}
        />
        <button
          onClick={handleChatSubmit}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
          disabled={chatLoading}
        >
          {chatLoading ? "Thinking..." : "Submit"}
        </button>
        {chatResponse && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Response:</h3>
            <p className="border p-4 bg-gray-50 rounded-md whitespace-pre-wrap">{chatResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatGPTQA;
