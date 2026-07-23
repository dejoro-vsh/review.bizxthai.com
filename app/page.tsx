import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Share2, Clock } from "lucide-react";
import PostActions from "@/components/PostActions";

export const revalidate = 60; // Revalidate cache every 60 seconds

async function getPosts() {
  try {
    const res = await fetch('https://shopee-scraper-vercel.vercel.app/api/blog?v=2', { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  const formattedReviews = posts.map((post: any) => {
    const dateObj = new Date(post.created_at);
    const dateStr = dateObj.toLocaleDateString('th-TH', { 
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    return {
      id: post.id.toString(),
      slug: post.slug || post.id.toString(),
      category: post.category || "อื่นๆ",
      title: post.title || "บทความรีวิว",
      authorName: "BizXThai Review",
      authorAvatar: "https://i.pravatar.cc/150?img=11",
      date: dateStr,
      content: post.excerpt || (post.content ? post.content.substring(0, 150) + "..." : ""),
      imageUrl: post.image_url || undefined,
      likes: Math.floor(Math.random() * 100) + 10,
    };
  });

  return (
    <div className="container max-w-screen-md mx-auto py-8 px-4">
      
      {/* Create Post Input Mockup */}
      <Card className="mb-8 rounded-2xl shadow-sm border-border bg-card">
        <CardContent className="p-4 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="bg-muted px-4 py-2.5 rounded-full text-muted-foreground flex-1 cursor-pointer hover:bg-muted/80 transition-colors text-sm">
            คุณกำลังสนใจสินค้าเทรนด์ไหนอยู่...
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          เทรนด์และรีวิวสินค้าล่าสุด
        </h1>
      </div>

      <div className="space-y-6">
        {formattedReviews.length > 0 ? (
          formattedReviews.map((review: any) => (
            <Card key={review.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border-border bg-card rounded-xl">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-3">
                  <img src={review.authorAvatar} alt={review.authorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-background" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground hover:underline cursor-pointer">
                      {review.authorName}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <span>{review.date}</span>
                      <span>·</span>
                      <span className="text-yellow-400 text-[10px]">★★★★★</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div 
                  className="text-sm text-foreground leading-relaxed mb-3"
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
                
                {review.imageUrl && (
                  <Link href={`/review/${review.slug}`} className="block relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-2 group">
                    <img 
                      src={review.imageUrl} 
                      alt="Review attachment" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge variant="secondary" className="absolute top-4 left-4 bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border-none">
                      {review.category}
                    </Badge>
                  </Link>
                )}

                <PostActions slug={review.slug} likes={review.likes} />
              </CardContent>
              <div className="px-4 pb-4 pt-1">
                 <Link href={`/review/${review.slug}`}>
                    <Button className="w-full font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                       อ่านรีวิวฉบับเต็ม ➔
                    </Button>
                 </Link>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center border-dashed">
            <p className="text-muted-foreground font-medium">ยังไม่มีบทความในขณะนี้ รอ AI โพสต์บทความแรก...</p>
          </Card>
        )}
      </div>
    </div>
  );
}
