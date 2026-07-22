"use client";

import { useState } from "react";
import Link from "next/link";

export interface ReviewProps {
  id: string;
  slug: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  rating: number;
  content: string;
  imageUrl?: string;
  likes: number;
}

export default function ReviewCard({ review }: { review: ReviewProps }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(review.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <img src={review.authorAvatar} alt={review.authorName} className="avatar" />
        <div className="author-info">
          <div className="author-name">{review.authorName}</div>
          <div className="review-meta">
            <span>{review.date}</span>
            <span>·</span>
            <span className="stars">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="review-content">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: review.content
              .replace(/```[a-z]*\s*|\s*```/gi, '')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, '&')
          }} 
        />
        <div style={{ marginTop: "10px" }}>
          <Link 
            href={`/review/${review.slug}`} 
            style={{ color: "var(--primary-color)", fontWeight: "bold", textDecoration: "none" }}
          >
            อ่านบทความเต็ม ➔
          </Link>
        </div>
      </div>

      {review.imageUrl && (
        <img src={review.imageUrl} alt="Review attachment" className="review-image" />
      )}

      <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>
        👍 {likesCount} คนถูกใจสิ่งนี้
      </div>

      <div className="interaction-bar">
        <button 
          className={`interaction-btn ${liked ? 'active' : ''}`} 
          onClick={handleLike}
        >
          {liked ? "👍 ถูกใจแล้ว" : "👍 ถูกใจ"}
        </button>
        <button className="interaction-btn">
          💬 แสดงความคิดเห็น
        </button>
        <button className="interaction-btn">
          🔗 แชร์
        </button>
      </div>
    </div>
  );
}
