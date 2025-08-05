'use client';
import { useState } from "react";

const promptCases = [
  {
    id: 1,
    title: "Using Data to Inform Teaching Goals",
    effective: `I'm a Year 8 mathematics teacher in Australia. Based on my students' recent assessment results...`,
    ineffective: `My students are having difficulties with similar shapes. What teaching goals should I set?`,
    difference: `The effective prompt includes specific assessment data, identifies student difficulties, year level, and curriculum alignment.`
  },
  {
    id: 2,
    title: "Designing Engaging Warm-Up Activities",
    effective: `I need to design a 5-minute warm-up activity for my Year 8 class studying ratio and similar shapes...`,
    ineffective: `Give me a warm-up activity for my similar shapes lesson.`,
    difference: `The effective prompt specifies time, student knowledge, challenges, and connection to today's lesson.`
  },
  {
    id: 3,
    title: "Incorporating AI for Student Feedback",
    effective: `Students will use Canva to mark figures with +/- and submit to ChatGPT for feedback. Please design a 15-minute activity using Poe platform...`,
    ineffective: `How can I use AI in teaching similar shapes?`,
    difference: `The effective prompt specifies platform, student action, and educational value alignment.`
  }
];

export default function TeachingCaseSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10"> Teaching Case Prompts</h2>
        <div className="space-y-6">
          {promptCases.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  {openId === item.id ? "Hide Details" : "Show Details"}
                </button>
              </div>

              {openId === item.id && (
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
                  <div>
                    <p className="font-bold text-green-700">✅ Effective Prompt:</p>
                    <p>{item.effective}</p>
                  </div>
                  <div>
                    <p className="font-bold text-red-600">🚫 Ineffective Prompt:</p>
                    <p>{item.ineffective}</p>
                  </div>
                  <div>
                    <p className="font-bold">💡 What Makes the Difference:</p>
                    <p>{item.difference}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
