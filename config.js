/**
 * การตั้งค่าเว็บไซต์ หนังสือสั่งดี (Living Will)
 * -------------------------------------------------------------
 * คุณเบิร์ดสามารถนำรหัสจาก Google Analytics และ Google AdSense
 * มาวางแทนที่เครื่องหมายคำพูดด้านล่างนี้ได้เลยครับ เมื่อขึ้นระบบจริง
 */

const CONFIG = {
  // รหัส Google Analytics 4 (เช่น 'G-ABC1234XYZ')
  // ปล่อยว่างไว้หากยังไม่ได้เชื่อมต่อระบบ
  GA_MEASUREMENT_ID: "G-F9M2W4QV1L",

  // การตั้งค่า Google AdSense
  ADSENSE: {
    // ใส่ Client ID เช่น 'ca-pub-1234567890123456'
    CLIENT_ID: "ca-pub-8289752204725672",

    // Slot ID สำหรับแถบโฆษณาด้านล่างจอ (Sticky Bottom Banner)
    BOTTOM_BANNER_SLOT: "",

    // Slot ID สำหรับหน้าต่างป๊อปอัปหลังจากผู้ใช้ดาวน์โหลด PDF สำเร็จ
    AFTER_DOWNLOAD_MODAL_SLOT: "",

    // เปิดใช้งานโหมดจำลอง (Mock mode) ระหว่างที่ยังรออนุมัติจาก AdSense
    // หากเปลี่ยนเป็น false ระบบจะโหลดสคริปต์ Google AdSense จริง
    ENABLE_MOCK_BANNER: false
  },

  // ข้อมูลเว็บไซต์
  SITE: {
    NAME_TH: "หนังสือสั่งดี",
    NAME_EN: "Good Order Book (Living Will)",
    AUTHOR: "BIRD",
    VERSION: "2.0.0"
  }
};

// Export ให้ไฟล์สคริปต์อื่นเรียกใช้
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
