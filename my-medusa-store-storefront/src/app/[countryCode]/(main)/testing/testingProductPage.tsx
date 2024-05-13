"use client"
import { medusaClient } from "@lib/config"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import PostListing from "./postListing"

const TestingProductPage = () => {
  const [product, setProduct] = useState<any>()
  const [loading, setLoading] = useState(true)

  const ApiCall = async () => {
    setLoading(true)
    try {
      const { products } = await medusaClient.products.list()
      setProduct(products)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    const formattedAmount = (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    })
    return formattedAmount
  }

  useEffect(() => {
    ApiCall()
  }, [])

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {product?.map((newProduct: any) => (
              <div
                key={newProduct.id}
                className="group relative cursor-pointer"
              >
                <Link href={`/products/${newProduct?.handle}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      src={newProduct?.thumbnail}
                      alt={newProduct?.title}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {/* <a href={product.href}> */}
                        <span aria-hidden="true" className="absolute inset-0" />
                        {newProduct?.title}
                        {/* </a> */}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {newProduct?.collection?.title}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(newProduct?.variants[0]?.prices[0]?.amount)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="w-full m-6 d-flex justify-center">
        <PostListing />
      </div>
    </>
  )
}

export default TestingProductPage
