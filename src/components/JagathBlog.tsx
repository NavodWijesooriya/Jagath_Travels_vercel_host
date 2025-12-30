'use client'
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import Link from 'next/link';
import Title from '@/components/Title/Title';

import {
  Box,
  Heading,
  Text,
  VStack,
  ChakraProvider,
  Spinner,
  Flex,
  Image,
} from '@chakra-ui/react';

// Define the blog type
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  imageUrl?: string; // Add optional imageUrl property
  slug: string; // Add slug field for URL-friendly identifiers
}

export default function BlogPage({ categoryFilter, limitCount }: { categoryFilter?: string, limitCount?: number }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Create a reference to the blogs collection
        const blogsRef = collection(db, 'blogs');

        // Build the query with all conditions
        let queryConstraints = [];

        // Add category filter if provided
        if (categoryFilter) {
          queryConstraints.push(where('category', '==', categoryFilter));
        }

        // Add sort by published date
        queryConstraints.push(orderBy('publishedAt', 'desc'));

        // Add limit if provided
        if (limitCount && limitCount > 0) {
          queryConstraints.push(limit(limitCount));
        }

        // Create the final query
        const blogsQuery = query(blogsRef, ...queryConstraints);

        // Execute the query
        const querySnapshot = await getDocs(blogsQuery);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<BlogPost, 'id'>),
        }));
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [categoryFilter, limitCount]);

  if (loading) {
    return;
  }

  return (
    <ChakraProvider>
      <Box p={8} maxW="1200px" mx="auto">
        <Heading
          mb={8}
          textAlign="center"
          fontSize="4xl"
          p={10}
          m={10}
        >

          <Title title="Jagath Tours & Travels Blog Posts" />
        </Heading>
        {loading ? (
          <Flex justify="center" align="center" height="300px">
            <Spinner size="xl" thickness="4px" color="teal.500" />
          </Flex>
        ) : (
          <VStack spacing={8} align="stretch">
            {blogs.length > 0 ? (
              <Flex flexWrap="wrap" gap={10} justify="center">
                {blogs.map(blog => (
                  <Link href={`/blog/${blog.slug || blog.id}`} key={blog.id} style={{ textDecoration: 'none' }}>
                    <Box
                      p={6}
                      bg="white"
                      borderWidth="1px"
                      borderRadius="2xl"
                      shadow="lg"
                      width={{ base: "100%", md: "300px" }}
                      transition="all 0.3s ease"
                      borderLeft="6px solid teal"
                    >
                      {blog.imageUrl && (
                        <Box
                          mb={4}
                          height="160px"
                          overflow="hidden"
                          borderRadius="xl"
                        >
                          <Image
                            src={blog.imageUrl}
                            alt={blog.title}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/300x160?text=Blog+Image"
                          />
                        </Box>
                      )}
                      <VStack align="start" spacing={3}>
                        <Heading fontSize="xl" noOfLines={2} color="teal.700">
                          {blog.title}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          By {blog.author}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </Text>
                        <Box
                          bg="teal.100"
                          color="teal.800"
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          {blog.category}
                        </Box>
                      </VStack>
                    </Box>
                  </Link>
                ))}
              </Flex>
            ) : (
              <Box textAlign="center" p={10} bg="gray.50" borderRadius="md">
                <Text fontSize="xl">No blog posts found.</Text>
              </Box>
            )}
          </VStack>
        )}
      </Box>
    </ChakraProvider>
  );
}
