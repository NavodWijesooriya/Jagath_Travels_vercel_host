'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import Navbar from '@/components/common/header/Navbar';
import Footer from '@/components/common/footer/Footer';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Tag,
  ChakraProvider,
  Spinner,
  Center
} from '@chakra-ui/react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  slug: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default function BlogPostPage({ params }: PageProps) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

  // First, resolve the params promise to get the slug
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setSlug(resolvedParams.slug);
      } catch (err) {
        console.error("Error resolving params:", err);
        setError("Failed to load blog parameters");
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  // Once we have the slug, fetch the blog post
  useEffect(() => {
    if (!slug) return;

    const fetchBlogBySlug = async () => {
      try {
        // First try to find by slug
        const slugQuery = query(collection(db, 'blogs'), where('slug', '==', slug));
        const slugQuerySnapshot = await getDocs(slugQuery);

        if (!slugQuerySnapshot.empty) {
          const doc = slugQuerySnapshot.docs[0];
          setBlogPost({
            id: doc.id,
            ...(doc.data() as Omit<BlogPost, 'id'>)
          });
        } else {
          // If not found by slug, try to find by id
          const docRef = doc(db, 'blogs', slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBlogPost({
              id: docSnap.id,
              ...(docSnap.data() as Omit<BlogPost, 'id'>)
            });
          } else {
            setError("Blog post not found");
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogBySlug();
  }, [slug]);

  return (
    <ChakraProvider>
      <Navbar />
      {/* Added paddingTop to create space below navbar */}
      <Box pt={{ base: "80px", md: "100px" }}>
        <Container maxW="container.lg" py={10}>
          {loading ? (
            <Center h="50vh">
              <Spinner size="xl" thickness="4px" color="teal.500" />
            </Center>
          ) : error ? (
            <Center h="50vh">
              <VStack>
                <Heading size="lg" color="red.500">Error</Heading>
                <Text>{error}</Text>
              </VStack>
            </Center>
          ) : blogPost ? (
            <VStack spacing={8} align="start">
              {blogPost.imageUrl && (
                <Box w="100%" h={{ base: "200px", md: "400px" }} overflow="hidden" borderRadius="lg">
                  <Image
                    src={blogPost.imageUrl}
                    alt={blogPost.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/800x400?text=Blog+Image"
                  />
                </Box>
              )}

              <VStack align="start" spacing={6} w="100%">
                <Heading size="2xl">{blogPost.title}</Heading>

                <HStack spacing={4} flexWrap="wrap">
                  <Text fontSize="md" color="gray.600">
                    By {blogPost.author}
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {new Date(blogPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                  <Tag colorScheme="teal" size="md">{blogPost.category}</Tag>
                </HStack>

                <Divider />

                <Box
                  className="blog-content"
                  w="100%"
                  fontSize="lg"
                  lineHeight="tall"
                  whiteSpace="pre-wrap"
                  p={4}
                  sx={{
                    '& p': {
                      marginBottom: '1rem'
                    },
                    '& h2, & h3, & h4': {
                      marginTop: '1.5rem',
                      marginBottom: '1rem',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  {blogPost.content}
                </Box>
              </VStack>
            </VStack>
          ) : (
            <Center h="50vh">
              <Text>Blog post not found</Text>
            </Center>
          )}
        </Container>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
