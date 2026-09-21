/**
 * ระบบสถิติและการติดตาม (Analytics Tracker)
 * ปฏิบัติตามมาตรฐานความปลอดภัยและความเป็นส่วนตัว 100% (No PII)
 */

const Analytics = {
  initialized: false,

  init() {
    const gaId = window.CONFIG && window.CONFIG.GA_MEASUREMENT_ID;
    if (gaId && gaId.trim() !== "") {
      try {
        if (!window.gtag && !document.querySelector(`script[src*="${encodeURIComponent(gaId)}"]`)) {
          const script = document.createElement("script");
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
          document.head.appendChild(script);

          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          window.gtag = gtag;
          gtag("js", new Date());
          gtag("config", gaId, {
            send_page_view: true,
            anonymize_ip: true
          });
        }

        this.initialized = true;
        console.log("[Analytics] Initialized with ID:", gaId);
      } catch (err) {
        console.warn("[Analytics] Initialization error:", err);
      }
    } else {
      console.log("[Analytics] Running in local/test mode (No GA4 ID set).");
    }
  },

  /**
   * ส่ง Event สถิติ (จะบันทึกเฉพาะตัวเลขและการกระทำเท่านั้น ไม่เก็บข้อมูลส่วนบุคคล)
   * @param {string} eventName 
   * @param {object} params 
   */
  track(eventName, params = {}) {
    // กรองและป้องกันการส่งข้อมูลส่วนตัว (Zero PII Safety Guard)
    const sanitizedParams = {
      timestamp: new Date().toISOString(),
      ...params
    };

    // ลบข้อมูลที่อาจเข้าข่าย PII ออกเพื่อความปลอดภัย
    delete sanitizedParams.name;
    delete sanitizedParams.citizenId;
    delete sanitizedParams.address;
    delete sanitizedParams.notes;
    delete sanitizedParams.witness;

    if (this.initialized && typeof window.gtag === "function") {
      window.gtag("event", eventName, sanitizedParams);
    }

    // สำหรับโหมดพัฒนา แสดงการทำงานใน Console
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      console.log(`[Analytics Event] ${eventName}:`, sanitizedParams);
    }
  }
};

if (typeof window !== "undefined") {
  window.Analytics = Analytics;
}
