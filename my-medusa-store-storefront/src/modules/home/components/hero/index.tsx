import { Github } from "@medusajs/icons"
import Image from "next/image"
import twitter from "./twitter-image.jpg"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle flex justify-center items-center">
      <div className="relative flex justify-center items-center text-center">
        <span>
          <Image src={twitter} alt="banner" width={600} height={400} />
        </span>
        <a
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
          className="absolute bottom-10 left-10 text-sm"
        >
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <span>View on GitHub</span>
            <Github className="w-6 h-6" />
          </button>
        </a>
      </div>
    </div>
  )
}

export default Hero
