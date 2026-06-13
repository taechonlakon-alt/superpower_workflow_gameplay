// SUPERPOWER WORKFLOW gameplay data. Cleaned localization file.
const stage01 = {
  "id": "stage_01",
  "status": "available",
  "title": "SUPERPOWER WORKFLOW",
  "stage": "ด่าน 01: ลุยงานด่วน Booking MVP",
  "intro": "ลูกค้าต้องการระบบ Booking MVP สำหรับธุรกิจบริการ: เลือกบริการ, เลือก Time Slot, กรอกข้อมูลติดต่อ, คอนเฟิร์มการจอง, และดูรายการจองพื้นฐาน เกมนี้จะทดสอบว่าคุณสามารถใช้ AI เอาชีวิตรอดด้วย Workflow ที่ถูกต้องได้หรือไม่ ไม่ใช่แค่ Generate โค้ดให้เสร็จไวๆ อย่างเดียว",
  "randomModifiers": [
    {
      "id": "token_leak",
      "title": "Prompt Noise",
      "icon": "AI",
      "tone": "warn",
      "copy": "Prompt Noise จากงานก่อนหน้า ทำให้คุณต้องใช้ AI Budget มากขึ้นเพื่อกรอง Hallucination ออกไป",
      "hint": "มักจะเกิดเมื่อมีการใช้ AI สูงเกินไป ควรแก้ปัญหาด้วยการเช็ค Scope เฉพาะจุด แทนที่จะใช้ Prompt ยาวๆ ซ้ำๆ",
      "tags": [
        "external",
        "token pressure"
      ]
    },
    {
      "id": "deadline_jitter",
      "title": "Deadline Jitter",
      "icon": "CLK",
      "tone": "warn",
      "copy": "Deadline ถูกเลื่อนให้เร็วขึ้น เพราะงานก่อนหน้ากินเวลาหรือมีการขยาย Scope",
      "hint": "ใช้สัญญาณนี้เพื่อตัด Scope หรือเลือกตรวจสอบเฉพาะจุดที่สำคัญ แทนที่จะรีบปั่นงานทุกอย่างให้เสร็จ",
      "tags": [
        "external",
        "time pressure"
      ]
    },
    {
      "id": "risk_spike",
      "title": "ปัญหาที่ซ่อนอยู่",
      "icon": "RISK",
      "tone": "danger",
      "copy": "Edge Case ที่ซ่อนอยู่โผล่ขึ้นมาตอนที่ Workflow กำลังเจอความกดดัน ต้องรีบหาวิธีรับมือด่วน",
      "hint": "เลือกใช้ Guardrails ที่จัดการกับ Edge Case นั้นโดยตรง แทนที่จะแค่ดันงานให้คืบหน้าไปก่อน",
      "tags": [
        "ภายนอก",
        "ความเสี่ยง +1"
      ]
    },
    {
      "id": "lucky_guardrail",
      "title": "Guardrail ช่วยชีวิต",
      "icon": "SHD",
      "tone": "safe",
      "copy": "Workflow Guardrails ที่คุณวางไว้ก่อนหน้านี้ ช่วยดักจับข้อผิดพลาดที่ไม่ตั้งใจเอาไว้ได้",
      "hint": "นี่คือรางวัลของการวาง Guardrails ตั้งแต่เนิ่นๆ: มันไม่ได้แจกแต้มฟรี แต่ช่วยปกป้องคุณจากความโชคร้าย",
      "tags": [
        "ภายนอก",
        "ป้องกัน"
      ]
    },
    {
      "id": "context_static",
      "title": "Context สับสน",
      "icon": "CTX",
      "tone": "warn",
      "copy": "Context Noise จากการตัดสินใจก่อนหน้า บังคับให้ทีมต้องทำ Code Review อย่างละเอียดขึ้นก่อนจะไปต่อ",
      "hint": "เมื่อ Context เริ่มมั่ว ให้กลับไปดู Spec เพื่อเป็นหลักยึด ก่อนที่จะปล่อยให้ AI Generate โค้ดเพิ่ม",
      "tags": [
        "ภายนอก",
        "เสียเวลารีวิว"
      ]
    }
  ],
  "skills": [
    {
      "id": "grill",
      "name": "Grill with Docs",
      "type": "Clarify",
      "icon": "GWD",
      "summary": "เคลียร์ Business Rules ให้ชัดก่อนปล่อย AI เดา",
      "description": "ถามหา Rule การจองที่ชัดเจน เช่น ประเภทบริการ, Time Slot, นโยบายยกเลิก, และการคอนเฟิร์ม",
      "teaches": "ก่อนจะปล่อย AI เขียนโค้ด Booking Rules ต้องชัดเจน เพื่อป้องกันไม่ให้ AI มโน Flow ขึ้นมาเอง"
    },
    {
      "id": "context",
      "name": "CONTEXT.md",
      "type": "Context",
      "icon": "CTX",
      "summary": "ล็อกเป้าหมาย, ผู้ใช้งาน, Scope และ Non-goals",
      "description": "กำหนดเป้าหมายของแอป, Target Users, ขอบเขตงาน (Scope) และสิ่งที่ไม่อยู่ใน Scope (Non-goals) สำหรับ Booking MVP",
      "teaches": "ถ้าไม่มี Context, AI จะขยาย Scope แอป Booking ของเราให้กลายเป็นระบบยักษ์ใหญ่ได้ง่ายๆ"
    },
    {
      "id": "spec",
      "name": "Spec Doc",
      "type": "Guardrail",
      "icon": "DOC",
      "summary": "กำหนด Must-haves และ Out-of-scope ที่ตรวจสอบได้",
      "description": "กำหนดฟีเจอร์ที่ต้องมี (Must-haves) และที่อยู่นอก Scope เช่น ระบบ Payment, Auth, Marketplace และ CRM",
      "teaches": "ถ้าไม่มี Spec ก็ไม่มีเส้นฐาน (Baseline) เอาไว้เช็คว่า Booking Flow นั้นเสร็จจริงๆ หรือมันบวมเกินไป"
    },
    {
      "id": "plan_doc",
      "name": "Implementation Plan",
      "type": "Plan",
      "icon": "PLAN",
      "summary": "จัดลำดับ Task และวิธีตรวจงาน (Verification) ก่อนลงมือ Execute",
      "description": "กำหนดลำดับ Task ในการสร้าง Booking Flow ก่อนจะให้ AI เริ่มเขียนโค้ด",
      "teaches": "ก่อนจะ Execute คุณต้องรู้ลำดับการสร้าง เช่น เลือกบริการ -> เลือก Slot -> ฟอร์ม -> คอนเฟิร์ม"
    },
    {
      "id": "tdd",
      "name": "TDD",
      "type": "Quality",
      "icon": "TDD",
      "summary": "ใช้ TDD Loop เพื่อให้ Test ผ่านก่อนจะไปต่อ",
      "description": "TDD Loop: เขียน Failing Test -> เขียนโค้ดสั้นๆ ให้ Test ผ่าน -> Refactor -> รันใหม่ -> ไป Task ถัดไป",
      "teaches": "TDD Loop ช่วยป้องกันไม่ให้ AI เขียนโค้ดเกินจำเป็น เพราะทุก Task ต้องเริ่มจาก Failing Test"
    },
    {
      "id": "code_review",
      "name": "Code Review",
      "type": "Review",
      "icon": "CHK",
      "summary": "ตรวจสอบ Spec, Scope, Tests, Security, Data และ Quality",
      "description": "ทำ Code Review ก่อนส่งงาน: ตรงตาม Spec ไหม? ผ่าน AC หรือเปล่า? โค้ดอยู่ใน File Scope ที่ถูกไหม? มี Test Coverage รึยัง? มีความเสี่ยงด้าน Security ไหม? Data ถูกต้องไหม? AI เกิด Hallucination หรือมีโค้ดซ้ำซ้อนหรือเปล่า?",
      "teaches": "Code Review ต้องครอบคลุม Spec, AC, File Scope, Tests, Security, Data Integrity, Docs, Hallucination และ Naming"
    },
    {
      "id": "walkthrough",
      "name": "Code Walkthrough",
      "type": "Explain",
      "icon": "WALK",
      "description": "ให้ AI อธิบายการจัดการ State, การ Validate ข้อมูล, และการส่งต่อข้อมูลใน Booking Flow",
      "teaches": "อย่าไว้ใจว่า Flow นั้นสมบูรณ์ เพียงเพราะ AI บอกว่าเสร็จแล้ว",
      "summary": "บังคับ AI ให้อธิบาย State และ Validation ทีละขั้นตอน"
    },
    {
      "id": "risk_scanner",
      "name": "Real-time Risk Scanner",
      "type": "Passive",
      "icon": "SCAN",
      "summary": "แจ้งเตือนเมื่อพบ Secrets, ไม่มี Tests หรือ Logic เปราะบาง",
      "description": "เตือนเมื่อระบบ Booking State ไม่มี Tests รองรับ, มีหลุด Secrets หรือใช้ Logic ที่พังง่าย",
      "teaches": "ความเร็วของ AI ทำให้เราต้องมีระบบแจ้งเตือนความเสี่ยง ก่อนที่ Booking Flow จะพัง"
    },
    {
      "id": "scaffolds",
      "name": "Scaffolds",
      "type": "Support",
      "icon": "KIT",
      "summary": "ใช้ Checklists และ DoD เพื่อดักจับ Edge Cases",
      "description": "ใช้ Checklists, Templates, เส้นทางการ Escalation และ Definition of Done สำหรับ Booking MVP",
      "teaches": "จูเนียร์ไม่ควรสู้กับ AI ลำพัง ต้องมีตัวช่วย (Scaffold) เพื่อช่วยจำ State และดัก Edge Cases"
    },
    {
      "id": "terraform_skill",
      "name": "Terraform",
      "type": "Infra",
      "icon": "IAC",
      "summary": "ตั้ง Guardrails สำหรับ IaC: Tests, Modules, CI/CD, และ Prod Practices",
      "description": "ใช้เฉพาะกับ Terraform: การ Test, รูปแบบ Module, การจัดการ State/Backend, Variables/Secrets และ Best Practices ของ IaC",
      "teaches": "Skill ด้าน Infra มีความเสี่ยงมากกว่าเขียน Docs เพราะมันกระทบกับ Resource จริงๆ ควรใช้แผน Plan-only, Review-first และต้องกดอนุมัติ (Approval) เสมอ",
      "warning": "ห้ามปล่อยให้ AI รัน terraform apply หรือ destroy แบบอัตโนมัติเด็ดขาด ให้ทำ Code Review ตรวจสอบ Plan และความเสี่ยงก่อนเสมอ"
    }
  ],
  "steps": [
    {
      "id": "brainstorm",
      "title": "Brainstorm",
      "goal": {
        "title": "ทำเป้าหมายให้ชัดเจน",
        "copy": "Brainstorming คือเฟสสำหรับทำความเข้าใจ Requirement ของ Booking MVP ให้ชัดเจนพอที่จะตัดสินใจและวางแผนต่อได้",
        "guidance": [
          "อ่าน Docs/Brief ให้เข้าใจก่อน",
          "สรุปเป้าหมายหลักของระบบ Booking",
          "เสนอ Core Flow พื้นฐาน",
          "วิเคราะห์ Trade-offs ที่อาจเกิดขึ้น",
          "ถามคำถามเพื่อเคลียร์ความชัดเจนเรื่อง User, กฎการเลือกบริการและ Slot, นโยบายยกเลิก, และการคอนเฟิร์ม"
        ]
      },
      "briefing": [
        "ลูกค้าต้องการ Booking MVP สำหรับธุรกิจบริการ: User สามารถจอง Slot เวลาได้ และทีมงานสามารถดูรายการจองพื้นฐานได้"
      ],
      "chaosEvents": [
        {
          "id": "vulnerable_brief",
          "title": "Brief ขาด Booking Rules",
          "problem": "เหตุการณ์นักพัฒนาที่เปราะบาง",
          "copy": "ลูกค้าบอกแค่ว่า 'อยากได้ระบบจองคิวเร็วๆ' แต่ทีมไม่รู้เลยว่าใครคือคนจอง, Slot เวลาซ้อนทับกันได้ไหม, ต้องคอนเฟิร์มแบบไหน, และอะไรคือ Non-goals ของ MVP นีั",
          "danger": "การข้าม Workflow จะทำให้ AI เดา Requirement เอาเองทั้งหมด",
          "options": [
            {
              "id": "chaos_vibe_brief",
              "label": "ปล่อยให้ AI เติมคำในช่องว่าง",
              "icon": "AI",
              "tone": "gray",
              "tags": [
                "Fast",
                "Skip Workflow"
              ],
              "helper": "ให้ AI ตีความ Brief สั้นๆ และเดา Booking Flow ขึ้นมาเอง",
              "tradeoff": "เร็วดี แต่ประเภทบริการ, กฎของ Slot, การคอนเฟิร์ม และคำถามอื่นๆ จะไม่ได้รับคำตอบที่แท้จริง",
              "resolveMsg": "AI เติมข้อมูลให้จน Brief ดูสมบูรณ์ แต่ทีมก็ยังอธิบายไม่ได้อยู่ดีว่ากฎการจองจริงๆ คืออะไร และยังมีคำถามอะไรที่ตกหล่น",
              "lesson": "AI จะเสนอ Booking Flow ได้ดีเมื่อได้รับเป้าหมายและ Context ที่ชัดเจน ไม่ใช่ตอนที่โดนบังคับให้เดาสิ่งที่ว่างเปล่า",
              "problem": "เหตุการณ์นักพัฒนาที่เปราะบาง"
            }
          ],
          "skillOptions": [
            {
              "skill": "grill",
              "id": "chaos_grill_docs",
              "label": "Grill with Docs",
              "icon": "GWD",
              "tone": "blue",
              "tags": [
                "Ask remaining questions",
                "Close unknowns"
              ],
              "helper": "ใช้ Docs/Brief ในการตั้งคำถามเกี่ยวกับ Target User, ประเภทบริการ, กฎของ Slot, การยกเลิก และการคอนเฟิร์ม",
              "tradeoff": "ใช้เวลาตั้งคำถามหน่อย แต่ Booking Flow จะไม่ต้องพึ่งการเดา",
              "resolveMsg": "คุณได้เคลียร์คำถามสำคัญ ทำให้รู้ว่าเป้าหมายคือการจองที่สำเร็จพร้อมหลักฐานการคอนเฟิร์ม ไม่ใช่แค่หน้าตา UI เปล่าๆ",
              "lesson": "Grill with Docs ช่วยในขั้นตอนสุดท้ายของ Brainstorming: เคลียร์คำถามที่เหลือให้ชัดก่อนจะให้ AI เดา"
            },
            {
              "skill": "context",
              "id": "chaos_context_seed",
              "label": "เขียน CONTEXT.md Seed",
              "icon": "CTX",
              "tone": "mint",
              "tags": [
                "Read docs",
                "Summarize goal"
              ],
              "helper": "สร้าง Shared Brief เพื่อสรุปเป้าหมายของแอป, User, Booking Flow, Scope, Non-goals, และข้อจำกัดต่างๆ",
              "tradeoff": "ใช้เวลานิดหน่อย แต่ช่วยให้ทุกคนเห็นภาพเป้าหมายตรงกัน",
              "resolveMsg": "ทีมได้สร้าง Brief กลางที่ระบุเป้าหมายการจองและ Out-of-scope items ให้ AI ใช้อ้างอิง หลีกเลี่ยงการเดาไปคนละทิศคนละทาง",
              "lesson": "CONTEXT.md ช่วยให้เฟส Brainstorming สามารถสรุปเป้าหมายของ Booking MVP ไว้เป็น Shared Context ได้"
            },
            {
              "skill": "scaffolds",
              "id": "chaos_brief_scaffold",
              "label": "Requirement Scaffold",
              "icon": "KIT",
              "tone": "mint",
              "tags": [
                "Full workflow",
                "No missed steps"
              ],
              "helper": "ใช้ Checklist เพื่อตรวจสอบ Docs, เป้าหมายการจอง, Core Flow, Trade-offs, และคำถามที่ยังค้างอยู่",
              "tradeoff": "ช้ากว่าการเดา แต่ป้องกันการข้าม Step สำคัญ",
              "resolveMsg": "Checklist บังคับให้ทีมต้องครอบคลุมเป้าหมายการจอง, Core Flows, Trade-offs, กฎของ Slot, การคอนเฟิร์ม และคำถามที่ค้างอยู่",
              "lesson": "Scaffolds ช่วยให้มือใหม่ทำตาม Workflow ของ Brainstorming ได้ครบถ้วนโดยไม่เผลอข้าม Step"
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "warm_template",
          "label": "อ่าน Brief, สรุปเป้าหมาย",
          "icon": "DOC",
          "tone": "mint",
          "tags": [
            "+35%",
            "Goal first"
          ],
          "helper": "อ่าน Brief และสรุปเป้าหมายของการจอง, Target User, และจุดวัดผลความสำเร็จ ก่อนจะเริ่มเสนอ Flow",
          "tradeoff": "เริ่มต้นมาถูกทาง แต่ยังไม่ได้เคลียร์คำถามที่ค้างอยู่",
          "outcome": "ทีมเข้าใจเป้าหมายและ User หลักก่อนจะคุยเรื่อง Flow แต่กฎการเลือก Slot และการคอนเฟิร์มก็ยังเป็นปริศนา",
          "lesson": "Brainstorming ควรเริ่มจากการอ่าน Docs และสรุปเป้าหมาย ไม่ใช่กระโดดไปหาวิธีแก้ปัญหาเลย"
        },
        {
          "id": "ai_persona",
          "label": "ใช้ AI Approach ก่อนเคลียร์คำถาม",
          "icon": "AI",
          "tone": "blue",
          "tags": [
            "+45%",
            "Approach first"
          ],
          "helper": "ให้ AI เสนอ User Personas, หน้าจอจองคิว และแนวทางก่อนที่จะเคลียร์ความไม่ชัดเจนจาก Brief",
          "tradeoff": "ได้ไอเดียเร็วมาก แต่เปลือง Token และเพิ่มความเสี่ยงเพราะคำถามสำคัญยังไม่ได้รับคำตอบ",
          "outcome": "AI เสนอ Flow ที่น่าสนใจ แต่ดันมโนกฎของ Slot, การคอนเฟิร์ม และระบบ Admin นอกเหนือจากที่ลูกค้าสั่งมา",
          "lesson": "เมื่อ AI เสนอไอเดียโดยไม่มีเป้าหมา·ี่ถูกล็อกไว้ มันมักจะขยาย Scope จนเกินความจำเป็นเสมอ"
        },
        {
          "id": "skip_discovery",
          "label": "สร้างต้นแบบจากสมมติฐานของทีม",
          "icon": "RUN",
          "tone": "gray",
          "tags": [
            "+40%",
            "เริ่มเร็ว"
          ],
          "helper": "ใช้แพตเทิร์นจากโปรเจกต์เก่าที่คล้ายกันมาร่าง Flow การจอง โดยยังไม่ได้ปิดข้อสงสัยทั้งหมด",
          "tradeoff": "ประหยัด Token และเริ่มได้เร็ว แต่จะสะสมความเสี่ยงหากสมมติฐานเรื่องผู้ใช้/Slot/การยืนยันผิดพลาด",
          "outcome": "ต้นแบบแรกเริ่มแสดงทิศทางได้ชัดเจน แต่ตัวระบบพึ่งพาสมมติฐานของทีมเป็นหลักแทนที่จะเป็นหลักฐานจาก Brief",
          "lesson": "ประสบการณ์ในอดีตช่วยให้เริ่มงานได้เร็ว แต่คุณต้องแยกแยะให้ออกระหว่างหลักฐานอ้างอิงจริงกับข้อสมมติฐาน",
          "problem": "ความมั่นใจที่ผิดพลาด"
        }
      ],
      "skillOptions": [
        {
          "skill": "grill",
          "id": "grill_client",
          "label": "Grill with Docs",
          "icon": "GWD",
          "tone": "blue",
          "tags": [
            "+40%",
            "Ask remaining"
          ],
          "helper": "ใช้เอกสารเพื่อตั้งคำถามเกี่ยวกับประเภทบริการ, ระยะเวลาของ Slot, กฎการชนกัน, การยกเลิก และการยืนยัน",
          "tradeoff": "ใช้เวลามากขึ้น แต่ปิดข้อสงสัยได้หมดก่อนให้ AI เสนอแนวทาง",
          "outcome": "คุณได้คำตอบที่ขาดหายไปเพื่อนำมาประเมินแนวทางของ AI",
          "lesson": "Skill Grill with Docs ช่วยในขั้นตอน 'ถามคำถามที่เหลือ' ของเฟส Brainstorming"
        },
        {
          "skill": "context",
          "id": "context_doc",
          "label": "Create CONTEXT.md",
          "icon": "CTX",
          "tone": "mint",
          "tags": [
            "+40%",
            "Docs + Goal"
          ],
          "helper": "อ่านบรีฟและสร้าง Context Seed: เป้าหมาย, ผู้ใช้, Flow, ขอบเขต และสิ่งที่ถือว่าเสร็จ (DoD)",
          "tradeoff": "ลงทุนเวลาเพื่อให้ทีมและ AI เข้าใจเป้าหมายตรงกันตั้งแต่ต้น",
          "outcome": "Prompt ถัดๆ ไปจะมีเป้าหมายและข้อจำกัดให้อ้างอิงกลับมาได้เสมอ",
          "lesson": "CONTEXT.md ช่วยในขั้นตอน 'อ่านเอกสาร' และ 'สรุปเป้าหมาย' ของเฟส Brainstorming"
        },
        {
          "skill": "scaffolds",
          "id": "brief_scaffold",
          "label": "Requirement Scaffold",
          "icon": "KIT",
          "tone": "mint",
          "tags": [
            "+35%",
            "Full 5 steps"
          ],
          "helper": "ใช้ Checklist บังคับให้ดูเอกสาร, เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถามให้ครบ",
          "tradeoff": "ช้ากว่าการเดา แต่ลดโอกาสที่จะข้ามขั้นตอนสำคัญ",
          "outcome": "ทีมไม่พลาด Flow หลัก และเห็นชัดว่าคำถามไหนต้องหาคำตอบก่อนเริ่มวางแผน",
          "lesson": "Scaffolds ช่วยให้เฟส Brainstorming เป็นไปตามระบบแม้แต่กับทีมมือใหม่"
        }
      ],
      "synergyOptions": [
        {
          "id": "shared_brief_packet",
          "label": "Brief Alignment Packet",
          "icon": "DOC",
          "tone": "blue",
          "tags": [
            "+90%",
            "Solid brief"
          ],
          "helper": "รวมเอกสาร, เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถามเข้าเป็นบรีฟเดียว",
          "tradeoff": "ใช้เวลาและ Token เล็กน้อย แต่ยังต้องกำหนดขอบเขตและตรวจสอบในเฟส Plan ต่อไป",
          "outcome": "ทีมได้บรีฟที่ชัดเจนพอจะใช้วางแผน: รู้เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถามที่เหลือ",
          "lesson": "Brief Alignment Packet ช่ว·ำให้กระบวนการ Brainstorm สมบูรณ์ก่อนปล่อย AI สร้างงาน"
        }
      ]
    },
    {
      "id": "plan",
      "title": "Plan",
      "goal": {
        "title": "วางแผนขั้นตอนการสร้าง",
        "copy": "เฟส Plan คือการสร้างพิมพ์เขียวสำหรับระบบ Booking เพื่อหลีกเลี่ยงการเสียเวลาไปกับการที่ AI เขียนโค้ดซ้ำซ้อน",
        "guidance": [
          "สร้างไฟล์ Spec เพื่อล็อก Scope และกำหนด Must-haves",
          "แตกย่อย Task ออกมาเป็นลำดับขั้นตอนที่ชัดเจน",
          "กำหนดเงื่อนไขการตรวจรับงาน (Acceptance Criteria / Definition of Done)",
          "ตกลงรูปแบบสถาปัตยกรรม (Architecture) ก่อนเริ่มเขียนโค้ด"
        ]
      },
      "briefing": [
        "ทีมมีเป้าหมา·ี่ชัดเจนแล้ว ตอนนี้เราต้องวางแผนการทำงานเพื่อป้องกันไม่ให้ AI เขียนโค้ดที่พังทลายเมื่อรวมกัน"
      ],
      "chaosEvents": [
        {
          "id": "escape_complexity",
          "title": "Scope Creep",
          "problem": "หลีกหนีกับดักความซับซ้อน",
          "copy": "ระหว่างที่กำลังวางแผน AI แนะนำว่าเราควรเพิ่มระบบชำระเงิน, User Auth, และ Dashboard สำหรับ Admin เข้าไปใน MVP ด้วย",
          "danger": "ถ้าไม่ล็อก Scope ตอนนี้ คุณจะผลาญ Budget ไปกับการทำฟีเจอร์ที่ไม่จำเป็น",
          "options": [
            {
              "id": "chaos_trim_after",
              "label": "รับฟีเจอร์เพิ่มไปเลย",
              "icon": "CUT",
              "tone": "gray",
              "tags": [
                "Trim later",
                "Skip guard"
              ],
              "helper": "ยอมให้ AI เพิ่มระบบชำระเงินและ Auth เข้ามาในแผนงาน",
              "tradeoff": "ดูเหมือนจะได้ฟีเจอร์เยอะขึ้น แต่เสี่ยงสูงมากที่จะทำเสร็จไม่ทัน และทำให้คุณภาพของฟีเจอร์หลักลดลง",
              "resolveMsg": "แผนงานของคุณพองโตกลายเป็นโปรเจกต์สเกลใหญ่ ทำให้โฟกัสที่ระบบ Booking หลักหายไป",
              "lesson": "AI มักจะแนะนำให้ทำฟีเจอร์ที่เกินความจำเป็น หน้าที่ของคุณคือการคุมให้อยู่ใน Scope ของ MVP",
              "problem": "หลีกหนีกับดักความซับซ้อน"
            }
          ],
          "skillOptions": [
            {
              "skill": "spec",
              "id": "chaos_spec_scope",
              "label": "ล็อก Spec (Spec Doc)",
              "icon": "DOC",
              "tone": "blue",
              "tags": [
                "Files/Scope",
                "Prevent leaks"
              ],
              "helper": "ระบุชัดเจนว่า Payment และ Auth คือ 'Out of Scope' สำหรับ MVP นี้",
              "tradeoff": "ใช้เวลาตั้งค่า Spec แต่ป้องกันการขยาย Scope ได้ 100%",
              "resolveMsg": "คุณตีตกฟีเจอร์ที่ไม่จำเป็นทิ้ง และบังคับให้ AI โฟกัสเฉพาะ Core Booking Flow เท่านั้น",
              "lesson": "Spec Doc เป็นเครื่องมือที่ดีที่สุดในการป้องกัน Scope Creep จาก AI"
            },
            {
              "skill": "plan_doc",
              "id": "chaos_impl_plan",
              "label": "ยึดตาม Implementation Plan",
              "icon": "PLAN",
              "tone": "mint",
              "tags": [
                "Order/Verify",
                "Reduce complexity"
              ],
              "helper": "ยึดมั่นตามลำดับการทำงานเดิม และปฏิเสธการแทรก Task ใหม่ๆ ที่ไม่เกี่ยวกับ MVP",
              "tradeoff": "แผนงานถูกบังคับใช้ แต่ต้องใช้พลังงานในการต่อรองกับ AI",
              "resolveMsg": "คุณจัดลำดับความสำคัญของแผนงานใหม่ ให้เห็นชัดว่าถ้าทำ Payment ตอนนี้ จะกระทบเวลาของฟีเจอร์หลัก",
              "lesson": "Implementation Plan ช่วยให้ทีมมีข้ออ้างในการปฏิเสธการเพิ่ม Scope โดยอิงตามลำดับงาน"
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "light_outline",
          "label": "ร่างแผนงานเบื้องต้น",
          "icon": "OUT",
          "tone": "mint",
          "tags": [
            "+35%",
            "partial plan"
          ],
          "helper": "ร่างแผนงานแบบเร็วๆ ว่าจะทำหน้าบ้าน (Frontend) และหลังบ้าน (Backend) แยกกัน",
          "tradeoff": "ได้แผนงานไว แต่ไม่ได้ลงลึกถึงเรื่องการจัดการ State และการเชื่อมต่อข้อมูล",
          "outcome": "มีแผนงานระดับ High-level แต่พอลงมือทำจริง AI อาจจะงงเรื่องการส่งต่อข้อมูลระหว่างหน้า",
          "lesson": "แผนงานที่ดีควรระบุถึงการส่งต่อข้อมูล (Data Handoff) และการจัดการ State ด้วย"
        },
        {
          "id": "rush_execute",
          "label": "ลุยสร้างจากประวัติแชทล่าสุด",
          "icon": "GO",
          "tone": "gray",
          "tags": [
            "+55%",
            "ข้ามแผน"
          ],
          "helper": "ข้ามการเขียนแผนงานที่เป็นลายลักษณ์อักษร แล้วสั่งให้ AI เริ่มสร้างโค้ดทันทีโดยอิงตามประวัติการแชทล่าสุด",
          "tradeoff": "งานเดินหน้าเร็วมากในช่วงแรก แต่ AI จะไม่มีตัวคุมขอบเขต (Scope Guard) หรือข้อกำหนดเรื่องเทสต์ใดๆ",
          "outcome": "AI สร้างระบบขนาดใหญ่และยัดฟีเจอร์เพิ่มตามแชทล่าสุดอย่างรวดเร็ว แต่มีของที่ลูกค้าไม่ได้ต้องการปนมาด้วยเต็มไปหมด",
          "lesson": "ประวัติการแชทไม่ใช่แผนงาน (Implementation Plan) การข้ามขั้นตอนการวางแผนจะทำให้ได้โค้ดที่ดูแลรักษายาก",
          "problem": "การดูแลรักษาระบบที่สะเปะสะปะ"
        },
        {
          "id": "prototype_ready_scope",
          "label": "แผนต้นแบบที่สโคปหลวม",
          "icon": "MVP",
          "tone": "gray",
          "tags": [
            "+45%",
            "สโคปหลวม"
          ],
          "helper": "ร่างแผนงานระดับสูงที่ให้อิสระแก่ AI อย่างเต็มที่ โดยไม่ได้ระบุไฟล์ เทสต์ หรือการตรวจสอบรายขั้นตอนไว้ล่วงหน้า",
          "tradeoff": "เขียนง่ายและรักษาจังหวะการทำงานได้ดี แต่เสี่ยงต่อการเกิดขอบเขตงานบานปลาย (Scope Creep) อย่างรุนแรง",
          "outcome": "แผนงานฟังดูดีแต่ขาดรายละเอียดที่เป็นรูปธรรม AI สร้างระบบต้นแบบที่หน้าตาดีแต่ลอจิกภายในพันกันยุ่งเหยิง",
          "lesson": "แผนที่ยืดหยุ่นหรือกว้างจนเกินไป จะเปิดช่องให้สโคปงานบานปลายภายใต้หน้ากากของความคืบหน้า",
          "problem": "หลีกหนีกับดักความซับซ้อน"
        }
      ],
      "skillOptions": [
        {
          "skill": "spec",
          "id": "spec_doc",
          "label": "Spec Doc",
          "icon": "DOC",
          "tone": "blue",
          "tags": [
            "+50%",
            "files/scope"
          ],
          "helper": "กำหนดให้ชัดเจนว่าจะแก้ไฟล์ไหน สร้างใหม่ไหม และกำหนดว่าอะไรต้องมี / อยู่นอกขอบเขต",
          "tradeoff": "ช้าลงหน่อย แต่ได้หลักฐานยืนยันชัดเจน ช่วยป้องกันการบานปลายของสโคปงาน",
          "outcome": "ทีมรู้ชัดว่า MVP นี้ต้องยุ่งกับไฟล์ไหน สร้างอะไรบ้าง และอะไรที่ไม่ต้องทำ",
          "lesson": "Spec Doc ช่วยตอบคำถามเรื่องไฟล์, ขอบเขต และการป้องกันสโคปในเฟส Plan"
        },
        {
          "skill": "plan_doc",
          "id": "implementation_plan",
          "label": "Implementation Plan",
          "icon": "PLAN",
          "tone": "blue",
          "tags": [
            "50%",
            "order/verify"
          ],
          "helper": "จัดลำดับงาน, การพึ่งพา, และวิธีตรวจสอบหลังทำเสร็จแต่ละงาน",
          "tradeoff": "ใช้เวลามากขึ้น แต่ช่วยลดการต้องแก้ Prompt ซ้ำๆ ในเฟส Execution",
          "outcome": "ทีมเห็นภาพรวมจากไฟล์ ไปจนถึงรีวิว และรู้ชัดว่าต้องตรวจสอบอะไร",
          "lesson": "Implementation Plan ช่วยระบุลำดับและการตรวจสอบก่อนจะให้ AI เริ่มลงมือ"
        },
        {
          "skill": "terraform_skill",
          "id": "terraform_module_plan",
          "label": "IaC Module Plan",
          "icon": "IAC",
          "tone": "mint",
          "tags": [
            "35%",
            "plan-only"
          ],
          "helper": "วางแผนเรื่อง Terraform Module, สภาพแวดล้อม, เทสต์, และการป้องกันโดยยังไม่รัน apply",
          "tradeoff": "เสียเวลาเพิ่ม แต่ลดความเสี่ยงที่เกี่ยวกับโครงสร้างเซิร์ฟเวอร์",
          "outcome": "ทีมมีแผน IaC ที่ระบุ Module, State, Tests และเงื่อนไขการอนุมัติล่วงหน้า",
          "lesson": "Terraform ต้องเริ่มที่แผนและการป้องกัน ห้ามให้ AI รันคำสั่งโครงสร้างโดยตรง"
        },
        {
          "skill": "context",
          "id": "context_constraints",
          "label": "CONTEXT.md Constraints",
          "icon": "CTX",
          "tone": "mint",
          "tags": [
            "35%",
            "status"
          ],
          "helper": "ตรวจสอบแผนไขว้กับ Context: เป้าหมาย, ไฟล์ที่มี, ข้อจำกัด และ DoD",
          "tradeoff": "ไม่ใช่ทางเลือกที่เร็วที่สุด แต่ป้องกันการเพ้อฝันถึงไฟล์ที่ไม่มีอยู่จริง",
          "outcome": "แผนจะอิงตามความเป็นจริง ไม่กลายเป็นแค่ความต้องการเลื่อนลอย",
          "lesson": "CONTEXT.md ช่วยปรับแผนให้ตรงกับสถานะความเป็นจริงของโปรเจกต์"
        },
        {
          "skill": "scaffolds",
          "id": "dod_scaffold",
          "label": "Plan Checklist Scaffold",
          "icon": "KIT",
          "tone": "mint",
          "tags": [
            "+35%",
            "test/risk guard"
          ],
          "helper": "ใช้ Checklist บังคับเรื่องเทสต์, DoD, ความเสี่ยง และขอบเขตก่อนเข้า Execution",
          "tradeoff": "เพิ่มขั้นตอนขึ้นบ้าง แต่ลดความมั่นใจผิดๆ และการลืมทำเทสต์",
          "outcome": "ทีมมี Checklist ชัดเจนว่าต้องเทสต์อะไร มีความเสี่ยงไหน และอะไรที่ข้ามเส้น",
          "lesson": "Scaffolds ช่วยให้ไม่ลืมเรื่องเทสต์ ความเสี่ยง และขอบเขต"
        }
      ],
      "synergyOptions": [
        {
          "id": "spec_to_plan",
          "label": "Implementation Readiness Draft",
          "icon": "FLOW",
          "tone": "blue",
          "tags": [
            "+90%",
            "ready to execute"
          ],
          "helper": "รวมรายละเอียดไฟล์, การเทสต์, ลำดับ, และขอบเขตเข้าในแผนงานเดียว",
          "tradeoff": "เสียเวลากับ Token ไปบ้าง ได้แผนออกมา แต่ก็ยังต้องมาตัดสินใจเลือกงานแรกอยู่ดี",
          "outcome": "AI ได้รับแผนที่ทำได้จริง รู้ว่าต้องแก้ตรงไหน ระวังตรงไหน ตรวจสอบอย่างไร",
          "lesson": "แผน Implementation Readiness ช่วยตอบโจทย์ได้ครบว่าต้องทำอะไร ที่ไหน อย่างไร"
        }
      ]
    },
    {
      "id": "execute",
      "title": "Execute",
      "goal": {
        "title": "ลงมือสร้างตามแผน",
        "copy": "เฟส Execute คือการลงมือทำตามแผน ให้ AI สร้างและแก้ไขโค้ด โดยคอยคุมให้อยู่ในกรอบ",
        "guidance": [
          "ใช้ TDD Loop ถ้าระบุไว้",
          "แตกคำสั่ง (Prompt) เป็นชิ้นเล็กๆ ย่อยๆ",
          "ตรวจสอบการจัดการ State บ่อยๆ",
          "อย่าปล่อยให้ AI เขียนโค้ดรวดเดียวจบทั้งแอป"
        ]
      },
      "briefing": [
        "ตอนนี้แผนงานพร้อมแล้ว เรามาเริ่มสร้าง Booking MVP กันทีละส่วน"
      ],
      "chaosEvents": [
        {
          "id": "hardcoded_secret",
          "title": "API Key หลุดในไฟล์คอนฟิก",
          "problem": "โค้ดหลุดข้อมูล Secrets ความปลอดภัย",
          "copy": "AI ใส่ API Key หรือกุญแจผู้ให้บริการจำลองไว้ในไฟล์คอนฟิกเพื่อทำให้ระบบตัวอย่างรันได้ แต่ไฟล์นี้อาจถูก Commit ขึ้น GitHub ไปกับโค้ดทั้งหมด",
          "danger": "ความลับหรือข้อมูลยืนยันตัวตนของผู้ให้บริการหลุดอยู่ในโค้ด",
          "options": [
            {
              "id": "chaos_remove_secret_later",
              "label": "ไว้ตามลบออกทีหลัง",
              "icon": "KEY",
              "tone": "gray",
              "tags": [
                "Remove later",
                "Risky"
              ],
              "helper": "จำไว้ในใจว่าจะกลับมาลบ Key ออกในภายหลังก่อนส่งงานจริง",
              "tradeoff": "เร็วดีในตอนนี้ แต่เสี่ยงที่ข้อมูลจะรั่วไหลออกไปถ้าลืมตรวจสอบ",
              "resolveMsg": "โค้ดยังรันได้ปกติ แต่ข้อมูล API Key จะกลายเป็นหนี้ความปลอดภัย (Security Debt) ที่คุณต้องระลึกไว้เพื่อตามมาคลีนอัพทีหลัง",
              "lesson": "โค้ดที่รันได้ ไม่ได้แปลว่าโค้ดนั้นมีความปลอดภัย",
              "problem": "โค้ดหลุดข้อมูล Secrets ความปลอดภัย"
            }
          ],
          "skillOptions": [
            {
              "skill": "risk_scanner",
              "id": "chaos_risk_secret_alert",
              "label": "รับมือด้วยการแจ้งเตือนจาก Risk Scanner",
              "icon": "SCAN",
              "tone": "mint",
              "tags": [
                "Passive guard",
                "Early warning"
              ],
              "helper": "ระบบ Risk Scanner ค้นหาแพตเทิร์นและแจ้งเตือนว่าพบ Token/Secret หลุดรอดเข้ามาในโค้ด",
              "tradeoff": "ต้องใช้เวลาตรวจสอบเพิ่มเติม แต่ลดความเสียหายได้เป็นอย่างดี",
              "resolveMsg": "Risk Scanner ตรวจจับและแจ้งเตือนทันทีก่อนที่โค้ดจะถูก Commit ทำให้ทีมแก้ไขสกรีนออกได้ก่อนระบบจริงจะเปิดเผยความลับ",
              "lesson": "ความเร็วของ AI บังคับให้เราต้องมีระบบแจ้งเตือนความเสี่ยงแบบเรียลไทม์"
            },
            {
              "skill": "scaffolds",
              "id": "chaos_security_scaffold",
              "label": "ใช้ Security Checklist ควบคุม",
              "icon": "KIT",
              "tone": "mint",
              "tags": [
                "Checklist",
                "Prevent memory slips"
              ],
              "helper": "นำ Checklist ห้ามทำ Hard-coded Secrets และบังคับใช้ตัวแปรสภาพแวดล้อม (ENV) เข้ามากำกับ",
              "tradeoff": "เพิ่มขั้นตอนการตรวจสอบ แต่ป้องกันไม่ให้นักพัฒนาทำเรื่องผิดพลาดง่ายๆ",
              "resolveMsg": "Checklist ช่วยให้ทีมตรวจหาค่า API Key และไฟล์ Config ที่ไม่ถูกต้องได้ตั้งแต่เนิ่นๆ ก่อนที่จะกดเมิร์จโค้ดเดโมเข้ารวมระบบ",
              "lesson": "Scaffolds (ตัวช่วยกำกับ) ช่วยป้องกันช่องโหว่ความปลอดภัยที่เกิดจากความรีบร้อน"
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "single_ai_pass",
          "label": "สั่ง AI เขียนโค้ดรวดเดียวตามแผน (Batch)",
          "icon": "ONE",
          "tone": "gray",
          "tags": [
            "+50%",
            "รวบยอด"
          ],
          "helper": "รวม Task ที่ดูเกี่ยวข้องกันมาสั่งให้ AI ทำรวดเดียว เพื่อให้สร้างระบบเลือกบริการ, Slot เวลา, ฟอร์ม และการยืนยันพร้อมกัน",
          "tradeoff": "ดูเหมือนงานจะเสร็จไวและต่อเนื่อง แต่จะขาดจุดตรวจสอบ (Checkpoint) แยกรายตัว",
          "outcome": "งานเดินหน้าเร็วและดูเหมือนจะดี แต่พอบั๊กโผล่หรือมีการแก้ไขไฟล์เกิน ทีมแทบระบุไม่ได้เลยว่าเกิดขึ้นในสเต็ปไหน",
          "lesson": "การสั่งงานเป็นชุดใช้ได้ผลเมื่อฟีเจอร์มีขนาดเล็กและมีเทสต์คุมชัดเจน แต่ถ้าไม่มีจุดคั่นตรวจสอบ งานจะวนกลับมารื้อใหม่ได้ง่าย"
        },
        {
          "id": "reprompt_loop",
          "label": "ก๊อปวาง Error ล่าสุดให้ AI แก้ทันที (Reprompt Loop)",
          "icon": "LOOP",
          "tone": "gray",
          "tags": [
            "+35%",
            "แก้ด่วน"
          ],
          "helper": "เอา Error ล่าสุดที่เจอส่งให้ AI เพื่อแก้ปัญหาเป็นจุดๆ ไป",
          "tradeoff": "ช่วยให้ผ่านจุดที่ติดขัดได้เร็ว แต่ถ้าไม่ได้ดูสโคปหรือรันเทสต์ภาพรวม จะกลายเป็นการแก้ตามอาการเท่านั้น",
          "outcome": "AI แก้เขียนทับโค้ดเดิมซ้ำไปซ้ำมา บั๊กเก่าอาจหายไปแต่บั๊กใหม่โผล่ขึ้นมาแทน และเริ่มมีการปนเปื้อนของโค้ดนอกขอบเขต",
          "lesson": "Error ล่าสุดเป็นข้อมูลที่ดี แต่ไม่ควรนำมาใช้แทนการวิเคราะห์สาเหตุที่แท้จริง (Root Cause) และการทดสอบเฉพาะจุด",
          "problem": "ติดกับดัก Reprompt วนลูป"
        },
        {
          "id": "manual_build",
          "label": "เริ่มทำ Task ถัดไปทีละส่วนตามแผนงาน",
          "icon": "HND",
          "tone": "mint",
          "tags": [
            "+55%",
            "ทำตามแผน"
          ],
          "helper": "อ่านแผนงาน เลือกงานถัดไป สรุปสิ่งที่จะทำ และคุมให้ AI แก้ไขเฉพาะไฟล์ที่เกี่ยวข้องโดยตรง",
          "tradeoff": "ช้ากว่าการโยน Prompt ชุดใหญ่ แต่ช่วยให้ทีมคุมขอบเขตงานและทำความเข้าใจโค้ดได้ดีกว่า",
          "outcome": "ทีมทำตามแผนงานทีละงานอย่างเป็นขั้นเป็นตอน และสามารถใช้ความเร็วของ AI ได้อย่างเต็มประสิทธิภาพโดยไม่เสียการควบคุม",
          "lesson": "AI จะช่วยทวีคูณความเร็วได้ดีที่สุด เมื่อคนคุมทิศทางของ Task, ไฟล์ที่แก้ และจุดตรวจสอบคุณภาพ"
        },
        {
          "id": "tool_rush_no_check",
          "label": "Generate UI Slice First",
          "icon": "GEN",
          "tone": "gray",
          "tags": [
            "+40%",
            "visual first"
          ],
          "helper": "ให้ AI สร้าง UI การจองคิวออกมาก่อน แล้วค่อยมาดูว่าต้องใส่ Validation ตรงไหน",
          "tradeoff": "ทำให้เห็นภาพรวมได้เร็ว แต่ระบบการตรวจสอบ ข้อมูลซ้อนทับ ก็ยังคงพังอยู่",
          "outcome": "แอปดูเหมือนจะเสร็จเร็วมาก แต่ไม่มีหลักฐานยืนยันว่าการทำงานนั้นถูกต้อง",
          "lesson": "การทำ UI ล่วงหน้าช่วยในการคุย Requirement ได้ แต่สุดท้ายก็ต้องมีเทสต์อยู่ดี",
          "problem": "โยนงานตรวจคุณภาพให้ AI แทน"
        }
      ],
      "skillOptions": [
        {
          "skill": "tdd",
          "id": "tdd_guard",
          "label": "TDD Loop",
          "icon": "TDD",
          "tone": "blue",
          "tags": [
            "+55%",
            "focused test"
          ],
          "helper": "เขียน Failing Test ก่อน เขียนโค้ดสั้นๆ ให้ผ่าน Refactor และทำซ้ำจนกว่าจะย้ายไปงานถัดไป",
          "tradeoff": "ใช้เวลามากขึ้น แต่ดักจับบั๊กได้ก่อนจะข้ามไปทำงานอื่น",
          "outcome": "ทีมได้เห็นวงจร Red -> Green -> Refactor ของการพัฒนาในทุกส่วน",
          "lesson": "TDD Loop บังคับให้ AI ทำงานทีละอย่าง และมีข้อพิสูจน์ว่ามันผ่านจริงๆ ไม่ใช่แค่หน้าตาดี"
        },
        {
          "skill": "risk_scanner",
          "id": "risk_scanner_watch",
          "label": "Real-time Risk Scanner",
          "icon": "SCAN",
          "tone": "mint",
          "tags": [
            "+50%",
            "Risk alert"
          ],
          "helper": "แจ้งเตือนเมื่อ AI แตะไฟล์นอกขอบเขต ขาดเทสต์ ทำ Secret หลุด หรือความเสี่ยงเรื่องข้อมูล",
          "tradeoff": "มีโอเวอร์เฮด แต่มันหยุดความเสี่ยงได้ก่อนจะลามไปส่วนอื่น",
          "outcome": "ทีมจะเห็นคำเตือนตั้งแต่ตอนที่โค้ดเริ่มเปราะบาง โดยไม่ต้องรอให้แอปพังจริงๆ",
          "lesson": "ความเร็วของ AI ทำให้เราต้องการระบบเตือนภัยล่วงหน้าเรื่องขอบเขตและความปลอดภัย"
        },
        {
          "skill": "terraform_skill",
          "id": "terraform_plan_only_gate",
          "label": "Plan-Only IaC Gate",
          "icon": "IAC",
          "tone": "blue",
          "tags": [
            "+50%",
            "no apply"
          ],
          "helper": "รัน Terraform แค่ plan-only: fmt, validate, test, plan แล้วหยุดก่อนที่จะ apply",
          "tradeoff": "ช้ากว่าแบบปั่นเสร็จแล้ว Deploy เลย แต่คุ้มครองทรัพยากรบนเซิร์ฟเวอร์ได้",
          "outcome": "ทีมได้หลักฐานจาก plan/test โดยยังไม่มีการลบหรือสร้างของจริงๆ",
          "lesson": "Workflow ของ Infra ต้องรอการอนุมัติจากคนก่อนจะรันคำสั่งแก้ไขโครงสร้าง"
        },
        {
          "skill": "scaffolds",
          "id": "debug_scaffold",
          "label": "Executing Plan Checklist",
          "icon": "KIT",
          "tone": "mint",
          "tags": [
            "+50%",
            "All 7 steps"
          ],
          "helper": "ใช้ Checklist: อ่านแผน เลือกงาน สรุป หาไฟล์ เขียนเทสต์ สรุปผล แล้วหยุดประเมิน",
          "tradeoff": "ช้ากว่าการก็อป Error แปะๆ แต่ได้แก้ที่ต้นเหตุ",
          "outcome": "ทีมตัดสินใจลงมือแก้ตามหลักฐาน ดีกว่าการยัด Error ดิบๆ ให้ AI เรื่อยๆ",
          "lesson": "Scaffolds ช่วยป้องกันการ Execute แผนงานไม่ให้กลายเป็นการวนลูปแก้โค้ดไปเรื่อย"
        },
        {
          "skill": "walkthrough",
          "id": "walkthrough_explain",
          "label": "Code Walkthrough",
          "icon": "WALK",
          "tone": "mint",
          "tags": [
            "+35%",
            "Understand code"
          ],
          "helper": "บังคับให้ AI อธิบายการจัดการ State, การ Validate ข้อมูล และการส่งต่อข้อมูลแบบทีละขั้นตอน",
          "tradeoff": "ใช้เวลาและโทเค็นเพิ่มขึ้น แต่ลดความสับสนและไม่เข้าใจในตัวโค้ด",
          "outcome": "ทีมมีความเข้าใจการทำงานเบื้องหลังของระบบจองคิว แทนที่จะคาดเดาและหวังว่ามันจะรันได้เฉยๆ",
          "lesson": "การอธิบายเชิงลึกช่วยให้นักพัฒนาตรวจสอบเส้นทางการรันจริงของโค้ดได้อย่างถูกต้อง"
        }
      ],
      "synergyOptions": [
        {
          "id": "synergy_guardrails",
          "label": "Spec-Test Guardrails",
          "icon": "SHD",
          "tone": "blue",
          "tags": [
            "+90%",
            "spec + test"
          ],
          "helper": "ใช้ Spec + TDD Loop ตรวจสอบความถูกต้อง: เขียนเทสต์ที่พัง -> แก้ให้ผ่าน -> รีแฟกเตอร์ ก่อนจะรับงาน",
          "tradeoff": "ใช้ Token กับเวลาเก็บหลักฐาน แต่ก็ยังคงต้องประเมินต่อว่าสโคปแค่นี้พอหรือไม่",
          "outcome": "งานเดินเร็ว โดยมี Spec เป็นเป้า และ TDD Loop ช่วยการันตีว่ามันผ่าน",
          "lesson": "Spec กำหนดว่าต้องสร้างอะไร ส่วน TDD Loop พิสูจน์ว่ามันรันผ่านจริงๆ"
        },
        {
          "id": "iac_safety_gate",
          "label": "IaC Safety Gate",
          "icon": "IAC",
          "tone": "blue",
          "tags": [
            "+90%",
            "plan + risk"
          ],
          "helper": "ใช้ข้อมูล Terraform plan + Risk Scanner ตรวจจับ Drift, Secrets, และความเสี่ยง ก่อนอนุมัติ Apply",
          "tradeoff": "ใช้เวลาและ Token เพิ่ม แต่สามารถอุดช่องโหว่ความเสี่ยงทางโครงสร้างได้หมดจด",
          "outcome": "ทีมตรวจสอบการเปลี่ยนแปลงรุนแรง ความเสี่ยงเรื่อง Secret ก่อนจะแตะระบบจริง",
          "lesson": "Workflow ของ Terraform ที่ดีต้องมีการวางแผน, สแกนความเสี่ยง, และอนุมัติชัดเจนก่อนทำงานจริง"
        }
      ]
    },
    {
      "id": "review",
      "title": "Review",
      "goal": {
        "title": "ตรวจทานด้วยหลักฐาน",
        "copy": "เฟส Review คือการตรวจสอบขั้นสุดท้ายก่อนนำขึ้นระบบจริง (Ship) เพื่อให้มั่นใจว่าระบบใช้งานได้จริง ไม่ใช่แค่มี UI สวยๆ",
        "guidance": [
          "เทียบกับ Spec ว่าทำครบไหม",
          "ทำ Code Review หาจุดบกพร่อง",
          "รัน Test ตรวจสอบ Edge Cases",
          "ตรวจสอบเรื่อง Security และ Data Integrity"
        ]
      },
      "briefing": [
        "งานเกือบเสร็จแล้ว! แต่ก่อนจะส่งมอบ ต้องตรวจดูก่อนว่า Booking MVP นี้พร้อมใช้งานจริงๆ หรือเปล่า"
      ],
      "chaosEvents": [
        {
          "id": "shadow_it",
          "title": "Secret Key หลุดในโค้ด",
          "problem": "ระบบถูกมองเป็น Shadow IT (แอประดับทดลองที่ไม่ผ่านมาตรฐาน)",
          "copy": "ระหว่างเตรียมส่งงาน คุณพบว่า AI แอบใส่ API Key ของจริง (หรือคล้ายของจริงมาก) ไว้แบบ Hard-code ในไฟล์ Frontend",
          "danger": "ถ้ากดส่งงานไปตอนนี้ ระบบจะมีความเสี่ยงขั้นวิกฤต",
          "options": [
            {
              "id": "chaos_prepare_excuse",
              "label": "ทำเป็นมองไม่เห็น",
              "icon": "NOTE",
              "tone": "gray",
              "tags": [
                "Use excuses",
                "Risky"
              ],
              "helper": "คิดซะว่าเป็นแค่ MVP ไม่น่ามีใครมาแฮ็กหรอก กดข้ามไปเลย",
              "tradeoff": "ส่งงานได้ไว แต่บริษัทอาจโดนฟ้องล้มละลายได้",
              "resolveMsg": "คุณส่งงานผ่านไปได้ แต่ไม่กี่วันต่อมา API Key ก็ถูกดูดเงินไปหลายแสน",
              "lesson": "เรื่อง Security ไม่ใช่เรื่องล้อเล่น ถึงจะเป็น MVP ก็ห้ามปล่อย Hard-code Secrets เด็ดขาด",
              "problem": "ระบบถูกมองเป็น Shadow IT (แอประดับทดลองที่ไม่ผ่านมาตรฐาน)"
            }
          ],
          "skillOptions": [
            {
              "skill": "code_review",
              "id": "chaos_review_pack",
              "label": "ทำ Code Review สั่งลบด่วน",
              "icon": "CHK",
              "tone": "blue",
              "tags": [
                "Evidence",
                "Pass audit"
              ],
              "helper": "สั่งให้ AI ลบ Key ออก แล้วเปลี่ยนไปใช้ Environment Variables แทน",
              "tradeoff": "เสียเวลาแก้นิดหน่อย แต่ระบบปลอดภัย",
              "resolveMsg": "คุณย้าย API Key ไปไว้ใน .env อย่างปลอดภัย ปิดรอยรั่วสำคัญได้สำเร็จ",
              "lesson": "Code Review ช่วยดักจับปัญหาคอขาดบาดตายอย่าง Hard-code Secrets ได้ทันท่วงที"
            },
            {
              "skill": "context",
              "id": "chaos_context_for_it",
              "label": "ใช้ Risk Scanner สแกนทั้งโปรเจกต์",
              "icon": "CTX",
              "tone": "mint",
              "tags": [
                "Docs",
                "Scope limits"
              ],
              "helper": "รัน Scanner หาจุดที่อาจจะมี Secret หลุดรอดอยู่ที่อื่นอีก แล้วสั่งแก้รวดเดียว",
              "tradeoff": "ตรวจเจอลึกกว่าเดิม แต่อาจใช้ Token มากขึ้นในการให้ AI ตามแก้",
              "resolveMsg": "Scanner กวาดเจอ Key ที่ซ่อนอยู่ และ Token เก่าๆ คุณล้างบางมันออกจนหมดจด",
              "lesson": "เครื่องมือ Automated อย่าง Risk Scanner ช่วยลดความผิดพลาดของมนุษย์ในการตรวจหา Secrets ได้ดีเยี่ยม"
            },
            {
              "skill": "scaffolds",
              "id": "chaos_audit_scaffold",
              "label": "Review Template",
              "icon": "KIT",
              "tone": "mint",
              "tags": [
                "Template",
                "Full check"
              ],
              "helper": "ใช้ Template ตรวจสอบ: Spec, AC, ไฟล์นอกกรอบ, Test, Security, ฯลฯ",
              "tradeoff": "ต้องไล่ดูตาม Checklist แต่มันป้องกันไม่ให้หลงลืมประเด็นสำคัญ",
              "resolveMsg": "Review Template ช่วยให้ทีมสามารถตอบคำถามฝั่ง Ops/IT ได้อย่างเป็นระบบ",
              "lesson": "Scaffolds ทำให้มาตรฐานไม่ตกหล่นตามความทรงจำของใครบางคน"
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "manual_check",
          "label": "เทสต์มือกดดูรัวๆ",
          "icon": "EYE",
          "tone": "mint",
          "tags": [
            "+40%",
            "Visual check"
          ],
          "helper": "ลองใช้งานเหมือน User ทั่วไป กดจอง กดเปลี่ยนวัน กดยกเลิก",
          "tradeoff": "เจอเรื่องหลักๆ แต่ถ้า User พิมพ์แปลกๆ หรือเน็ตตัด อาจจะไม่เจอ",
          "outcome": "UI ใช้งานได้ดี Flow ปกติราบรื่น แต่ยังไม่ได้เช็คเรื่อง Data Integrity เชิงลึก",
          "lesson": "Manual Test ดี แต่ไม่พอสำหรับการทำระบบให้พร้อม Production"
        },
        {
          "id": "ai_self_review",
          "label": "ให้ AI ตรวจสอบโค้ดตัวเอง (AI Self-Review)",
          "icon": "AI",
          "tone": "gray",
          "tags": [
            "+45%",
            "AI review"
          ],
          "helper": "ให้ AI โมเดลเดิมช่วยเช็คและรีวิวโค้ดที่ตัวมันเพิ่งเขียนขึ้น โดยไม่ได้ตรวจเทียบกับเอกสาร Spec หรือโค้ดดั้งเดิม",
          "tradeoff": "รวดเร็วดี แต่เสี่ยงที่ AI จะชื่นชมโค้ดตัวเองและมองไม่เห็นข้อผิดพลาดหรืออาการมโน (Hallucination) ของตัวเอง",
          "outcome": "AI ยืนยันว่าโค้ดเสร็จเรียบร้อยดี แต่จุดที่ขาดเทสต์ ขอบเขตไฟล์ที่แก้เกิน หรือสัญญะที่เดาขึ้นมาเองยังไม่ได้ถูกตรวจสอบกับแหล่งอ้างอิงจริง",
          "lesson": "อย่าปล่อยให้ AI โมเดลเดียวกันเป็นผู้ตรวจสอบโค้ดที่ตัวมันเองเขียนแต่เพียงผู้เดียว เพราะมันจะไม่เห็นบั๊กของตัวมันเอง",
          "problem": "โยนงานตรวจคุณภาพให้ AI แทน"
        },
        {
          "id": "ship_now",
          "label": "ส่งเดโมที่ขัดเกลาแล้วทันที (YOLO Ship)",
          "icon": "NOW",
          "tone": "gray",
          "tags": [
            "+60%",
            "Looks done"
          ],
          "helper": "ส่งมอบงานทันทีเนื่องจาก AI แจ้งว่าไม่มี Error และหน้าตาเดโมดูเรียบร้อยดีแล้ว",
          "tradeoff": "เร็วที่สุด แต่เสี่ยงที่จะเจอบั๊กและเหตุการณ์พังบน Production รุนแรงทีหลัง",
          "outcome": "คุณส่งเดโมได้เร็วมาก แต่งานถูกส่งมอบโดยไม่ได้รีวิวเรื่อง Spec, Acceptance Criteria, ขอบเขตไฟล์ หรือความปลอดภัยเลย",
          "lesson": "AI ช่วยให้โค้ดดูเหมือนเสร็จสมบูรณ์ได้อย่างรวดเร็ว แต่นั่นไม่ได้หมายความว่ามันพร้อมใช้งานจริง",
          "problem": "ความมั่นใจที่ผิดพลาด"
        }
      ],
      "skillOptions": [
        {
          "skill": "code_review",
          "id": "code_review_final",
          "label": "Code Review",
          "icon": "CHK",
          "tone": "blue",
          "tags": [
            "+60%",
            "Rigorous review"
          ],
          "helper": "ออดิต: Spec, AC, ไฟล์นอกกรอบ, Test, Security, Data, ฯลฯ",
          "tradeoff": "ช้าลง แต่ช่วยจับบั๊กที่หลุดมา และป้องกันการแก้ไฟล์ที่ไม่จำเป็น",
          "outcome": "ทีมดักความเสี่ยงก่อนปล่อยงาน แก้ไขมันด้วยหลักฐานไม่ใช่แค่ความมั่นใจ",
          "lesson": "Code Review คือประตูด่านสุดท้ายในการเช็ค Spec, Tests, Scope, และโค้ด"
        },
        {
          "skill": "walkthrough",
          "id": "code_walkthrough",
          "label": "Code Walkthrough",
          "icon": "WALK",
          "tone": "mint",
          "tags": [
            "+50%",
            "Understand code"
          ],
          "helper": "บังคับ AI อธิบายกลไก State, Validation, การคุม Data พร้อมให้ทีมช่วยกันซักไซ้",
          "tradeoff": "เปลือง Token แต่กันไม่ให้ทีมปล่อยโค้ดที่พวกเขาก็ยังไม่เข้าใจมัน 100%",
          "outcome": "ทีมจะค้นพบจุดที่ AI เขียนโค้ดซับซ้อนเกินจริง หรือมโน requirement เอง แล้วนำมา Refactor ให้เรียบง่าย",
          "lesson": "นักพัฒนาต้องเข้าใจโค้ดของ AI ไม่ใช่แค่เชื่อว่าเสร็จเพราะ AI บอกว่าเสร็จแล้ว"
        },
        {
          "skill": "tdd",
          "id": "acceptance_rerun",
          "label": "Rerun TDD Loop",
          "icon": "TDD",
          "tone": "mint",
          "tags": [
            "+55%",
            "Matches spec"
          ],
          "helper": "ทำ TDD Loop ซ้ำ: เขียนเทสต์ให้พัง, แก้สั้นๆ, Refactor, รันซ้ำ ให้ครอบคลุมทุกจุดสำคัญ",
          "tradeoff": "ตรงไปตรงมา แต่ต้องลงทุนเวลาสูง",
          "outcome": "ทีมจะเห็นชัดๆ เลยว่าส่วนสำคัญๆ รันผ่านจริงๆ และหาจุดแก้ก่อนปล่อยงาน",
          "lesson": "TDD Loop ให้หลักฐานชัดเจนว่าโค้ดนั้นทำงานได้ตามที่ตกลงกันไว้"
        },
        {
          "skill": "risk_scanner",
          "id": "risk_review_pass",
          "label": "Risk Scanner Review",
          "icon": "SCAN",
          "tone": "blue",
          "tags": [
            "+55%",
            "risk pass"
          ],
          "helper": "สแกนหาจุดที่อาจเป็น Secret หลุด, หา Logic ที่เปราะบาง, และการขัดแย้งต่างๆ",
          "tradeoff": "มีขั้นตอนเสริม แต่ลดความเสี่ยงช่วงท้ายโปรเจกต์",
          "outcome": "Scanner จะเตือนในจุดที่สายตามนุษย์อาจมองพลาดไปตอนทำ Smoke Testing",
          "lesson": "ความเสี่ยงที่สะสมไว้ ต้องสามารถถูกมองเห็นได้ก่อนส่งมอบงาน"
        },
        {
          "skill": "terraform_skill",
          "id": "terraform_open_tofu_review",
          "label": "Terraform Review",
          "icon": "IAC",
          "tone": "blue",
          "tags": [
            "+50%",
            "infra review"
          ],
          "helper": "ตรวจสอบ Terraform ทั้ง Test, Module, State, Secrets และความปลอดภัยบน Prod",
          "tradeoff": "เสียเวลารีวิวเพิ่ม แต่ลดความเสี่ยงเวลาเกิดเหตุบนเซิร์ฟเวอร์จริงที่จะแก้กลับยาก",
          "outcome": "ทีมเจอความเสี่ยงล่วงหน้า รู้ว่าคำสั่งไหนต้องคุมก่อนจะแตะเครื่องจริง",
          "lesson": "IaC รีวิวต้องดูทั้งโค้ดและผลกระทบ ไม่ใช่แค่ดูว่า Syntax ผ่านไหม"
        }
      ],
      "synergyOptions": [
        {
          "id": "review_walkthrough_combo",
          "label": "Review Walkthrough Pass",
          "icon": "CHK",
          "tone": "blue",
          "tags": [
            "+90%",
            "Understand & Audit"
          ],
          "helper": "ทำ Code Review สอดคล้องกับ Walkthrough: ตรวจเช็ค Spec, ความปลอดภัย, ฯลฯ ควบคู่กันไป",
          "tradeoff": "ลงทุนเวลาและ Token แต่ยังต้องไปหาทางแก้ตาม Test หรือหลักฐานอยู่ดี",
          "outcome": "ทีมจะจับบั๊กได้และเข้าใจว่าทำไมต้องแก้ด้วย",
          "lesson": "การรีวิวที่ดีช่วยให้ทีมปล่อยโค้ดด้วยความเข้าใจ ไม่ใช่แค่ศรัทธาใน AI"
        },
        {
          "id": "spec_review_gate",
          "label": "Spec Evidence Gate",
          "icon": "GATE",
          "tone": "blue",
          "tags": [
            "+85%",
            "Audit vs Spec"
          ],
          "helper": "ใช้ Spec ควบคู่ Code Review ตรวจสอบคุณภาพงานและความปลอดภัยให้ครบถ้วน",
          "tradeoff": "ช้าลง แต่เป็นการประเมินคุณภาพงานตามกรอบขอบเขตและหลักฐานที่แท้จริง",
          "outcome": "ทีมปิดช่องโหว่ระหว่างสิ่งที่ AI สร้างกับสิ่งที่คุยกันไว้ จับได้หมดว่าอันไหนเป็นของแถมที่ไม่จำเป็น",
          "lesson": "Spec ป้องกันการใช้ความรู้สึกตอนรีวิว และดักจบการบานปลา·ี่ AI แอบยัดมา"
        }
      ]
    }
  ],
  "emergencyStep": {
    "id": "emergency",
    "title": "สถานการณ์ฉุกเฉิน: เหตุการณ์นักพัฒนาที่เปราะบาง",
    "briefing": [
      "ระบบเริ่มพังระหว่างการนำเสนอเดโม แต่ทีมพึ่งพา AI เพียงอย่างเดียวจนแทบจะไม่สามารถแก้โค้ดเองได้เลย",
      "หากไม่มีวินัยใน Workflow ที่วางไว้แต่แรก เหตุการณ์นี้อาจทำลายความเชื่อใจของลูกค้าได้ทันที"
    ],
    "event": {
      "id": "emergency_crisis",
      "title": "เหตุการณ์ฉุกเฉินบนระบบจริง",
      "problem": "เหตุการณ์นักพัฒนาที่เปราะบาง",
      "copy": "ลูกค้าถามว่าเกิดอะไรขึ้น แต่ทีมไม่มี Spec ไม่มี Test เลยหาสาเหตุไม่ได้",
      "danger": "ความเสี่ยงระดับวิกฤต"
    },
    "baseOptions": [
      {
        "id": "emergency_hotfix",
        "label": "Manual Root-Cause Hotfix",
        "icon": "FIX",
        "tone": "mint",
        "tags": [
          "มั่นใจได้ชัวร์",
          "ใช้เวลาเยอะ",
          "แก้ปัญหาสำเร็จ"
        ],
        "helper": "รีโปรดิวซ์ แยกส่วน ซ่อมแซม และยืนยันความถูกต้องด้วยตัวคุณเอง",
        "tradeoff": "ใช้เวลามาก แต่ก็ช่วยจัดการความเสี่ยงได้อย่างแท้จริง",
        "outcome": "ทีมแก้ที่ต้นเหตุได้ทันเวลา โชว์ให้ลูกค้าเห็นว่าคุณควบคุมสถานการณ์ได้",
        "lesson": "บางครั้งก็ไม่มีทางลัด; คุณต้องทุ่มเวลาเพื่อดับไฟให้ได้"
      },
      {
        "id": "emergency_ai_patch",
        "label": "AI Quick Patch",
        "icon": "AI",
        "tone": "gray",
        "tags": [
          "รวดเร็ว",
          "เปลือง Token",
          "ไม่ปลอดภัย"
        ],
        "helper": "ยัด Error ให้ AI ทันที เพื่อให้เดโมกลับมาทำงานได้โดยไว",
        "tradeoff": "ประหยัดเวลา แต่ก็เสี่ยงจะสร้างบั๊กตัวใหม่ขึ้นมา",
        "outcome": "AI ทำให้บั๊กตัวนั้นหายไปอย่างไว แต่ทีมก็ไม่รู้เลยว่ามีระบบอื่นพังตามไปด้วยหรือเปล่า",
        "lesson": "การดับไฟด้วย AI ต้องระวังให้ดี: ระวังว่าไฟจะลามไปที่อื่น",
        "problem": "ติดกับดัก Reprompt วนลูป"
      }
    ],
    "skillOptions": [
      {
        "skill": "scaffolds",
        "id": "emergency_escalation_path",
        "label": "Escalation Scaffold",
        "icon": "KIT",
        "tone": "blue",
        "tags": [
          "กู้คืนระบบ",
          "ทำตามขั้นตอน"
        ],
        "helper": "ใช้ Runbook: สรุปปัญหา แยกส่วนหาตัวการ ย้อนกลับ ยืนยัน แล้วอธิบาย",
        "tradeoff": "ใช้เวลาหน่อย แต่ช่วยให้ทีมใจเย็นและมีระบบระเบียบ",
        "outcome": "Runbook จะไกด์ทีมให้ซ่อมแซมและพูดคุยกับลูกค้าอย่างเป็นสเต็ป",
        "lesson": "Scaffolds ช่วยให้มือใหม่มีแนวทางที่ชัดเจนเวลาที่ระบบพัง"
      },
      {
        "skill": "walkthrough",
        "id": "emergency_walkthrough",
        "label": "Walk Through The Patch",
        "icon": "WALK",
        "tone": "mint",
        "tags": [
          "เข้าใจสาเหตุ",
          "ลดการเดาสุ่ม"
        ],
        "helper": "ให้ AI อธิบายแพตช์นั้นก่อน แล้วเราไล่ดูทีละบรรทัดก่อนตกลงใจ",
        "tradeoff": "เปลือง Token และเวลา แต่ป้องกันการหลับหูหลับตากดรับงาน",
        "outcome": "ทีมแยกแยะสาเหตุและป้องกันไม่ให้ AI มาเขียนทับโค้ดที่มันทำงานได้ดีอยู่แล้ว",
        "lesson": "อย่าเชื่อใจแพตช์เพียงเพราะมันรันผ่าน; ให้เข้าใจว่าจริงๆ มันแก้อะไร"
      },
      {
        "skill": "tdd",
        "id": "emergency_test_guard",
        "label": "Emergency Acceptance Test",
        "icon": "TDD",
        "tone": "blue",
        "tags": [
          "Verify",
          "Prevent regression"
        ],
        "helper": "เขียนเทสต์สั้นๆ เพื่อให้ชัวร์ว่าบั๊กหลักจะไม่กลับมาอีก",
        "tradeoff": "ช้ากว่าการแปะแพตช์ดิบๆ แต่การันตีว่าไฟดับสนิทแล้ว",
        "outcome": "ทีมแก้ไขแล้วทำการตรวจสอบยืนยัน ดีกว่าแค่เชื่อเพราะเห็นว่าจอไม่พังแล้ว",
        "lesson": "เทสต์เปลี่ยนกระบวนการกู้คืนระบบให้เป็นการยืนยัน ไม่ใช่การเดาสุ่ม"
      },
      {
        "skill": "risk_scanner",
        "id": "emergency_risk_scan",
        "label": "Incident Risk Scan",
        "icon": "SCAN",
        "tone": "blue",
        "tags": [
          "Scan",
          "Prevent regressions"
        ],
        "helper": "สแกนหาบั๊กข้างเคียงที่แพตช์ตัวนี้อาจสร้างผลกระทบต่อส่วนอื่นๆ",
        "tradeoff": "เปลือง Token พิเศษ แต่ก็ลดความเสี่ยงที่มองไม่เห็นลงได้ต่ำสุด",
        "outcome": "ทีมตรวจพบ Side Effect ก่อนที่ลูกค้าจะเห็นเข้า",
        "lesson": "Risk Scanner หยุดยั้งไม่ให้แพตช์ลวกๆ กลายเป็นมหันตภัยบน Prod อีกครั้ง"
      }
    ]
  }
};

const stage02 = {
  "id": "stage_02",
  "status": "coming_soon",
  "title": "SUPERPOWER WORKFLOW",
  "stage": "Stage 02: วิกฤตโค้ดเก่า (Legacy Code Crisis)",
  "intro": "เร็วๆ นี้ — โค้ดเก่ากำลังทำระบบพังบนโปรดักชั่น คุณจะสามารถนำ AI มาช่วยรีแฟกเตอร์กอบกู้วิกฤตนี้ได้หรือไม่?"
};

function choiceEffects(option) {
  return {
    time: Number.isFinite(option.effects?.time) ? option.effects.time : 0,
    token: Number.isFinite(option.effects?.token) ? option.effects.token : 0,
    risk: Number.isFinite(option.effects?.risk) ? option.effects.risk : 0,
    quality: Number.isFinite(option.effects?.quality) ? option.effects.quality : 0,
  };
}

function defaultChoiceSolves(option) {
  const effects = choiceEffects(option);
  const progress = Number.isFinite(option.progress) ? option.progress : 0;
  const solves = [];

  if (option.preventPenalty) solves.push("Resolve current Issue");
  if (option.requires?.length) solves.push("Use Combo to close multiple Gaps");
  else if (option.skill) solves.push("Use skill to resolve specific issues");
  if (effects.risk < 0) solves.push("Reduce Risk");
  if (effects.quality > 0) solves.push("Increase Quality & Evidence");
  if (progress >= 100) solves.push("Complete Phase");
  else if (progress >= 60) solves.push("Accelerate Progress");
  else if (progress >= 40) solves.push("Advance Work");
  if (!solves.length && effects.risk >= 3) solves.push("Accelerate work but increase Risk");

  return solves.slice(0, 3).join(" · ") || "Create a tactical choice for this situation";
}

function defaultChoiceMisses(option) {
  const effects = choiceEffects(option);
  const misses = [];

  if (effects.risk >= 4) misses.push("High risk can trigger a phase issue");
  else if (effects.risk >= 2) misses.push("Leaves risk that needs another guardrail");
  if (effects.quality <= -2) misses.push("Creates quality debt");
  else if (effects.quality < 0) misses.push("Lowers delivery quality");
  if (effects.token >= 3) misses.push("Spends a lot of AI budget");
  if (effects.time >= 3) misses.push("Consumes deadline room");

  return misses.join(" / ") || option.tradeoff || "Still needs verification in a later decision";
}

function hydrateChoiceMeaning(options = []) {
  options.forEach((option) => {
    option.purpose ??= option.helper || "Pick this to respond to the current workflow pressure";
    option.solves ??= defaultChoiceSolves(option);
    option.misses ??= defaultChoiceMisses(option);
  });
}

function hydrateGameplayChoiceMeaning(data) {
  data.steps.forEach((step) => {
    hydrateChoiceMeaning(step.baseOptions);
    hydrateChoiceMeaning(step.skillOptions);
    hydrateChoiceMeaning(step.synergyOptions);
    step.chaosEvents?.forEach((event) => {
      hydrateChoiceMeaning(event.options);
      hydrateChoiceMeaning(event.skillOptions);
    });
  });

  if (data.emergencyStep) {
    hydrateChoiceMeaning(data.emergencyStep.baseOptions);
    hydrateChoiceMeaning(data.emergencyStep.skillOptions);
  }
}

const allStages = [stage01, stage02];

allStages.forEach((stage) => {
  if (stage.steps) hydrateGameplayChoiceMeaning(stage);
});

export default allStages;
