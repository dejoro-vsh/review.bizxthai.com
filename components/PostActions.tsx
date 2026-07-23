"use client"

import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle, Share2, Check } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function PostActions({ slug, likes }: { slug: string, likes: number }) {
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [localLikes, setLocalLikes] = useState(likes)

  const handleLike = () => {
    setLiked(!liked)
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'BizXThai Review',
        url: `${window.location.origin}/review/${slug}`
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/review/${slug}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between text-muted-foreground text-xs px-1 mt-3 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="bg-primary text-primary-foreground rounded-full p-1 w-5 h-5 flex items-center justify-center">
            <ThumbsUp className="w-3 h-3" />
          </div>
          <span>{localLikes} คนถูกใจสิ่งนี้</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{Math.floor(Math.random() * 10) + 1} ความคิดเห็น</span>
        </div>
      </div>
      <div className="border-t border-border pt-2 pb-2 flex items-center justify-between">
        <Button 
          variant="ghost" 
          className={`flex-1 font-medium rounded-md gap-2 h-9 ${liked ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={handleLike}
        >
          <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} /> ถูกใจ
        </Button>
        <Link href={`/review/${slug}`} className="flex-1">
          <Button variant="ghost" className="w-full text-muted-foreground font-medium rounded-md gap-2 h-9">
            <MessageCircle className="w-4 h-4" /> ความคิดเห็น
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          className="flex-1 text-muted-foreground font-medium rounded-md gap-2 h-9"
          onClick={handleShare}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />} 
          {copied ? 'คัดลอกลิงก์แล้ว' : 'แชร์'}
        </Button>
      </div>
    </>
  )
}
