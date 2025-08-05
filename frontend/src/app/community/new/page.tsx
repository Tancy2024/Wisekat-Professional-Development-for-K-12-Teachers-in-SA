"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { communityApi } from "@/lib/api";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await communityApi.createPost(title, content);
    if (response.error) {
      setError(response.error);
      setIsSubmitting(false);
      return;
    }

    router.push("/community");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header Section */}
      <div className='bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Create New Post
              </h1>
            </div>
            <button
              onClick={() => router.back()}
              title='Close'
              aria-label='Close page'
              className='text-gray-500 hover:text-gray-700 transition-colors duration-200'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          {/* Card Header */}
          <div className='bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white'>
            <div className='flex items-center space-x-3'>
              <div className='p-3 bg-white/20 backdrop-blur-sm rounded-xl'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                  />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-white'>
                  Share Your Thoughts
                </h2>
                <p className='text-teal-100 text-sm'>
                  Share your insights and experiences with the community
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mx-6 mt-6'>
              <div className='bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-5 w-5 text-red-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm text-red-700'>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='p-6 space-y-8'>
            {/* Title Field */}
            <div className='group'>
              <label
                htmlFor='title'
                className='flex items-center text-sm font-medium text-gray-700 mb-3'
              >
                <svg
                  className='w-4 h-4 mr-2 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z'
                  />
                </svg>
                Title
              </label>
              <div className='relative'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  required
                  placeholder='Enter an engaging title...'
                  className='w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm 
                           focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 
                           transition-all duration-200 ease-in-out
                           group-hover:border-gray-300 bg-white'
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Content Field */}
            <div className='group'>
              <label
                htmlFor='content'
                className='flex items-center text-sm font-medium text-gray-700 mb-3'
              >
                <svg
                  className='w-4 h-4 mr-2 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h7'
                  />
                </svg>
                Content
              </label>
              <div className='relative'>
                <textarea
                  id='content'
                  name='content'
                  rows={12}
                  required
                  placeholder='Describe your thoughts in detail, share your experiences and insights...'
                  className='w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm 
                           focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 
                           transition-all duration-200 ease-in-out resize-none
                           group-hover:border-gray-300 bg-white'
                  value={content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                  }
                />
              </div>
              <div className='mt-2 text-right'>
                <span className='text-xs text-gray-500'>
                  {content.length} characters
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-100'>
              <button
                type='button'
                onClick={() => router.back()}
                disabled={isSubmitting}
                className='w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 
                         bg-white hover:bg-gray-50 hover:border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                         transition-all duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span className='flex items-center justify-center'>
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                  Cancel
                </span>
              </button>
              <button
                type='submit'
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className='w-full sm:w-auto px-8 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                         bg-teal-600 hover:bg-teal-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                         transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                <span className='flex items-center justify-center'>
                  {isSubmitting ? (
                    <>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <svg
                        className='w-4 h-4 mr-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                        />
                      </svg>
                      Publish Post
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className='mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0'>
              <svg
                className='w-6 h-6 text-teal-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-800 mb-2'>
                Posting Tips
              </h3>
              <ul className='text-sm text-gray-600 space-y-1'>
                <li>• Use clear, descriptive titles to attract readers</li>
                <li>
                  • Describe your thoughts in detail and provide sufficient
                  background
                </li>
                <li>• Maintain a friendly and respectful tone</li>
                <li>• Check for grammar and spelling errors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
