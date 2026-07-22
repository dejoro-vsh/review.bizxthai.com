import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronLeft, Calendar, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const revalidate = 60;

async function getPost(slug: string) {
  try {
    const res = await fetch(`https://shopee-scraper-vercel.vercel.app/api/blog/${slug}?v=2`, {
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
      <main className="container max-w-screen-md mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">ไม่พบบทความที่คุณค้นหา</h2>
        <Link href="/">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" /> กลับหน้าแรก
          </Button>
        </Link>
      </main>
    );
  }

  const dateStr = new Date(post.created_at).toLocaleDateString('th-TH', { 
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

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
    <main className="container max-w-screen-md mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          กลับหน้าแรก
        </Link>
      </div>
      
      <article className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {post.image_url && (
          <div className="w-full h-64 sm:h-80 md:h-96 relative bg-muted">
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>
        )}

        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex gap-2 mb-4">
             <Badge variant="secondary" className="text-xs">{post.category || 'อื่นๆ'}</Badge>
             <Badge variant="outline" className="text-xs border-primary text-primary">แนะนำ</Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border-2 border-background shadow-sm">
              <img src="https://i.pravatar.cc/150?img=11" alt="BizXThai" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-semibold text-foreground">BizXThai Review</div>
              <div className="flex items-center text-sm text-muted-foreground gap-3 mt-0.5">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {dateStr}</span>
              </div>
            </div>
          </div>

          <Separator className="my-8" />
          
          <div 
            className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl" 
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/```[a-z]*\s*|\s*```/gi, '')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&')
            }}
          />

          {post.affiliate_link && (
            <>
              <Separator className="my-10" />
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold mb-2 text-foreground">สนใจสินค้าชิ้นนี้?</h3>
                <p className="text-muted-foreground mb-6">คลิกเพื่อดูรายละเอียดเพิ่มเติม หรือสั่งซื้อในราคาพิเศษได้เลย</p>
                <a 
                  href={post.affiliate_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/25 hover:scale-105 transition-transform duration-200">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    ดูรายละเอียด / สั่งซื้อบน Shopee
                  </Button>
                </a>
              </div>
            </>
          )}
        </div>
      </article>
    </main>
  );
}
