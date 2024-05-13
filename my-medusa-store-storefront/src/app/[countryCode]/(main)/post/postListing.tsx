"use client"
import React, { useEffect, useState } from "react"
import { Pencil, Trash } from "@medusajs/icons"
import { createPost, deletePost, getPostList, updatePost } from "@lib/data/post"

interface Post {
  map(arg0: (post: Post) => React.JSX.Element): React.ReactNode
  title?: string
  author_id?: string
  id?: string
  created_at?: string
  updated_at?: string
}

const PostListing: React.FC = () => {
  const [post, setPost] = useState<any>([])
  const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState<any>({})
  const [isEditing, setIsEditing] = useState(false)

  const fetchPostList = async () => {
    try {
      const data = await getPostList()
      setPost(data.posts)
    } catch (error) {
      console.error("Error fetching post list:", error)
    }
  }
  const openModal = (post: Post) => {
    setPostData(post)
    setIsOpen(true)
    setIsEditing(!!post)
  }

  const closeModal = () => {
    setIsOpen(false)
    setPostData({})
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPostData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload = {
      title: postData?.title,
      author_id: postData?.author_id,
    }
    if (isEditing) {
      await updatePost(postData.id, payload)
    } else {
      await createPost(postData)
    }
    fetchPostList()
    setIsOpen(false)
  }

  const deletePostData = async (id?: string) => {
    await deletePost(id)
    fetchPostList()
    setIsOpen(false)
  }

  useEffect(() => {
    fetchPostList()
  }, [])
  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/12"
          onClick={() => openModal(null)}
        >
          Create
        </button>
        <table className="table-auto w-1/2 border border-gray-200">
          <thead>
            <tr className="bg-zinc-200">
              <th className="px-4 py-2 text-left">Author Title</th>
              <th className="px-4 py-2 text-left">Author ID</th>
              <th className="px-4 py-2 text-left">Year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {post?.map((post: Post) => (
              <tr key={post.id}>
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">{post.author_id}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <span
                      className="cursor-pointer"
                      onClick={() => openModal(post)}
                    >
                      <Pencil />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => deletePostData(post.id)}
                    >
                      <Trash />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-80">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-t-lg">
              <h2 className="text-lg font-semibold">
                {isEditing ? "Update Post" : "Create Post"}
              </h2>
              <button onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <input
                type="text"
                value={postData?.title || ""}
                name="title"
                className="w-full border rounded-md px-2 py-1 mb-2"
                placeholder="Input 1"
                onChange={handleChange}
              />
              <input
                type="text"
                name="author_id"
                value={postData?.author_id || ""}
                className="w-full border rounded-md px-2 py-1 mb-2"
                placeholder="Input 2"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end px-4 py-2 bg-gray-200 rounded-b-lg">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostListing
