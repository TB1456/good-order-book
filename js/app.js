/**
 * แอปพลิเคชันหลัก หนังสือสั่งดี (Living Will Web App)
 */

document.addEventListener("DOMContentLoaded", () => {
  // สถานะเริ่มต้นของแอปพลิเคชัน
  const state = {
    currentLang: "th",
    currentStep: 1,
    totalSteps: 10,
    formData: {
      // ข้อมูลส่วนตัว
      fullName: "",
      idCard: "",
      address: "",
      age: "",
      day: new Date().getDate(),
      month: "",
      year: "",

      // หน้า 2
      step2_conscious: "yes",

      // หน้า 3
      step3_q1: "agree",
      step3_q1_other: "",
      step3_q2: "agree",
      step3_q2_other: "",
      step3_q3: "yes",
      step3_q3_other: "",
      step3_q4: "home",

      // หน้า 4
      step4_emergency: "nearest",
      step4_emergency_hosp: "",
      step4_emergency_other: "",
      step4_truth: "agree",
      step4_truth_other: "",
      step4_palliative: "agree",
      step4_palliative_other: "",

      // หน้า 5
      step5_brain: "agree",
      step5_brain_other: "",
      step5_heart: "agree",
      step5_heart_other: "",
      step5_breath: "agree",
      step5_breath_other: "",

      // หน้า 6
      step6_feeding: "agree",
      step6_feeding_other: "",
      step6_terminal: "agree",
      step6_terminal_other: "",
      step6_complications: "agree",
      step6_complications_other: "",
      step6_finance: "agree",
      step6_finance_other: "",

      // หน้า 7
      step7_donate: "no",
      step7_donate_place: "",
      step7_q6: "agree",
      step7_q6_other: "",
      step7_q7: "family",
      step7_q8_custom: "",

      // หน้า 8
      step8_rep1_name: "",
      step8_rep1_rel: "",
      step8_rep2_name: "",
      step8_rep2_rel: "",
      step8_rep3_name: "",
      step8_rep3_rel: "",
      step8_witness1: "",
      step8_witness2: "",

      // หน้า 9
      step9_notes: ""
    }
  };

  // กำหนดเดือนและปีเริ่มต้นตามภาษา
  const now = new Date();
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function updateDefaultDates() {
    if (state.currentLang === "th") {
      state.formData.month = thaiMonths[now.getMonth()];
      state.formData.year = now.getFullYear() + 543;
    } else {
      state.formData.month = englishMonths[now.getMonth()];
      state.formData.year = now.getFullYear();
    }
  }
  updateDefaultDates();

  // กำหนดองค์ประกอบใน DOM
  const elements = {
    appTitle: document.getElementById("appTitle"),
    appSubtitle: document.getElementById("appSubtitle"),
    langToggleBtn: document.getElementById("langToggleBtn"),
    btnLangTh: document.getElementById("btnLangTh"),
    btnLangEn: document.getElementById("btnLangEn"),
    jumpToFormBtn: document.getElementById("jumpToFormBtn"),
    jumpToStoryBtn: document.getElementById("jumpToStoryBtn"),
    privacyBadge: document.getElementById("privacyBadge"),
    authorTag: document.getElementById("authorTag"),
    storyContent: document.getElementById("storyContent"),
    lawContent: document.getElementById("lawContent"),
    formTitle: document.getElementById("formTitle"),
    formSubtitle: document.getElementById("formSubtitle"),
    stepIndicator: document.getElementById("stepIndicator"),
    progressBar: document.getElementById("progressBar"),
    formStepsContainer: document.getElementById("formStepsContainer"),
    firstStepBtn: document.getElementById("firstStepBtn"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
    generateBtn: document.getElementById("generateBtn"),
    generationOverlay: document.getElementById("generationOverlay"),
    generationStatus: document.getElementById("generationStatus"),
    afterDownloadModal: document.getElementById("afterDownloadModal"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    bottomBanner: document.getElementById("bottomBanner"),
    closeBannerBtn: document.getElementById("closeBannerBtn"),
    modalAdContent: document.getElementById("modalAdContent"),
    bannerAdContent: document.getElementById("bannerAdContent")
  };

  // เริ่มต้น Analytics
  if (window.Analytics) {
    window.Analytics.init();
    window.Analytics.track("page_view", { lang: state.currentLang });
  }

  // เรนเดอร์ข้อความตามภาษาที่เลือก
  function renderLanguage() {
    try {
      const t = window.TRANSLATIONS[state.currentLang];
      if (!t) return;

      if (elements.appTitle) elements.appTitle.textContent = t.appTitle;
      if (elements.appSubtitle) elements.appSubtitle.textContent = t.appSubtitle;
      if (elements.langToggleBtn) elements.langToggleBtn.textContent = t.switchLang;

      // ปรับปรุงปุ่มสลับภาษาแบบคู่ (Segmented Control)
      if (elements.btnLangTh && elements.btnLangEn) {
        if (state.currentLang === "th") {
          elements.btnLangTh.classList.add("active");
          elements.btnLangTh.setAttribute("aria-pressed", "true");
          elements.btnLangEn.classList.remove("active");
          elements.btnLangEn.setAttribute("aria-pressed", "false");
        } else {
          elements.btnLangEn.classList.add("active");
          elements.btnLangEn.setAttribute("aria-pressed", "true");
          elements.btnLangTh.classList.remove("active");
          elements.btnLangTh.setAttribute("aria-pressed", "false");
        }
      }

      if (elements.privacyBadge) {
        const mainText = t.privacyBadgeMain || "ความปลอดภัย 100%";
        const subText = t.privacyBadgeSub || "";
        elements.privacyBadge.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span class="badge-text-main">${mainText}</span><span class="badge-text-sub">${subText}</span>`;
      }
      if (elements.authorTag) elements.authorTag.textContent = t.authorTag;

      // อัปเดตข้อความปุ่มกระโดดบนมือถือ
      if (elements.jumpToFormBtn) elements.jumpToFormBtn.textContent = t.jumpToForm || "✏️ เริ่มกรอกแบบฟอร์มทำเอกสาร ↓";
      if (elements.jumpToStoryBtn) elements.jumpToStoryBtn.textContent = t.jumpToStory || "📖 อ่านที่มาและหลักการ 6 ข้อ ↑";

      // เรนเดอร์ The Story (คอลัมน์ซ้าย)
      renderStory(t);

      // เรนเดอร์ Law Section & Principles
      renderLaw(t);

      // เรนเดอร์ Form Navigation Header
      if (elements.formTitle) elements.formTitle.textContent = t.form.heading;
      if (elements.formSubtitle) elements.formSubtitle.textContent = t.form.subheading;
      if (elements.firstStepBtn) {
        elements.firstStepBtn.textContent = `⏮ ${t.form.firstStepBtn || "หน้าแรก"}`;
        elements.firstStepBtn.title = state.currentLang === "th" ? "กลับไปหน้าแรก (ขั้นตอนที่ 1)" : "Return to First Step (Page 1)";
      }
      if (elements.prevBtn) elements.prevBtn.textContent = `← ${t.form.prevBtn}`;
      if (elements.nextBtn) elements.nextBtn.textContent = `${t.form.nextBtn} →`;
      if (elements.generateBtn) elements.generateBtn.textContent = t.form.generateBtn;

      // เรนเดอร์ขั้นตอนปัจจุบัน
      renderCurrentStep();
    } catch (err) {
      console.error("[App] renderLanguage error:", err);
    }
  }

  // เรนเดอร์เนื้อเรื่อง (Story)
  function renderStory(t) {
    const s = t.story;
    elements.storyContent.innerHTML = `
      <div class="story-header">
        <h2>${s.title}</h2>
        <div class="story-meta">
          <span>${t.authorTag}</span>
          <span>•</span>
          <span>${state.currentLang === "th" ? "บันทึกความทรงจำและเจตนารมณ์" : "Memoir & Advance Will"}</span>
        </div>
      </div>
      <div class="story-body">
        <p>${s.p1}</p>
        <p>${s.p2}</p>
        <p>${s.p3}</p>
        <p>${s.p4}</p>
        <p>${s.p5}</p>
        <p>${s.p6}</p>
        
        <div class="story-highlight">
          ${s.p7}
        </div>

        <p>${s.p8}</p>
        <p>${s.p9}</p>
        <p>${s.p10}</p>
        <p><strong>${s.p11}</strong></p>
        <p>${s.p12}</p>

        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 1.15rem; margin: 1.5rem 0;">
          <p style="margin-bottom: 0; color: #166534; font-size: 0.95rem;">
            🛡️ <strong>${state.currentLang === "th" ? "ความเป็นส่วนตัว 100%" : "100% Client-side Privacy"}</strong><br>
            ${s.p13}
          </p>
        </div>

        <p><em>${s.p14}</em></p>
        <p>${s.p15}</p>
        <p style="text-align: right; font-weight: 700; color: #1e3a8a;">${s.sign}</p>
      </div>
    `;
  }

  // เรนเดอร์ข้อกฎหมาย มาตรา 12
  function renderLaw(t) {
    const l = t.lawSection;
    const pItems = l.pList.map((item) => `<li>${item}</li>`).join("");

    elements.lawContent.innerHTML = `
      <div class="law-box">
        <div class="law-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          ${l.title}
        </div>
        <p style="font-size: 0.88rem; color: #78350f; white-space: pre-line; line-height: 1.6;">${l.content}</p>
        
        <div style="margin-top: 1.25rem; font-weight: 700; font-size: 0.92rem; color: #92400e;">
          ${l.principlesTitle}
        </div>
        <ul class="principles-list">
          ${pItems}
        </ul>
      </div>
    `;
  }

  // สร้างฟอร์มในแต่ละขั้นตอน
  function renderCurrentStep() {
    const t = window.TRANSLATIONS[state.currentLang].form;
    const step = state.currentStep;

    // อัปเดต Step Indicator & Progress bar
    elements.stepIndicator.textContent = t.stepIndicator
      .replace("{current}", step)
      .replace("{total}", state.totalSteps);
    elements.progressBar.style.width = `${(step / state.totalSteps) * 100}%`;

    // ปุ่มควบคุม Navigation (มีทุกหน้า พร้อมใช้งานตั้งแต่หน้า 2 ถึงหน้าสุดท้าย)
    if (elements.firstStepBtn) {
      elements.firstStepBtn.style.display = "inline-flex";
      elements.firstStepBtn.disabled = step === 1;
    }
    elements.prevBtn.disabled = step === 1;
    if (step === state.totalSteps) {
      elements.nextBtn.style.display = "none";
      elements.generateBtn.style.display = "inline-flex";
    } else {
      elements.nextBtn.style.display = "inline-flex";
      elements.generateBtn.style.display = "none";
    }

    let html = "";

    switch (step) {
      case 1:
        html = `
          <div class="step-title">${t.step1.title}</div>
          <p class="step-desc">${t.subheading}</p>

          <div class="form-group">
            <label class="form-label">${t.step1.fullName} *</label>
            <input type="text" class="form-input" id="inp_fullName" value="${state.formData.fullName}" placeholder="${t.step1.fullNamePlaceholder}" required>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">${t.step1.idCard} *</label>
              <input type="text" class="form-input" id="inp_idCard" value="${state.formData.idCard}" placeholder="${t.step1.idCardPlaceholder}">
            </div>
            <div class="form-group">
              <label class="form-label">${t.step1.age} *</label>
              <input type="number" class="form-input" id="inp_age" value="${state.formData.age}" placeholder="${t.step1.agePlaceholder}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${t.step1.address} *</label>
            <textarea class="form-textarea" id="inp_address" rows="3" placeholder="${t.step1.addressPlaceholder}">${state.formData.address}</textarea>
          </div>

          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">${t.step1.day}</label>
              <input type="number" class="form-input" id="inp_day" value="${state.formData.day}" min="1" max="31">
            </div>
            <div class="form-group">
              <label class="form-label">${t.step1.month}</label>
              <input type="text" class="form-input" id="inp_month" value="${state.formData.month}">
            </div>
            <div class="form-group">
              <label class="form-label">${t.step1.year}</label>
              <input type="text" class="form-input" id="inp_year" value="${state.formData.year}">
            </div>
          </div>

          <p style="font-size: 0.82rem; color: #64748b; margin-top: 1rem; font-style: italic;">${t.step1.signNotice}</p>
        `;
        break;

      case 2:
        html = `
          <div class="step-title">${t.step2.title}</div>
          <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.25rem; border-radius: 0 10px 10px 0; margin-bottom: 1.5rem;">
            <p style="font-size: 1.05rem; font-weight: 500; color: #1e3a8a; line-height: 1.7;">
              "${t.step2.statement}"
            </p>
          </div>
          <label class="form-label">${t.step2.question}</label>
          <div class="choice-list">
            <div class="choice-card ${state.formData.step2_conscious === "yes" ? "selected" : ""}" data-field="step2_conscious" data-val="yes">
              <input type="radio" name="step2_conscious" class="choice-radio" value="yes" ${state.formData.step2_conscious === "yes" ? "checked" : ""}>
              <span class="choice-label">✓ ${t.yesOption} (${t.step2.yesConfirm})</span>
            </div>
            <div class="choice-card ${state.formData.step2_conscious === "no" ? "selected" : ""}" data-field="step2_conscious" data-val="no">
              <input type="radio" name="step2_conscious" class="choice-radio" value="no" ${state.formData.step2_conscious === "no" ? "checked" : ""}>
              <span class="choice-label">${t.noOption}</span>
            </div>
          </div>
        `;
        break;

      case 3:
        html = `
          <div class="step-title">${t.step3.title}</div>
          
          <!-- Q1 -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">1. ${t.step3.q1}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step3_q1 === "agree" ? "selected" : ""}" data-field="step3_q1" data-val="agree">
                <input type="radio" name="step3_q1" class="choice-radio" value="agree" ${state.formData.step3_q1 === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q1 === "disagree" ? "selected" : ""}" data-field="step3_q1" data-val="disagree">
                <input type="radio" name="step3_q1" class="choice-radio" value="disagree" ${state.formData.step3_q1 === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q1 === "other" ? "selected" : ""}" data-field="step3_q1" data-val="other">
                <input type="radio" name="step3_q1" class="choice-radio" value="other" ${state.formData.step3_q1 === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step3_q1_other" value="${state.formData.step3_q1_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step3_q1 === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- Q2 -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">2. ${t.step3.q2}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step3_q2 === "agree" ? "selected" : ""}" data-field="step3_q2" data-val="agree">
                <input type="radio" name="step3_q2" class="choice-radio" value="agree" ${state.formData.step3_q2 === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q2 === "disagree" ? "selected" : ""}" data-field="step3_q2" data-val="disagree">
                <input type="radio" name="step3_q2" class="choice-radio" value="disagree" ${state.formData.step3_q2 === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q2 === "other" ? "selected" : ""}" data-field="step3_q2" data-val="other">
                <input type="radio" name="step3_q2" class="choice-radio" value="other" ${state.formData.step3_q2 === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step3_q2_other" value="${state.formData.step3_q2_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step3_q2 === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- Q3 -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">3. ${t.step3.q3}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step3_q3 === "yes" ? "selected" : ""}" data-field="step3_q3" data-val="yes">
                <input type="radio" name="step3_q3" class="choice-radio" value="yes" ${state.formData.step3_q3 === "yes" ? "checked" : ""}>
                <span class="choice-label">${t.yesOption}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q3 === "no" ? "selected" : ""}" data-field="step3_q3" data-val="no">
                <input type="radio" name="step3_q3" class="choice-radio" value="no" ${state.formData.step3_q3 === "no" ? "checked" : ""}>
                <span class="choice-label">${t.noOption}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q3 === "other" ? "selected" : ""}" data-field="step3_q3" data-val="other">
                <input type="radio" name="step3_q3" class="choice-radio" value="other" ${state.formData.step3_q3 === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step3_q3_other" value="${state.formData.step3_q3_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step3_q3 === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- Q4: สถานที่จากไป -->
          <div class="form-group">
            <label class="form-label">4. ${t.step3.q4}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step3_q4 === "home" ? "selected" : ""}" data-field="step3_q4" data-val="home">
                <input type="radio" name="step3_q4" class="choice-radio" value="home" ${state.formData.step3_q4 === "home" ? "checked" : ""}>
                <span class="choice-label">🏠 ${t.step3.optHome}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q4 === "hospital" ? "selected" : ""}" data-field="step3_q4" data-val="hospital">
                <input type="radio" name="step3_q4" class="choice-radio" value="hospital" ${state.formData.step3_q4 === "hospital" ? "checked" : ""}>
                <span class="choice-label">🏥 ${t.step3.optHospital}</span>
              </div>
              <div class="choice-card ${state.formData.step3_q4 === "appropriate" ? "selected" : ""}" data-field="step3_q4" data-val="appropriate">
                <input type="radio" name="step3_q4" class="choice-radio" value="appropriate" ${state.formData.step3_q4 === "appropriate" ? "checked" : ""}>
                <span class="choice-label">🌿 ${t.step3.optAppropriate}</span>
              </div>
            </div>
          </div>
        `;
        break;

      case 4:
        html = `
          <div class="step-title">${t.step4.title}</div>

          <!-- Q1: ฉุกเฉิน -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step4.q1}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step4_emergency === "nearest" ? "selected" : ""}" data-field="step4_emergency" data-val="nearest">
                <input type="radio" name="step4_emergency" class="choice-radio" value="nearest" ${state.formData.step4_emergency === "nearest" ? "checked" : ""}>
                <span class="choice-label">${t.step4.optNearestHosp}</span>
              </div>
              <div class="choice-card ${state.formData.step4_emergency === "specify" ? "selected" : ""}" data-field="step4_emergency" data-val="specify">
                <input type="radio" name="step4_emergency" class="choice-radio" value="specify" ${state.formData.step4_emergency === "specify" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.step4.optSpecifyHosp}</span>
                  <input type="text" class="choice-other-input" id="inp_step4_emergency_hosp" value="${state.formData.step4_emergency_hosp}" placeholder="${t.step4.specifyHospPlaceholder}" ${state.formData.step4_emergency === "specify" ? "" : "disabled"}>
                </div>
              </div>
              <div class="choice-card ${state.formData.step4_emergency === "other" ? "selected" : ""}" data-field="step4_emergency" data-val="other">
                <input type="radio" name="step4_emergency" class="choice-radio" value="other" ${state.formData.step4_emergency === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step4_emergency_other" value="${state.formData.step4_emergency_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step4_emergency === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
            <p style="font-size: 0.78rem; color: #64748b; margin-top: 0.5rem;">${t.step4.ucepNote}</p>
          </div>

          <!-- Q2: บอกความจริง -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step4.q2}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step4_truth === "agree" ? "selected" : ""}" data-field="step4_truth" data-val="agree">
                <input type="radio" name="step4_truth" class="choice-radio" value="agree" ${state.formData.step4_truth === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step4_truth === "disagree" ? "selected" : ""}" data-field="step4_truth" data-val="disagree">
                <input type="radio" name="step4_truth" class="choice-radio" value="disagree" ${state.formData.step4_truth === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step4_truth === "other" ? "selected" : ""}" data-field="step4_truth" data-val="other">
                <input type="radio" name="step4_truth" class="choice-radio" value="other" ${state.formData.step4_truth === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step4_truth_other" value="${state.formData.step4_truth_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step4_truth === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- Q3: รักษาตามอาการ -->
          <div class="form-group">
            <label class="form-label">${t.step4.q3}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step4_palliative === "agree" ? "selected" : ""}" data-field="step4_palliative" data-val="agree">
                <input type="radio" name="step4_palliative" class="choice-radio" value="agree" ${state.formData.step4_palliative === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step4_palliative === "disagree" ? "selected" : ""}" data-field="step4_palliative" data-val="disagree">
                <input type="radio" name="step4_palliative" class="choice-radio" value="disagree" ${state.formData.step4_palliative === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step4_palliative === "other" ? "selected" : ""}" data-field="step4_palliative" data-val="other">
                <input type="radio" name="step4_palliative" class="choice-radio" value="other" ${state.formData.step4_palliative === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step4_palliative_other" value="${state.formData.step4_palliative_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step4_palliative === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 5:
        html = `
          <div class="step-title">${t.step5.title}</div>
          <p class="step-desc">${t.step5.intro}</p>

          <!-- 4.1 สมอง -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step5.q1}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step5_brain === "agree" ? "selected" : ""}" data-field="step5_brain" data-val="agree">
                <input type="radio" name="step5_brain" class="choice-radio" value="agree" ${state.formData.step5_brain === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step5_brain === "disagree" ? "selected" : ""}" data-field="step5_brain" data-val="disagree">
                <input type="radio" name="step5_brain" class="choice-radio" value="disagree" ${state.formData.step5_brain === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step5_brain === "other" ? "selected" : ""}" data-field="step5_brain" data-val="other">
                <input type="radio" name="step5_brain" class="choice-radio" value="other" ${state.formData.step5_brain === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step5_brain_other" value="${state.formData.step5_brain_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step5_brain === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- 4.2 หัวใจ (DNR) -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step5.q2}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step5_heart === "agree" ? "selected" : ""}" data-field="step5_heart" data-val="agree">
                <input type="radio" name="step5_heart" class="choice-radio" value="agree" ${state.formData.step5_heart === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step5_heart === "disagree" ? "selected" : ""}" data-field="step5_heart" data-val="disagree">
                <input type="radio" name="step5_heart" class="choice-radio" value="disagree" ${state.formData.step5_heart === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step5_heart === "other" ? "selected" : ""}" data-field="step5_heart" data-val="other">
                <input type="radio" name="step5_heart" class="choice-radio" value="other" ${state.formData.step5_heart === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step5_heart_other" value="${state.formData.step5_heart_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step5_heart === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- 4.3 การหายใจ -->
          <div class="form-group">
            <label class="form-label">${t.step5.q3}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step5_breath === "agree" ? "selected" : ""}" data-field="step5_breath" data-val="agree">
                <input type="radio" name="step5_breath" class="choice-radio" value="agree" ${state.formData.step5_breath === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step5_breath === "disagree" ? "selected" : ""}" data-field="step5_breath" data-val="disagree">
                <input type="radio" name="step5_breath" class="choice-radio" value="disagree" ${state.formData.step5_breath === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step5_breath === "other" ? "selected" : ""}" data-field="step5_breath" data-val="other">
                <input type="radio" name="step5_breath" class="choice-radio" value="other" ${state.formData.step5_breath === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step5_breath_other" value="${state.formData.step5_breath_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step5_breath === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 6:
        html = `
          <div class="step-title">${t.step6.title}</div>

          <!-- 4.4 อาหารสายยาง -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step6.q4}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step6_feeding === "agree" ? "selected" : ""}" data-field="step6_feeding" data-val="agree">
                <input type="radio" name="step6_feeding" class="choice-radio" value="agree" ${state.formData.step6_feeding === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_feeding === "disagree" ? "selected" : ""}" data-field="step6_feeding" data-val="disagree">
                <input type="radio" name="step6_feeding" class="choice-radio" value="disagree" ${state.formData.step6_feeding === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_feeding === "other" ? "selected" : ""}" data-field="step6_feeding" data-val="other">
                <input type="radio" name="step6_feeding" class="choice-radio" value="other" ${state.formData.step6_feeding === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step6_feeding_other" value="${state.formData.step6_feeding_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step6_feeding === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- 4.5 มะเร็ง/ระยะสุดท้าย -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step6.q5}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step6_terminal === "agree" ? "selected" : ""}" data-field="step6_terminal" data-val="agree">
                <input type="radio" name="step6_terminal" class="choice-radio" value="agree" ${state.formData.step6_terminal === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_terminal === "disagree" ? "selected" : ""}" data-field="step6_terminal" data-val="disagree">
                <input type="radio" name="step6_terminal" class="choice-radio" value="disagree" ${state.formData.step6_terminal === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_terminal === "other" ? "selected" : ""}" data-field="step6_terminal" data-val="other">
                <input type="radio" name="step6_terminal" class="choice-radio" value="other" ${state.formData.step6_terminal === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step6_terminal_other" value="${state.formData.step6_terminal_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step6_terminal === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- 4.6 ภาวะแทรกซ้อน -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step6.q6}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step6_complications === "agree" ? "selected" : ""}" data-field="step6_complications" data-val="agree">
                <input type="radio" name="step6_complications" class="choice-radio" value="agree" ${state.formData.step6_complications === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_complications === "disagree" ? "selected" : ""}" data-field="step6_complications" data-val="disagree">
                <input type="radio" name="step6_complications" class="choice-radio" value="disagree" ${state.formData.step6_complications === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_complications === "other" ? "selected" : ""}" data-field="step6_complications" data-val="other">
                <input type="radio" name="step6_complications" class="choice-radio" value="other" ${state.formData.step6_complications === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step6_complications_other" value="${state.formData.step6_complications_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step6_complications === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- 4.7 ค่าใช้จ่าย -->
          <div class="form-group">
            <label class="form-label">${t.step6.q7}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step6_finance === "agree" ? "selected" : ""}" data-field="step6_finance" data-val="agree">
                <input type="radio" name="step6_finance" class="choice-radio" value="agree" ${state.formData.step6_finance === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_finance === "disagree" ? "selected" : ""}" data-field="step6_finance" data-val="disagree">
                <input type="radio" name="step6_finance" class="choice-radio" value="disagree" ${state.formData.step6_finance === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step6_finance === "other" ? "selected" : ""}" data-field="step6_finance" data-val="other">
                <input type="radio" name="step6_finance" class="choice-radio" value="other" ${state.formData.step6_finance === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step6_finance_other" value="${state.formData.step6_finance_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step6_finance === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 7:
        html = `
          <div class="step-title">${t.step7.title}</div>
          <p class="step-desc">${t.step7.intro}</p>

          <!-- ข้อ 5 บริจาคร่างกาย -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step7.q5}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step7_donate === "yes" ? "selected" : ""}" data-field="step7_donate" data-val="yes">
                <input type="radio" name="step7_donate" class="choice-radio" value="yes" ${state.formData.step7_donate === "yes" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">✓ ${t.yesOption} (${state.currentLang === "th" ? "ได้บริจาคร่างกายไว้แล้ว" : "Already registered"})</span>
                  <input type="text" class="choice-other-input" id="inp_step7_donate_place" value="${state.formData.step7_donate_place}" placeholder="${t.step7.placePlaceholder}" ${state.formData.step7_donate === "yes" ? "" : "disabled"}>
                </div>
              </div>
              <div class="choice-card ${state.formData.step7_donate === "no" ? "selected" : ""}" data-field="step7_donate" data-val="no">
                <input type="radio" name="step7_donate" class="choice-radio" value="no" ${state.formData.step7_donate === "no" ? "checked" : ""}>
                <span class="choice-label">${t.noOption} (${state.currentLang === "th" ? "ยังไม่ได้บริจาคร่างกาย" : "Not registered"})</span>
              </div>
            </div>
          </div>

          <!-- ข้อ 6 กรณีเปิดรับบริจาคไม่ได้ -->
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label class="form-label">${t.step7.q6}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step7_q6 === "agree" ? "selected" : ""}" data-field="step7_q6" data-val="agree">
                <input type="radio" name="step7_q6" class="choice-radio" value="agree" ${state.formData.step7_q6 === "agree" ? "checked" : ""}>
                <span class="choice-label">${t.agreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step7_q6 === "disagree" ? "selected" : ""}" data-field="step7_q6" data-val="disagree">
                <input type="radio" name="step7_q6" class="choice-radio" value="disagree" ${state.formData.step7_q6 === "disagree" ? "checked" : ""}>
                <span class="choice-label">${t.disagreeOption}</span>
              </div>
              <div class="choice-card ${state.formData.step7_q6 === "other" ? "selected" : ""}" data-field="step7_q6" data-val="other">
                <input type="radio" name="step7_q6" class="choice-radio" value="other" ${state.formData.step7_q6 === "other" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.otherOption}</span>
                  <input type="text" class="choice-other-input" id="inp_step7_q6_other" value="${state.formData.step7_q6_other}" placeholder="${t.otherPlaceholder}" ${state.formData.step7_q6 === "other" ? "" : "disabled"}>
                </div>
              </div>
            </div>
          </div>

          <!-- ข้อ 7 ผู้ตัดสินใจเรื่องพิธีกรรม -->
          <div class="form-group">
            <label class="form-label">${t.step7.q7}</label>
            <div class="choice-list">
              <div class="choice-card ${state.formData.step7_q7 === "family" ? "selected" : ""}" data-field="step7_q7" data-val="family">
                <input type="radio" name="step7_q7" class="choice-radio" value="family" ${state.formData.step7_q7 === "family" ? "checked" : ""}>
                <span class="choice-label">${t.step7.optDecideFamily}</span>
              </div>
              <div class="choice-card ${state.formData.step7_q7 === "self" ? "selected" : ""}" data-field="step7_q7" data-val="self">
                <input type="radio" name="step7_q7" class="choice-radio" value="self" ${state.formData.step7_q7 === "self" ? "checked" : ""}>
                <div style="width: 100%;">
                  <span class="choice-label">${t.step7.optDecideSelf}</span>
                  <textarea class="form-textarea" style="margin-top: 0.6rem;" id="inp_step7_q8_custom" rows="3" placeholder="${t.step7.q8Placeholder}" ${state.formData.step7_q7 === "self" ? "" : "disabled"}>${state.formData.step7_q8_custom}</textarea>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 8:
        html = `
          <div class="step-title">${t.step8.title}</div>
          <p class="step-desc">${t.step8.intro}</p>

          <div style="font-weight: 700; color: #1e3a8a; margin-bottom: 1rem;">${t.step8.repTitle}</div>

          <!-- ตัวแทน 1 -->
          <div class="form-grid-2" style="margin-bottom: 1rem;">
            <div>
              <label class="form-label">${t.step8.rep1Name}</label>
              <input type="text" class="form-input" id="inp_step8_rep1_name" value="${state.formData.step8_rep1_name}" placeholder="${t.step8.namePlaceholder}">
            </div>
            <div>
              <label class="form-label">${t.step8.rep1Rel}</label>
              <input type="text" class="form-input" id="inp_step8_rep1_rel" value="${state.formData.step8_rep1_rel}" placeholder="${t.step8.relPlaceholder}">
            </div>
          </div>

          <!-- ตัวแทน 2 -->
          <div class="form-grid-2" style="margin-bottom: 1rem;">
            <div>
              <label class="form-label">${t.step8.rep2Name}</label>
              <input type="text" class="form-input" id="inp_step8_rep2_name" value="${state.formData.step8_rep2_name}" placeholder="${t.step8.namePlaceholder}">
            </div>
            <div>
              <label class="form-label">${t.step8.rep2Rel}</label>
              <input type="text" class="form-input" id="inp_step8_rep2_rel" value="${state.formData.step8_rep2_rel}" placeholder="${t.step8.relPlaceholder}">
            </div>
          </div>

          <!-- ตัวแทน 3 -->
          <div class="form-grid-2" style="margin-bottom: 1.75rem;">
            <div>
              <label class="form-label">${t.step8.rep3Name}</label>
              <input type="text" class="form-input" id="inp_step8_rep3_name" value="${state.formData.step8_rep3_name}" placeholder="${t.step8.namePlaceholder}">
            </div>
            <div>
              <label class="form-label">${t.step8.rep3Rel}</label>
              <input type="text" class="form-input" id="inp_step8_rep3_rel" value="${state.formData.step8_rep3_rel}" placeholder="${t.step8.relPlaceholder}">
            </div>
          </div>

          <!-- คำอุทิศส่วนกุศล -->
          <div style="background: #fdfaf4; border: 1px solid #fde68a; border-radius: 12px; padding: 1.25rem; margin-bottom: 1.75rem;">
            <p style="font-size: 0.95rem; color: #92400e; font-style: italic; line-height: 1.7;">
              "${t.step8.dedicationText}"
            </p>
          </div>

          <!-- พยาน 2 ท่าน -->
          <div style="font-weight: 700; color: #1e3a8a; margin-bottom: 0.75rem;">${t.step8.witnessHeader}</div>
          <div class="form-grid-2">
            <div>
              <label class="form-label">${t.step8.witness1}</label>
              <input type="text" class="form-input" id="inp_step8_witness1" value="${state.formData.step8_witness1}" placeholder="${t.step8.witnessPlaceholder}">
            </div>
            <div>
              <label class="form-label">${t.step8.witness2}</label>
              <input type="text" class="form-input" id="inp_step8_witness2" value="${state.formData.step8_witness2}" placeholder="${t.step8.witnessPlaceholder}">
            </div>
          </div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem;">${t.step8.witnessNotice}</p>
        `;
        break;

      case 9:
        html = `
          <div class="step-title">${t.step9.title}</div>
          <p class="step-desc">${t.step9.intro}</p>

          <div class="form-group">
            <textarea class="form-textarea" id="inp_step9_notes" rows="8" placeholder="${t.step9.notesPlaceholder}">${state.formData.step9_notes}</textarea>
          </div>
        `;
        break;

      case 10:
        const instList = t.step10.instructionsList.map((item) => `<li>${item}</li>`).join("");
        html = `
          <div class="step-title">${t.step10.title}</div>
          <div class="next-steps-card" style="margin: 1.5rem 0;">
            <ul class="step-checklist" style="line-height: 1.9;">
              ${instList}
            </ul>
          </div>
          <p style="font-size: 1rem; font-weight: 600; color: #047857; text-align: center; margin-top: 1.5rem;">
            ✓ ${t.step10.readyPrompt}
          </p>
        `;
        break;
    }

    elements.formStepsContainer.innerHTML = html;
    bindInputListeners();
  }

  // ผูก Event Listeners กับ Input และ Radio Cards
  function bindInputListeners() {
    // 1. ผูกกับ Text Inputs และ Textareas
    const inputs = elements.formStepsContainer.querySelectorAll("input[type='text'], input[type='number'], textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        const id = e.target.id.replace("inp_", "");
        state.formData[id] = e.target.value;
      });
    });

    // 2. ผูกกับ Custom Choice Cards
    const cards = elements.formStepsContainer.querySelectorAll(".choice-card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        // หากคลิกที่ Input ภายใน card ไม่ต้องบังคับคลิกซ้ำ
        if (e.target.tagName.toLowerCase() === "input" && e.target.type === "text") {
          return;
        }

        const field = card.getAttribute("data-field");
        const val = card.getAttribute("data-val");

        // อัปเดต state
        state.formData[field] = val;

        // อัปเดต UI Selection
        const parentList = card.closest(".choice-list");
        if (parentList) {
          parentList.querySelectorAll(".choice-card").forEach((c) => {
            c.classList.remove("selected");
            const r = c.querySelector("input[type='radio']");
            if (r) r.checked = false;
          });
        }
        card.classList.add("selected");
        const radio = card.querySelector("input[type='radio']");
        if (radio) radio.checked = true;

        // จัดการกรณีตัวเลือก 'other' หรือ 'specify' หรือ 'self'
        const otherInput = card.querySelector(".choice-other-input, textarea");
        if (otherInput) {
          otherInput.disabled = false;
          otherInput.focus();
        }

        // ปิดการใช้งาน input ของตัวเลือกอื่นในกลุ่มเดียวกัน
        if (parentList) {
          parentList.querySelectorAll(".choice-card").forEach((c) => {
            if (c !== card) {
              const otherInp = c.querySelector(".choice-other-input, textarea");
              if (otherInp) otherInp.disabled = true;
            }
          });
        }
      });
    });
  }

  // ฟังก์ชันสลับภาษา
  function switchLanguage(targetLang) {
    if (state.currentLang === targetLang) return;
    state.currentLang = targetLang;
    updateDefaultDates();
    renderLanguage();
    if (window.Analytics) {
      window.Analytics.track("change_language", { lang: state.currentLang });
    }
  }

  // ผูกอีเวนต์ปุ่มสลับภาษา
  if (elements.btnLangTh) {
    elements.btnLangTh.addEventListener("click", () => switchLanguage("th"));
  }
  if (elements.btnLangEn) {
    elements.btnLangEn.addEventListener("click", () => switchLanguage("en"));
  }
  if (elements.langToggleBtn) {
    elements.langToggleBtn.addEventListener("click", () => {
      switchLanguage(state.currentLang === "th" ? "en" : "th");
    });
  }

  // ผูกอีเวนต์ปุ่มเลื่อนหน้าจอบนมือถือ (Smooth Scroll)
  if (elements.jumpToFormBtn) {
    elements.jumpToFormBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("formColumn");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
  if (elements.jumpToStoryBtn) {
    elements.jumpToStoryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("storyColumn");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // ถัดไป
  elements.nextBtn.addEventListener("click", () => {
    if (state.currentStep < state.totalSteps) {
      state.currentStep++;
      renderCurrentStep();
      window.scrollTo({ top: elements.formTitle.offsetTop - 100, behavior: "smooth" });
      if (window.Analytics) {
        window.Analytics.track("step_navigate", { step: state.currentStep });
      }
    }
  });

  // กลับไปหน้าแรก (ขั้นตอนที่ 1)
  if (elements.firstStepBtn) {
    elements.firstStepBtn.addEventListener("click", () => {
      if (state.currentStep > 1) {
        state.currentStep = 1;
        renderCurrentStep();
        window.scrollTo({ top: elements.formTitle.offsetTop - 100, behavior: "smooth" });
        if (window.Analytics) {
          window.Analytics.track("step_navigate", { step: 1 });
        }
      }
    });
  }

  // ย้อนกลับ
  elements.prevBtn.addEventListener("click", () => {
    if (state.currentStep > 1) {
      state.currentStep--;
      renderCurrentStep();
      window.scrollTo({ top: elements.formTitle.offsetTop - 100, behavior: "smooth" });
      if (window.Analytics) {
        window.Analytics.track("step_navigate", { step: state.currentStep });
      }
    }
  });

  // สร้างไฟล์ PDF
  elements.generateBtn.addEventListener("click", async () => {
    if (!state.formData.fullName || state.formData.fullName.trim() === "") {
      const msg = state.currentLang === "th"
        ? "กรุณาระบุชื่อ-นามสกุล ในหน้า 1 เพื่อพิมพ์ลงในเอกสารรับรองครับ"
        : "Please provide your Full Name on Page 1 to include in the certificate.";
      alert(msg);
      state.currentStep = 1;
      renderCurrentStep();
      return;
    }

    // แสดงสถานะกำลังสร้าง
    elements.generationOverlay.classList.add("active");
    const t = window.TRANSLATIONS[state.currentLang];
    elements.generationStatus.textContent = state.currentLang === "th"
      ? "กำลังจัดเตรียมและวาดหน้าเอกสาร (1/10)..."
      : "Preparing and rendering pages (1/10)...";

    if (window.Analytics) {
      window.Analytics.track("generate_pdf_click", { lang: state.currentLang });
    }

    try {
      let pdfBlob;
      const onProgress = (current, total) => {
        elements.generationStatus.textContent = state.currentLang === "th"
          ? `กำลังจัดเตรียมและวาดหน้าเอกสาร (${current}/${total})...`
          : `Preparing and rendering pages (${current}/${total})...`;
      };

      if (state.currentLang === "th") {
        pdfBlob = await window.PdfEngine.generateThaiPdf(state.formData, onProgress);
      } else {
        pdfBlob = await window.PdfEngine.generateEnglishPdf(state.formData, onProgress);
      }

      // ดาวน์โหลดไฟล์
      const defaultName = state.currentLang === "th" ? "ผู้แสดงเจตนา" : "Declarant";
      const cleanName = (state.formData.fullName || defaultName).trim().replace(/[^a-zA-Z0-9ก-๙]/g, "_");
      const filename = state.currentLang === "th"
        ? `หนังสือสั่งดี_${cleanName}.pdf`
        : `Good_Order_Book_(Living_Will)_${cleanName}.pdf`;

      window.PdfEngine.downloadBlob(pdfBlob, filename);

      if (window.Analytics) {
        window.Analytics.track("pdf_download_success", { lang: state.currentLang });
      }

      // ซ่อน Overlay และเปิด Modal
      setTimeout(() => {
        elements.generationOverlay.classList.remove("active");
        openAfterDownloadModal();
      }, 500);

    } catch (err) {
      console.error("PDF generation failed:", err);
      elements.generationOverlay.classList.remove("active");
      const errMsg = state.currentLang === "th"
        ? "เกิดข้อผิดพลาดในการสร้างไฟล์ PDF: " + err.message
        : "An error occurred while generating PDF: " + err.message;
      alert(errMsg);
    }
  });

  // เปิด Modal หลังดาวน์โหลดเสร็จ
  function openAfterDownloadModal() {
    const t = window.TRANSLATIONS[state.currentLang].modal;
    document.getElementById("modalTitle").textContent = t.title;
    document.getElementById("modalSubtitle").textContent = t.subtitle;
    document.getElementById("modalStepsTitle").textContent = t.stepsTitle;
    document.getElementById("modalStep1").textContent = t.s1;
    document.getElementById("modalStep2").textContent = t.s2;
    document.getElementById("modalStep3").textContent = t.s3;
    document.getElementById("modalStep4").textContent = t.s4;
    document.getElementById("modalCloseBtnText").textContent = t.closeBtn;
    document.getElementById("modalSponsorTag").textContent = t.sponsorTag;

    // เช็ค AdSense Slot
    renderModalAd();

    elements.afterDownloadModal.classList.add("active");
  }

  // ปิด Modal
  elements.closeModalBtn.addEventListener("click", () => {
    elements.afterDownloadModal.classList.remove("active");
    if (window.Analytics) {
      window.Analytics.track("modal_closed");
    }
  });

  // ปิด/ย่อแบนเนอร์ด้านล่าง
  elements.closeBannerBtn.addEventListener("click", () => {
    elements.bottomBanner.classList.toggle("minimized");
  });

  // จัดการพื้นที่โฆษณา (Ad Slots)
  function setupAds() {
    const cfg = window.CONFIG && window.CONFIG.ADSENSE;
    if (!cfg) return;

    if (!cfg.ENABLE_MOCK_BANNER && cfg.CLIENT_ID && cfg.CLIENT_ID.trim() !== "") {
      // โหลด Google AdSense จริง (หากยังไม่มีแท็กใน head)
      try {
        if (!document.querySelector(`script[src*="${cfg.CLIENT_ID}"]`)) {
          const adScript = document.createElement("script");
          adScript.async = true;
          adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cfg.CLIENT_ID}`;
          adScript.crossOrigin = "anonymous";
          document.head.appendChild(adScript);
        }

        // Sticky Bottom Banner จริง
        if (cfg.BOTTOM_BANNER_SLOT && cfg.BOTTOM_BANNER_SLOT.trim() !== "") {
          if (elements.bottomBanner) elements.bottomBanner.style.display = "block";
          elements.bannerAdContent.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:inline-block;width:728px;height:90px"
                 data-ad-client="${cfg.CLIENT_ID}"
                 data-ad-slot="${cfg.BOTTOM_BANNER_SLOT}"></ins>
          `;
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          // หากยังไม่ได้กำหนด Ad Slot ID ให้ซ่อนแถบล่างไว้ก่อนเพื่อให้หน้าเว็บสะอาดและเรียบร้อย
          if (elements.bottomBanner) {
            elements.bottomBanner.style.display = "none";
          }
        }
      } catch (e) {
        console.warn("[AdSense] Load error:", e);
      }
    } else {
      if (elements.bottomBanner) elements.bottomBanner.style.display = "block";
      // Mock Banner สวยงามสำหรับช่วงพัฒนาระบบ
      elements.bannerAdContent.innerHTML = `
        <div class="ad-mock-slot">
          <span class="ad-mock-tag">Sponsor / Ads</span>
          <span class="ad-mock-text">${window.TRANSLATIONS[state.currentLang].banner.mockText}</span>
        </div>
      `;
    }
  }

  function renderModalAd() {
    const cfg = window.CONFIG && window.CONFIG.ADSENSE;
    const modalSlotWrapper = document.querySelector(".ad-modal-slot");
    if (cfg && !cfg.ENABLE_MOCK_BANNER && cfg.CLIENT_ID && cfg.AFTER_DOWNLOAD_MODAL_SLOT) {
      if (modalSlotWrapper) modalSlotWrapper.style.display = "block";
      elements.modalAdContent.innerHTML = `
        <ins class="adsbygoogle"
             style="display:inline-block;width:300px;height:250px"
             data-ad-client="${cfg.CLIENT_ID}"
             data-ad-slot="${cfg.AFTER_DOWNLOAD_MODAL_SLOT}"></ins>
      `;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } else if (cfg && !cfg.ENABLE_MOCK_BANNER && (!cfg.AFTER_DOWNLOAD_MODAL_SLOT || cfg.AFTER_DOWNLOAD_MODAL_SLOT.trim() === "")) {
      // ซ่อนกล่องโฆษณาในโมดอล หากยังไม่มี Ad Slot
      if (modalSlotWrapper) modalSlotWrapper.style.display = "none";
    } else {
      if (modalSlotWrapper) modalSlotWrapper.style.display = "block";
      elements.modalAdContent.innerHTML = `
        <div class="ad-mock-slot" style="min-height: 120px; flex-direction: column;">
          <span class="ad-mock-tag">Google AdSense • Sponsor Space</span>
          <span class="ad-mock-text" style="font-size: 0.9rem; margin-top: 0.5rem;">
            พื้นที่สำหรับแสดงโฆษณาผู้สนับสนุนโครงการ (ขนาด 300x250 หรือ Responsive)<br>
            พร้อมเปิดรับป้ายโฆษณาเมื่อเชื่อมต่อ Client ID
          </span>
        </div>
      `;
    }
  }

  // เริ่มต้นทำงาน
  renderLanguage();
  setupAds();
});
