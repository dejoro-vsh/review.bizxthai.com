import ReviewCard, { ReviewProps } from "../components/ReviewCard";

const mockReviews: ReviewProps[] = [
  {
    id: "1",
    authorName: "สมชาย ใจดี",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    date: "2 ชั่วโมงที่แล้ว",
    rating: 5,
    content: "ระบบ BizXThai ใช้งานง่ายมากครับ เอาสินค้าที่ค้างสต็อกมาแลกเปลี่ยนเป็นคะแนน BX แล้วเอาไปซื้อวัตถุดิบอื่นต่อได้เลย ช่วยลดปัญหาเงินสดขาดมือได้เยอะจริงๆ แนะนำให้ทุกบริษัทลองใช้ดูครับ!",
    likes: 124,
  },
  {
    id: "2",
    authorName: "มาลี ค้าขาย",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    date: "เมื่อวานนี้ เวลา 14:30 น.",
    rating: 5,
    content: "ชอบระบบ Affiliate ที่สุดเลยค่ะ แชร์ลิงก์ให้เพื่อนมาสมัครแล้วเราได้ส่วนต่างค่าคอมมิชชันด้วย แถมไม่ต้องบังคับรักษายอดเหมือนที่อื่น ทำง่าย ได้เงินจริง โอนไวมากค่ะ",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 89,
  },
  {
    id: "3",
    authorName: "B2B Solutions Co.,Ltd",
    authorAvatar: "https://i.pravatar.cc/150?img=3",
    date: "3 วันที่แล้ว",
    rating: 4,
    content: "เป็นแพลตฟอร์มที่ตอบโจทย์ธุรกิจ B2B ได้ดีมากครับ ระบบจัดการคำสั่งซื้อและรับชำระแบบ Hybrid (Cash + Token) ทำออกมาได้เสถียร หัก 1 ดาวเพราะอยากให้เพิ่มระบบแชทคุยกับผู้ขายโดยตรงได้ในเว็บเลยครับ",
    likes: 42,
  },
  {
    id: "4",
    authorName: "น้องนุ่น รีวิวเวอร์",
    authorAvatar: "https://i.pravatar.cc/150?img=9",
    date: "5 วันที่แล้ว",
    rating: 5,
    content: "UI สวยงามมากกกก! ใช้งานลื่นไหลสุดๆ สมัครผ่าน LINE แป๊บเดียวเสร็จ ไม่ต้องกรอกอะไรให้วุ่นวาย ประทับใจมากค่ะ ❤️",
    likes: 256,
  }
];

export default function Home() {
  return (
    <main className="container">
      <h1 className="page-title">รีวิวจากผู้ใช้งานจริง (BizXThai)</h1>
      
      {/* Create Post Input Mockup */}
      <div style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "var(--shadow)", marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e4e6eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          👤
        </div>
        <div style={{ backgroundColor: "var(--bg-color)", padding: "10px 16px", borderRadius: "20px", color: "var(--text-secondary)", flex: 1, cursor: "pointer" }}>
          คุณคิดอย่างไรกับ BizXThai? เขียนรีวิวเลย...
        </div>
      </div>

      {/* Reviews Feed */}
      <div>
        {mockReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </main>
  );
}
