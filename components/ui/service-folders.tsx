"use client"

import * as React from "react"
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards"

type Service = {
  label: string
  meta: string
  href: string
  tone: "light" | "dark"
  art: "dusk" | "ember" | "aurora"
  seed: number
  files: FolderFile[]
}

const SERVICES: Service[] = [
  {
    label: "AI Video & Content",
    meta: "01 / 03 · View the work",
    href: "/ai-video.html",
    tone: "light",
    art: "dusk",
    seed: 5,
    files: [
      { name: "AI ads", meta: "Video", art: "dusk", href: "/ai-video.html" },
      { name: "Cinematic storytelling", meta: "Video", art: "ember", href: "/ai-video.html" },
      { name: "AI UGC", meta: "Video", art: "aurora", href: "/ai-video.html" },
    ],
  },
  {
    label: "Creative & Social",
    meta: "02 / 03 · View the work",
    href: "/creative-social.html",
    tone: "dark",
    art: "ember",
    seed: 11,
    files: [
      { name: "Brand visuals", meta: "Design", art: "ember", href: "/creative-social.html" },
      { name: "Social posts", meta: "Design", art: "dusk", href: "/creative-social.html" },
      { name: "Short-form reels", meta: "Video", art: "aurora", href: "/creative-social.html" },
    ],
  },
  {
    label: "E-commerce Design",
    meta: "03 / 03 · View the work",
    href: "/ecommerce.html",
    tone: "light",
    art: "aurora",
    seed: 3,
    files: [
      { name: "Shopify design", meta: "Store", art: "aurora", href: "/ecommerce.html" },
      { name: "Product listings", meta: "Listing", href: "/ecommerce.html" },
      { name: "Store visuals", meta: "Images", art: "dusk", href: "/ecommerce.html" },
    ],
  },
]

/** The three services as glass folders. Click a folder to open it, pick a file (or the ··· menu) to go to the work. */
export default function ServiceFolders() {
  const wrap = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(340)
  React.useEffect(() => {
    const el = wrap.current
    const fit = () => {
      const avail = el?.clientWidth ?? window.innerWidth - 48
      const cols = window.innerWidth >= 900 ? 3 : 1
      setWidth(Math.max(240, Math.min(340, Math.floor((avail - (cols - 1) * 24) / cols))))
    }
    fit()
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fit)
    if (el) ro?.observe(el)
    window.addEventListener("resize", fit)
    return () => {
      ro?.disconnect()
      window.removeEventListener("resize", fit)
    }
  }, [])

  return (
    <div ref={wrap} className="grid grid-cols-1 items-start justify-items-center gap-x-6 gap-y-10 pt-6 min-[900px]:grid-cols-3">
      {SERVICES.map((s, i) => (
        <GlassFolder
          key={s.label}
          label={s.label}
          meta={s.meta}
          tone={s.tone}
          art={s.art}
          seed={s.seed}
          files={s.files}
          action="more"
          menu={[{ label: "View the work", onSelect: () => window.location.assign(s.href) }]}
          width={width}
          appearDelay={i * 140}
        />
      ))}
    </div>
  )
}
