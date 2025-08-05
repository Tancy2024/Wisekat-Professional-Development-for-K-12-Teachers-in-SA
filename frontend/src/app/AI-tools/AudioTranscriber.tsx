"use client";

import React, { useRef, useState } from "react";
import axios from "axios";

const AudioTranscriber = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [transcription, setTranscription] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Audio Transcriber</h2>
      <p className="text-gray-600 mb-6">
        Convert audio recordings into text automatically.
      </p>

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
    </div>
  );
};

export default AudioTranscriber;