import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

async function getPost(slug: string) {
  try {
    const res = await fetch(`https://shopee-scraper-vercel.vercel.app/api/blog/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: 'Not Found - BizXThai' };
  }
  return {
    title: `${post.title} | BizXThai รีวิว`,
    description: post.excerpt || `อ่านรีวิวเต็มๆ สำหรับ ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `อ่านรีวิวเต็มๆ สำหรับ ${post.title}`,
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
  };
}

export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <main className="container" style={{ textAlign: "center", padding: "40px" }}>
        <h2>ไม่พบบทความที่คุณค้นหา</h2>
        <Link href="/" style={{ color: "var(--primary-color)", textDecoration: "none", marginTop: "20px", display: "inline-block" }}>
          ← กลับหน้าแรก
        </Link>
      </main>
    );
  }

  const dateStr = new Date(post.created_at).toLocaleDateString('th-TH', { 
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  // AIO Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url ? [post.image_url] : [],
    "datePublished": post.created_at,
    "author": [{
        "@type": "Organization",
        "name": "BizXThai",
        "url": "https://review.bizxthai.com"
    }]
  };

  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
        ← กลับหน้าแรก
      </Link>
      
      <article className="review-card" style={{ padding: "30px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "15px", color: "var(--text-color)" }}>{post.title}</h1>
        
        <div className="review-header" style={{ marginBottom: "20px" }}>
          <div className="author-info" style={{ marginLeft: 0 }}>
            <div className="review-meta">
              <span>{dateStr}</span>
              <span>·</span>
              <span>บทความวิเคราะห์โดย AI</span>
            </div>
          </div>
        </div>

        {post.image_url && (
          <div style={{ marginBottom: "25px", borderRadius: "12px", overflow: "hidden" }}>
            <img src={post.image_url} alt={post.title} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        )}
        
        <div 
          className="review-content html-content" 
          style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "30px" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.affiliate_link && (
          <div style={{ textAlign: "center", marginTop: "30px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
            <p style={{ marginBottom: "15px", fontWeight: "bold" }}>สนใจสินค้าชิ้นนี้?</p>
            <a 
              href={post.affiliate_link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: "inline-block", 
                backgroundColor: "var(--primary-color)", 
                color: "white", 
                padding: "12px 24px", 
                borderRadius: "30px", 
                textDecoration: "none",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(253, 102, 31, 0.2)"
              }}
            >
              ดูรายละเอียด / สั่งซื้อบน Shopee 🛒
            </a>
          </div>
        )}
      </article>
    </main>
  );
}
