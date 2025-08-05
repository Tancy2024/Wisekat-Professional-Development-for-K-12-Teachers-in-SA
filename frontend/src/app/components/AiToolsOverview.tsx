"use client";

import React, { useRef, useState } from "react";
import axios from "axios";

const tools = [
  {
    title: "Image Generator",
    description: "Need visual aids fast? Create custom images for any lesson topic instantly",
    icon: "/icons/image.png",
  },
  {
    title: "Text Summarizer",
    description: "Overwhelmed by research papers? Extract key insights in seconds",
    icon: "/icons/summarize.png",
  },
  {
    title: "Audio Transcriber",
    description: "Tired of manual note-taking? Turn lectures and meetings into searchable text",
    icon: "/icons/audio.png",
  },
  {
    title: "Chat with GPT",
    description: "Need teaching ideas? Get instant lesson plans, activities, and answers",
    icon: "/icons/chat.png",
  },
];

const AiToolsOverview: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showSummarizer, setShowSummarizer] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [showChatGPT, setShowChatGPT] = useState(false);

  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const [chatPrompt, setChatPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [transcription, setTranscription] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const handleToolClick = (toolTitle: string) => {
    setShowSummarizer(toolTitle === "Text Summarizer");
    setShowImageGenerator(toolTitle === "Image Generator");
    setShowChatGPT(toolTitle === "Chat with GPT");
    setShowUpload(toolTitle === "Audio Transcriber");
  };

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

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setImageLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/image/generate`, {
        prompt,
        size: "512x512",
      });
      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error("Image generation failed:", error);
    } finally {
      setImageLoading(false);
    }
  };

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

  const handleAudioUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    setAudioLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${backendUrl}/audio/transcribe`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error("Transcription error:", error);
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <section className="w-full bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-20">
        {/* Left panel: Title + tool UIs */}
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl font-bold">Start with these simple AI tools - no technical experience needed</h2>
          <p className="text-gray-600 leading-relaxed text-base">
            Just like the teachers in our success stories, you can save hours each week with these AI-powered tools designed specifically for educators.
          </p>

          {/* Text Summarizer UI */}
          {showSummarizer && (
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
          )}

          {/* Image Generator UI */}
          {showImageGenerator && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter a prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
              <button
                onClick={generateImage}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
                disabled={imageLoading}
              >
                {imageLoading ? "Generating..." : "Generate"}
              </button>
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Generated AI"
                    className="w-full max-w-md h-auto object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          )}

          {/* Chat with GPT UI */}
          {showChatGPT && (
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
          )}

          {/* Audio Transcriber UI */}
          {showUpload && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-600">Upload Audio</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="block w-full border border-gray-300 rounded-md p-2 text-sm"
              />
              <button
                onClick={handleAudioUpload}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
                disabled={audioLoading}
              >
                {audioLoading ? "Transcribing..." : "Transcribe Audio"}
              </button>
              {transcription && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Transcription Result:</h3>
                  <p className="border p-4 bg-gray-50 rounded-md whitespace-pre-wrap">{transcription}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right panel: Tool cards */}
        <div className="md:w-1/2 space-y-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex items-start gap-5 px-4 py-6 hover:bg-gray-50 rounded-lg transition cursor-pointer"
              onClick={() => handleToolClick(tool.title)}
            >
              <div className="w-14 h-14 min-w-[3.5rem] rounded-xl bg-gray-100 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  src={tool.icon}
                  alt={`${tool.title} icon`}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{tool.title}</h3>
                <p className="text-gray-600 text-sm leading-normal">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiToolsOverview;