import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Typography } from '@mui/material';

type Post = {
  id: number;
  title: string;
  content: string;
  subtitle: string;
  published: string;
  author: string;
  image: string;
  tags: string[];
};

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${process.env.URL}/post/buscar/por-id/${id}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        navigate('/404');
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <section className="mt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              Publicado em {new Date(post.published).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })} por {post.author}
            </p>
            <div className="w-full max-h-[350px] overflow-hidden rounded-lg mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
            <Typography
              variant="body1"
              className="text-lg text-gray-700 leading-relaxed"
              sx={{
                lineHeight: 1.8,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                maxWidth: '100%',
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="mt-6">
            <hr className="border-t border-gray-300 my-3" />
              <h3 className="text-xl font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PostDetails;