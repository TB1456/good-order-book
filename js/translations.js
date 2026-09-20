/**
 * พจนานุกรมคำแปลภาษาไทย - อังกฤษ (Thai - English Translations)
 * สำหรับเว็บไซต์ "หนังสือสั่งดี" (Living Will / Advance Directive)
 */

const TRANSLATIONS = {
  th: {
    appTitle: "หนังสือ “สั่งดี”",
    appSubtitle: "มีสติ | มีความต้องการ | มีการวางแผน | เพื่อกลับคืนสู่ธรรมชาติอย่างสงบ",
    switchLang: "English",
    privacyBadge: "ความปลอดภัย 100% (ประมวลผลบนเครื่อง ไม่บันทึกลงเซิร์ฟเวอร์)",
    privacyBadgeMain: "ความปลอดภัย 100%",
    privacyBadgeSub: " (ประมวลผลบนเครื่อง)",
    authorTag: "บันทึกโดย คุณ BIRD",

    storyTab: "ที่มาของหนังสือสั่งดี",
    formTab: "กรอกข้อมูลสร้าง PDF",
    jumpToForm: "✏️ เริ่มกรอกแบบฟอร์มทำเอกสาร ↓",
    jumpToStory: "📖 อ่านที่มาและหลักการ 6 ข้อ ↑",

    // The Story (เรื่องเล่าจาก Detail.pdf)
    story: {
      title: "ที่มาของ \"หนังสือสั่งดี\"",
      p1: "คุณพ่อของผม ท่านได้เสียชีวิตลงอย่างสงบ ด้วยวัย 74 ปี เหตุการณ์นี้ ก็ทำให้ผมเปลี่ยนมุมมองบางอย่างในชีวิตไปพอสมควร ขอเล่าเพื่อให้เห็นภาพรวมของเรื่องนี้",
      p2: "คุณพ่อเกิดอาการทรุดจนต้องเรียกรถพยาบาลมารับในเช้ามืดของวันที่ 7 พ.ค. 2020 ท่านรักษาตัวอยู่ที่โรงพยาบาล ประมาณ 2 อาทิตย์ และหมอให้กลับบ้านได้ในวันที่ 19 พ.ค. และวันที่ 21 พ.ค. 2020 เวลาประมาณ 00.30 ท่านได้จากไปอย่างสงบที่บ้าน",
      p3: "ผมและครอบครัว ก็คิดไว้ในใจอยู่แล้วว่า หากพ่อทรุดเมื่อไหร่ ก็น่าจะหนักเอาการอยู่ เพราะโรคประจำตัวที่เป็นอยู่ (เบาหวาน, ความดัน) และท่านก็ปฏิเสธการทานยาคุมอาการมาเป็นปีๆ (ไม่ตรวจร่างกาย, ไม่ไปหาหมอใดๆ ทั้งสิ้น) ใช้คำสั้นๆ ว่า \"ดื้อมากๆๆๆ\"",
      p4: "โอเค เมื่อท่านจากไป สิ่งหนึ่งที่ถือว่า โอเค! ในความรู้สึกของผมที่อยากให้เกิดขึ้น ก็คือ ถ้าท่านจะไป อยากให้ท่านจากไปอย่างสงบที่บ้าน มากกว่าที่โรงพยาบาล ซึ่งในข้อนี้ ลึกๆ แล้ว ผมก็รู้สึกว่า คุณพ่อท่านก็มีความประสงค์แบบนี้เช่นเดียวกัน (ท่านถึงอึดมาได้ 2 อาทิตย์และก็กลับมาเสียชีวิตที่บ้าน)",
      p5: "นั่นคือความรู้สึก โอเค! แต่ความรู้สึกไม่โอเคก็มีเช่นกัน เช่น คุณพ่อท่านบริจาคร่างกายให้กับมหาวิทยาลัยมหิดล แต่ในช่วงโควิดที่ผ่านมา ทุกที่ปิดรับหมด",
      p6: "สิ่งที่ตามมาคือความไม่สบายใจ พ่อเคยบอกเสมอว่า ถ้าแกจากไป ให้เอาร่างกายไปบริจาคเพื่อเป็นกุศล แต่สิ่งที่เกิดขึ้น และก็ไม่มีใครคาดคิดว่า การระบาดของโควิด จะทำให้ทุกอย่างที่เกี่ยวข้องกับเราปั่นป่วนได้เพียงนี้ เราไม่เคยคุยกันเลยว่า ถ้ามีเหตุการณ์ที่ไม่สามารถบริจาคร่างกายได้ จะทำยังไงต่อ",
      p7: "สิ่งนี้เอง จุดประกายให้ผมเกิดความคิดว่า... \"ตอนที่เรามีสติสัมปชัญญะครบถ้วนที่สุด เราก็ควรจะต้องสื่อสารเรื่องนี้กันให้มากที่สุด เช่นกัน\"",
      p8: "เรื่อง \"ความตาย\" เหมือนจะเป็นเรื่องไกลตัว แต่ไม่มีใครรู้หรอกว่า มันจะมาถึงเมื่อไหร่",
      p9: "หลังจากเสร็จในเรื่องกิจธุระเกี่ยวกับงานศพของคุณพ่อ ผมจึงได้ทำการศึกษาอย่างจริงจัง เกี่ยวกับหนังสือแสดงเจตนารมณ์ล่วงหน้า ในการบอกความต้องการในช่วงวาระสุดท้ายของชีวิต",
      p10: "ผมศึกษาอยู่หลายๆ เอกสาร แต่ละเอกสารก็จะมีรายละเอียดบางอย่างที่แตกต่างกันอยู่บ้าง นิดๆ หน่อยๆ แต่หลักๆ ของทุกเอกสารจะมีจุดมุ่งหมายแบบเดียวกันคือ เมื่อถึงวาระสุดท้ายของชีวิต ทุกคนอยากไปแบบไม่ทรมานทั้งตัวเองและทรมานครอบครัว (ที่จะเป็นภาระหรือนอนติดเตียง)",
      p11: "\"หนังสือสั่งดี\" จึงเกิดขึ้นด้วยประการฉะนี้ (ผมเลือกที่จะไม่ใช้คำว่า \"สั่งเสีย\" เพราะผมเชื่อว่า สิ่งที่ปรากฏอยู่ในหนังสือนี้ ควรจะเป็นการ \"สั่งดี\" กันมากกว่า)",
      p12: "และวัตถุประสงค์ของ \"หนังสือสั่งดี\" หากเปรียบการเสียชีวิตเป็นการนำเครื่องบินลงจอด \"หนังสือสั่งดี\" มีจุดประสงค์ให้เกิดการ landing ที่ดีของทั้งสองฝ่าย ทั้งฝ่ายผู้แสดงเจตนาในหนังสือและฝ่ายของครอบครัว เป็นการเชื่อมการสื่อสารให้เกิดความเข้าใจทุกฝ่าย ในขณะที่ยังมีสติสัมปชัญญะกันครบถ้วน และต้องการให้เกิดการ balance ความรู้สึกซึ่งกันและกัน อีกทั้งยังอยากให้เกิดการนำ \"หนังสือสั่งดี\" ไปประยุกต์หรือนำไปปรับใช้เพื่อความเหมาะสมสำหรับตัวท่านหรือครอบครัวของท่านเองอีกด้วย",
      p13: "ใครต้องการก็สามารถดาวน์โหลดแบบฟรีๆ ไม่มีค่าใช้จ่ายใดๆ เราเคารพในความเป็นส่วนตัวของคุณ ข้อมูลทั้งหมดที่คุณกรอกใน \"หนังสือสั่งดี\" จะถูกประมวลผลและสร้างเป็นไฟล์ PDF ภายในเครื่อง (อุปกรณ์) ของคุณทันที โดยไม่มีการบันทึก ส่งต่อ หรือจัดเก็บข้อมูลใดๆ ไว้บนเซิร์ฟเวอร์ของเรา เมื่อคุณปิดหน้าเว็บนี้ ข้อมูลทั้งหมดจะถูกลบหายไปโดยอัตโนมัติ สบายใจและปลอดภัย 100% ครับ",
      p14: "และก็มีอีกเรื่องหนึ่งที่น่าดีใจใน Project นี้ คนแรกที่ดาวน์โหลด \"หนังสือสั่งดี\" มาใช้ ก็คือ... \"คุณแม่\" ของผมเองครับ",
      p15: "ผมหวังว่า \"หนังสือสั่งดี\" จะเป็นประโยชน์ แก่กัลยาณมิตรทุกท่าน ในวงกว้างสืบไป ขอบพระคุณทุกท่าน",
      sign: "— BIRD"
    },

    // มาตรา 12
    lawSection: {
      title: "หลักการมาตรา 12 ของ พ.ร.บ. สุขภาพแห่งชาติ พ.ศ. 2550",
      content: "มาตรา ๑๒ บุคคลมีสิทธิทำหนังสือแสดงเจตนาไม่ประสงค์จะรับบริการสาธารณสุขที่เป็นไปเพียงเพื่อยืดการตายในวาระสุดท้ายของชีวิตตน หรือเพื่อยุติการทรมานจากการเจ็บป่วยได้\nการดำเนินการตามหนังสือแสดงเจตนาตามวรรคหนึ่ง ให้เป็นไปตามหลักเกณฑ์และวิธีการที่กำหนดในกฎกระทรวง\nเมื่อผู้ประกอบวิชาชีพด้านสาธารณสุขได้ปฏิบัติตามเจตนาของบุคคลตามวรรคหนึ่งแล้ว มิให้ถือว่าการกระทำนั้นเป็นความผิดและให้พ้นจากความรับผิดทั้งปวง",
      principlesTitle: "หลักการของหนังสือ “สั่งดี”",
      pList: [
        "เป็นการบอกกล่าวล่วงหน้า ในสิทธิที่จะขอตายตามธรรมชาติอย่างสงบ ไม่ใช่พินัยกรรมหรือมีผลทางกฎหมายเรื่องทรัพย์สินใดๆ",
        "เป็นการบอกกล่าวล่วงหน้า ขณะที่ตัวเรามีสติสัมปชัญญะสมบูรณ์และครบถ้วน",
        "ไม่ใช่การอนุญาตให้เร่งการตายหรือทำให้เสียชีวิตเร็วขึ้น และไม่ใช่เรื่องของการการุณยฆาต แต่อย่างใด",
        "ใช้เฉพาะกรณีเมื่อตัวเราถึงวาระสุดท้ายของชีวิต แพทย์เจ้าของไข้จะเป็นผู้ประเมินตามหลักวิชาทางการแพทย์และแจ้งแก่ครอบครัว/ผู้ดูแล",
        "เป็นการลดช่องว่างและผิดพลาดของการสื่อสาร เมื่อเกิดภาวะวิกฤต",
        "ทำให้เกิดความสบายใจของทั้งผู้แสดงเจตนาและ ครอบครัว / คนใกล้ชิด / ผู้ดูแล"
      ]
    },

    // Interactive Form Titles and Steps
    form: {
      heading: "แบบฟอร์มจัดทำ “หนังสือสั่งดี”",
      subheading: "กรอกข้อมูลด้านล่างให้ครบถ้วน ระบบจะจัดเรียงและสร้างไฟล์ PDF ให้ท่านดาวน์โหลดไปพิมพ์และเซ็นชื่อรับรองได้ทันที",
      stepIndicator: "ขั้นตอนที่ {current} จาก {total}",
      firstStepBtn: "หน้าแรก",
      nextBtn: "ถัดไป",
      prevBtn: "ย้อนกลับ",
      generateBtn: "สร้างเอกสาร PDF (ฟรี)",
      generatingBtn: "กำลังสร้างไฟล์ PDF...",
      agreeOption: "เห็นด้วยกับประโยคนี้",
      disagreeOption: "ไม่เห็นด้วย",
      yesOption: "ใช่",
      noOption: "ไม่ใช่",
      otherOption: "อื่นๆ (ระบุ)",
      otherPlaceholder: "ระบุเพิ่มเติม...",

      step1: {
        title: "หน้า 1: ข้อมูลผู้ทำหนังสือสั่งดี",
        fullName: "ชื่อ - นามสกุล",
        fullNamePlaceholder: "เช่น นายสมชาย ใจดี",
        idCard: "เลขประจำตัวประชาชน (13 หลัก)",
        idCardPlaceholder: "1-xxxx-xxxxx-xx-x",
        address: "ที่อยู่ (ตามบัตรประชาชนหรือที่พักอาศัย)",
        addressPlaceholder: "บ้านเลขที่, ซอย, ถนน, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, รหัสไปรษณีย์",
        age: "อายุ (ปี)",
        agePlaceholder: "เช่น 65",
        day: "วันที่ทำหนังสือ",
        month: "เดือน",
        year: "ปี พ.ศ.",
        signNotice: "* เมื่อพิมพ์เอกสารออกมาแล้ว กรุณาเซ็นชื่อรับรองด้วยปากกาในกรอบท้ายหน้าทุกหน้า"
      },

      step2: {
        title: "หน้า 2: การมีสติสัมปชัญญะสมบูรณ์",
        statement: "ในขณะให้ข้อมูลในหนังสือ “สั่งดี” นี้ ข้าพเจ้ามีสติสัมปชัญญะ สมบูรณ์ ครบถ้วน ทุกประการ",
        question: "ท่านขอยืนยันตามข้อความข้างต้นหรือไม่?",
        yesConfirm: "ข้าพเจ้าขอยืนยันว่ามีสติสัมปชัญญะสมบูรณ์ครบถ้วน"
      },

      step3: {
        title: "หน้า 3: ทัศนคติต่อชีวิตและความตาย & สถานที่จากไป",
        q1: "โลกมอบความเสมอภาคให้พวกเราทุกคน นั่นคือ “เวลา 24 ชั่วโมง” และ “ความตาย”",
        q2: "เกิด แก่ เจ็บ ตาย คือ “เรื่องธรรมดา” ที่สุด",
        q3: "ความต้องการ “กลับคืนสู่ธรรมชาติอย่างสงบ” คือสิ่งที่ข้าพเจ้าปรารถนา",
        q4: "หากสามารถเลือกได้ ข้าพเจ้ามีความประสงค์ที่จะ “กลับคืนสู่ธรรมชาติอย่างสงบ” ณ สถานที่...",
        optHome: "บ้าน",
        optHospital: "โรงพยาบาล",
        optAppropriate: "แล้วแต่สถานการณ์และความเหมาะสม"
      },

      step4: {
        title: "หน้า 4: ภาวะฉุกเฉินวิกฤต & สิทธิการรับทราบความจริง",
        q1: "1. หากข้าพเจ้ามีอาการที่เข้าข่ายภาวะฉุกเฉินวิกฤต",
        optNearestHosp: "ให้พาข้าพเจ้าไปรักษาที่โรงพยาบาลใดก็ได้ ที่ใกล้ที่สุด (ตามสิทธิ UCEP รักษาฟรี 72 ชม.*)",
        optSpecifyHosp: "ให้พาข้าพเจ้าไปรักษายังโรงพยาบาลที่ได้ระบุดังนี้",
        specifyHospPlaceholder: "ระบุชื่อโรงพยาบาลที่ต้องการ",
        q2: "2. หลังจากแพทย์ประเมินอาการ หากข้าพเจ้ายังพอจะมีสติสัมปชัญญะหลงเหลืออยู่บ้าง ครอบครัว / ผู้ดูแล จะต้องบอก “ความจริง” เกี่ยวกับอาการ ให้ข้าพเจ้าได้รับทราบ เพื่อให้ข้าพเจ้าสามารถพอที่จะใช้สติส่วนที่เหลือกับวาระสุดท้ายของชีวิตอย่างภาคภูมิ",
        q3: "3. ข้าพเจ้าขอรักษาตามอาการ เพียงเพื่อบรรเทาอาการทุกข์ทรมาน เท่านั้น ข้าพเจ้าขอปฏิเสธการรักษาที่จะยืดการตายของข้าพเจ้าออกไป โดยเทคโนโลยีที่ยุ่งยาก หรือผิดธรรมชาติจนเกินควร และเป็นภาระต่อครอบครัว / ผู้ดูแล ในภายภาคหน้า",
        ucepNote: "* UCEP (ยูเซป) สิทธิเจ็บป่วยฉุกเฉินวิกฤตมีสิทธิทุกที่ รักษาฟรี 72 ชั่วโมงแรกในโรงพยาบาลที่ใกล้ที่สุด"
      },

      step5: {
        title: "หน้า 5: เจตนาปฏิเสธการรักษา (สมอง, หัวใจ, การหายใจ)",
        intro: "4. ไม่ว่าจะด้วยจากสาเหตุ การประสบอุบัติเหตุ หรือชราภาพ และไม่สามารถรักษาข้าพเจ้าให้กลับมาเป็นปกติ ทั้งทางกายภาพ หรือทางสมอง, อวัยวะต่างๆ ข้าพเจ้าขอให้ครอบครัว / ผู้ดูแล ปฏิบัติตามความต้องการ ดังต่อไปนี้...",
        q1: "4.1 หากสมองของข้าพเจ้า ทำงานไม่ปกติ เสื่อม หมดสติ ไม่สามารถรับรู้ วันเวลา จดจำ หรือสื่อสารได้ และแพทย์วินิจฉัยว่า แม้จะรักษาด้วยวิธีใด ข้าพเจ้าไม่สามารถจะกลับมาใช้ชีวิตแบบปกติได้อีก ข้าพเจ้าขอปฏิเสธการผ่าตัดที่เกี่ยวข้องกับสมองทุกประการ",
        q2: "4.2 หากหัวใจของข้าพเจ้า ทำงานไม่ปกติ เสื่อม หรือหยุดเต้น ข้าพเจ้าขอปฏิเสธการกระตุ้นหัวใจทุกประการ (DNR - ปฏิเสธการปั๊มหัวใจ/ช็อกไฟฟ้า)",
        q3: "4.3 หากการหายใจของข้าพเจ้า ทำงานไม่ปกติ เสื่อม หรือล้มเหลว ข้าพเจ้าขอปฏิเสธการเจาะคอหรือใช้เครื่องช่วยหายใจ"
      },

      step6: {
        title: "หน้า 6: เจตนาปฏิเสธการรักษา (อาหารสายยาง, โรคระยะสุดท้าย, ภาวะแทรกซ้อน)",
        q4: "4.4 หากข้าพเจ้าไม่สามารถรับประทานอาหาร หรือกลืนน้ำได้เอง ข้าพเจ้าขอปฏิเสธการให้อาหารทางสายยาง และการให้สารน้ำและยาทางหลอดเลือดดำ",
        q5: "4.5 หากข้าพเจ้าเป็นโรคที่ไม่สามารถรักษาให้หายเป็นปกติได้ เช่น โรคมะเร็ง และอยู่ในจุดที่ภาวะร่างกายของข้าพเจ้า ไม่สามารถรับรู้อะไรทั้งสิ้นได้แล้ว ข้าพเจ้าขอปฏิเสธการรักษาใดๆ ทั้งสิ้น ที่จะชะลอหรือยืดเวลาการตายของข้าพเจ้าออกไป อันจะเป็นการทำให้ข้าพเจ้าต้องทนทุกข์ทรมาน ซึ่งเป็นภาวะที่ข้าพเจ้าไม่ต้องการ",
        q6: "4.6 หากข้าพเจ้าเกิดมีภาวะแทรกซ้อนขึ้นมาใหม่ ที่นอกเหนือจากอาการที่กำลังรักษาอยู่เดิม และต้องทำการผ่าตัด, การเปลี่ยนถ่ายเลือด, การให้ยาปฏิชีวนะ ข้าพเจ้าขอปฏิเสธการรักษาดังกล่าวทุกประการ",
        q7: "4.7 ค่าใช้จ่ายในการรักษา ต้องไม่เกินความสามารถของข้าพเจ้าและครอบครัว ที่สามารถจะจ่ายได้ หากต้องมีการรักษาที่มีค่าใช้จ่ายที่แพง แต่ไม่สามารถทำให้ข้าพเจ้ากลับมาเป็นปกติ มีแต่จะชะลอหรือยืดเวลาการตายของข้าพเจ้าออกไป ข้าพเจ้าขอปฏิเสธการรักษาดังกล่าวทุกประการ"
      },

      step7: {
        title: "หน้า 7: การจัดการภายหลังเสียชีวิต & พิธีกรรมทางศาสนา",
        intro: "ส่วนนี้ เป็นเหตุการณ์ภายหลังที่ได้ “กลับคืนสู่ธรรมชาติอย่างสงบ” แล้ว",
        q5: "5. ข้าพเจ้าได้บริจาคร่างกายไว้แล้วหรือไม่?",
        q5_1: "5.1 สถานที่ ที่ข้าพเจ้าได้บริจาคร่างกายไว้คือ",
        placePlaceholder: "เช่น คณะแพทยศาสตร์ โรงพยาบาลรามาธิบดี",
        q6: "6. จากข้อ 5 หากในช่วงที่ข้าพเจ้าเสียชีวิต สถานที่ ที่ข้าพเจ้าได้บริจาคร่างกายให้ ไม่สามารถเปิดรับบริจาคร่างกายได้ด้วยเหตุบางประการ (เช่น โรคระบาด หรือร่างกายไม่สมบูรณ์พอในการศึกษา) ข้าพเจ้ายินยอมให้ครอบครัว / ผู้ดูแล นำร่างของข้าพเจ้าไปประกอบพิธีกรรมทางศาสนา",
        q7: "7. ข้าพเจ้าต้องการให้ครอบครัว / ผู้ดูแล เป็นผู้ตัดสินใจทั้งหมดแทนข้าพเจ้า ในเรื่องการประกอบพิธีกรรมทางศาสนา ตามสมควรกับสถานการณ์",
        optDecideFamily: "ใช่ (ให้ครอบครัวเป็นผู้ตัดสินใจ)",
        optDecideSelf: "ไม่ใช่ (ข้าพเจ้าขอตัดสินใจด้วยตัวเองในข้อ 8)",
        q8: "8. ข้าพเจ้าต้องการเป็นผู้ตัดสินใจในเรื่องการประกอบพิธีกรรมทางศาสนา ด้วยตัวข้าพเจ้าเอง ดังนี้",
        q8Placeholder: "ระบุความประสงค์ เช่น จัดงานสวดพระอภิธรรมกี่คืน, วัดใด, การลอยอังคาร หรือความเรียบง่ายตามที่ปรารถนา..."
      },

      step8: {
        title: "หน้า 8: ผู้มีอำนาจตัดสินใจแทน & พยานรับรอง",
        intro: "9. ในขณะที่ให้ข้อมูลในหนังสือ “สั่งดี” ของข้าพเจ้าฉบับนี้ ข้าพเจ้ามีสติสัมปชัญญะ สมบูรณ์ ครบถ้วน ทุกประการ และเมื่อเวลา “วิกฤตของข้าพเจ้า” มาถึง หากสถานการณ์จริงกับข้อมูลที่ให้ไว้สร้างความไม่ชัดเจน ข้าพเจ้าขอให้บุคคลดังต่อไปนี้ เป็นผู้ตัดสินใจและร่วมพิจารณากับแพทย์:",
        repTitle: "ผู้มีสิทธิตัดสินใจแทนร่วมกับแพทย์ (สูงสุด 3 ท่าน)",
        rep1Name: "ท่านที่ 1: ชื่อ-นามสกุล",
        rep1Rel: "สถานะ / ความสัมพันธ์ (เช่น บุตร, คู่สมรส, พี่น้อง)",
        rep2Name: "ท่านที่ 2: ชื่อ-นามสกุล",
        rep2Rel: "สถานะ / ความสัมพันธ์",
        rep3Name: "ท่านที่ 3: ชื่อ-นามสกุล",
        rep3Rel: "สถานะ / ความสัมพันธ์",
        namePlaceholder: "ชื่อ-นามสกุล",
        relPlaceholder: "ความสัมพันธ์",
        dedicationText: "10. ข้าพเจ้าขอให้อุทิศผลบุญที่ข้าพเจ้าเคยสร้างไว้ ดลบันดาลให้สิ่งที่ข้าพเจ้าต้องการและมีความปรารถนาในหนังสือ “สั่งดี” ฉบับนี้ จงประสบผลสำเร็จทุกประการ เพื่อความสงบสุขในการกลับคืนสู่ธรรมชาติอีกครั้งของข้าพเจ้า",
        witnessHeader: "พยานลงนาม (2 ท่าน)",
        witness1: "ชื่อพยานท่านที่ 1",
        witness2: "ชื่อพยานท่านที่ 2",
        witnessPlaceholder: "ชื่อ-นามสกุล พยาน",
        witnessNotice: "* ชื่อพยานจะพิมพ์ลงในเอกสาร เพื่อให้พยานทั้งสองท่านลงลายมือชื่อด้วยปากกาหลังจากพิมพ์เอกสารออกมาแล้ว"
      },

      step9: {
        title: "หน้า 9: รายละเอียดเพิ่มเติมที่ต้องการระบุ (ถ้ามี)",
        intro: "ส่วนนี้เป็นการบอกกล่าวรายละเอียดเพิ่มเติม โดยการเขียน",
        notesPlaceholder: "ระบุความประสงค์ ข้อความถึงคนที่รัก หรือคำสั่งเสียอื่นใดที่ท่านต้องการเพิ่มเติมเป็นพิเศษ (เว้นว่างไว้ได้หากไม่มี)..."
      },

      step10: {
        title: "หน้า 10: ขั้นตอนปฏิบัติเพื่อให้หนังสือสั่งดีเกิดผลสมบูรณ์",
        instructionsList: [
          "1. กดปุ่ม 'สร้างเอกสาร PDF' เพื่อดาวน์โหลดไฟล์เข้าสู่เครื่องของท่าน",
          "2. พิมพ์ (Print) เอกสารออกมาเป็นกระดาษ A4",
          "3. แสดงเจตนาในหนังสือ โดยเซ็น ลายเซ็นหรือลายมือชื่อ เพื่อรับรอง ทุกหน้า",
          "4. ต้องบอกกล่าวเรื่องนี้ให้ครอบครัว / คนใกล้ชิด / ผู้ดูแล ได้รับทราบอย่างเปิดใจ",
          "5. ให้คนในครอบครัว / คนใกล้ชิด / ผู้ดูแล เซ็นชื่อเป็นพยาน จำนวน 2 ท่าน ในหน้า 8",
          "6. เก็บเอกสารฉบับจริงนี้ไว้ในที่ปลอดภัยและจดจำได้ง่าย (เช่น ในแฟ้มเอกสารสำคัญประจำบ้าน)",
          "7. ควรทำสำเนาหนังสือฉบับนี้ไว้สัก 3 สำเนา มอบให้ผู้ดูแลหลักและติดตัวไว้",
          "8. หากต้องการแก้ไข ให้ดาวน์โหลดไฟล์มาทำใหม่ และควรทำลายเอกสารชุดเดิมทิ้ง โดยครอบครัวจะยึดถือฉบับที่มี 'วันที่ล่าสุด' เป็นสำคัญ"
        ],
        readyPrompt: "ท่านได้ตรวจสอบข้อมูลเรียบร้อยแล้ว กดปุ่มด้านล่างเพื่อสร้างไฟล์ PDF ได้ทันทีครับ"
      }
    },

    modal: {
      title: "สร้างเอกสาร PDF เรียบร้อยแล้ว!",
      subtitle: "ระบบได้จัดเตรียมไฟล์และดาวน์โหลดลงในอุปกรณ์ของท่านเรียบร้อยแล้ว",
      stepsTitle: "ขั้นตอนสำคัญถัดไป:",
      s1: "1. ตรวจสอบไฟล์ในโฟลเดอร์ดาวน์โหลด (Downloads) บนอุปกรณ์ของท่าน",
      s2: "2. พิมพ์ (Print) เอกสารทั้ง 10 หน้าออกมาลงกระดาษ",
      s3: "3. ใช้ปากกาลงลายมือชื่อรับรองที่กรอบด้านล่างของ 'ทุกหน้า'",
      s4: "4. ให้พยาน 2 ท่านลงลายมือชื่อในหน้า 8 และบอกกล่าวให้ครอบครัวทราบ",
      sponsorTag: "ผู้สนับสนุนโครงการ / Sponsorship",
      closeBtn: "ปิดหน้าต่างนี้"
    },

    banner: {
      adLabel: "โฆษณาผู้สนับสนุน",
      closeBtn: "ย่อแบนเนอร์",
      mockText: "พื้นที่สนับสนุนโครงการ 'หนังสือสั่งดี' เพื่อให้ทุกคนเข้าถึงได้ฟรีตลอดไป"
    }
  },

  en: {
    appTitle: "Good Order Book",
    appSubtitle: "Mindfulness | Personal Will | Thoughtful Planning | For a Peaceful Return to Nature",
    switchLang: "ภาษาไทย",
    privacyBadge: "100% Privacy Guaranteed (Client-side Only)",
    privacyBadgeMain: "100% Privacy Guaranteed",
    privacyBadgeSub: " (Client-side Only)",
    authorTag: "Written & Conceptualized by BIRD",

    storyTab: "The Origin & Purpose",
    formTab: "Fill Form & Generate PDF",
    jumpToForm: "✏️ Jump to Living Will Form ↓",
    jumpToStory: "📖 Read Origin Story & Principles ↑",

    // The Story in English
    story: {
      title: "The Origin of \"Good Order Book\" (Living Will)",
      p1: "My father passed away peacefully at the age of 74. This profound event reshaped my outlook on life in meaningful ways. Allow me to share the story behind this project.",
      p2: "In the early hours of May 7, 2020, my father's health took a critical turn, requiring an ambulance to the hospital. He stayed under hospital care for about two weeks before doctors allowed him to return home on May 19. On May 21, 2020, at approximately 00:30, he breathed his last peacefully in our home.",
      p3: "My family and I had long anticipated this day might be challenging. He battled chronic illnesses (diabetes, hypertension) and had steadfastly refused maintenance medication for years—no checkups, no doctor visits, stubborn to the very core.",
      p4: "Yet, when his time came, one thing brought immense solace: if he had to leave, we wanted him to pass away peacefully at home surrounded by warmth, rather than amidst cold hospital machines. In my heart, I knew this was his heartfelt wish too (he held on for two grueling weeks just to return home).",
      p5: "That part felt 'Okay.' But another realization brought deep sorrow: My father had long intended to donate his body to Mahidol University for medical education. However, during the peak of the COVID-19 pandemic, donation centers nationwide were completely closed.",
      p6: "This left us with lingering heartache. He had repeatedly said: when he was gone, give his body to medicine as a final act of merit. Yet no one foresaw how severely the pandemic would throw our world into chaos. We had never discussed: what should we do if body donation was suddenly impossible?",
      p7: "This sparked a vital truth in me: \"When our mind and consciousness are at their absolute clearest, that is precisely when we must communicate these critical wishes with each other the most.\"",
      p8: "Death often feels distant, yet none of us knows when our final chapter will arrive.",
      p9: "Once my father's funeral was completed, I embarked on a rigorous study of Advance Directives and Living Wills, seeking ways to express medical wishes for life's final stage.",
      p10: "I examined countless documents. While formats varied slightly, they all converged on a singular purpose: when reaching the end of life, everyone desires a peaceful passage without agonizing suffering—both for themselves and for the family who loves them.",
      p11: "Thus, the \"Good Order Book\" was born. I consciously avoided the traditional Thai term 'สั่งเสีย' (mournful last words), because I believe expressing these intentions is truly an act of 'Ordering Well' (สั่งดี)—peaceful, proactive, and compassionate.",
      p12: "The Purpose: If dying is like landing an airplane, the Good Order Book aims to ensure a gentle, safe 'Landing' for both sides—the person declaring their will and the family beside them. It bridges open communication, balances emotions, and offers a flexible template adaptable to each individual's circumstances.",
      p13: "Anyone who needs this can download it completely free. We deeply respect your privacy. All information you fill out is processed and compiled into a PDF exclusively inside your personal device (browser). Nothing is ever recorded, transmitted, or stored on our servers. The moment you close this page, all entered data vanishes forever. 100% private and secure.",
      p14: "And there is one more heartwarming joy in this project: The very first person to ever download and use the 'Good Order Book' was none other than... my beloved mother.",
      p15: "I sincerely hope that the 'Good Order Book' brings comfort, clarity, and peace to good-hearted friends everywhere. Thank you from the bottom of my heart.",
      sign: "— BIRD"
    },

    lawSection: {
      title: "Section 12 of Thailand's National Health Act B.E. 2550 (2007)",
      content: "Section 12: A person has the right to make an advance declaration expressing their intent not to receive public health services that are intended merely to prolong the final stage of life or to terminate suffering caused by an illness.\nThe execution of the declaration shall adhere to procedures prescribed in ministerial regulations.\nWhen healthcare professionals have complied with the person's declared intent, such actions shall not be deemed an offence and they shall be exempted from all legal liabilities.",
      principlesTitle: "Guiding Principles of \"Good Order Book\"",
      pList: [
        "A formal advance statement exercising the right to a natural, peaceful death—not a financial will or property deed.",
        "Created while possessing sound mind, memory, and full conscious awareness.",
        "Does NOT permit euthanasia or deliberate hastening of death; it strictly prevents unnatural prolongation.",
        "Applies strictly when reaching terminal stage, as medically determined by the attending physician.",
        "Bridges communication gaps and eliminates doubts and conflicts during medical crises.",
        "Brings peace of mind to both the individual and their beloved family, caregivers, and relatives."
      ]
    },

    form: {
      heading: "Living Will Form (Good Order Book)",
      subheading: "Please fill out the sections below. The system will compile your choices and generate a ready-to-print PDF for physical signing.",
      stepIndicator: "Section {current} of {total}",
      firstStepBtn: "First Step",
      nextBtn: "Next",
      prevBtn: "Previous",
      generateBtn: "Generate PDF (Free)",
      generatingBtn: "Generating your PDF...",
      agreeOption: "I agree with this statement",
      disagreeOption: "I disagree",
      yesOption: "Yes",
      noOption: "No",
      otherOption: "Other (Please specify)",
      otherPlaceholder: "Please specify...",

      step1: {
        title: "Page 1: Declarant Personal Details",
        fullName: "Full Name",
        fullNamePlaceholder: "e.g. John Doe / Somchai Jaidee",
        idCard: "Citizen ID / Passport Number",
        idCardPlaceholder: "National ID or Passport No.",
        address: "Address (Current Residence)",
        addressPlaceholder: "House number, street, sub-district, district, province, postal code, country",
        age: "Age (Years)",
        agePlaceholder: "e.g. 65",
        day: "Day",
        month: "Month",
        year: "Year (B.E. or A.D.)",
        signNotice: "* After printing, please sign by hand in the certification signature box at the bottom of every page."
      },

      step2: {
        title: "Page 2: Sound Mind & Mental Capacity Confirmation",
        statement: "At the time of providing information in this 'Good Order Book', I declare that I possess sound mind, memory, and full conscious awareness in every respect.",
        question: "Do you confirm the statement above?",
        yesConfirm: "I hereby confirm I possess sound mind and full mental capacity"
      },

      step3: {
        title: "Page 3: Philosophy on Life and Death & Preferred Place of Passing",
        q1: "The world grants equality to all of us in two things: '24 hours in a day' and 'death'.",
        q2: "Birth, aging, illness, and death are the most natural occurrences of life.",
        q3: "The desire to 'return peacefully to nature' is my true aspiration.",
        q4: "If given a choice, I express my wish to 'return peacefully to nature' at...",
        optHome: "Home",
        optHospital: "Hospital",
        optAppropriate: "Depending on the circumstances and medical appropriateness"
      },

      step4: {
        title: "Page 4: Emergency Crisis & Right to Truthful Diagnosis",
        q1: "1. In the event of an acute, life-threatening emergency:",
        optNearestHosp: "Transport me to the nearest available hospital immediately (under UCEP emergency coverage).",
        optSpecifyHosp: "Transport me to this specific hospital:",
        specifyHospPlaceholder: "Name of preferred hospital",
        q2: "2. Following medical assessment, if I still possess any remaining consciousness, my family / caregivers must disclose the 'truth' regarding my condition to me, so that I may utilize my remaining consciousness with dignity in life's final chapter.",
        q3: "3. I request only symptomatic and palliative care to alleviate pain and suffering. I explicitly refuse treatments that merely prolong the dying process through invasive, unnatural medical technologies that impose future emotional and financial burdens on my loved ones.",
        ucepNote: "* UCEP: Universal Coverage for Emergency Patients provides critical emergency treatment at the nearest facility for the first 72 hours."
      },

      step5: {
        title: "Page 5: Refusal of Life-Prolonging Measures (Brain, Heart, Respiration)",
        intro: "4. Whether due to accident or advanced age, if medical science cannot restore me to normal physical, neurological, or organ functioning, I request my family and healthcare providers to honor my explicit directives as follows:",
        q1: "4.1 If my brain functions abnormally, deteriorates, becomes unconscious, or loses cognitive awareness and communication, and physicians diagnose that I cannot return to normal life, I refuse any surgical interventions concerning the brain.",
        q2: "4.2 If my heart stops or undergoes cardiac arrest, I refuse all forms of cardiopulmonary resuscitation (CPR, chest compressions, electrical defibrillation / DNR).",
        q3: "4.3 If my respiratory system fails or deteriorates, I refuse tracheostomy (throat incision) and artificial mechanical ventilation (intubation/ventilator)."
      },

      step6: {
        title: "Page 6: Refusal of Artificial Nutrition, Terminal Illness Prolongation & Complications",
        q4: "4.4 If I am unable to eat or swallow naturally, I refuse artificial nutrition via nasogastric/PEG tube feeding, as well as intravenous fluid therapy.",
        q5: "4.5 If I suffer from an incurable disease (such as terminal cancer) and reach a state where I can no longer perceive surroundings, I refuse all treatments aimed merely at delaying death that would prolong needless suffering.",
        q6: "4.6 If new medical complications arise beyond my primary illness that necessitate invasive surgery, blood transfusions, or intensive antibiotic regimens, I refuse such treatments.",
        q7: "4.7 Treatment costs must not exceed what I and my family can reasonably afford. If expensive treatments merely prolong the dying process without restoring quality of life, I refuse such interventions."
      },

      step7: {
        title: "Page 7: Post-Mortem Wishes & Funeral Arrangements",
        intro: "Directives for events after peacefully returning to nature:",
        q5: "5. Have you registered for anatomical body donation?",
        q5_1: "5.1 The medical institution/university registered for body donation is:",
        placePlaceholder: "e.g. Faculty of Medicine, Siriraj Hospital / Chulalongkorn University",
        q6: "6. Regarding item 5: If at the time of my death, the registered institution cannot accept body donation due to unforeseen circumstances (e.g. pandemic outbreak or condition unsuitable for study), I grant consent for my family/caregivers to conduct religious funeral rites.",
        q7: "7. I wish for my family / caregivers to make all decisions regarding my religious funeral arrangements as appropriate for the situation.",
        optDecideFamily: "Yes (Family decides)",
        optDecideSelf: "No (I have outlined specific funeral instructions in Item 8)",
        q8: "8. I wish to specify my own funeral arrangements as follows:",
        q8Placeholder: "Describe your wishes, e.g. number of prayer nights, preferred temple/location, sea scattering of ashes, or minimalist ceremony..."
      },

      step8: {
        title: "Page 8: Designated Healthcare Decision-Makers & Witnesses",
        intro: "9. I confirm that I make this declaration in full sound mind. When my critical hour arrives, should ambiguity arise between real-time circumstances and this document, I designate the following individuals to consult and decide with medical doctors on my behalf:",
        repTitle: "Designated Decision-Makers (Up to 3 persons)",
        rep1Name: "Person 1: Full Name",
        rep1Rel: "Relationship (e.g. Spouse, Son, Daughter, Sibling)",
        rep2Name: "Person 2: Full Name",
        rep2Rel: "Relationship",
        rep3Name: "Person 3: Full Name",
        rep3Rel: "Relationship",
        namePlaceholder: "Full Name",
        relPlaceholder: "Relationship",
        dedicationText: "10. I dedicate whatever merit and good deeds I have accumulated throughout this life to grant fulfillment to every wish expressed in this 'Good Order Book', enabling a peaceful return to nature.",
        witnessHeader: "Witness Signatures (2 Persons)",
        witness1: "Witness 1 Full Name",
        witness2: "Witness 2 Full Name",
        witnessPlaceholder: "Witness Full Name",
        witnessNotice: "* Witness names will appear on the printed document for handwritten ink signatures on Page 8."
      },

      step9: {
        title: "Page 9: Additional Written Directives (Optional)",
        intro: "Additional written expressions, heartfelt personal messages, or special instructions:",
        notesPlaceholder: "Write any personal messages to your loved ones or additional end-of-life wishes here (leave blank if none)..."
      },

      step10: {
        title: "Page 10: Guidance for Legal and Practical Effectiveness",
        instructionsList: [
          "1. Click 'Generate PDF' below to download your compiled document.",
          "2. Print out all 10 pages on standard A4 paper.",
          "3. Affirm your declaration by signing with a pen in the certification box at the bottom of EVERY page.",
          "4. Discuss this openly and compassionately with your family and healthcare proxies so they understand your wishes.",
          "5. Have 2 trusted individuals sign as witnesses on Page 8.",
          "6. Store the original document in a safe, known location (such as with your vital family records).",
          "7. Make 3 copies: keep one, give one to your primary proxy, and keep one readily accessible.",
          "8. If you ever wish to revise your choices, generate a new document and destroy the old one. Families will honor the most recent date."
        ],
        readyPrompt: "You have reviewed all information. Click the button below to generate your complete Living Will PDF document."
      }
    },

    modal: {
      title: "PDF Generated Successfully!",
      subtitle: "Your Living Will document has been compiled and downloaded to your device.",
      stepsTitle: "Important Next Steps:",
      s1: "1. Locate the file in your device's 'Downloads' folder.",
      s2: "2. Print all pages out onto physical paper.",
      s3: "3. Sign with a pen at the bottom certification box on EVERY page.",
      s4: "4. Have 2 witnesses sign Page 8 and inform your family of your wishes.",
      sponsorTag: "Project Sponsorship / Advertisement",
      closeBtn: "Close this window"
    },

    banner: {
      adLabel: "Sponsor Ad",
      closeBtn: "Hide Banner",
      mockText: "Support the 'Good Order Book' project to keep end-of-life planning free and accessible for all."
    }
  }
};

if (typeof window !== "undefined") {
  window.TRANSLATIONS = TRANSLATIONS;
}
