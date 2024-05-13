import { getCollectionsList } from "@lib/data"
import { Container, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

async function Collection() {
  const { collections } = await getCollectionsList(0, 6)

  return (
    <>
      {collections?.map((collection) => (
        <Container
          key={collection.id}
          className="mb-4 text-center pb-2 pt-2 bg-green-200 cursor-pointer hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700"
        >
          <LocalizedClientLink href={`/collections/${collection.handle}`}>
            <Heading level="h2">{collection.title}</Heading>
          </LocalizedClientLink>
        </Container>
      ))}
    </>
  )
}

export default Collection
