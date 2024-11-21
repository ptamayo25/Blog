import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import BlogList from "../components/BlogList/BlogList";
import PostDetail from "../pages/PostDetail/PostDetail";
import NewPost from "../pages/NewPost/NewPost";
import EditPost from "../pages/EditPost/EditPost";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import { posts } from "../data/posts";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts",
        children: [
          {
            // index: true,
            path: "blog",
            element: <BlogList posts={posts} />,
          },
          {
            path: ":id",
            element: <PostDetail />,
          },
          {
            path: "new",
            element: <ProtectedRoute element={<NewPost />} />,
          },
          {
            path: ":id/edit",
            element: <ProtectedRoute element={<EditPost />} />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
