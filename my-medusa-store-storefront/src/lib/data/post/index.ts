// import { medusaClient } from "@lib/config"
import axios from "axios"

// Create an instance of axios with a custom config
const AxiosClient = axios.create({
  baseURL: "http://localhost:9000/store/",
})

// Define your API calls using this instance
export async function getPostList() {
  try {
    const response = await AxiosClient.get("posts")
    return response.data
  } catch (error) {
    // Handle error
    console.error("Error fetching post list:", error)
    throw error // Re-throw the error to be handled by the caller
  }
}

export const createPost = async (postData: any) => {
  try {
    const response = await AxiosClient.post("/posts", postData)
    return response.data
  } catch (error) {
    console.error("Error creating post:", error)
    throw error
  }
}

export const updatePost = async (postId: any, postData: any) => {
  try {
    const response = await AxiosClient.post(`/posts/${postId}`, postData)
    return response.data
  } catch (error) {
    console.error("Error updating post:", error)
    throw error
  }
}

export const deletePost = async (postId: any) => {
  try {
    const response = await AxiosClient.delete(`/posts/${postId}`)
    return response.data
  } catch (error) {
    console.error("Error deleting post:", error)
    throw error
  }
}
