// SUPERPOWER WORKFLOW gameplay data. Loaded before script.js.
const stage01 = {
  "id": "stage_01",
  "status": "available",
  "title": "SUPERPOWER WORKFLOW",
  "stage": "ด่าน 01: ลุยงานด่วน Booking MVP",
  "intro": "ลูกค้าต้องการระบบ Booking MVP สำหรับธุรกิจบริการ: เลือกบริการ, เลือก Time Slot, กรอกข้อมูลติดต่อ, คอนเฟิร์มการจอง, และดูรายการจองพื้นฐาน เกมนี้จะทดสอบว่าคุณสามารถใช้ AI เอาชีวิตรอดด้วย Workflow ที่ถูกต้องได้หรือไม่ ไม่ใช่แค่ Generate โค้ดให้เสร็จไวๆ อย่างเดียว",
  "maxSkills": 3,
  "caps": {
    "time": 20,
    "token": 14,
    "risk": 10
  },
  "randomModifierConfig": {
    "chance": 0.22,
    "maxPerRun": 2,
    "cooldownDecisions": 1,
    "guaranteedFirstRandomByPhase": "execute"
  },
  "randomModifiers": [
    {
      "id": "token_leak",
      "title": "Prompt Noise",
      "icon": "AI",
      "tone": "warn",
      "weight": 2,
      "copy": "Prompt Noise จากงานก่อนหน้า ทำให้คุณต้องใช้ AI Budget มากขึ้นเพื่อกรอง Hallucination ออกไป",
      "hint": "มักจะเกิดเมื่อมีการใช้ AI สูงเกินไป ควรแก้ปัญหาด้วยการเช็ค Scope เฉพาะจุด แทนที่จะใช้ Prompt ยาวๆ ซ้ำๆ",
      "tags": [
        "external",
        "token pressure"
      ],
      "effects": {
        "time": 0,
        "token": 1,
        "risk": 0,
        "quality": 0
      }
    },
    {
      "id": "deadline_jitter",
      "title": "Deadline Jitter",
      "icon": "CLK",
      "tone": "warn",
      "weight": 2,
      "copy": "Deadline ถูกเลื่อนให้เร็วขึ้น เพราะงานก่อนหน้ากินเวลาหรือมีการขยาย Scope",
      "hint": "ใช้สัญญาณนี้เพื่อตัด Scope หรือเลือกตรวจสอบเฉพาะจุดที่สำคัญ แทนที่จะรีบปั่นงานทุกอย่างให้เสร็จ",
      "tags": [
        "external",
        "time pressure"
      ],
      "effects": {
        "time": 1,
        "token": 0,
        "risk": 1,
        "quality": 0
      }
    },
    {
      "id": "risk_spike",
      "title": "ปัญหาที่ซ่อนอยู่",
      "icon": "RISK",
      "tone": "danger",
      "weight": 1,
      "copy": "Edge Case ที่ซ่อนอยู่โผล่ขึ้นมาตอนที่ Workflow กำลังเจอความกดดัน ต้องรีบหาวิธีรับมือด่วน",
      "hint": "เลือกใช้ Guardrails ที่จัดการกับ Edge Case นั้นโดยตรง แทนที่จะแค่ดันงานให้คืบหน้าไปก่อน",
      "tags": [
        "ภายนอก",
        "ความเสี่ยง +1"
      ],
      "effects": {
        "time": 0,
        "token": 0,
        "risk": 1,
        "quality": 0
      }
    },
    {
      "id": "lucky_guardrail",
      "title": "Guardrail ช่วยชีวิต",
      "icon": "SHD",
      "tone": "safe",
      "weight": 3,
      "copy": "Workflow Guardrails ที่คุณวางไว้ก่อนหน้านี้ ช่วยดักจับข้อผิดพลาดที่ไม่ตั้งใจเอาไว้ได้",
      "hint": "นี่คือรางวัลของการวาง Guardrails ตั้งแต่เนิ่นๆ: มันไม่ได้แจกแต้มฟรี แต่ช่วยปกป้องคุณจากความโชคร้าย",
      "tags": [
        "ภายนอก",
        "ป้องกัน"
      ],
      "effects": {
        "time": 0,
        "token": 0,
        "risk": -1,
        "quality": 1
      }
    },
    {
      "id": "context_static",
      "title": "Context สับสน",
      "icon": "CTX",
      "tone": "warn",
      "weight": 1,
      "copy": "Context Noise จากการตัดสินใจก่อนหน้า บังคับให้ทีมต้องทำ Code Review อย่างละเอียดขึ้นก่อนจะไปต่อ",
      "hint": "เมื่อ Context เริ่มมั่ว ให้กลับไปดู Spec เพื่อเป็นหลักยึด ก่อนที่จะปล่อยให้ AI Generate โค้ดเพิ่ม",
      "tags": [
        "ภายนอก",
        "เสียเวลารีวิว"
      ],
      "effects": {
        "time": 1,
        "token": 1,
        "risk": 0,
        "quality": 0
      }
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
      "teaches": "ทักษะด้าน Infra มีความเสี่ยงมากกว่าเขียน Docs เพราะมันกระทบกับ Resource จริงๆ ควรใช้แผน Plan-only, Review-first และต้องกดอนุมัติ (Approval) เสมอ",
      "warning": "ห้ามปล่อยให้ AI รัน terraform apply หรือ destroy แบบอัตโนมัติเด็ดขาด ให้ทำ Code Review ตรวจสอบ Plan และความเสี่ยงก่อนเสมอ"
    }
  ],
  "steps": [
    {
      "id": "brainstorm",
      "title": "Brainstorm",
      "goal": {
        "title": "Make The Goal Clear",
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
      "requiredProgress": 100,
      "chaosEvents": [
        {
          "id": "vulnerable_brief",
          "title": "Brief ขาด Booking Rules",
          "problem": "เหตุการณ์นักพัฒนาที่เปราะบาง",
          "copy": "ลูกค้าบอกแค่ว่า 'อยากได้ระบบจองคิวเร็วๆ' แต่ทีมไม่รู้เลยว่าใครคือคนจอง, Slot เวลาซ้อนทับกันได้ไหม, ต้องคอนเฟิร์มแบบไหน, และอะไรคือ Non-goals ของ MVP นีั",
          "danger": "การข้าม Workflow จะทำให้ AI เดา Requirement เอาเองทั้งหมด",
          "progressPenalty": 25,
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
              "effects": {
                "time": 0,
                "token": 2,
                "risk": 3,
                "quality": -1
              },
              "resolveMsg": "AI เติมข้อมูลให้จน Brief ดูสมบูรณ์ แต่ทีมก็ยังอธิบายไม่ได้อยู่ดีว่ากฎการจองจริงๆ คืออะไร และยังมีคำถามอะไรที่ตกหล่น",
              "lesson": "AI จะเสนอ Booking Flow ได้ดีเมื่อได้รับเป้าหมายและ Context ที่ชัดเจน ไม่ใช่ตอนที่โดนบังคับให้เดาสิ่งที่ว่างเปล่า",
              "problem": "เหตุการณ์นักพัฒนาที่เปราะบาง",
              "purpose": "ปล่อยให้ AI ตีความบรีฟสั้นๆ และเดา Flow การจองเอาเอง",
              "solves": "เร่งการทำงานแต่ความเสี่ยงเพิ่มขึ้น",
              "misses": "ทิ้งความเสี่ยงที่ต้องหาทางป้องกันทีหลัง / คุณภาพงานลดลง"
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
              "effects": {
                "time": 1,
                "token": 0,
                "risk": -3,
                "quality": 3
              },
              "preventPenalty": true,
              "resolveMsg": "คุณได้เคลียร์คำถามสำคัญ ทำให้รู้ว่าเป้าหมายคือการจองที่สำเร็จพร้อมหลักฐานการคอนเฟิร์ม ไม่ใช่แค่หน้าตา UI เปล่าๆ",
              "lesson": "Grill with Docs ช่วยในขั้นตอนสุดท้ายของ Brainstorming: เคลียร์คำถามที่เหลือให้ชัดก่อนจะให้ AI เดา",
              "purpose": "ใช้เอกสารอ้างอิงเพื่อตั้งคำถามเกี่ยวกับผู้ใช้, บริการ, กฎของ Slot, การยกเลิก, และการยืนยัน",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "ใช้เวลาตั้งคำถาม แต่ Flow จะไม่อิงจากการเดา"
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
              "effects": {
                "time": 1,
                "token": 0,
                "risk": -2,
                "quality": 2
              },
              "preventPenalty": true,
              "resolveMsg": "ทีมได้สร้าง Brief กลางที่ระบุเป้าหมายการจองและ Out-of-scope items ให้ AI ใช้อ้างอิง หลีกเลี่ยงการเดาไปคนละทิศคนละทาง",
              "lesson": "CONTEXT.md ช่วยให้เฟส Brainstorming สามารถสรุปเป้าหมายของ Booking MVP ไว้เป็น Shared Context ได้",
              "purpose": "สร้างบรีฟสรุปเป้าหมาย, ผู้ใช้, Flow, ขอบเขต และข้อจำกัดที่แชร์กันในทีม",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "เสียเวลาเล็กน้อย แต่ทำให้ทุกคนเห็นเป้าหมายตรงกัน"
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
              "effects": {
                "time": 1,
                "token": 0,
                "risk": -2,
                "quality": 2
              },
              "preventPenalty": true,
              "resolveMsg": "Checklist บังคับให้ทีมต้องครอบคลุมเป้าหมายการจอง, Core Flows, Trade-offs, กฎของ Slot, การคอนเฟิร์ม และคำถามที่ค้างอยู่",
              "lesson": "Scaffolds ช่วยให้มือใหม่ทำตาม Workflow ของ Brainstorming ได้ครบถ้วนโดยไม่เผลอข้าม Step",
              "purpose": "ใช้ Checklist เพื่อตรวจสอบเอกสาร, เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถาม",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "ช้ากว่าการเดา แต่ป้องกันการข้ามขั้นตอนที่สำคัญ"
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
          "lesson": "Brainstorming ควรเริ่มจากการอ่าน Docs และสรุปเป้าหมาย ไม่ใช่กระโดดไปหาวิธีแก้ปัญหาเลย",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": 0,
            "quality": 2
          },
          "purpose": "อ่านบรีฟและสรุปเป้าหมาย, ผู้ใช้หลัก, และตัวชี้วัดความสำเร็จก่อนเสนอ Flow",
          "solves": "เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "เริ่มต้นมาถูกทาง แต่ยังไม่ได้เคลียร์คำถามที่เหลือ"
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
          "lesson": "เมื่อ AI เสนอไอเดียโดยไม่มีเป้าหมายที่ถูกล็อกไว้ มันมักจะขยาย Scope จนเกินความจำเป็นเสมอ",
          "progress": 45,
          "effects": {
            "time": 1,
            "token": 3,
            "risk": 3,
            "quality": 1
          },
          "purpose": "ให้ AI เสนอ Persona, หน้าจอ และแนวทางก่อนที่จะเคลียร์ข้อสงสัยในบรีฟ",
          "solves": "เพิ่มคุณภาพและหลักฐานอ้างอิง ยท งานเดินหน้า",
          "misses": "ทิ้งความเสี่ยงที่ต้องหาทางป้องกัน / ผลาญโควตา AI เยอะมาก"
        },
        {
          "id": "skip_discovery",
          "label": "กระโดดไป Execute เลย",
          "icon": "RUN",
          "tone": "gray",
          "tags": [
            "+80%",
            "Fast experience"
          ],
          "helper": "ข้ามเฟส Brainstorm และ Plan ไปเริ่มทำ Prototype จาก Brief สั้นๆ เลย",
          "tradeoff": "สร้าง Prototype ได้เร็วมาก แต่ขาด Context อย่างรุนแรงและอาจจะต้องรื้อทำใหม่",
          "outcome": "คุณได้ UI สำเร็จรูปมาอย่างรวดเร็ว แต่ไม่มีการจัดการ State ที่ถูกต้อง และไม่ได้ตอบโจทย์เรื่องความขัดแย้งของ Slot เวลา",
          "lesson": "การข้าม Workflow ไป Execute เลยจะทำให้ได้โค้ดที่ดูดีแต่ไร้โครงสร้างที่รองรับ Use Case จริง",
          "problem": "ความมั่นใจที่ผิดพลาด",
          "progress": 80,
          "effects": {
            "time": 0,
            "token": 0,
            "risk": 4,
            "quality": -1
          },
          "purpose": "ทีมใช้แพตเทิร์นจากโปรเจกต์เก่าเพื่อร่าง Flow โดยที่ยังมีข้อสงสัย",
          "solves": "งานเดินหน้า",
          "misses": "ความเสี่ยงสูงอาจทำให้เกิดปัญหาในเฟสได้ / ลดคุณภาพงาน"
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
          "lesson": "ทักษะ Grill with Docs ช่วยในขั้นตอน 'ถามคำถามที่เหลือ' ของเฟส Brainstorming",
          "progress": 40,
          "effects": {
            "time": 2,
            "token": 0,
            "risk": -3,
            "quality": 3
          },
          "purpose": "ใช้เอกสารเพื่อตั้งคำถามเกี่ยวกับประเภทบริการ, ระยะเวลาของ Slot, กฎการชนกัน, การยกเลิก และการยืนยัน",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ใช้เวลามากขึ้น แต่ปิดข้อสงสัยได้หมดก่อนให้ AI เสนอแนวทาง"
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
          "lesson": "CONTEXT.md ช่วยในขั้นตอน 'อ่านเอกสาร' และ 'สรุปเป้าหมาย' ของเฟส Brainstorming",
          "progress": 40,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 3
          },
          "purpose": "อ่านบรีฟและสร้าง Context Seed: เป้าหมาย, ผู้ใช้, Flow, ขอบเขต และสิ่งที่ถือว่าเสร็จ (DoD)",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ลงทุนเวลาเพื่อให้ทีมและ AI เข้าใจเป้าหมายตรงกันตั้งแต่ต้น"
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
          "lesson": "Scaffolds ช่วยให้เฟส Brainstorming เป็นไปตามระบบแม้แต่กับทีมมือใหม่",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 2
          },
          "purpose": "ใช้ Checklist บังคับให้ดูเอกสาร, เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถามให้ครบ",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ช้ากว่าการเดา แต่ลดโอกาสที่จะข้ามขั้นตอนสำคัญ"
        }
      ],
      "synergyOptions": [
        {
          "requires": [
            "grill",
            "context"
          ],
          "id": "shared_brief_packet",
          "label": "Brief Alignment Packet",
          "icon": "DOC",
          "tone": "blue",
          "tags": [
            "+70%",
            "Solid brief"
          ],
          "helper": "รวมเอกสาร, เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถามเข้าเป็นบรีฟเดียว",
          "tradeoff": "ใช้เวลาและ Token เล็กน้อย แต่ยังต้องกำหนดขอบเขตและตรวจสอบในเฟส Plan ต่อไป",
          "outcome": "ทีมได้บรีฟที่ชัดเจนพอจะใช้วางแผน: รู้เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถามที่เหลือ",
          "lesson": "Brief Alignment Packet ช่วยทำให้กระบวนการ Brainstorm สมบูรณ์ก่อนปล่อย AI สร้างงาน",
          "progress": 70,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 5
          },
          "purpose": "รวมเอกสาร, เป้าหมาย, Flow หลัก, ข้อแลกเปลี่ยน และคำถามเข้าเป็นบรีฟเดียว",
          "solves": "Use Combo to close multiple Gaps ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ใช้เวลาและ Token เล็กน้อย แต่ยังต้องกำหนดขอบเขตและตรวจสอบในเฟส Plan ต่อไป"
        }
      ]
    },
    {
      "id": "plan",
      "title": "Plan",
      "goal": {
        "title": "Plan The Build",
        "copy": "เฟส Plan คือการสร้างพิมพ์เขียวสำหรับระบบ Booking เพื่อหลีกเลี่ยงการเสียเวลาไปกับการที่ AI เขียนโค้ดซ้ำซ้อน",
        "guidance": [
          "สร้างไฟล์ Spec เพื่อล็อก Scope และกำหนด Must-haves",
          "แตกย่อย Task ออกมาเป็นลำดับขั้นตอนที่ชัดเจน",
          "กำหนดเงื่อนไขการตรวจรับงาน (Acceptance Criteria / Definition of Done)",
          "ตกลงรูปแบบสถาปัตยกรรม (Architecture) ก่อนเริ่มเขียนโค้ด"
        ]
      },
      "briefing": [
        "ทีมมีเป้าหมายที่ชัดเจนแล้ว ตอนนี้เราต้องวางแผนการทำงานเพื่อป้องกันไม่ให้ AI เขียนโค้ดที่พังทลายเมื่อรวมกัน"
      ],
      "requiredProgress": 100,
      "chaosEvents": [
        {
          "id": "escape_complexity",
          "title": "Scope Creep",
          "problem": "หลีกหนีกับดักความซับซ้อน",
          "copy": "ระหว่างที่กำลังวางแผน AI แนะนำว่าเราควรเพิ่มระบบชำระเงิน, User Auth, และ Dashboard สำหรับ Admin เข้าไปใน MVP ด้วย",
          "danger": "ถ้าไม่ล็อก Scope ตอนนี้ คุณจะผลาญ Budget ไปกับการทำฟีเจอร์ที่ไม่จำเป็น",
          "progressPenalty": 30,
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
              "effects": {
                "time": 3,
                "token": 2,
                "risk": 2,
                "quality": -1
              },
              "resolveMsg": "แผนงานของคุณพองโตกลายเป็นโปรเจกต์สเกลใหญ่ ทำให้โฟกัสที่ระบบ Booking หลักหายไป",
              "lesson": "AI มักจะแนะนำให้ทำฟีเจอร์ที่เกินความจำเป็น หน้าที่ของคุณคือการคุมให้อยู่ใน Scope ของ MVP",
              "problem": "หลีกหนีกับดักความซับซ้อน",
              "purpose": "ปล่อย AI ร่างงานกว้างๆ ไปก่อน โดยที่ยังไม่กำหนดไฟล์, เทสต์, ลำดับ, และการตรวจสอบ",
              "solves": "สร้างตัวเลือกตามสถานการณ์เฉพาะหน้า",
              "misses": "ทิ้งความเสี่ยงที่ต้องหาทางป้องกันทีหลัง / คุณภาพงานลดลง / กินเวลาเดดไลน์ที่มี"
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
              "effects": {
                "time": 0,
                "token": 0,
                "risk": -3,
                "quality": 2
              },
              "preventPenalty": true,
              "resolveMsg": "คุณตีตกฟีเจอร์ที่ไม่จำเป็นทิ้ง และบังคับให้ AI โฟกัสเฉพาะ Core Booking Flow เท่านั้น",
              "lesson": "Spec Doc เป็นเครื่องมือที่ดีที่สุดในการป้องกัน Scope Creep จาก AI",
              "purpose": "ใช้ Spec เพื่อตัดสินใจว่าจะแก้ไฟล์ไหน, สร้างไฟล์ใหม่ไหม, และอะไรที่อยู่นอกขอบเขต",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "ใช้เอกสารบังคับขอบเขต แทนที่จะอิงความรู้สึกหรือคำแนะนำของ AI"
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
              "effects": {
                "time": 1,
                "token": 0,
                "risk": -3,
                "quality": 2
              },
              "preventPenalty": true,
              "resolveMsg": "คุณจัดลำดับความสำคัญของแผนงานใหม่ ให้เห็นชัดว่าถ้าทำ Payment ตอนนี้ จะกระทบเวลาของฟีเจอร์หลัก",
              "lesson": "Implementation Plan ช่วยให้ทีมมีข้ออ้างในการปฏิเสธการเพิ่ม Scope โดยอิงตามลำดับงาน",
              "purpose": "จัดเรียงลำดับงานพร้อมจุดตรวจสอบสำหรับทุกๆ Task",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "ช้ากว่าการสั่งงานรวดเดียว แต่คุมลำดับและความเกี่ยวเนื่องกันได้"
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
          "lesson": "แผนงานที่ดีควรระบุถึงการส่งต่อข้อมูล (Data Handoff) และการจัดการ State ด้วย",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -1,
            "quality": 2
          },
          "purpose": "ระบุไฟล์ที่จะดูและงานหลักๆ: หน้าเลือกบริการ, เวลา, ฟอร์ม, ยืนยัน, และรายการจอง",
          "solves": "ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "เริ่มตรงกับไฟล์ที่มีอยู่จริง แต่ขาดเทสต์, การตรวจสอบ, ความเสี่ยง และการคุมขอบเขต"
        },
        {
          "id": "rush_execute",
          "label": "ออกแบบ Architecture",
          "icon": "GO",
          "tone": "gray",
          "tags": [
            "+80%",
            "Skip Plan"
          ],
          "helper": "ให้ AI ช่วยออกแบบ Architecture และ State Management ก่อนเริ่มงาน",
          "tradeoff": "ใช้ Token และเวลาเยอะ แต่ลดโอกาสที่โค้ดจะพันกันในภายหลัง",
          "outcome": "คุณได้โครงสร้างโปรเจกต์ที่ชัดเจน มีการแยก Component และ Service ออกจากกัน",
          "lesson": "การวาง Architecture เป็นเรื่องสำคัญ โดยเฉพาะเมื่อใช้ AI สร้างโค้ดเยอะๆ",
          "problem": "การดูแลรักษาระบบที่สะเปะสะปะ",
          "progress": 80,
          "effects": {
            "time": -1,
            "token": 2,
            "risk": 4,
            "quality": 0
          },
          "purpose": "ข้ามการวางแผนไปเลย และสั่งให้ AI สร้างจากบริบทเดิมที่คุยค้างไว้",
          "solves": "งานเดินหน้า",
          "misses": "ความเสี่ยงสูงอาจทำให้เกิดปัญหาในเฟส"
        },
        {
          "id": "prototype_ready_scope",
          "label": "ลุยเขียนโค้ดเลย!",
          "icon": "MVP",
          "tone": "gray",
          "tags": [
            "+80%",
            "Loose Scope"
          ],
          "helper": "คิดว่าเข้าใจ Brief แล้ว เลยกระโดดไป Execute ทันทีโดยไม่วางแผน",
          "tradeoff": "รู้สึกเหมือนงานเดินเร็ว แต่เดี๋ยวก็ต้องกลับมารื้อโค้ดที่พัง",
          "outcome": "AI สร้าง Component ขึ้นมาสะเปะสะปะ ตัวแปร State ไม่ตรงกัน และต้องเริ่มแก้บั๊กกันตั้งแต่ตอนนี้",
          "lesson": "การไม่วางแผนคือการวางแผนที่จะล้มเหลว โดยเฉพาะกับ AI ที่พร้อมจะสร้างโค้ดขยะให้คุณทุกเมื่อ",
          "problem": "หลีกหนีกับดักความซับซ้อน",
          "progress": 80,
          "effects": {
            "time": 0,
            "token": 2,
            "risk": 3,
            "quality": -1
          },
          "purpose": "ร่างแผนระดับสูง ปล่อย AI อิสระ ไม่มีการระบุไฟล์ เทสต์ หรือการตรวจสอบอะไรเลย",
          "solves": "งานเดินหน้า",
          "misses": "ทิ้งความเสี่ยงที่ต้องหาทางป้องกันทีหลัง / คุณภาพงานลดลง"
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
          "lesson": "Spec Doc ช่วยตอบคำถามเรื่องไฟล์, ขอบเขต และการป้องกันสโคปในเฟส Plan",
          "progress": 50,
          "effects": {
            "time": 3,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "กำหนดให้ชัดเจนว่าจะแก้ไฟล์ไหน สร้างใหม่ไหม และกำหนดว่าอะไรต้องมี / อยู่นอกขอบเขต",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "กินเวลาเดดไลน์ที่มี"
        },
        {
          "skill": "plan_doc",
          "id": "implementation_plan",
          "label": "Implementation Plan",
          "icon": "PLAN",
          "tone": "blue",
          "tags": [
            "+50%",
            "order/verify"
          ],
          "helper": "จัดลำดับงาน, การพึ่งพา, และวิธีตรวจสอบหลังทำเสร็จแต่ละงาน",
          "tradeoff": "ใช้เวลามากขึ้น แต่ช่วยลดการต้องแก้ Prompt ซ้ำๆ ในเฟส Execution",
          "outcome": "ทีมเห็นภาพรวมจากไฟล์ ไปจนถึงรีวิว และรู้ชัดว่าต้องตรวจสอบอะไร",
          "lesson": "Implementation Plan ช่วยระบุลำดับและการตรวจสอบก่อนจะให้ AI เริ่มลงมือ",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -3,
            "quality": 4
          },
          "purpose": "จัดลำดับงาน, การพึ่งพา, และวิธีตรวจสอบหลังทำเสร็จแต่ละงาน",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ใช้เวลามากขึ้น แต่ช่วยลดการต้องแก้ Prompt ซ้ำๆ ในเฟส Execution"
        },
        {
          "skill": "terraform_skill",
          "id": "terraform_module_plan",
          "label": "IaC Module Plan",
          "icon": "IAC",
          "tone": "mint",
          "tags": [
            "+35%",
            "plan-only"
          ],
          "helper": "วางแผนเรื่อง Terraform Module, สภาพแวดล้อม, เทสต์, และการป้องกันโดยยังไม่รัน apply",
          "tradeoff": "เสียเวลาเพิ่ม แต่ลดความเสี่ยงที่เกี่ยวกับโครงสร้างเซิร์ฟเวอร์",
          "outcome": "ทีมมีแผน IaC ที่ระบุ Module, State, Tests และเงื่อนไขการอนุมัติล่วงหน้า",
          "lesson": "Terraform ต้องเริ่มที่แผนและการป้องกัน ห้ามให้ AI รันคำสั่งโครงสร้างโดยตรง",
          "progress": 35,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -3,
            "quality": 3
          },
          "purpose": "วางแผนเรื่อง Terraform Module, สภาพแวดล้อม, เทสต์, และการป้องกันโดยยังไม่รัน apply",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "เสียเวลาเพิ่ม แต่ลดความเสี่ยงที่เกี่ยวกับโครงสร้างเซิร์ฟเวอร์"
        },
        {
          "skill": "context",
          "id": "context_constraints",
          "label": "CONTEXT.md Constraints",
          "icon": "CTX",
          "tone": "mint",
          "tags": [
            "+35%",
            "Actual status"
          ],
          "helper": "ตรวจสอบแผนไขว้กับ Context: เป้าหมาย, ไฟล์ที่มี, ข้อจำกัด และ DoD",
          "tradeoff": "ไม่ใช่ทางเลือกที่เร็วที่สุด แต่ป้องกันการเพ้อฝันถึงไฟล์ที่ไม่มีอยู่จริง",
          "outcome": "แผนจะอิงตามความเป็นจริง ไม่กลายเป็นแค่ความต้องการเลื่อนลอย",
          "lesson": "CONTEXT.md ช่วยปรับแผนให้ตรงกับสถานะความเป็นจริงของโปรเจกต์",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 2
          },
          "purpose": "ตรวจสอบแผนไขว้กับ Context: เป้าหมาย, ไฟล์ที่มี, ข้อจำกัด และ DoD",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ไม่ใช่ทางเลือกที่เร็วที่สุด แต่ป้องกันการเพ้อฝันถึงไฟล์ที่ไม่มีอยู่จริง"
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
          "lesson": "Scaffolds ช่วยให้ไม่ลืมเรื่องเทสต์ ความเสี่ยง และขอบเขต",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 2
          },
          "purpose": "ใช้ Checklist บังคับเรื่องเทสต์, DoD, ความเสี่ยง และขอบเขตก่อนเข้า Execution",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "เพิ่มขั้นตอนขึ้นบ้าง แต่ลดความมั่นใจผิดๆ และการลืมทำเทสต์"
        }
      ],
      "synergyOptions": [
        {
          "requires": [
            "spec",
            "plan_doc"
          ],
          "id": "spec_to_plan",
          "label": "Implementation Readiness Draft",
          "icon": "FLOW",
          "tone": "blue",
          "tags": [
            "+70%",
            "ready to execute"
          ],
          "helper": "รวมรายละเอียดไฟล์, การเทสต์, ลำดับ, และขอบเขตเข้าในแผนงานเดียว",
          "tradeoff": "เสียเวลากับ Token ไปบ้าง ได้แผนออกมา แต่ก็ยังต้องมาตัดสินใจเลือกงานแรกอยู่ดี",
          "outcome": "AI ได้รับแผนที่ทำได้จริง รู้ว่าต้องแก้ตรงไหน ระวังตรงไหน ตรวจสอบอย่างไร",
          "lesson": "แผน Implementation Readiness ช่วยตอบโจทย์ได้ครบว่าต้องทำอะไร ที่ไหน อย่างไร",
          "progress": 70,
          "effects": {
            "time": 3,
            "token": 1,
            "risk": -5,
            "quality": 6
          },
          "purpose": "รวมรายละเอียดไฟล์, การเทสต์, ลำดับ, และขอบเขตเข้าในแผนงานเดียว",
          "solves": "Use Combo to close multiple Gaps ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "กินเวลาเดดไลน์ที่มี"
        }
      ]
    },
    {
      "id": "execute",
      "title": "Execute",
      "goal": {
        "title": "Executing Plans",
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
      "requiredProgress": 100,
      "chaosEvents": [
        {
          "id": "hardcoded_secret",
          "title": "Hallucination Spike",
          "problem": "โค้ดหลุดข้อมูล Secrets ความปลอดภัย",
          "copy": "จู่ๆ AI ก็เรียกใช้ Library ประหลาดๆ ที่ไม่มีอยู่จริง และใส่โค้ดที่ดูซับซ้อนเกินจำเป็นเข้ามาในการจอง",
          "danger": "ถ้าปล่อยผ่าน โค้ดนี้จะรันไม่ขึ้น และการหาจุดแก้จะยากมาก",
          "progressPenalty": 30,
          "options": [
            {
              "id": "chaos_remove_secret_later",
              "label": "ช่างมัน รันไปก่อน",
              "icon": "KEY",
              "tone": "gray",
              "tags": [
                "Remove later",
                "Risky"
              ],
              "helper": "ภาวนาให้โค้ดมันรันผ่าน และหวังว่ามันจะใช้งานได้",
              "tradeoff": "ไม่ต้องเสียเวลาแก้ตอนนี้ แต่มันจะพังพินาศตอน Test แน่นอน",
              "effects": {
                "time": 0,
                "token": 0,
                "risk": 4,
                "quality": -1
              },
              "resolveMsg": "โค้ดพังยับเยิน Error กระจายเต็มหน้าจอ คุณต้องเสียเวลาไล่ลบโค้ดผีเหล่านั้นทิ้ง",
              "lesson": "อย่าปล่อยผ่าน Hallucination เด็ดขาด โค้ดที่อธิบายไม่ได้คือหนี้สินก้อนโต",
              "problem": "โค้ดหลุดข้อมูล Secrets ความปลอดภัย",
              "purpose": "จำไว้ในใจว่าจะมาลบ Key ออกทีหลัง",
              "solves": "เร่งการทำงานแต่ความเสี่ยงเพิ่มขึ้น",
              "misses": "ความเสี่ยงสูงอาจทำให้เกิดปัญหาในเฟสได้ / ลดคุณภาพงาน"
            }
          ],
          "skillOptions": [
            {
              "skill": "risk_scanner",
              "id": "chaos_risk_secret_alert",
              "label": "บังคับใช้ TDD Loop",
              "icon": "SCAN",
              "tone": "mint",
              "tags": [
                "Passive guard",
                "Early warning"
              ],
              "helper": "ถอยกลับไปหนึ่งก้าว แล้วสั่งให้ AI เขียน Failing Test ก่อนสร้างโค้ด",
              "tradeoff": "งานเดินช้าลงนิดนึง แต่ดักจับโค้ดมั่วๆ ได้ชะงัด",
              "effects": {
                "time": 1,
                "token": 1,
                "risk": -4,
                "quality": 2
              },
              "preventPenalty": true,
              "resolveMsg": "TDD บังคับให้ AI ต้องเขียนโค้ดที่ผ่าน Test เท่านั้น ทำให้บรรดา Library ผีๆ หายไปหมด",
              "lesson": "TDD Loop คือเครื่องมือที่ดีที่สุดในการป้องกัน Hallucination จาก AI",
              "purpose": "ระบบแจ้งเตือนว่าพบรูปแบบของ Token/Secret หลุดเข้ามาในโค้ด",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "ต้องใช้เวลาตรวจสอบ แต่ช่วยลดความเสียหาย"
            },
            {
              "skill": "scaffolds",
              "id": "chaos_security_scaffold",
              "label": "ให้ AI อธิบายโค้ด (Walkthrough)",
              "icon": "KIT",
              "tone": "mint",
              "tags": [
                "Checklist",
                "Prevent memory slips"
              ],
              "helper": "สั่งให้ AI อธิบายบรรทัดต่อบรรทัด ว่าเรียกใช้ Library นี้ทำไม และทำงานยังไง",
              "tradeoff": "เปลือง Token หน่อย แต่ทำให้ AI ทบทวนตรรกะของตัวเองใหม่",
              "effects": {
                "time": 1,
                "token": 0,
                "risk": -3,
                "quality": 2
              },
              "preventPenalty": true,
              "resolveMsg": "พอโดนจี้ให้อธิบาย AI ก็รู้ตัวว่ามั่วขึ้นมา จึงขอโทษและเสนอโค้ดใหม่ที่ถูกต้อง",
              "lesson": "การให้ AI อธิบายโค้ดตัวเอง (Rubber Ducking) มักจะช่วยแก้ Hallucination ได้",
              "purpose": "ใช้ Checklist ห้ามการ Hardcode Secrets และบังคับใช้ตัวแปร ENV",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "เพิ่มขั้นตอนตรวจสอบ แต่กันความผิดพลาดจากนักพัฒนาจูเนียร์"
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "single_ai_pass",
          "label": "Prompt ทีละสเต็ป",
          "icon": "ONE",
          "tone": "gray",
          "tags": [
            "+80%",
            "batch work"
          ],
          "helper": "สั่ง AI ให้ทำทีละ Component เช่น 'ทำ UI เลือกบริการก่อน' แล้วค่อยไปต่อ",
          "tradeoff": "ช้าแต่มั่นคง ลดความผิดพลาดได้เยอะ",
          "outcome": "คุณได้ UI เลือกบริการที่ทำงานได้จริง จากนั้นจึงเริ่มทำระบบเลือก Slot เวลาต่อ",
          "lesson": "การย่อย Prompt คือกุญแจสำคัญในการคุม AI",
          "progress": 80,
          "effects": {
            "time": 0,
            "token": 3,
            "risk": 4,
            "quality": 0
          },
          "purpose": "รวม Task ที่ดูเกี่ยวข้องกันให้ AI ทำรวดเดียวครอบคลุมทุกเรื่อง",
          "solves": "งานเดินหน้า",
          "misses": "ความเสี่ยงสูงอาจทำให้เกิดปัญหาในเฟส / ใช้ AI Budget เยอะมาก"
        },
        {
          "id": "reprompt_loop",
          "label": "Mega Prompt ตู้มเดียวจบ",
          "icon": "LOOP",
          "tone": "gray",
          "tags": [
            "+80%",
            "Fast debug"
          ],
          "helper": "ใส่รายละเอียดทั้งหมดลงใน Prompt เดียว แล้วภาวนาให้ AI เขียน Booking MVP ออกมาสมบูรณ์",
          "tradeoff": "อาจจะเสร็จเร็วมาก หรือพังยับเยินจนต้องแก้ใหม่หมด",
          "outcome": "AI พ่นโค้ดออกมาหลายร้อยบรรทัด บางส่วนทำงานได้ดี แต่บางส่วนก็พังลอจิกพัง แถม State มั่วซั่ว",
          "lesson": "Mega Prompt มักจะให้ผลลัพธ์ที่ขาดๆ เกินๆ และยากต่อการตรวจสอบ",
          "problem": "ติดกับดัก Reprompt วนลูป",
          "progress": 80,
          "effects": {
            "time": 3,
            "token": 4,
            "risk": 4,
            "quality": -2
          },
          "purpose": "ใช้ Error ล่าสุดเป็น Context ให้ AI แปะโค้ดแก้ทันที",
          "solves": "เร่งการทำงานแต่ความเสี่ยงเพิ่มขึ้น",
          "misses": "ความเสี่ยงสูงอาจทำให้เกิดปัญหาในเฟส / Creates quality debt / ใช้ AI Budget เยอะมาก / กินเวลาเดดไลน์ที่มี"
        },
        {
          "id": "manual_build",
          "label": "ก็อปแปะโค้ดเก่าๆ",
          "icon": "HND",
          "tone": "mint",
          "tags": [
            "+55%",
            "Next task"
          ],
          "helper": "เอาโค้ดจากโปรเจกต์อื่นมาแปะผสมกับที่ AI เจนให้ โดยไม่สนเรื่องความเข้ากันได้",
          "tradeoff": "ดูเหมือนงานจะเสร็จไปเยอะ แต่เต็มไปด้วย Tech Debt",
          "outcome": "โค้ดรันได้แบบงงๆ แต่ระบบ Booking มีการจัดการเวลา (Timezone) ผิดพลาดอย่างจัง",
          "lesson": "การผสมโค้ดมั่วๆ โดยไม่เข้าใจ Context จะสร้างระเบิดเวลาไว้ในระบบ",
          "progress": 55,
          "effects": {
            "time": 3,
            "token": 1,
            "risk": -1,
            "quality": 2
          },
          "purpose": "อ่านแผน เลือกงานถัดไป สรุปสิ่งที่จะทำ และแก้เฉพาะไฟล์ที่เกี่ยว",
          "solves": "ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง ยท งานเดินหน้า",
          "misses": "กินเวลาเดดไลน์ที่มี"
        },
        {
          "id": "tool_rush_no_check",
          "label": "Generate UI Slice First",
          "icon": "GEN",
          "tone": "gray",
          "tags": [
            "+80%",
            "visual first"
          ],
          "helper": "ให้ AI สร้าง UI การจองคิวออกมาก่อน แล้วค่อยมาดูว่าต้องใส่ Validation ตรงไหน",
          "tradeoff": "ทำให้เห็นภาพรวมได้เร็ว แต่ระบบการตรวจสอบ ข้อมูลซ้อนทับ ก็ยังคงพังอยู่",
          "outcome": "แอปดูเหมือนจะเสร็จเร็วมาก แต่ไม่มีหลักฐานยืนยันว่าการทำงานนั้นถูกต้อง",
          "lesson": "การทำ UI ล่วงหน้าช่วยในการคุย Requirement ได้ แต่สุดท้ายก็ต้องมีเทสต์อยู่ดี",
          "problem": "โยนงานตรวจคุณภาพให้ AI แทน",
          "progress": 80,
          "effects": {
            "time": 0,
            "token": 2,
            "risk": 3,
            "quality": 1
          },
          "purpose": "ให้ AI สร้าง UI การจองคิวออกมาก่อน แล้วค่อยมาดูว่าต้องใส่ Validation ตรงไหน",
          "solves": "เพิ่มคุณภาพและหลักฐานอ้างอิง ยท งานเดินหน้า",
          "misses": "ทิ้งความเสี่ยงที่ต้องการ Guardrail อย่างอื่นมาช่วย"
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
          "lesson": "TDD Loop บังคับให้ AI ทำงานทีละอย่าง และมีข้อพิสูจน์ว่ามันผ่านจริงๆ ไม่ใช่แค่หน้าตาดี",
          "progress": 55,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "เขียน Failing Test ก่อน เขียนโค้ดสั้นๆ ให้ผ่าน Refactor และทำซ้ำจนกว่าจะย้ายไปงานถัดไป",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ใช้เวลามากขึ้น แต่ดักจับบั๊กได้ก่อนจะข้ามไปทำงานอื่น"
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
          "lesson": "ความเร็วของ AI ทำให้เราต้องการระบบเตือนภัยล่วงหน้าเรื่องขอบเขตและความปลอดภัย",
          "progress": 50,
          "effects": {
            "time": 1,
            "token": 2,
            "risk": -3,
            "quality": 3
          },
          "purpose": "แจ้งเตือนเมื่อ AI แตะไฟล์นอกขอบเขต ขาดเทสต์ ทำ Secret หลุด หรือความเสี่ยงเรื่องข้อมูล",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "มีโอเวอร์เฮด แต่มันหยุดความเสี่ยงได้ก่อนจะลามไปส่วนอื่น"
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
          "lesson": "Workflow ของ Infra ต้องรอการอนุมัติจากคนก่อนจะรันคำสั่งแก้ไขโครงสร้าง",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "รัน Terraform แค่ plan-only: fmt, validate, test, plan แล้วหยุดก่อนที่จะ apply",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ช้ากว่าแบบปั่นเสร็จแล้ว Deploy เลย แต่คุ้มครองทรัพยากรบนเซิร์ฟเวอร์ได้"
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
          "lesson": "Scaffolds ช่วยป้องกันการ Execute แผนงานไม่ให้กลายเป็นการวนลูปแก้โค้ดไปเรื่อย",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -3,
            "quality": 3
          },
          "purpose": "ใช้ Checklist: อ่านแผน เลือกงาน สรุป หาไฟล์ เขียนเทสต์ สรุปผล แล้วหยุดประเมิน",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ช้ากว่าการก็อป Error แปะๆ แต่ได้แก้ที่ต้นเหตุ"
        }
      ],
      "synergyOptions": [
        {
          "requires": [
            "spec",
            "tdd"
          ],
          "id": "synergy_guardrails",
          "label": "Spec-Test Guardrails",
          "icon": "SHD",
          "tone": "blue",
          "tags": [
            "+70%",
            "spec + test"
          ],
          "helper": "ใช้ Spec + TDD Loop ตรวจสอบความถูกต้อง: เขียนเทสต์ที่พัง -> แก้ให้ผ่าน -> รีแฟกเตอร์ ก่อนจะรับงาน",
          "tradeoff": "ใช้ Token กับเวลาเก็บหลักฐาน แต่ก็ยังคงต้องประเมินต่อว่าสโคปแค่นี้พอหรือไม่",
          "outcome": "งานเดินเร็ว โดยมี Spec เป็นเป้า และ TDD Loop ช่วยการันตีว่ามันผ่าน",
          "lesson": "Spec กำหนดว่าต้องสร้างอะไร ส่วน TDD Loop พิสูจน์ว่ามันรันผ่านจริงๆ",
          "progress": 70,
          "effects": {
            "time": 2,
            "token": 3,
            "risk": -4,
            "quality": 5
          },
          "purpose": "ใช้ Spec + TDD Loop ตรวจสอบความถูกต้อง: เขียนเทสต์ที่พัง -> แก้ให้ผ่าน -> รีแฟกเตอร์ ก่อนจะรับงาน",
          "solves": "Use Combo to close multiple Gaps ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ใช้ AI Budget เยอะมาก"
        },
        {
          "requires": [
            "terraform_skill",
            "risk_scanner"
          ],
          "id": "iac_safety_gate",
          "label": "IaC Safety Gate",
          "icon": "IAC",
          "tone": "blue",
          "tags": [
            "+70%",
            "plan + risk"
          ],
          "helper": "ใช้ข้อมูล Terraform plan + Risk Scanner ตรวจจับ Drift, Secrets, และความเสี่ยง ก่อนอนุมัติ Apply",
          "tradeoff": "ใช้เวลาและ Token เพิ่ม แต่สามารถอุดช่องโหว่ความเสี่ยงทางโครงสร้างได้หมดจด",
          "outcome": "ทีมตรวจสอบการเปลี่ยนแปลงรุนแรง ความเสี่ยงเรื่อง Secret ก่อนจะแตะระบบจริง",
          "lesson": "Workflow ของ Terraform ที่ดีต้องมีการวางแผน, สแกนความเสี่ยง, และอนุมัติชัดเจนก่อนทำงานจริง",
          "progress": 70,
          "effects": {
            "time": 3,
            "token": 2,
            "risk": -5,
            "quality": 5
          },
          "purpose": "ใช้ข้อมูล Terraform plan + Risk Scanner ตรวจจับ Drift, Secrets, และความเสี่ยง ก่อนอนุมัติ Apply",
          "solves": "Use Combo to close multiple Gaps ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "กินเวลาเดดไลน์ที่มี"
        }
      ]
    },
    {
      "id": "review",
      "title": "Review",
      "goal": {
        "title": "Review Against Evidence",
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
      "requiredProgress": 100,
      "chaosEvents": [
        {
          "id": "shadow_it",
          "title": "Secret Key หลุดในโค้ด",
          "problem": "ระบบถูกมองเป็น Shadow IT (แอประดับทดลองที่ไม่ผ่านมาตรฐาน)",
          "copy": "ระหว่างเตรียมส่งงาน คุณพบว่า AI แอบใส่ API Key ของจริง (หรือคล้ายของจริงมาก) ไว้แบบ Hard-code ในไฟล์ Frontend",
          "danger": "ถ้ากดส่งงานไปตอนนี้ ระบบจะมีความเสี่ยงขั้นวิกฤต",
          "progressPenalty": 30,
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
              "effects": {
                "time": 1,
                "token": 0,
                "risk": 4,
                "quality": -1
              },
              "resolveMsg": "คุณส่งงานผ่านไปได้ แต่ไม่กี่วันต่อมา API Key ก็ถูกดูดเงินไปหลายแสน",
              "lesson": "เรื่อง Security ไม่ใช่เรื่องล้อเล่น ถึงจะเป็น MVP ก็ห้ามปล่อย Hard-code Secrets เด็ดขาด",
              "problem": "ระบบถูกมองเป็น Shadow IT (แอประดับทดลองที่ไม่ผ่านมาตรฐาน)",
              "purpose": "อธิบายไปว่านี่คือเดโมแบบเร็วๆ แล้วรับปากว่าจะทำ Document ทีหลัง",
              "solves": "เร่งการทำงานแต่ความเสี่ยงเพิ่มขึ้น",
              "misses": "ความเสี่ยงสูงอาจทำให้เกิดปัญหาในเฟสได้ / ลดคุณภาพงาน"
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
              "effects": {
                "time": 2,
                "token": 1,
                "risk": -4,
                "quality": 3
              },
              "preventPenalty": true,
              "resolveMsg": "คุณย้าย API Key ไปไว้ใน .env อย่างปลอดภัย ปิดรอยรั่วสำคัญได้สำเร็จ",
              "lesson": "Code Review ช่วยดักจับปัญหาคอขาดบาดตายอย่าง Hard-code Secrets ได้ทันท่วงที",
              "purpose": "รวมรวบหลักฐาน: ตรง Spec ไหม? ผ่าน AC ไหม? ออกนอกขอบเขตไหม? ครอบคลุมการเทสต์ไหม? ความเสี่ยงปลอดภัย? ฯลฯ",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "ใช้เวลารีวิว แต่ให้ผลลัพธ์ที่ชัดเจนเอาไปคุยกับฝั่ง Ops/IT ได้"
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
              "effects": {
                "time": 1,
                "token": 0,
                "risk": -3,
                "quality": 2
              },
              "preventPenalty": true,
              "resolveMsg": "Scanner กวาดเจอ Key ที่ซ่อนอยู่ และ Token เก่าๆ คุณล้างบางมันออกจนหมดจด",
              "lesson": "เครื่องมือ Automated อย่าง Risk Scanner ช่วยลดความผิดพลาดของมนุษย์ในการตรวจหา Secrets ได้ดีเยี่ยม",
              "purpose": "เปิด Context, ขอบเขต Booking, และ DoD มาออดิตกัน",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "Document ไม่ได้ช่วยแก้บั๊ก แต่มันกันไม่ให้คนมองโปรเจกต์คุณเป็นเหมือนเด็กเล่นขายของ"
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
              "effects": {
                "time": 2,
                "token": 0,
                "risk": -3,
                "quality": 3
              },
              "preventPenalty": true,
              "resolveMsg": "Review Template ช่วยให้ทีมสามารถตอบคำถามฝั่ง Ops/IT ได้อย่างเป็นระบบ",
              "lesson": "Scaffolds ทำให้มาตรฐานไม่ตกหล่นตามความทรงจำของใครบางคน",
              "purpose": "ใช้ Template ตรวจสอบ: Spec, AC, ไฟล์นอกกรอบ, Test, Security, ฯลฯ",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท ลดความเสี่ยง",
              "misses": "ต้องไล่ดูตาม Checklist แต่มันป้องกันไม่ให้หลงลืมประเด็นสำคัญ"
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
          "lesson": "Manual Test ดี แต่ไม่พอสำหรับการทำระบบให้พร้อม Production",
          "progress": 40,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -1,
            "quality": 1
          },
          "purpose": "ลองรันแอป, ลองกดเลือกบริการ, เลือกเวลา, กรอกข้อมูล, คอนเฟิร์ม, แล้วเปิดดูรายการในระบบ",
          "solves": "ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง ยท งานเดินหน้า",
          "misses": "ตรวจสอบ Flow เบื้องต้น แต่ไม่ได้คัฟเวอร์เรื่อง Spec, Security, หรือคุณภาพโค้ดเลย"
        },
        {
          "id": "ai_self_review",
          "label": "สั่ง Full Code Review",
          "icon": "AI",
          "tone": "gray",
          "tags": [
            "+80%",
            "AI review"
          ],
          "helper": "ให้ AI หรือเพื่อนในทีมช่วย Review โค้ดเทียบกับ Spec ทั้งหมด",
          "tradeoff": "ใช้ Token และเวลาเยอะ แต่คุณภาพออกมาเนี๊ยบ",
          "outcome": "จับบักได้เพียบเรื่อง Timezone ซ้อนทับกัน และเรื่อง Form Validation ที่ยังหลวมอยู่",
          "lesson": "Review คือปราการด่านสุดท้ายก่อนหายนะ",
          "problem": "โยนงานตรวจคุณภาพให้ AI แทน",
          "progress": 80,
          "effects": {
            "time": 1,
            "token": 2,
            "risk": 3,
            "quality": 0
          },
          "purpose": "ให้ AI โมเดลเดิม มารีวิวโค้ดที่มันเพิ่งเขียนเอง โดยไม่ต้องเอา Spec หรือ Test มาเช็คเทียบ",
          "solves": "งานเดินหน้า",
          "misses": "ทิ้งความเสี่ยงที่ต้องการ Guardrail อย่างอื่นมาช่วย"
        },
        {
          "id": "ship_now",
          "label": "ข้าม Review แล้วส่งงาน (Ship It!)",
          "icon": "NOW",
          "tone": "gray",
          "tags": [
            "+80%",
            "Looks done"
          ],
          "helper": "เวลาน้อย ขี้เกียจตรวจแล้ว มั่นใจว่า AI เก่ง รันผ่านคือจบ กดส่งงานเลย!",
          "tradeoff": "ถึงเส้นชัยเร็วมาก แต่ไปวัดดวงกันหน้างานว่าจะมีระบบไหนพังบ้าง",
          "outcome": "คุณส่งมอบระบบได้ตรงเวลาเป๊ะ! แต่ลูกค้าบ่นว่าทำไมระบบจองเวลาชนกันได้ และอีเมลไม่ออก...",
          "lesson": "YOLO Ship It มักจบด้วยการแก้บั๊กกลางดึกเสมอ",
          "problem": "ความมั่นใจที่ผิดพลาด",
          "progress": 80,
          "effects": {
            "time": 0,
            "token": 0,
            "risk": 5,
            "quality": -3
          },
          "purpose": "ปล่อยงานทันที เพราะ AI แจ้งว่าไม่มี Error และหน้าตาเดโมก็ดูดี",
          "solves": "เร่งความคืบหน้าแบบลัดขั้นตอน",
          "misses": "ความเสี่ยงสูงอาจทำให้เกิดปัญหาในเฟส / Creates quality debt"
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
          "lesson": "Code Review คือประตูด่านสุดท้ายในการเช็ค Spec, Tests, Scope, และโค้ด",
          "progress": 60,
          "effects": {
            "time": 3,
            "token": 1,
            "risk": -5,
            "quality": 5
          },
          "purpose": "ออดิต: Spec, AC, ไฟล์นอกกรอบ, Test, Security, Data, ฯลฯ",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "กินเวลาเดดไลน์ที่มี"
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
          "lesson": "นักพัฒนาต้องเข้าใจโค้ดของ AI ไม่ใช่แค่เชื่อว่าเสร็จเพราะ AI บอกว่าเสร็จแล้ว",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 2,
            "risk": -4,
            "quality": 4
          },
          "purpose": "บังคับ AI อธิบายกลไก State, Validation, การคุม Data พร้อมให้ทีมช่วยกันซักไซ้",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "เปลือง Token แต่กันไม่ให้ทีมปล่อยโค้ดที่พวกเขาก็ยังไม่เข้าใจมัน 100%"
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
          "lesson": "TDD Loop ให้หลักฐานชัดเจนว่าโค้ดนั้นทำงานได้ตามที่ตกลงกันไว้",
          "progress": 55,
          "effects": {
            "time": 1,
            "token": 1,
            "risk": -3,
            "quality": 3
          },
          "purpose": "ทำ TDD Loop ซ้ำ: เขียนเทสต์ให้พัง, แก้สั้นๆ, Refactor, รันซ้ำ ให้ครอบคลุมทุกจุดสำคัญ",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ตรงไปตรงมา แต่ต้องลงทุนเวลาสูง"
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
          "lesson": "ความเสี่ยงที่สะสมไว้ ต้องสามารถถูกมองเห็นได้ก่อนส่งมอบงาน",
          "progress": 55,
          "effects": {
            "time": 1,
            "token": 2,
            "risk": -4,
            "quality": 4
          },
          "purpose": "สแกนหาจุดที่อาจเป็น Secret หลุด, หา Logic ที่เปราะบาง, และการขัดแย้งต่างๆ",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "มีขั้นตอนเสริม แต่ลดความเสี่ยงช่วงท้ายโปรเจกต์"
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
          "lesson": "IaC รีวิวต้องดูทั้งโค้ดและผลกระทบ ไม่ใช่แค่ดูว่า Syntax ผ่านไหม",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "ตรวจสอบ Terraform ทั้ง Test, Module, State, Secrets และความปลอดภัยบน Prod",
          "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "เสียเวลารีวิวเพิ่ม แต่ลดความเสี่ยงเวลาเกิดเหตุบนเซิร์ฟเวอร์จริงที่จะแก้กลับยาก"
        }
      ],
      "synergyOptions": [
        {
          "requires": [
            "code_review",
            "walkthrough"
          ],
          "id": "review_walkthrough_combo",
          "label": "Review Walkthrough Pass",
          "icon": "CHK",
          "tone": "blue",
          "tags": [
            "+70%",
            "Understand & Audit"
          ],
          "helper": "ทำ Code Review สอดคล้องกับ Walkthrough: ตรวจเช็ค Spec, ความปลอดภัย, ฯลฯ ควบคู่กันไป",
          "tradeoff": "ลงทุนเวลาและ Token แต่ยังต้องไปหาทางแก้ตาม Test หรือหลักฐานอยู่ดี",
          "outcome": "ทีมจะจับบั๊กได้และเข้าใจว่าทำไมต้องแก้ด้วย",
          "lesson": "การรีวิวที่ดีช่วยให้ทีมปล่อยโค้ดด้วยความเข้าใจ ไม่ใช่แค่ศรัทธาใน AI",
          "progress": 70,
          "effects": {
            "time": 3,
            "token": 3,
            "risk": -5,
            "quality": 6
          },
          "purpose": "ทำ Code Review สอดคล้องกับ Walkthrough: ตรวจเช็ค Spec, ความปลอดภัย, ฯลฯ ควบคู่กันไป",
          "solves": "Use Combo to close multiple Gaps ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "ใช้ AI Budget เยอะมาก / กินเวลาเดดไลน์ที่มี"
        },
        {
          "requires": [
            "spec",
            "code_review"
          ],
          "id": "spec_review_gate",
          "label": "Spec Evidence Gate",
          "icon": "GATE",
          "tone": "blue",
          "tags": [
            "+70%",
            "Audit vs Spec"
          ],
          "helper": "ใช้ Spec ควบคู่ Code Review ตรวจสอบคุณภาพงานและความปลอดภัยให้ครบถ้วน",
          "tradeoff": "ช้าลง แต่เป็นการประเมินคุณภาพงานตามกรอบขอบเขตและหลักฐานที่แท้จริง",
          "outcome": "ทีมปิดช่องโหว่ระหว่างสิ่งที่ AI สร้างกับสิ่งที่คุยกันไว้ จับได้หมดว่าอันไหนเป็นของแถมที่ไม่จำเป็น",
          "lesson": "Spec ป้องกันการใช้ความรู้สึกตอนรีวิว และดักจบการบานปลายที่ AI แอบยัดมา",
          "progress": 70,
          "effects": {
            "time": 3,
            "token": 2,
            "risk": -4,
            "quality": 5
          },
          "purpose": "ใช้ Spec ควบคู่ Code Review ตรวจสอบคุณภาพงานและความปลอดภัยให้ครบถ้วน",
          "solves": "Use Combo to close multiple Gaps ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
          "misses": "กินเวลาเดดไลน์ที่มี"
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
        "lesson": "บางครั้งก็ไม่มีทางลัด; คุณต้องทุ่มเวลาเพื่อดับไฟให้ได้",
        "effects": {
          "time": 4,
          "token": 0,
          "risk": -4,
          "quality": 1
        },
        "purpose": "รีโปรดิวซ์ แยกส่วน ซ่อมแซม และยืนยันความถูกต้องด้วยตัวคุณเอง",
        "solves": "ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
        "misses": "กินเวลาเดดไลน์ที่มี"
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
        "problem": "ติดกับดัก Reprompt วนลูป",
        "effects": {
          "time": 0,
          "token": 4,
          "risk": -1,
          "quality": -1
        },
        "purpose": "ยัด Error ให้ AI ทันที เพื่อให้เดโมกลับมาทำงานได้โดยไว",
        "solves": "ลดความเสี่ยง",
        "misses": "Lowers delivery quality / ใช้ AI Budget เยอะมาก"
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
        "lesson": "Scaffolds ช่วยให้มือใหม่มีแนวทางที่ชัดเจนเวลาที่ระบบพัง",
        "effects": {
          "time": 3,
          "token": 1,
          "risk": -5,
          "quality": 2
        },
        "purpose": "ใช้ Runbook: สรุปปัญหา แยกส่วนหาตัวการ ย้อนกลับ ยืนยัน แล้วอธิบาย",
        "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
        "misses": "กินเวลาเดดไลน์ที่มี"
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
        "lesson": "อย่าเชื่อใจแพตช์เพียงเพราะมันรันผ่าน; ให้เข้าใจว่าจริงๆ มันแก้อะไร",
        "effects": {
          "time": 2,
          "token": 2,
          "risk": -4,
          "quality": 2
        },
        "purpose": "ให้ AI อธิบายแพตช์นั้นก่อน แล้วเราไล่ดูทีละบรรทัดก่อนตกลงใจ",
        "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
        "misses": "เปลือง Token และเวลา แต่ป้องกันการหลับหูหลับตากดรับงาน"
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
        "lesson": "เทสต์เปลี่ยนกระบวนการกู้คืนระบบให้เป็นการยืนยัน ไม่ใช่การเดาสุ่ม",
        "effects": {
          "time": 2,
          "token": 1,
          "risk": -4,
          "quality": 2
        },
        "purpose": "เขียนเทสต์สั้นๆ เพื่อให้ชัวร์ว่าบั๊กหลักจะไม่กลับมาอีก",
        "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
        "misses": "ช้ากว่าการแปะแพตช์ดิบๆ แต่การันตีว่าไฟดับสนิทแล้ว"
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
        "lesson": "Risk Scanner หยุดยั้งไม่ให้แพตช์ลวกๆ กลายเป็นมหันตภัยบน Prod อีกครั้ง",
        "effects": {
          "time": 1,
          "token": 3,
          "risk": -4,
          "quality": 2
        },
        "purpose": "สแกนหาบั๊กข้างเคียงที่แพตช์ตัวนี้อาจสร้างผลกระทบต่อส่วนอื่นๆ",
        "solves": "Use skill to resolve specific issues ยท ลดความเสี่ยง ยท เพิ่มคุณภาพและหลักฐานอ้างอิง",
        "misses": "ใช้ AI Budget เยอะมาก"
      }
    ]
  }
};

function defaultChoiceSolves(option) {
  const effects = option.effects || {};
  let solves = [];
  if (effects.quality > 0) solves.push("Improves delivery quality");
  if (effects.risk < 0) solves.push("Reduces project risk");
  if (effects.time < 0) solves.push("Saves deadline room");
  if (effects.token < 0) solves.push("Saves AI budget");

  return solves.join(" + ") || option.tradeoff || "Addresses the immediate request";
}

function defaultChoiceMisses(option) {
  const effects = option.effects || {};
  let misses = [];
  if (effects.risk > 0) misses.push("Adds hidden project risk");
  else if (effects.quality < 0) misses.push("Lowers delivery quality");
  if (effects.token >= 3) misses.push("ใช้ AI Budget เยอะมาก");
  if (effects.time >= 3) misses.push("กินเวลาเดดไลน์ที่มี");

  return misses.join(" / ") || option.tradeoff || "Still needs verification in a later decision";
}

function hydrateChoiceMeaning(options = []) {
  options.forEach((option) => {
    option.purpose ??= option.helper || "เลือกตัวเลือกนี้เพื่อตอบสนองต่อแรงกดดันในเฟสปัจจุบัน";
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

  hydrateChoiceMeaning(data.emergencyStep?.baseOptions);
  hydrateChoiceMeaning(data.emergencyStep?.skillOptions);
}

const stage02 = {
  id: "stage_02",
  status: "coming_soon",
  title: "SUPERPOWER WORKFLOW",
  stage: "Stage 02: วิกฤตโค้ดเก่า (Legacy Code Crisis)",
  intro:
    "เร็วๆ นี้ — โค้ดเก่ากำลังทำระบบพังบนโปรดักชั่น คุณจะสามารถนำ AI มาช่วยรีแฟกเตอร์กอบกู้วิกฤตนี้ได้หรือไม่?",
};

const allStagesTH = [stage01, stage02];

allStagesTH.forEach((stage) => {
  if (stage.steps) hydrateGameplayChoiceMeaning(stage);
});

export default allStagesTH;
