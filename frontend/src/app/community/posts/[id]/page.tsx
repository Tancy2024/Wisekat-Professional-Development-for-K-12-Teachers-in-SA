"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { communityApi } from "@/lib/api";
import Header from "../../../components/Header";
import { ArrowLeft, User, Calendar, MessageCircle, Send } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: {
    username: string;
  };
  replies?: Reply[];
}

interface Reply {
  id: number;
  content: string;
  created_at: string;
  author: {
    username: string;
  };
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadPost();
  }, [params.id]);

  const loadPost = async () => {
    try {
      const response = await communityApi.getPost(parseInt(params.id));
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data) {
        const postData = response.data as Post;
        setPost(postData);
        if (postData.replies) {
          setReplies(postData.replies);
        }
      }
    } catch (error) {
      console.error("Failed to load post:", error);
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setSubmitting(true);
    try {
      const response = await communityApi.createReply(
        parseInt(params.id),
        newReply
      );
      if (response.error) {
        setError(response.error);
        return;
      }

      setNewReply("");
      loadPost(); // Reload post to get latest replies
    } catch (error) {
      console.error("Failed to submit reply:", error);
      setError("Failed to submit reply");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
        <Header />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
        <Header />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='text-center'>
            <p className='text-gray-600'>Post not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <Header />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Back Button */}
        <div className='mb-8'>
          <Link
            href='/community'
            className='inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors font-medium'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Community
          </Link>
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

        {/* Main Post */}
        <article className='bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden'>
          <div className='p-6 sm:p-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-4 leading-tight'>
              {post.title}
            </h1>

            <div className='flex items-center gap-4 mb-6 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center'>
                  <User className='h-4 w-4 text-teal-600' />
                </div>
                <span className='font-medium'>{post.author.username}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className='prose max-w-none text-gray-700 leading-relaxed'>
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className='mb-4 last:mb-0'>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Replies Section */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <div className='p-6 sm:p-8 border-b border-gray-200'>
            <div className='flex items-center gap-2'>
              <MessageCircle className='h-5 w-5 text-teal-600' />
              <h2 className='text-xl font-semibold text-gray-900'>
                Replies ({replies.length})
              </h2>
            </div>
          </div>

          {/* Replies List */}
          <div className='divide-y divide-gray-100'>
            {replies.length > 0 ? (
              replies.map((reply) => (
                <div
                  key={reply.id}
                  className='p-6 sm:p-8 hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-2'>
                      <div className='w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center'>
                        <User className='h-3 w-3 text-gray-600' />
                      </div>
                      <span className='font-medium text-gray-900'>
                        {reply.author.username}
                      </span>
                    </div>
                    <div className='flex items-center gap-1 text-xs text-gray-500'>
                      <Calendar className='h-3 w-3' />
                      <span>
                        {new Date(reply.created_at).toLocaleDateString("en-US")}
                      </span>
                    </div>
                  </div>
                  <div className='text-gray-700 leading-relaxed'>
                    {reply.content.split("\n").map((paragraph, index) => (
                      <p key={index} className='mb-2 last:mb-0'>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className='p-6 sm:p-8 text-center text-gray-500'>
                <MessageCircle className='h-12 w-12 mx-auto mb-3 text-gray-300' />
                <p>No replies yet. Be the first to join the discussion!</p>
              </div>
            )}
          </div>

          {/* Reply Form */}
          {isAuthenticated ? (
            <div className='p-6 sm:p-8 bg-gray-50 border-t border-gray-200'>
              <form onSubmit={handleSubmitReply} className='space-y-4'>
                <div>
                  <label
                    htmlFor='reply'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Join the Discussion
                  </label>
                  <textarea
                    id='reply'
                    name='reply'
                    rows={4}
                    required
                    placeholder='Share your thoughts...'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none'
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                </div>
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    disabled={submitting || !newReply.trim()}
                    className='inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg font-medium'
                  >
                    {submitting ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className='h-4 w-4' />
                        Post Reply
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className='p-6 sm:p-8 bg-gray-50 border-t border-gray-200 text-center'>
              <div className='max-w-md mx-auto'>
                <MessageCircle className='h-8 w-8 mx-auto mb-3 text-gray-400' />
                <p className='text-gray-600 mb-4'>Join the conversation!</p>
                <Link
                  href='/login'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium'
                >
                  Sign In to Reply
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
