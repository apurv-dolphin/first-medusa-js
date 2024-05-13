// "use client"
import { Container, Heading } from "@medusajs/ui"
import React from "react"
import PromtMedusa from "./promtMedusa"
import { medusaClient } from "@lib/config"
import { Metadata } from "next"
import Collection from "./collection"
import TestingProductPage from "./testingProductPage"

export const metadata: Metadata = {
  title: "Testing",
  description: "This page is for testing purposes",
}

const Testing = () => {
  return (
    <div className="flex h-full w-full">
      <div className="border-ui-border-base w-full max-w-[300px] border-r p-4">
        <Container className="mb-4 text-center pb-2 pt-2 bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700">
          <Heading level="h1">All collections</Heading>
        </Container>
        <Collection />
      </div>

      <div className="flex w-full flex-col gap-y-2 px-8 pb-8 pt-6">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Apurv favorites Product
            </h2>
          </div>
          <TestingProductPage />
        </div>
        <div className="text-right">
          <PromtMedusa />
        </div>
      </div>
    </div>
  )
}

export default Testing
