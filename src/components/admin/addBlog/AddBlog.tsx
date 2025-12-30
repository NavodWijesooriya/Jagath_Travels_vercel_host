'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  ChakraProvider,
  Input,
  VStack,
  Collapse,
  IconButton,
  Textarea,
  FormControl,
  FormLabel,
  Image,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Sidebar from '../sidebar/sidebar';
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Define a type for the blog post
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  slug: string; // Add slug field
}

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    author: '',
    category: '',
    publishedAt: '',
    imageUrl: '',
    slug: '', // Initialize slug
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<BlogPost, 'id'>) }));
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  // Check if slug exists and make it unique if needed
  const ensureUniqueSlug = async (baseSlug: string, currentId: string = ''): Promise<string> => {
    let slug = baseSlug;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      // Check if slug exists
      const q = query(collection(db, 'blogs'), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);

      // If no docs with this slug, or the only doc is the current one being edited
      if (querySnapshot.empty || (querySnapshot.docs.length === 1 && querySnapshot.docs[0].id === currentId)) {
        isUnique = true;
      } else {
        // Add counter to make it unique
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    return slug;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // If title changed, generate a new slug suggestion
      if (name === 'title' && !isEditing) {
        return { ...prev, [name]: value, slug: generateSlug(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateBlog = async () => {
    try {
      // Ensure slug is unique
      const uniqueSlug = await ensureUniqueSlug(
        formData.slug || generateSlug(formData.title),
        isEditing ? formData.id : ''
      );

      let imageUrl = formData.imageUrl || '';

      // Upload image if there's a new file
      if (imageFile) {
        const storageRef = ref(storage, `blog-images/${Date.now()}-${imageFile.name}`);
        const uploadResult = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const blogData = {
        ...formData,
        imageUrl,
        slug: uniqueSlug
      };

      if (isEditing) {
        // If updating and there's a new image, delete the old one if exists
        if (imageFile && formData.imageUrl && formData.imageUrl.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, formData.imageUrl);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }

        await updateDoc(doc(db, 'blogs', formData.id), blogData as { [x: string]: any });
        setBlogs(blogs.map(blog => (blog.id === formData.id ? { ...blogData } : blog)));
        toast({
          title: "Blog updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const docRef = await addDoc(collection(db, 'blogs'), { ...blogData, id: '' });
        await updateDoc(docRef, { id: docRef.id });
        setBlogs([...blogs, { ...blogData, id: docRef.id }]);
        toast({
          title: "Blog added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
      toast({
        title: "Error",
        description: "Failed to save the blog post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: string, imageUrl?: string) => {
    try {
      // Delete image from storage if exists
      if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (imageError) {
          console.error("Error deleting image:", imageError);
        }
      }

      await deleteDoc(doc(db, 'blogs', id));
      setBlogs(blogs.filter(blog => blog.id !== id));
      toast({
        title: "Blog deleted",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete the blog post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setFormData(blog);
    setIsEditing(true);
    setIsFormOpen(true);
    setImagePreview(blog.imageUrl || null);
    setImageFile(null);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      content: '',
      author: '',
      category: '',
      publishedAt: '',
      imageUrl: '',
      slug: '',
    });
    setIsEditing(false);
    setIsFormOpen(false);
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Box flex={1} p={8}>
          <Heading mb={6}>Manage Your Blog Posts</Heading>

          {/* Toggle Add/Edit Form */}
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => setIsFormOpen(!isFormOpen)} mb={4}>
            {isFormOpen ? 'Close' : isEditing ? 'Edit Blog' : 'Add New Blog'}
          </Button>

          <Collapse in={isFormOpen} animateOpacity>
            <Box p={4} bg="gray.100" rounded="md" mb={4}>
              <VStack spacing={3} align="stretch">
                <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                <Input name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
                <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
                <Input name="publishedAt" type="date" placeholder="Published Date" value={formData.publishedAt} onChange={handleChange} />

                {/* Add slug field */}
                <Input
                  name="slug"
                  placeholder="URL Slug (generated from title, can be edited)"
                  value={formData.slug}
                  onChange={handleChange}
                />

                <FormControl>
                  <FormLabel>Blog Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {imagePreview && (
                    <Box mt={2} maxW="200px">
                      <Image
                        src={imagePreview}
                        alt="Blog preview"
                        borderRadius="md"
                      />
                    </Box>
                  )}
                </FormControl>

                <Textarea
                  name="content"
                  placeholder="Content"
                  value={formData.content}
                  onChange={handleChange}
                  size="md"
                  minH="150px"
                />

                <Flex gap={2}>
                  <Button
                    leftIcon={<CheckIcon />}
                    colorScheme="green"
                    onClick={handleAddOrUpdateBlog}
                    isDisabled={!formData.title || !formData.content}
                  >
                    {isEditing ? 'Update' : 'Add'}
                  </Button>
                  {isEditing && (
                    <Button leftIcon={<CloseIcon />} colorScheme="gray" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </Flex>
              </VStack>
            </Box>
          </Collapse>

          {/* Blog Table */}
          <Table>
            <Thead bg="gray.200">
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Slug</Th>
                <Th>Author</Th>
                <Th>Category</Th>
                <Th>Published Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs.map(blog => (
                <Tr key={blog.id}>
                  <Td>
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        width="50px"
                        height="50px"
                        objectFit="cover"
                        borderRadius="md"
                        fallbackSrc="https://via.placeholder.com/50?text=No+Image"
                      />
                    ) : (
                      "No image"
                    )}
                  </Td>
                  <Td>{blog.title}</Td>
                  <Td>{blog.slug || blog.id}</Td>
                  <Td>{blog.author}</Td>
                  <Td>{blog.category}</Td>
                  <Td>{new Date(blog.publishedAt).toLocaleDateString()}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      colorScheme="yellow"
                      onClick={() => handleEdit(blog)}
                      mr={2}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(blog.id, blog.imageUrl)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default BlogManagement;