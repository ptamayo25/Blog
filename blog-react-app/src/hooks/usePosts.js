import { useState, useCallback, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem("blog_posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem("blog_posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = useCallback((newPost) => {
    setPosts((prevPosts) => [
      {
        ...newPost,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      },
      ...prevPosts,
    ]);
  }, []);

  const updatePost = useCallback((id, updates) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? { ...post, ...updates } : post))
    );
  }, []);

  const deletePost = useCallback((id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  }, []);

  const likePost = useCallback((id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }, []);

  const addComment = useCallback((postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  ...comment,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
  }, []);

  return {
    posts,
    isLoading,
    error,
    addPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
  };
}
