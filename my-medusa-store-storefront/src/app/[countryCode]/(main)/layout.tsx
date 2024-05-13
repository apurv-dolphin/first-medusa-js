import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getCustomer } from "@lib/data"
import Login from "./account/@login/page"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await getCustomer().catch(() => null)

  return (
    <>
      <Nav />
      {customer ? props.children : <Login />}
      <Footer />
    </>
  )
}
