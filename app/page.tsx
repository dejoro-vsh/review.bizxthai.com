import ReviewCard, { ReviewProps } from "../components/ReviewCard";
import Link from 'next/link';

export const revalidate = 60; // Revalidate cache every 60 seconds

async function getPosts() {
  try {
    const res = await fetch('https://shopee-scraper-vercel.vercel.app/api/blog', { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  // Convert db posts to ReviewProps format for the mockup UI
  const formattedReviews: ReviewProps[] = posts.map((post: any) => {
    // Format date string nicely
    const dateObj = new Date(post.created_at);
    const dateStr = dateObj.toLocaleDateString('th-TH', { 
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    return {
      id: post.id.toString(),
      slug: post.slug || post.id.toString(),
      authorName: "BizXThai Review",
      authorAvatar: "https://i.pravatar.cc/150?img=11",
      date: dateStr,
      rating: 5,
      content: post.excerpt || post.content.substring(0, 150) + "...",
      imageUrl: post.image_url || undefined,
      likes: Math.floor(Math.random() * 100) + 10,
    };
  });

  return (
    <main className="container">
      <h1 className="page-title">เทรนด์และรีวิวสินค้า (BizXThai)</h1>
      
      {/* Create Post Input Mockup */}
      <div style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "var(--shadow)", marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e4e6eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          👤
        </div>
        <div style={{ backgroundColor: "var(--bg-color)", padding: "10px 16px", borderRadius: "20px", color: "var(--text-secondary)", flex: 1, cursor: "pointer" }}>
          อัปเดตเทรนด์สินค้าล่าสุดวันนี้...
        </div>
      </div>

      {/* Reviews Feed */}
      <div>
        {formattedReviews.length > 0 ? (
          formattedReviews.map((review) => (
            <div key={review.id} style={{ marginBottom: '20px' }}>
              <ReviewCard review={review} />
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            <p>ยังไม่มีบทความในขณะนี้ รอ AI โพสต์บทความแรก...</p>
          </div>
        )}
      </div>
    </main>
  );
}
