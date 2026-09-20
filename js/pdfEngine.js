/**
 * เครื่องมือสร้างไฟล์ PDF ฝั่งผู้ใช้งาน (Client-side PDF Engine)
 * ประมวลผลบนเบราว์เซอร์ 100% ไม่พึ่งพาเซิร์ฟเวอร์ และปลอดภัยสูงสุด
 */

const PdfEngine = {
  // ฟังก์ชันประกอบ JPEG หลายหน้าเข้าด้วยกันเป็นไฟล์ PDF มาตรฐาน (A4: 595.28 x 841.89 pt)
  createPdfFromJpegs(jpegBuffers, dimensions = []) {
    const pw = 595.28;
    const ph = 841.89;
    const pageCount = jpegBuffers.length;

    let pageObjNums = [];
    let currentObjNum = 3;

    for (let i = 0; i < pageCount; i++) {
      const pageObj = currentObjNum++;
      const contentObj = currentObjNum++;
      const imageObj = currentObjNum++;
      pageObjNums.push({ pageObj, contentObj, imageObj, index: i });
    }

    let chunks = [];
    let byteOffset = 0;

    function writeChunk(data) {
      let uint8;
      if (typeof data === "string") {
        uint8 = new TextEncoder().encode(data);
      } else if (data instanceof Uint8Array) {
        uint8 = data;
      } else if (data instanceof ArrayBuffer) {
        uint8 = new Uint8Array(data);
      }
      chunks.push(uint8);
      byteOffset += uint8.length;
    }

    writeChunk("%PDF-1.5\n%\xFF\xFF\xFF\xFF\n");
    let offsets = [];

    // 1: Catalog
    offsets[1] = byteOffset;
    writeChunk("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

    // 2: Pages
    offsets[2] = byteOffset;
    const kids = pageObjNums.map((p) => p.pageObj + " 0 R").join(" ");
    writeChunk(`2 0 obj\n<< /Type /Pages /Count ${pageCount} /Kids [${kids}] >>\nendobj\n`);

    for (const p of pageObjNums) {
      const dim = dimensions[p.index] || { width: 2479, height: 3508 };

      // Page
      offsets[p.pageObj] = byteOffset;
      writeChunk(
        `${p.pageObj} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] ` +
          `/Resources << /XObject << /Im${p.index} ${p.imageObj} 0 R >> >> ` +
          `/Contents ${p.contentObj} 0 R >>\nendobj\n`
      );

      // Content
      const contentStream = `q ${pw.toFixed(2)} 0 0 ${ph.toFixed(2)} 0 0 cm /Im${p.index} Do Q`;
      offsets[p.contentObj] = byteOffset;
      writeChunk(
        `${p.contentObj} 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`
      );

      // Image
      const imgBuf = jpegBuffers[p.index];
      offsets[p.imageObj] = byteOffset;
      writeChunk(
        `${p.imageObj} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${dim.width} /Height ${dim.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBuf.length} >>\nstream\n`
      );
      writeChunk(imgBuf);
      writeChunk("\nendstream\nendobj\n");
    }

    // XRef table
    const xrefOffset = byteOffset;
    const totalObjs = currentObjNum;
    writeChunk(`xref\n0 ${totalObjs}\n0000000000 65535 f \n`);
    for (let i = 1; i < totalObjs; i++) {
      writeChunk(String(offsets[i]).padStart(10, "0") + " 00000 n \n");
    }

    writeChunk(`trailer\n<< /Size ${totalObjs} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

    // รวม binary chunks เป็นก้อนเดียว
    let totalLen = 0;
    for (let c of chunks) totalLen += c.length;
    const merged = new Uint8Array(totalLen);
    let cur = 0;
    for (let c of chunks) {
      merged.set(c, cur);
      cur += c.length;
    }
    return new Blob([merged], { type: "application/pdf" });
  },

  // โหลดรูปภาพ Image Object
  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  },

  // วาดเครื่องหมายถูกลงในวงกลม
  drawCheckmark(ctx, x, y, size = 32, color = "#1e3a8a") {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    // วาดสัญลักษณ์ติ๊กถูกที่สวยงามตรงจุดศูนย์กลาง
    ctx.moveTo(x - size * 0.45, y - size * 0.05);
    ctx.lineTo(x - size * 0.1, y + size * 0.35);
    ctx.lineTo(x + size * 0.5, y - size * 0.4);
    ctx.stroke();
    ctx.restore();
  },

  // แปลง Canvas เป็น JPEG Uint8Array
  canvasToJpegBytes(canvas, quality = 0.92) {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(new Uint8Array(reader.result));
          };
          reader.readAsArrayBuffer(blob);
        },
        "image/jpeg",
        quality
      );
    });
  },

  // ตัดข้อความเป็นหลายบรรทัดตามความกว้าง
  wrapText(ctx, text, maxWidth) {
    if (!text) return [];
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      let testLine = currentLine ? currentLine + " " + words[i] : words[i];
      let metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== "") {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  },

  /**
   * สร้างไฟล์ PDF ภาษาไทย โดยประทับข้อมูลลงบนแม่แบบ 10 หน้า
   */
  async generateThaiPdf(data, onProgress = () => {}) {
    const totalPages = 10;
    const jpegBuffers = [];
    const dimensions = [];
    const canvas = document.createElement("canvas");
    canvas.width = 2479;
    canvas.height = 3508;
    const ctx = canvas.getContext("2d");

    const fontPrimary = "46px 'Sarabun', 'THSarabunNew', 'Noto Sans Thai', sans-serif";
    const fontBold = "bold 48px 'Sarabun', 'THSarabunNew', 'Noto Sans Thai', sans-serif";
    const textColor = "#111827";

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      onProgress(pageNum, totalPages);
      const img = await this.loadImage(`assets/pages/page-${pageNum}.jpg`);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = textColor;
      ctx.font = fontPrimary;

      if (pageNum === 1) {
        // หน้า 1: ข้อมูลส่วนตัว
        if (data.fullName) ctx.fillText(data.fullName, 920, 1530);
        if (data.idCard) ctx.fillText(data.idCard, 1020, 1682);

        // ที่อยู่สูงสุด 3 บรรทัด
        if (data.address) {
          const addrLines = this.wrapText(ctx, data.address, 1300);
          if (addrLines[0]) ctx.fillText(addrLines[0], 720, 1835);
          if (addrLines[1]) ctx.fillText(addrLines[1], 720, 1985);
          if (addrLines[2]) ctx.fillText(addrLines[2], 720, 2135);
        }

        if (data.age) ctx.fillText(String(data.age), 740, 2290);
        if (data.day) ctx.fillText(String(data.day), 920, 2590);
        if (data.month) ctx.fillText(String(data.month), 1220, 2590);
        if (data.year) ctx.fillText(String(data.year), 1720, 2590);
      } else if (pageNum === 2) {
        // หน้า 2: สติสัมปชัญญะ (ใช่ / ไม่ใช่)
        if (data.step2_conscious === "yes") {
          this.drawCheckmark(ctx, 908, 2858);
        } else if (data.step2_conscious === "no") {
          this.drawCheckmark(ctx, 1308, 2858);
        }
      } else if (pageNum === 3) {
        // หน้า 3: โลกมอบความเสมอภาค, เกิดแก่เจ็บตาย, ปรารถนากลับคืนธรรมชาติ, สถานที่
        // Q1: โลกมอบความเสมอภาค
        if (data.step3_q1 === "agree") this.drawCheckmark(ctx, 364, 1144);
        else if (data.step3_q1 === "disagree") this.drawCheckmark(ctx, 784, 1144);
        else if (data.step3_q1 === "other") {
          this.drawCheckmark(ctx, 360, 1312);
          if (data.step3_q1_other) ctx.fillText(data.step3_q1_other, 530, 1312);
        }

        // Q2: เกิดแก่เจ็บตาย
        if (data.step3_q2 === "agree") this.drawCheckmark(ctx, 360, 1668);
        else if (data.step3_q2 === "disagree") this.drawCheckmark(ctx, 784, 1672);
        else if (data.step3_q2 === "other") {
          this.drawCheckmark(ctx, 364, 1832);
          if (data.step3_q2_other) ctx.fillText(data.step3_q2_other, 530, 1832);
        }

        // Q3: ปรารถนากลับคืนสู่ธรรมชาติ
        if (data.step3_q3 === "yes") this.drawCheckmark(ctx, 360, 2168);
        else if (data.step3_q3 === "no") this.drawCheckmark(ctx, 852, 2152);
        else if (data.step3_q3 === "other") {
          this.drawCheckmark(ctx, 364, 2340);
          if (data.step3_q3_other) ctx.fillText(data.step3_q3_other, 530, 2340);
        }

        // Q4: สถานที่จากไป
        if (data.step3_q4 === "home") this.drawCheckmark(ctx, 356, 2764);
        else if (data.step3_q4 === "hospital") this.drawCheckmark(ctx, 848, 2744);
        else if (data.step3_q4 === "appropriate") this.drawCheckmark(ctx, 1300, 2760);
      } else if (pageNum === 4) {
        // หน้า 4: ฉุกเฉินวิกฤต, บอกความจริง, รักษาเพื่อบรรเทาอาการ
        // Q1: ฉุกเฉิน
        if (data.step4_emergency === "nearest") {
          this.drawCheckmark(ctx, 352, 1180);
        } else if (data.step4_emergency === "specify") {
          this.drawCheckmark(ctx, 360, 1344);
          if (data.step4_emergency_hosp) ctx.fillText(data.step4_emergency_hosp, 1380, 1344);
        } else if (data.step4_emergency === "other") {
          this.drawCheckmark(ctx, 352, 1472);
          if (data.step4_emergency_other) ctx.fillText(data.step4_emergency_other, 530, 1472);
        }

        // Q2: บอกความจริง
        if (data.step4_truth === "agree") this.drawCheckmark(ctx, 412, 2052);
        else if (data.step4_truth === "disagree") this.drawCheckmark(ctx, 968, 2056);
        else if (data.step4_truth === "other") {
          this.drawCheckmark(ctx, 1364, 2056);
          if (data.step4_truth_other) ctx.fillText(data.step4_truth_other, 1520, 2056);
        }

        // Q3: รักษาตามอาการ
        if (data.step4_palliative === "agree") this.drawCheckmark(ctx, 404, 2592);
        else if (data.step4_palliative === "disagree") this.drawCheckmark(ctx, 980, 2596);
        else if (data.step4_palliative === "other") {
          this.drawCheckmark(ctx, 1376, 2596);
          if (data.step4_palliative_other) ctx.fillText(data.step4_palliative_other, 1520, 2596);
        }
      } else if (pageNum === 5) {
        // หน้า 5: สมอง, หัวใจ, การหายใจ
        // 4.1 สมอง
        if (data.step5_brain === "agree") this.drawCheckmark(ctx, 412, 1672);
        else if (data.step5_brain === "disagree") this.drawCheckmark(ctx, 964, 1680);
        else if (data.step5_brain === "other") {
          this.drawCheckmark(ctx, 1360, 1680);
          if (data.step5_brain_other) ctx.fillText(data.step5_brain_other, 1520, 1680);
        }

        // 4.2 หัวใจ (DNR)
        if (data.step5_heart === "agree") this.drawCheckmark(ctx, 424, 2192);
        else if (data.step5_heart === "disagree") this.drawCheckmark(ctx, 980, 2196);
        else if (data.step5_heart === "other") {
          this.drawCheckmark(ctx, 1376, 2196);
          if (data.step5_heart_other) ctx.fillText(data.step5_heart_other, 1520, 2196);
        }

        // 4.3 การหายใจ
        if (data.step5_breath === "agree") this.drawCheckmark(ctx, 412, 2744);
        else if (data.step5_breath === "disagree") this.drawCheckmark(ctx, 968, 2748);
        else if (data.step5_breath === "other") {
          this.drawCheckmark(ctx, 1364, 2748);
          if (data.step5_breath_other) ctx.fillText(data.step5_breath_other, 1520, 2748);
        }
      } else if (pageNum === 6) {
        // หน้า 6: อาหาร/น้ำสายยาง, โรคระยะสุดท้าย, ภาวะแทรกซ้อน, ค่าใช้จ่ายเกินกำลัง
        // 4.4 อาหารสายยาง
        if (data.step6_feeding === "agree") this.drawCheckmark(ctx, 408, 1212);
        else if (data.step6_feeding === "disagree") this.drawCheckmark(ctx, 964, 1216);
        else if (data.step6_feeding === "other") {
          this.drawCheckmark(ctx, 1360, 1216);
          if (data.step6_feeding_other) ctx.fillText(data.step6_feeding_other, 1520, 1216);
        }

        // 4.5 โรคระยะสุดท้าย
        if (data.step6_terminal === "agree") this.drawCheckmark(ctx, 412, 1808);
        else if (data.step6_terminal === "disagree") this.drawCheckmark(ctx, 968, 1812);
        else if (data.step6_terminal === "other") {
          this.drawCheckmark(ctx, 1364, 1812);
          if (data.step6_terminal_other) ctx.fillText(data.step6_terminal_other, 1520, 1812);
        }

        // 4.6 ภาวะแทรกซ้อน
        if (data.step6_complications === "agree") this.drawCheckmark(ctx, 412, 2320);
        else if (data.step6_complications === "disagree") this.drawCheckmark(ctx, 968, 2324);
        else if (data.step6_complications === "other") {
          this.drawCheckmark(ctx, 1364, 2324);
          if (data.step6_complications_other) ctx.fillText(data.step6_complications_other, 1520, 2324);
        }

        // 4.7 ค่าใช้จ่าย
        if (data.step6_finance === "agree") this.drawCheckmark(ctx, 412, 2868);
        else if (data.step6_finance === "disagree") this.drawCheckmark(ctx, 968, 2872);
        else if (data.step6_finance === "other") {
          this.drawCheckmark(ctx, 1364, 2872);
          if (data.step6_finance_other) ctx.fillText(data.step6_finance_other, 1520, 2872);
        }
      } else if (pageNum === 7) {
        // หน้า 7: บริจาคร่างกาย & พิธีกรรม
        // 5. บริจาคร่างกาย
        if (data.step7_donate === "yes") {
          this.drawCheckmark(ctx, 1024, 1236);
          if (data.step7_donate_place) ctx.fillText(data.step7_donate_place, 1220, 1395);
        } else if (data.step7_donate === "no") {
          this.drawCheckmark(ctx, 1324, 1236);
        }

        // 6. กรณีเปิดรับบริจาคไม่ได้
        if (data.step7_q6 === "agree") this.drawCheckmark(ctx, 424, 1964);
        else if (data.step7_q6 === "disagree") this.drawCheckmark(ctx, 968, 1964);
        else if (data.step7_q6 === "other") {
          this.drawCheckmark(ctx, 1356, 1968);
          if (data.step7_q6_other) ctx.fillText(data.step7_q6_other, 1520, 1968);
        }

        // 7. ผู้ตัดสินใจเรื่องพิธีกรรม
        if (data.step7_q7 === "family") {
          this.drawCheckmark(ctx, 420, 2368);
        } else if (data.step7_q7 === "self") {
          this.drawCheckmark(ctx, 836, 2368);
          // 8. ระบุพิธีกรรมเอง
          if (data.step7_q8_custom) {
            const lines = this.wrapText(ctx, data.step7_q8_custom, 1750);
            if (lines[0]) ctx.fillText(lines[0], 350, 2675);
            if (lines[1]) ctx.fillText(lines[1], 350, 2815);
            if (lines[2]) ctx.fillText(lines[2], 350, 2955);
          }
        }
      } else if (pageNum === 8) {
        // หน้า 8: ผู้มีสิทธิตัดสินใจแทน & พยาน
        // ตัวแทน 1
        if (data.step8_rep1_name) ctx.fillText(data.step8_rep1_name, 480, 1560);
        if (data.step8_rep1_rel) ctx.fillText(data.step8_rep1_rel, 1520, 1560);

        // ตัวแทน 2
        if (data.step8_rep2_name) ctx.fillText(data.step8_rep2_name, 480, 1705);
        if (data.step8_rep2_rel) ctx.fillText(data.step8_rep2_rel, 1520, 1705);

        // ตัวแทน 3
        if (data.step8_rep3_name) ctx.fillText(data.step8_rep3_name, 480, 1850);
        if (data.step8_rep3_rel) ctx.fillText(data.step8_rep3_rel, 1520, 1850);

        // พยาน (เส้นประอยู่ที่ Y = 3035, วางตัวอักษรบนเส้นที่ Y = 3025 กึ่งกลางเหนือคำว่า พยาน)
        ctx.textAlign = "center";
        if (data.step8_witness1) ctx.fillText(data.step8_witness1, 553, 3025);
        if (data.step8_witness2) ctx.fillText(data.step8_witness2, 1993, 3025);
        ctx.textAlign = "left";
      } else if (pageNum === 9) {
        // หน้า 9: บันทึกเพิ่มเติม (เส้นประเริ่มที่ X = 495 ถึง 1980, เส้นแรก Y = 1175, ระยะห่าง 150px ต่อบรรทัด)
        if (data.step9_notes) {
          const noteLines = this.wrapText(ctx, data.step9_notes, 1420);
          const startY = 1165;
          const lineGap = 150;
          for (let i = 0; i < Math.min(noteLines.length, 12); i++) {
            ctx.fillText(noteLines[i], 520, startY + i * lineGap);
          }
        }
      }

      const buf = await this.canvasToJpegBytes(canvas, 0.92);
      jpegBuffers.push(buf);
      dimensions.push({ width: canvas.width, height: canvas.height });
    }

    return this.createPdfFromJpegs(jpegBuffers, dimensions);
  },

  /**
   * สร้างไฟล์ PDF ภาษาอังกฤษ (A4: 2479 x 3508 px, Clean Legal Standard)
   */
  async generateEnglishPdf(data, onProgress = () => {}) {
    const totalPages = 10;
    const jpegBuffers = [];
    const dimensions = [];
    const canvas = document.createElement("canvas");
    canvas.width = 2479;
    canvas.height = 3508;
    const ctx = canvas.getContext("2d");

    const t = window.TRANSLATIONS.en;

    // ฟังก์ชันวาดโครงหน้ามาตรฐานสากล (Header & Footer & Signature Box)
    const drawStandardPageTemplate = (pgNumber, title, subtitle) => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // เส้นขอบนอกสง่างาม
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 4;
      ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);

      // Top bar header
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 56px 'Helvetica Neue', Arial, sans-serif";
      ctx.fillText(title || "GOOD ORDER BOOK (LIVING WILL)", 160, 220);

      ctx.fillStyle = "#64748b";
      ctx.font = "34px 'Helvetica Neue', Arial, sans-serif";
      ctx.fillText(subtitle || "Advance Care Directive | National Health Act B.E. 2550", 160, 280);

      // หมายเลขหน้า
      ctx.fillStyle = "#334155";
      ctx.font = "bold 40px 'Helvetica Neue', Arial, sans-serif";
      ctx.fillText(String(pgNumber), canvas.width - 220, 220);

      // เส้นคั่นหัวกระดาษ
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(160, 320);
      ctx.lineTo(canvas.width - 160, 320);
      ctx.stroke();

      // Signature Certification Box ด้านล่างของทุกหน้า
      const sigY = canvas.height - 380;
      ctx.strokeStyle = "#94a3b8";
      ctx.setLineDash([8, 8]);
      ctx.strokeRect(canvas.width / 2 - 450, sigY, 900, 180);
      ctx.setLineDash([]);

      ctx.fillStyle = "#475569";
      ctx.font = "32px 'Helvetica Neue', Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Declarant Certification Signature", canvas.width / 2, sigY + 110);
      ctx.fillText("(Sign by hand with pen after printing)", canvas.width / 2, sigY + 155);

      // Footer
      ctx.textAlign = "left";
      ctx.font = "28px 'Helvetica Neue', Arial, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Good Order Book • Living Will Document • Page " + pgNumber + " of 10", 160, canvas.height - 130);
    };

    const drawSectionTitle = (y, text) => {
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 44px 'Helvetica Neue', Arial, sans-serif";
      ctx.fillText(text, 160, y);
    };

    const drawParagraph = (y, text, maxWidth = canvas.width - 320, lineHeight = 55) => {
      ctx.fillStyle = "#334155";
      ctx.font = "36px 'Helvetica Neue', Arial, sans-serif";
      const lines = this.wrapText(ctx, text, maxWidth);
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 160, y + i * lineHeight);
      }
      return y + lines.length * lineHeight;
    };

    const drawRadioChoice = (x, y, label, isSelected, customText = "") => {
      // วงกลม
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.stroke();

      if (isSelected) {
        this.drawCheckmark(ctx, x, y, 26, "#0f172a");
      }

      ctx.fillStyle = "#1e293b";
      ctx.font = "36px 'Helvetica Neue', Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(label, x + 50, y + 12);

      if (customText) {
        ctx.fillStyle = "#0369a1";
        ctx.fillText(`: ${customText}`, x + 50 + ctx.measureText(label).width, y + 12);
      }
    };

    for (let pg = 1; pg <= totalPages; pg++) {
      onProgress(pg, totalPages);
      drawStandardPageTemplate(pg);

      ctx.textAlign = "left";

      if (pg === 1) {
        drawSectionTitle(420, "ADVANCE CARE DIRECTIVE & LIVING WILL");
        drawParagraph(
          500,
          "This advance declaration is executed voluntarily to articulate personal decisions regarding end-of-life healthcare, pursuant to Section 12 of Thailand's National Health Act B.E. 2550."
        );

        drawSectionTitle(680, "DECLARANT IDENTIFICATION");

        const fieldY = [780, 930, 1080, 1380, 1530];
        const fields = [
          { label: "Full Name:", val: data.fullName || "—" },
          { label: "Citizen ID / Passport No.:", val: data.idCard || "—" },
          { label: "Residential Address:", val: data.address || "—" },
          { label: "Current Age:", val: data.age ? `${data.age} Years` : "—" },
          {
            label: "Executed on Date:",
            val: `${data.day || "DD"} / ${data.month || "MM"} / ${data.year || "YYYY"}`
          }
        ];

        fields.forEach((f, idx) => {
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 38px 'Helvetica Neue', Arial, sans-serif";
          ctx.fillText(f.label, 160, fieldY[idx]);

          ctx.fillStyle = "#1e3a8a";
          ctx.font = "40px 'Helvetica Neue', Arial, sans-serif";
          if (idx === 2) {
            // Address multiline
            const addrLines = this.wrapText(ctx, f.val, canvas.width - 400);
            addrLines.forEach((al, lIdx) => {
              ctx.fillText(al, 160, fieldY[idx] + 60 + lIdx * 55);
            });
          } else {
            ctx.fillText(f.val, 700, fieldY[idx]);
          }
        });
      } else if (pg === 2) {
        drawSectionTitle(420, "LEGAL FOUNDATION & DECLARATION OF SOUND MIND");
        drawParagraph(
          510,
          "Section 12 of Thailand's National Health Act B.E. 2550 provides: A person has the legal right to execute an advance declaration expressing intent not to receive healthcare services aimed merely at prolonging the final stage of life or terminating suffering caused by an incurable condition."
        );

        drawSectionTitle(760, "STATEMENT OF SOUND MIND & CAPACITY");
        drawParagraph(
          840,
          "\"At the time of providing and certifying the information in this Advance Care Directive, I solemnly affirm that I possess sound mind, full memory, and complete conscious understanding in all respects.\""
        );

        drawRadioChoice(200, 1100, "Yes — I affirm this statement with sound mind", data.step2_conscious === "yes");
        drawRadioChoice(200, 1220, "No", data.step2_conscious === "no");

        drawSectionTitle(1400, "CORE PRINCIPLES OF THIS DIRECTIVE");
        const principles = [
          "• An expression of the right to natural and peaceful passing, not a property will.",
          "• Prepared while fully conscious, competent, and free of undue influence.",
          "• Does NOT constitute active euthanasia or unlawful acceleration of death.",
          "• To be activated solely when attending physicians confirm a terminal state.",
          "• Intended to relieve moral distress and eliminate family uncertainty during medical emergencies."
        ];
        principles.forEach((pr, idx) => {
          ctx.fillStyle = "#334155";
          ctx.font = "34px 'Helvetica Neue', Arial, sans-serif";
          ctx.fillText(pr, 160, 1500 + idx * 75);
        });
      } else if (pg === 3) {
        drawSectionTitle(420, "PHILOSOPHY ON LIFE & PREFERRED PLACE OF PASSING");

        let curY = 500;
        curY = drawParagraph(curY, "1. \"The world grants equality to all of us in two things: 24 hours in a day, and death.\"");
        drawRadioChoice(200, curY + 60, "I Agree", data.step3_q1 === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step3_q1 === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step3_q1 === "other", data.step3_q1_other);

        curY += 190;
        curY = drawParagraph(curY, "2. \"Birth, aging, illness, and death are the most natural realities of human life.\"");
        drawRadioChoice(200, curY + 60, "I Agree", data.step3_q2 === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step3_q2 === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step3_q2 === "other", data.step3_q2_other);

        curY += 190;
        curY = drawParagraph(curY, "3. \"The desire to return peacefully to nature is my true wish.\"");
        drawRadioChoice(200, curY + 60, "Yes", data.step3_q3 === "yes");
        drawRadioChoice(600, curY + 60, "No", data.step3_q3 === "no");
        drawRadioChoice(1050, curY + 60, "Other", data.step3_q3 === "other", data.step3_q3_other);

        curY += 190;
        curY = drawParagraph(curY, "4. \"If given the choice, I express my wish to return peacefully to nature at:\"");
        drawRadioChoice(200, curY + 60, "At Home", data.step3_q4 === "home");
        drawRadioChoice(600, curY + 60, "At Hospital", data.step3_q4 === "hospital");
        drawRadioChoice(1050, curY + 60, "Depending on circumstances", data.step3_q4 === "appropriate");
      } else if (pg === 4) {
        drawSectionTitle(420, "EMERGENCY CARE & RIGHT TO TRUTHFUL INFORMATION");

        let curY = 500;
        curY = drawParagraph(curY, "1. In an acute life-threatening emergency crisis:");
        drawRadioChoice(200, curY + 60, "Transport me to the nearest hospital immediately (UCEP 72hr Emergency Rights)", data.step4_emergency === "nearest");
        drawRadioChoice(200, curY + 160, "Transport me to this specific hospital", data.step4_emergency === "specify", data.step4_emergency_hosp);
        drawRadioChoice(200, curY + 260, "Other directive", data.step4_emergency === "other", data.step4_emergency_other);

        curY += 390;
        curY = drawParagraph(curY, "2. After medical assessment, if I retain any conscious awareness, my medical team and family must disclose the truth regarding my medical condition to me, enabling me to live my final days with dignity.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step4_truth === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step4_truth === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step4_truth === "other", data.step4_truth_other);

        curY += 190;
        curY = drawParagraph(curY, "3. I request only palliative and symptomatic comfort care to alleviate physical suffering. I explicitly refuse treatments that merely prolong death through unnatural technologies.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step4_palliative === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step4_palliative === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step4_palliative === "other", data.step4_palliative_other);
      } else if (pg === 5) {
        drawSectionTitle(420, "REFUSAL OF LIFE-SUSTAINING INTERVENTIONS (PART 1)");
        drawParagraph(
          500,
          "Whether due to trauma, critical illness, or age, if medicine cannot restore cognitive and physical recovery, I request adherence to the following refusals:"
        );

        let curY = 660;
        curY = drawParagraph(curY, "4.1 Brain Dysfunction & Irreversible Coma: If physicians diagnose irreversible cessation of cognitive perception and communication, I refuse all cranial surgical interventions.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step5_brain === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step5_brain === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step5_brain === "other", data.step5_brain_other);

        curY += 190;
        curY = drawParagraph(curY, "4.2 Cardiac Arrest (DNR): If my heart arrests or exhibits terminal arrhythmias, I refuse all forms of cardiopulmonary resuscitation (CPR chest compressions, electrical defibrillation).");
        drawRadioChoice(200, curY + 60, "I Agree (DNR)", data.step5_heart === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step5_heart === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step5_heart === "other", data.step5_heart_other);

        curY += 190;
        curY = drawParagraph(curY, "4.3 Respiratory Failure: If my breathing fails, I refuse tracheostomy incision and invasive mechanical ventilation (endotracheal tube).");
        drawRadioChoice(200, curY + 60, "I Agree", data.step5_breath === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step5_breath === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step5_breath === "other", data.step5_breath_other);
      } else if (pg === 6) {
        drawSectionTitle(420, "REFUSAL OF LIFE-SUSTAINING INTERVENTIONS (PART 2)");

        let curY = 500;
        curY = drawParagraph(curY, "4.4 Artificial Nutrition: If unable to swallow naturally, I refuse artificial feeding tubes (NG/PEG tube) and intravenous hyperalimentation.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step6_feeding === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step6_feeding === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step6_feeding === "other", data.step6_feeding_other);

        curY += 190;
        curY = drawParagraph(curY, "4.5 Terminal Incurable Illness: In advanced terminal states (e.g. late-stage cancer) where cognition is lost, I refuse measures intended solely to delay the moment of death.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step6_terminal === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step6_terminal === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step6_terminal === "other", data.step6_terminal_other);

        curY += 190;
        curY = drawParagraph(curY, "4.6 Acute Complications: I refuse aggressive secondary surgeries, blood product transfusions, and intensive antibiotic treatments that merely extend terminal suffering.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step6_complications === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step6_complications === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step6_complications === "other", data.step6_complications_other);

        curY += 190;
        curY = drawParagraph(curY, "4.7 Financial Capacity: Medical expenditures must not inflict severe economic hardship on my family for treatments that cannot restore meaningful quality of life.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step6_finance === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step6_finance === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step6_finance === "other", data.step6_finance_other);
      } else if (pg === 7) {
        drawSectionTitle(420, "POST-MORTEM WISHES & FUNERAL ARRANGEMENTS");

        let curY = 500;
        curY = drawParagraph(curY, "5. Anatomical Body Donation: Have you registered your body for medical education / donation?");
        drawRadioChoice(200, curY + 60, "Yes (Registered)", data.step7_donate === "yes", data.step7_donate_place);
        drawRadioChoice(900, curY + 60, "No", data.step7_donate === "no");

        curY += 210;
        curY = drawParagraph(curY, "6. In the event that registered body donation cannot proceed due to external constraints (e.g. pandemic suspension), I authorize my family to arrange dignified religious funeral rites.");
        drawRadioChoice(200, curY + 60, "I Agree", data.step7_q6 === "agree");
        drawRadioChoice(600, curY + 60, "I Disagree", data.step7_q6 === "disagree");
        drawRadioChoice(1050, curY + 60, "Other", data.step7_q6 === "other", data.step7_q6_other);

        curY += 210;
        curY = drawParagraph(curY, "7. Authority for Religious & Funeral Ceremonies:");
        drawRadioChoice(200, curY + 60, "My family/caregivers hold full authority to decide funeral rites as appropriate", data.step7_q7 === "family");
        drawRadioChoice(200, curY + 160, "I specify my own personal funeral instructions below:", data.step7_q7 === "self");

        if (data.step7_q8_custom) {
          curY += 230;
          ctx.fillStyle = "#0369a1";
          ctx.font = "italic 36px 'Helvetica Neue', Arial, sans-serif";
          const lines = this.wrapText(ctx, `"${data.step7_q8_custom}"`, canvas.width - 400);
          lines.forEach((l, i) => ctx.fillText(l, 200, curY + i * 55));
        }
      } else if (pg === 8) {
        drawSectionTitle(420, "DESIGNATED HEALTHCARE PROXIES & WITNESSES");
        drawParagraph(
          500,
          "Should ambiguity arise between real-time medical circumstances and this declaration, I designate the following trusted individuals to consult and decide with medical physicians on my behalf:"
        );

        const proxies = [
          { name: data.step8_rep1_name, rel: data.step8_rep1_rel, label: "Primary Proxy 1:" },
          { name: data.step8_rep2_name, rel: data.step8_rep2_rel, label: "Alternate Proxy 2:" },
          { name: data.step8_rep3_name, rel: data.step8_rep3_rel, label: "Alternate Proxy 3:" }
        ];

        proxies.forEach((pr, idx) => {
          const py = 750 + idx * 170;
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 36px 'Helvetica Neue', Arial, sans-serif";
          ctx.fillText(pr.label, 160, py);

          ctx.fillStyle = "#1e3a8a";
          ctx.font = "38px 'Helvetica Neue', Arial, sans-serif";
          ctx.fillText(`Name: ${pr.name || "—"}`, 560, py);
          ctx.fillText(`Relationship: ${pr.rel || "—"}`, 1350, py);
        });

        drawSectionTitle(1350, "DEDICATION OF MERIT");
        drawParagraph(
          1430,
          "\"I dedicate whatever merit and good deeds I have accumulated throughout this life to grant fulfillment to every wish expressed in this Living Will, enabling a peaceful return to nature.\""
        );

        drawSectionTitle(1750, "ATTESTING WITNESSES");
        drawParagraph(
          1830,
          "We attest that the Declarant executed this document in our presence, appearing of sound mind and free from duress."
        );

        // Witness boxes
        const w1Name = data.step8_witness1 || "(Witness 1 Full Name)";
        const w2Name = data.step8_witness2 || "(Witness 2 Full Name)";

        ctx.strokeStyle = "#cbd5e1";
        ctx.strokeRect(160, 2020, 1000, 280);
        ctx.strokeRect(1300, 2020, 1000, 280);

        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 36px 'Helvetica Neue', Arial, sans-serif";
        ctx.fillText("Witness 1 Signature:", 200, 2080);
        ctx.fillText("Witness 2 Signature:", 1340, 2080);

        ctx.fillStyle = "#64748b";
        ctx.font = "34px 'Helvetica Neue', Arial, sans-serif";
        ctx.fillText(`Name: ${w1Name}`, 200, 2240);
        ctx.fillText(`Name: ${w2Name}`, 1340, 2240);
      } else if (pg === 9) {
        drawSectionTitle(420, "ADDITIONAL DIRECTIVES & PERSONAL NOTES");
        drawParagraph(
          500,
          "Heartfelt messages to loved ones, spiritual guidance, or specific end-of-life considerations:"
        );

        if (data.step9_notes) {
          ctx.fillStyle = "#0f172a";
          ctx.font = "38px 'Helvetica Neue', Arial, sans-serif";
          const lines = this.wrapText(ctx, data.step9_notes, canvas.width - 360);
          lines.forEach((l, i) => {
            ctx.fillText(l, 180, 680 + i * 70);
          });
        } else {
          ctx.fillStyle = "#94a3b8";
          ctx.font = "italic 36px 'Helvetica Neue', Arial, sans-serif";
          ctx.fillText("— No additional directives specified —", 180, 680);
        }
      } else if (pg === 10) {
        drawSectionTitle(420, "LEGAL & PRACTICAL EFFECTIVENESS GUIDELINES");
        drawParagraph(
          510,
          "To ensure that this Good Order Book / Living Will achieves full effectiveness, please observe the following steps:"
        );

        const instructions = [
          "1. Print this document onto physical A4 paper (10 pages).",
          "2. Hand-sign your personal signature in the certification box at the bottom of EVERY page.",
          "3. Discuss these directives openly and compassionately with your family and healthcare proxies.",
          "4. Have 2 witnesses sign the designated section on Page 8.",
          "5. Safely store the original document where it can be readily accessed by your proxies.",
          "6. Provide photocopies to your primary proxy, family members, and attending physician.",
          "7. Should you wish to update your directives in the future, compile a new edition and destroy prior copies."
        ];

        instructions.forEach((ins, i) => {
          ctx.fillStyle = "#1e293b";
          ctx.font = "36px 'Helvetica Neue', Arial, sans-serif";
          ctx.fillText(ins, 160, 700 + i * 110);
        });
      }

      const buf = await this.canvasToJpegBytes(canvas, 0.92);
      jpegBuffers.push(buf);
      dimensions.push({ width: canvas.width, height: canvas.height });
    }

    return this.createPdfFromJpegs(jpegBuffers, dimensions);
  },

  // ทริกเกอร์ให้เบราว์เซอร์ดาวน์โหลดไฟล์ Blob ทันที
  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }
};

if (typeof window !== "undefined") {
  window.PdfEngine = PdfEngine;
}
