import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Top10Page() {
  return (
    <div className="container max-w-screen-md mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
            <Trophy className="w-6 h-6" />
        </div>
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
            จัดอันดับ (Top 10)
            </h1>
            <p className="text-muted-foreground text-sm">รวมสินค้ายอดฮิต 10 อันดับแรก</p>
        </div>
      </div>

      <Card className="p-12 text-center border-dashed">
        <h2 className="text-xl font-bold mb-4">ฟีเจอร์นี้กำลังอยู่ในระหว่างการพัฒนา 🚀</h2>
        <p className="text-muted-foreground mb-6">เตรียมพบกับการจัดอันดับสินค้าสุดฮิต เร็วๆ นี้</p>
        <Link href="/">
          <Button variant="default">กลับสู่หน้าแรก</Button>
        </Link>
      </Card>
    </div>
  );
}
