"use client";

import React, { useState } from "react";
import axios from "axios";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Image Generator</h2>
      <p className="text-gray-600 mb-6">
        Generate images from text prompts using AI.
      </p>

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
    </div>
  );
};

export default ImageGenerator;