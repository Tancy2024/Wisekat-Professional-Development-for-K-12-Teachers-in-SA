"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { communityApi } from "@/lib/api";
import Header from "../components/Header";
import { Plus, User, Calendar, MessageCircle } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: {
    username: string;
  };
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await communityApi.getPosts();
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data as Post[]);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
      setError("Failed to load posts");
      setPosts([]);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <Header />

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <MessageCircle className='mx-auto h-16 w-16 mb-4 opacity-80' />
            <h1 className='text-4xl font-bold mb-4'>Teacher Community</h1>
            <p className='text-xl text-teal-100 max-w-2xl mx-auto'>
              Share experiences and exchange ideas with fellow teachers,
              exploring challenges and opportunities in education together
            </p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Action Bar */}
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>
              Latest Discussions
            </h2>
            <p className='text-gray-600 mt-1'>
              Discover interesting topics and join lively discussions
            </p>
          </div>
          <button
            onClick={() => {
              if (isAuthenticated) {
                router.push("/community/new");
              } else {
                router.push("/login");
              }
            }}
            className='inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium'
          >
            <Plus className='h-5 w-5' />
            Create Post
          </button>
        </div>

        {error && (
          <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg'>
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
        )}

        {/* Posts Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/posts/${post.id}`}
              className='group block'
            >
              <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200 hover:border-teal-300 group-hover:transform group-hover:-translate-y-1'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center'>
                      <User className='h-4 w-4 text-teal-600' />
                    </div>
                    <span className='text-sm font-medium text-teal-600'>
                      {post.author.username}
                    </span>
                  </div>
                  <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <Calendar className='h-3 w-3' />
                    {new Date(post.created_at).toLocaleDateString("en-US")}
                  </div>
                </div>

                <h3 className='text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors'>
                  {post.title}
                </h3>

                <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                  {post.content.substring(0, 120)}
                  {post.content.length > 120 ? "..." : ""}
                </p>

                <div className='mt-4 pt-4 border-t border-gray-100'>
                  <span className='inline-flex items-center text-sm text-teal-600 group-hover:text-teal-700 font-medium'>
                    Read More
                    <svg
                      className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && !error && (
          <div className='text-center py-16'>
            <MessageCircle className='mx-auto h-16 w-16 text-gray-300 mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Discussion Posts Yet
            </h3>
            <p className='text-gray-500 mb-6'>
              Be the first to start a discussion and share your teaching
              experience!
            </p>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  router.push("/community/new");
                } else {
                  router.push("/login");
                }
              }}
              className='inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg'
            >
              <Plus className='h-5 w-5' />
              Create First Post
            </button>
          </div>
        )}

        {/* Stats Section */}
        {posts.length > 0 && (
          <div className='mt-16 bg-white rounded-xl shadow-sm p-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-teal-600 mb-2'>
                  {posts.length}
                </div>
                <div className='text-gray-600'>Active Discussions</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-teal-600 mb-2'>
                  {new Set(posts.map((p) => p.author.username)).size}
                </div>
                <div className='text-gray-600'>Participating Teachers</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-teal-600 mb-2'>
                  24/7
                </div>
                <div className='text-gray-600'>Online Exchange</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
