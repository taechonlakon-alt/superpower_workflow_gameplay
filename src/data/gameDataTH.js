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
      "title": "Hidden Edge",
      "icon": "RISK",
      "tone": "danger",
      "weight": 1,
      "copy": "Edge Case ที่ซ่อนอยู่โผล่ขึ้นมาตอนที่ Workflow กำลังเจอความกดดัน ต้องรีบหาวิธีรับมือด่วน",
      "hint": "เลือกใช้ Guardrails ที่จัดการกับ Edge Case นั้นโดยตรง แทนที่จะแค่ดันงานให้คืบหน้าไปก่อน",
      "tags": [
        "external",
        "risk +1"
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
      "title": "Lucky Guardrail",
      "icon": "SHD",
      "tone": "safe",
      "weight": 3,
      "copy": "Workflow Guardrails ที่คุณวางไว้ก่อนหน้านี้ ช่วยดักจับข้อผิดพลาดที่ไม่ตั้งใจเอาไว้ได้",
      "hint": "นี่คือรางวัลของการวาง Guardrails ตั้งแต่เนิ่นๆ: มันไม่ได้แจกแต้มฟรี แต่ช่วยปกป้องคุณจากความโชคร้าย",
      "tags": [
        "external",
        "shield"
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
      "title": "Context Static",
      "icon": "CTX",
      "tone": "warn",
      "weight": 1,
      "copy": "Context Noise จากการตัดสินใจก่อนหน้า บังคับให้ทีมต้องทำ Code Review อย่างละเอียดขึ้นก่อนจะไปต่อ",
      "hint": "เมื่อ Context เริ่มมั่ว ให้กลับไปดู Spec เพื่อเป็นหลักยึด ก่อนที่จะปล่อยให้ AI Generate โค้ดเพิ่ม",
      "tags": [
        "external",
        "review tax"
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
      "icon": "?",
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
          "problem": "The Vulnerable Developer Incident",
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
              "problem": "The Vulnerable Developer Incident",
              "purpose": "Let the AI interpret the short brief and guess the booking flow on its own.",
              "solves": "Accelerate work but increase Risk",
              "misses": "Leaves risk that needs another guardrail / Lowers delivery quality"
            }
          ],
          "skillOptions": [
            {
              "skill": "grill",
              "id": "chaos_grill_docs",
              "label": "Grill with Docs",
              "icon": "?",
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
              "purpose": "Use the docs/brief to formulate questions about target user, service type, slot rules, cancellation, and confirmation.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Takes time to ask, but the booking flow does not rely on guesses."
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
              "purpose": "Create a shared brief summarizing the app goal, user, booking flow, scope, non-goals, and constraints.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Takes a bit of time, but aligns everyone on the same goal."
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
              "purpose": "Use a checklist to cover docs, booking goal, core flow, trade-offs, and open questions.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Slower than guessing, but prevents skipping critical steps."
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
          "purpose": "Read the brief and summarize the booking goal, target user, and success signal before proposing a flow.",
          "solves": "Increase Quality & Evidence",
          "misses": "Starts in the right direction, but does not close the remaining questions."
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
          "purpose": "Have AI propose user personas, booking screens and approach before closing unknowns from the brief.",
          "solves": "Increase Quality & Evidence ยท Advance Work",
          "misses": "Leaves risk that needs another guardrail / Spends a lot of AI budget"
        },
        {
          "id": "skip_discovery",
          "label": "กระโดดไป Execute เลย",
          "icon": "RUN",
          "tone": "gray",
          "tags": [
            "+40%",
            "Fast experience"
          ],
          "helper": "ข้ามเฟส Brainstorm และ Plan ไปเริ่มทำ Prototype จาก Brief สั้นๆ เลย",
          "tradeoff": "สร้าง Prototype ได้เร็วมาก แต่ขาด Context อย่างรุนแรงและอาจจะต้องรื้อทำใหม่",
          "outcome": "คุณได้ UI สำเร็จรูปมาอย่างรวดเร็ว แต่ไม่มีการจัดการ State ที่ถูกต้อง และไม่ได้ตอบโจทย์เรื่องความขัดแย้งของ Slot เวลา",
          "lesson": "การข้าม Workflow ไป Execute เลยจะทำให้ได้โค้ดที่ดูดีแต่ไร้โครงสร้างที่รองรับ Use Case จริง",
          "problem": "Misleading Confidence",
          "progress": 40,
          "effects": {
            "time": 0,
            "token": 0,
            "risk": 4,
            "quality": -1
          },
          "purpose": "The team uses patterns from similar past projects to draft the booking flow before closing all unknowns.",
          "solves": "Advance Work",
          "misses": "High risk can trigger a phase issue / Lowers delivery quality"
        }
      ],
      "skillOptions": [
        {
          "skill": "grill",
          "id": "grill_client",
          "label": "Grill with Docs",
          "icon": "?",
          "tone": "blue",
          "tags": [
            "+40%",
            "Ask remaining"
          ],
          "helper": "Use the docs/brief to raise questions about service type, slot length, conflict rules, cancellation, and confirmation.",
          "tradeoff": "Takes more time, but closes unknowns before letting the AI propose an approach.",
          "outcome": "You obtain the missing answers from the brief to evaluate against the AI's approach.",
          "lesson": "Grill with Docs helps the 'Ask remaining questions' step of Brainstorming.",
          "progress": 40,
          "effects": {
            "time": 2,
            "token": 0,
            "risk": -3,
            "quality": 3
          },
          "purpose": "Use the docs/brief to raise questions about service type, slot length, conflict rules, cancellation, and confirmation.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Takes more time, but closes unknowns before letting the AI propose an approach."
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
          "helper": "Read the brief and create a context seed: app goal, target user, booking flow, scope, non-goals, and definition of done.",
          "tradeoff": "Invests time so both the team and AI align on the same goal from the beginning.",
          "outcome": "All subsequent prompts have goals, users, and non-goals to refer back to.",
          "lesson": "CONTEXT.md helps the 'Read docs' and 'Summarize goal' steps of Brainstorming.",
          "progress": 40,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 3
          },
          "purpose": "Read the brief and create a context seed: app goal, target user, booking flow, scope, non-goals, and definition of done.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Invests time so both the team and AI align on the same goal from the beginning."
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
          "helper": "Use a checklist to force completion of docs, booking goal, core flow, trade-offs, and open questions.",
          "tradeoff": "Slower than guessing, but reduces the chance of skipping critical steps.",
          "outcome": "The team doesn't miss core flows and clearly sees which questions must be closed before Planning.",
          "lesson": "Scaffolds keep Brainstorming aligned with the workflow even for beginner teams.",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 2
          },
          "purpose": "Use a checklist to force completion of docs, booking goal, core flow, trade-offs, and open questions.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Slower than guessing, but reduces the chance of skipping critical steps."
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
            "+90%",
            "Solid brief"
          ],
          "helper": "Combine docs, booking goal summary, core flow, trade-offs, and open questions into a single brief.",
          "tradeoff": "Spends a little time and tokens, but still requires scoping/testing choices in the Plan phase rather than instantly winning.",
          "outcome": "The team obtains a brief clear enough to Plan: knowing the booking goal, core flow, trade-offs, and remaining questions.",
          "lesson": "Brief Alignment Packet represents a complete Brainstorming workflow before letting the AI build.",
          "progress": 90,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 5
          },
          "purpose": "Combine docs, booking goal summary, core flow, trade-offs, and open questions into a single brief.",
          "solves": "Use Combo to close multiple Gaps ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Spends a little time and tokens, but still requires scoping/testing choices in the Plan phase rather than instantly winning."
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
          "problem": "Escape Complexity Trap",
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
              "problem": "Escape Complexity Trap",
              "purpose": "Let the AI draft broadly first, even without clearly defined files, tests, order, and verification.",
              "solves": "Create a tactical choice for this situation",
              "misses": "Leaves risk that needs another guardrail / Lowers delivery quality / Consumes deadline room"
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
              "purpose": "Use the spec to decide which files to modify, whether to create new files, and what is out-of-scope.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Uses the document to enforce scope rather than feelings or AI suggestions."
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
              "purpose": "Order tasks sequentially with checkpoints on how to verify each task.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Slower than issuing all tasks at once, but controls dependencies and checkpoints."
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
          "purpose": "Identify files to inspect and core tasks: service picker, slot picker, contact form, confirmation, and booking list.",
          "solves": "Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Starts in line with actual files, but lacks tests, verification, risks, and scope guards."
        },
        {
          "id": "rush_execute",
          "label": "ออกแบบ Architecture",
          "icon": "GO",
          "tone": "gray",
          "tags": [
            "+55%",
            "Skip Plan"
          ],
          "helper": "ให้ AI ช่วยออกแบบ Architecture และ State Management ก่อนเริ่มงาน",
          "tradeoff": "ใช้ Token และเวลาเยอะ แต่ลดโอกาสที่โค้ดจะพันกันในภายหลัง",
          "outcome": "คุณได้โครงสร้างโปรเจกต์ที่ชัดเจน มีการแยก Component และ Service ออกจากกัน",
          "lesson": "การวาง Architecture เป็นเรื่องสำคัญ โดยเฉพาะเมื่อใช้ AI สร้างโค้ดเยอะๆ",
          "problem": "Sloppy Maintainability",
          "progress": 55,
          "effects": {
            "time": -1,
            "token": 2,
            "risk": 4,
            "quality": 0
          },
          "purpose": "Skip writing an explicit plan and just ask AI to build based on conversational memory.",
          "solves": "Advance Work",
          "misses": "High risk can trigger a phase issue"
        },
        {
          "id": "prototype_ready_scope",
          "label": "ลุยเขียนโค้ดเลย!",
          "icon": "MVP",
          "tone": "gray",
          "tags": [
            "+45%",
            "Loose Scope"
          ],
          "helper": "คิดว่าเข้าใจ Brief แล้ว เลยกระโดดไป Execute ทันทีโดยไม่วางแผน",
          "tradeoff": "รู้สึกเหมือนงานเดินเร็ว แต่เดี๋ยวก็ต้องกลับมารื้อโค้ดที่พัง",
          "outcome": "AI สร้าง Component ขึ้นมาสะเปะสะปะ ตัวแปร State ไม่ตรงกัน และต้องเริ่มแก้บั๊กกันตั้งแต่ตอนนี้",
          "lesson": "การไม่วางแผนคือการวางแผนที่จะล้มเหลว โดยเฉพาะกับ AI ที่พร้อมจะสร้างโค้ดขยะให้คุณทุกเมื่อ",
          "problem": "Escape Complexity Trap",
          "progress": 45,
          "effects": {
            "time": 0,
            "token": 2,
            "risk": 3,
            "quality": -1
          },
          "purpose": "Write a high-level plan giving AI total freedom. No files, tests, or verification steps locked in.",
          "solves": "Advance Work",
          "misses": "Leaves risk that needs another guardrail / Lowers delivery quality"
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
          "helper": "Clarify which files to edit, whether to create new files, and define must-haves versus out-of-scope items.",
          "tradeoff": "Slower, but provides documented evidence to prevent scope creep.",
          "outcome": "The team knows exactly which files the Booking MVP must touch, what to build, and what is out-of-scope.",
          "lesson": "Spec Doc helps the Planning phase answer files, new files, scope, and scope guards.",
          "progress": 50,
          "effects": {
            "time": 3,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "Clarify which files to edit, whether to create new files, and define must-haves versus out-of-scope items.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Consumes deadline room"
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
          "helper": "Establish task order, dependency order, and verification methods after each task.",
          "tradeoff": "Takes more time, but reduces reprompt loops during Execution.",
          "outcome": "The team visualizes the flow from files to tests to reviews, and knows what to verify after each task.",
          "lesson": "Implementation Plan helps Planning define order and verification before letting the AI start.",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -3,
            "quality": 4
          },
          "purpose": "Establish task order, dependency order, and verification methods after each task.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Takes more time, but reduces reprompt loops during Execution."
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
          "helper": "Plan the Terraform module pattern, environment boundaries, tests, CI/CD gates, and production guardrails without running apply.",
          "tradeoff": "Takes extra time, but reduces risk from infra scope and live resources.",
          "outcome": "The team has an IaC plan specifying modules, state/backend, inputs, tests, and approvals before executing resource-changing commands.",
          "lesson": "Terraform must start with planning and guardrails, not letting AI apply infra directly from prompts.",
          "progress": 35,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -3,
            "quality": 3
          },
          "purpose": "Plan the Terraform module pattern, environment boundaries, tests, CI/CD gates, and production guardrails without running apply.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Takes extra time, but reduces risk from infra scope and live resources."
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
          "helper": "Cross-check the plan with current context: goal, existing files, constraints, and definition of done.",
          "tradeoff": "Not the fastest option, but prevents hallucinating repository states that do not exist.",
          "outcome": "The plan remains anchored to the goal, users, existing files, and documented constraints, rather than becoming a wish list.",
          "lesson": "CONTEXT.md helps align the Plan with the actual status of the project.",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 2
          },
          "purpose": "Cross-check the plan with current context: goal, existing files, constraints, and definition of done.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Not the fastest option, but prevents hallucinating repository states that do not exist."
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
          "helper": "Use a checklist to enforce tests, DoD, risks, verification, and scope guards before Execution.",
          "tradeoff": "Adds some process, but reduces false confidence and forgotten tests.",
          "outcome": "The team has a checklist of what to test first, what the risks are, how to verify, and what is out-of-bounds.",
          "lesson": "Scaffolds help Planning remember tests, risks, and scope guards.",
          "progress": 35,
          "effects": {
            "time": 1,
            "token": 0,
            "risk": -2,
            "quality": 2
          },
          "purpose": "Use a checklist to enforce tests, DoD, risks, verification, and scope guards before Execution.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Adds some process, but reduces false confidence and forgotten tests."
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
            "+90%",
            "ready to execute"
          ],
          "helper": "Combine files, new files, tests, order, verification, risks, and scope guards into a single plan.",
          "tradeoff": "Spends a little time and tokens; the plan is ready, but you still have to decide on the first task in Execution.",
          "outcome": "AI obtains an actionable plan: knowing files to edit, files to protect, booking path tests, task order, verification, risks, and scope guards.",
          "lesson": "Implementation Readiness Plan represents a Plan that fully answers what to do, where, in what order, how to verify, and what to protect.",
          "progress": 90,
          "effects": {
            "time": 3,
            "token": 1,
            "risk": -5,
            "quality": 6
          },
          "purpose": "Combine files, new files, tests, order, verification, risks, and scope guards into a single plan.",
          "solves": "Use Combo to close multiple Gaps ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Consumes deadline room"
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
          "problem": "Hardcoded Secrets Leak",
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
              "problem": "Hardcoded Secrets Leak",
              "purpose": "Make a mental note to remove the key later.",
              "solves": "Accelerate work but increase Risk",
              "misses": "High risk can trigger a phase issue / Lowers delivery quality"
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
              "purpose": "The system warns that a token/secret pattern is found in the code.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Requires time to inspect, but reduces damage."
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
              "purpose": "Use a checklist forbidding hardcoded secrets and requiring environment variables.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Adds inspection steps, but keeps junior developers from making mistakes."
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
            "+50%",
            "batch work"
          ],
          "helper": "สั่ง AI ให้ทำทีละ Component เช่น 'ทำ UI เลือกบริการก่อน' แล้วค่อยไปต่อ",
          "tradeoff": "ช้าแต่มั่นคง ลดความผิดพลาดได้เยอะ",
          "outcome": "คุณได้ UI เลือกบริการที่ทำงานได้จริง จากนั้นจึงเริ่มทำระบบเลือก Slot เวลาต่อ",
          "lesson": "การย่อย Prompt คือกุญแจสำคัญในการคุม AI",
          "progress": 50,
          "effects": {
            "time": 0,
            "token": 3,
            "risk": 4,
            "quality": 0
          },
          "purpose": "Combine tasks that appear related to let AI execute them in a batch covering service, slot, form, and confirmation.",
          "solves": "Advance Work",
          "misses": "High risk can trigger a phase issue / Spends a lot of AI budget"
        },
        {
          "id": "reprompt_loop",
          "label": "Mega Prompt ตู้มเดียวจบ",
          "icon": "LOOP",
          "tone": "gray",
          "tags": [
            "+35%",
            "Fast debug"
          ],
          "helper": "ใส่รายละเอียดทั้งหมดลงใน Prompt เดียว แล้วภาวนาให้ AI เขียน Booking MVP ออกมาสมบูรณ์",
          "tradeoff": "อาจจะเสร็จเร็วมาก หรือพังยับเยินจนต้องแก้ใหม่หมด",
          "outcome": "AI พ่นโค้ดออกมาหลายร้อยบรรทัด บางส่วนทำงานได้ดี แต่บางส่วนก็พังลอจิกพัง แถม State มั่วซั่ว",
          "lesson": "Mega Prompt มักจะให้ผลลัพธ์ที่ขาดๆ เกินๆ และยากต่อการตรวจสอบ",
          "problem": "Reprompting Loop Trap",
          "progress": 35,
          "effects": {
            "time": 3,
            "token": 4,
            "risk": 4,
            "quality": -2
          },
          "purpose": "Use the latest error as context to let AI patch the failure immediately.",
          "solves": "Accelerate work but increase Risk",
          "misses": "High risk can trigger a phase issue / Creates quality debt / Spends a lot of AI budget / Consumes deadline room"
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
          "purpose": "Read the plan, select the next task, summarize what to do, and edit only the relevant files.",
          "solves": "Reduce Risk ยท Increase Quality & Evidence ยท Advance Work",
          "misses": "Consumes deadline room"
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
          "helper": "Use tools to generate the booking UI slice first, then check where validation/state needs to be added.",
          "tradeoff": "Helps visualize the flow quickly, but validation, conflicts, and accessibility remain broken without focused tests.",
          "outcome": "The app looks ready very fast, but evidence that the completed task actually passes is lacking.",
          "lesson": "Visual slices help discuss requirements, but must be backed by focused tests and evidence.",
          "problem": "Delegated QA to AI",
          "progress": 40,
          "effects": {
            "time": 0,
            "token": 2,
            "risk": 3,
            "quality": 1
          },
          "purpose": "Use tools to generate the booking UI slice first, then check where validation/state needs to be added.",
          "solves": "Increase Quality & Evidence ยท Advance Work",
          "misses": "Leaves risk that needs another guardrail"
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
          "helper": "Write a failing test first, write minimal code to pass, refactor, rerun tests, and only then proceed to the next task.",
          "tradeoff": "Takes more time, but catches bugs before crossing to the next task.",
          "outcome": "The team observes the red -> green -> refactor -> rerun flow of this task before moving to the next part.",
          "lesson": "TDD Loop forces the AI to work on one task at a time, providing proof that tests actually pass, not just that the UI looks nice.",
          "progress": 55,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "Write a failing test first, write minimal code to pass, refactor, rerun tests, and only then proceed to the next task.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Takes more time, but catches bugs before crossing to the next task."
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
          "helper": "Alerts when editing files out of scope, missing tests, exposing secrets, or risking data integrity.",
          "tradeoff": "Has overhead, but halts risks before they propagate to the next task.",
          "outcome": "The team sees warnings as soon as the code becomes fragile, without waiting for the booking flow to crash.",
          "lesson": "The speed of AI requires early warning systems for scope, security, and data integrity.",
          "progress": 50,
          "effects": {
            "time": 1,
            "token": 2,
            "risk": -3,
            "quality": 3
          },
          "purpose": "Alerts when editing files out of scope, missing tests, exposing secrets, or risking data integrity.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Has overhead, but halts risks before they propagate to the next task."
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
          "helper": "Run Terraform plan-only: fmt, validate, test, and plan, stopping before apply or destroy.",
          "tradeoff": "Slower than generating and deploying directly, but protects live resources from damage.",
          "outcome": "The team obtains evidence from plan/test without creating or deleting live resources.",
          "lesson": "Infra workflow must require human approval before executing apply or destroy commands.",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "Run Terraform plan-only: fmt, validate, test, and plan, stopping before apply or destroy.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Slower than generating and deploying directly, but protects live resources from damage."
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
          "helper": "Use a checklist: read plan, choose task, summarize, relevant files, focused test, summarize result, stop/ask.",
          "tradeoff": "Slower than copying errors, but fixes the root cause and respects checkpoints.",
          "outcome": "The team executes based on evidence rather than repeatedly feeding raw errors back to the AI.",
          "lesson": "Scaffolds prevent Executing Plans from turning into a reprompt loop.",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -3,
            "quality": 3
          },
          "purpose": "Use a checklist: read plan, choose task, summarize, relevant files, focused test, summarize result, stop/ask.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Slower than copying errors, but fixes the root cause and respects checkpoints."
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
            "+90%",
            "spec + test"
          ],
          "helper": "Use Spec + TDD Loop to verify that the task matches the spec: write a failing test -> write minimal code to pass -> refactor -> rerun tests -> proceed to the next task before accepting code.",
          "tradeoff": "Invests tokens and time to gather evidence, but you must still judge if the test scope is sufficient.",
          "outcome": "Work progresses fast, yet Spec remains the target, and TDD Loop provides proof that the task actually passes.",
          "lesson": "Spec defines what to build, while TDD Loop verifies that the task actually passes before proceeding.",
          "progress": 90,
          "effects": {
            "time": 2,
            "token": 3,
            "risk": -4,
            "quality": 5
          },
          "purpose": "Use Spec + TDD Loop to verify that the task matches the spec: write a failing test -> write minimal code to pass -> refactor -> rerun tests -> proceed to the next task before accepting code.",
          "solves": "Use Combo to close multiple Gaps ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Spends a lot of AI budget"
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
            "+90%",
            "plan + risk"
          ],
          "helper": "Combine Terraform plan-only evidence with risk scanner to check drift, secrets/state, destructive changes, and approval before apply/destroy.",
          "tradeoff": "Takes more time and tokens, but closes infra risks affecting live resources.",
          "outcome": "The team inspects destructive changes, secret/state risks, and approval gates before touching live resources.",
          "lesson": "Good Terraform workflows demand plan, risk scans, and explicit approval before any resource-changing command.",
          "progress": 90,
          "effects": {
            "time": 3,
            "token": 2,
            "risk": -5,
            "quality": 5
          },
          "purpose": "Combine Terraform plan-only evidence with risk scanner to check drift, secrets/state, destructive changes, and approval before apply/destroy.",
          "solves": "Use Combo to close multiple Gaps ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Consumes deadline room"
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
          "problem": "Shadow IT Discovery",
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
              "problem": "Shadow IT Discovery",
              "purpose": "Explain that this is a quick demo and promise documentation later.",
              "solves": "Accelerate work but increase Risk",
              "misses": "High risk can trigger a phase issue / Lowers delivery quality"
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
              "purpose": "Gather evidence: does it match spec? are AC met? are there out-of-scope files? test coverage? security risks? data integrity? docs updated? hallucinations or guesses? duplicate code? meaningful naming?",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Takes time to review, but provides concrete evidence to discuss with ops/IT."
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
              "purpose": "Open project context, booking scope, and definition of done for audit.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Documentation does not fix bugs, but prevents the project from appearing as shadow IT."
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
              "helper": "Use a template to audit: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
              "tradeoff": "Requires going through checklist items, but prevents memory slips.",
              "effects": {
                "time": 2,
                "token": 0,
                "risk": -3,
                "quality": 3
              },
              "preventPenalty": true,
              "resolveMsg": "Review templates enable the team to answer ops/IT questions systematically.",
              "lesson": "Scaffolds ensure standards do not depend solely on individual memory.",
              "purpose": "Use a template to audit: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
              "solves": "Resolve current Issue ยท Use skill to resolve specific issues ยท Reduce Risk",
              "misses": "Requires going through checklist items, but prevents memory slips."
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
          "purpose": "Launch the app, try selecting services, selecting slots, filling contact info, confirming, and inspecting the booking list on desktop/mobile.",
          "solves": "Reduce Risk ยท Increase Quality & Evidence ยท Advance Work",
          "misses": "Verifies the basic user flow, but does not cover specs, security, data integrity, docs, hallucinations, or code quality."
        },
        {
          "id": "ai_self_review",
          "label": "สั่ง Full Code Review",
          "icon": "AI",
          "tone": "gray",
          "tags": [
            "+45%",
            "AI review"
          ],
          "helper": "ให้ AI หรือเพื่อนในทีมช่วย Review โค้ดเทียบกับ Spec ทั้งหมด",
          "tradeoff": "ใช้ Token และเวลาเยอะ แต่คุณภาพออกมาเนี๊ยบ",
          "outcome": "จับบักได้เพียบเรื่อง Timezone ซ้อนทับกัน และเรื่อง Form Validation ที่ยังหลวมอยู่",
          "lesson": "Review คือปราการด่านสุดท้ายก่อนหายนะ",
          "problem": "Delegated QA to AI",
          "progress": 45,
          "effects": {
            "time": 1,
            "token": 2,
            "risk": 3,
            "quality": 0
          },
          "purpose": "Have the same AI model review the code it just created, without cross-checking specs, tests, or file diffs.",
          "solves": "Advance Work",
          "misses": "Leaves risk that needs another guardrail"
        },
        {
          "id": "ship_now",
          "label": "ข้าม Review แล้วส่งงาน (Ship It!)",
          "icon": "NOW",
          "tone": "gray",
          "tags": [
            "+60%",
            "Looks done"
          ],
          "helper": "เวลาน้อย ขี้เกียจตรวจแล้ว มั่นใจว่า AI เก่ง รันผ่านคือจบ กดส่งงานเลย!",
          "tradeoff": "ถึงเส้นชัยเร็วมาก แต่ไปวัดดวงกันหน้างานว่าจะมีระบบไหนพังบ้าง",
          "outcome": "คุณส่งมอบระบบได้ตรงเวลาเป๊ะ! แต่ลูกค้าบ่นว่าทำไมระบบจองเวลาชนกันได้ และอีเมลไม่ออก...",
          "lesson": "YOLO Ship It มักจบด้วยการแก้บั๊กกลางดึกเสมอ",
          "problem": "Misleading Confidence",
          "progress": 60,
          "effects": {
            "time": 0,
            "token": 0,
            "risk": 5,
            "quality": -3
          },
          "purpose": "Ship immediately because AI reports no errors and the demo looks fine.",
          "solves": "Accelerate Progress",
          "misses": "High risk can trigger a phase issue / Creates quality debt"
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
          "helper": "Audit: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "tradeoff": "Slower, but catches leaked bugs and detects over-edits.",
          "outcome": "The team catches risks before shipping, fixing them based on evidence rather than pure confidence.",
          "lesson": "Code Review is the final gate validating specs, acceptance, scope, tests, security, data, docs, hallucinations, and code quality.",
          "progress": 60,
          "effects": {
            "time": 3,
            "token": 1,
            "risk": -5,
            "quality": 5
          },
          "purpose": "Audit: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Consumes deadline room"
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
          "helper": "Force AI to explain the booking state, validation, data integrity, and potential assumptions, while the team questions it.",
          "tradeoff": "Spends tokens, but prevents the team from shipping code they do not comprehend.",
          "outcome": "The team uncovers places where the AI wrote overly complex code or invented unnecessary requirements, refactoring them to be simpler.",
          "lesson": "Developers must understand the code and references used by AI, rather than believing it's done just because the AI claims so.",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 2,
            "risk": -4,
            "quality": 4
          },
          "purpose": "Force AI to explain the booking state, validation, data integrity, and potential assumptions, while the team questions it.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Spends tokens, but prevents the team from shipping code they do not comprehend."
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
          "helper": "Rerun TDD Loop evidence: write a failing test, code minimal fix, refactor, rerun tests, and advance, covering critical booking paths.",
          "tradeoff": "Straightforward, but requires investing time.",
          "outcome": "The team clearly observes that the core task loops actually pass, identifying what still needs fixes before delivery.",
          "lesson": "TDD Loop provides proof that the code functions as agreed upon after refactoring and rerunning.",
          "progress": 55,
          "effects": {
            "time": 1,
            "token": 1,
            "risk": -3,
            "quality": 3
          },
          "purpose": "Rerun TDD Loop evidence: write a failing test, code minimal fix, refactor, rerun tests, and advance, covering critical booking paths.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Straightforward, but requires investing time."
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
          "helper": "Check for no secrets, tests, fragile booking logic, missing validation, conflict handling, and data integrity.",
          "tradeoff": "Has overhead, but minimizes late-game risk.",
          "outcome": "Scanner points out warnings the team missed during visual smoke testing.",
          "lesson": "Accumulated risk must be visible before delivery.",
          "progress": 55,
          "effects": {
            "time": 1,
            "token": 2,
            "risk": -4,
            "quality": 4
          },
          "purpose": "Check for no secrets, tests, fragile booking logic, missing validation, conflict handling, and data integrity.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Has overhead, but minimizes late-game risk."
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
          "helper": "Inspect Terraform testing, module patterns, backend/state, variables/secrets, CI/CD, and production safety before delivery.",
          "tradeoff": "Requires extra review time, but reduces live infra risks that are hard to revert.",
          "outcome": "The team uncovers risks in modules, state, and CI/CD, knowing which commands require approval before touching live resources.",
          "lesson": "IaC reviews must audit both the code and resource impact, not just verifying that syntax passes.",
          "progress": 50,
          "effects": {
            "time": 2,
            "token": 1,
            "risk": -4,
            "quality": 4
          },
          "purpose": "Inspect Terraform testing, module patterns, backend/state, variables/secrets, CI/CD, and production safety before delivery.",
          "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Requires extra review time, but reduces live infra risks that are hard to revert."
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
            "+90%",
            "Understand & Audit"
          ],
          "helper": "Perform complete Code Review checklist alongside a walkthrough: spec matching, AC met, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "tradeoff": "Invests time and tokens, but still requires deciding how to resolve issues using tests, specs, or handoff evidence.",
          "outcome": "The team catches bugs and comprehends why the fixes are necessary.",
          "lesson": "Good reviews enable the team to deliver code based on comprehension, not just faith in AI.",
          "progress": 90,
          "effects": {
            "time": 3,
            "token": 3,
            "risk": -5,
            "quality": 6
          },
          "purpose": "Perform complete Code Review checklist alongside a walkthrough: spec matching, AC met, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "solves": "Use Combo to close multiple Gaps ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Spends a lot of AI budget / Consumes deadline room"
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
            "+85%",
            "Audit vs Spec"
          ],
          "helper": "Use Spec + Code Review to check: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "tradeoff": "Slower, but evaluates code based on real scope limits and concrete evidence.",
          "outcome": "The team closes gaps between what was built and what was agreed upon, catching out-of-scope files before shipping.",
          "lesson": "Spec prevents reviews from being subjective and helps catch feature creep added by AI.",
          "progress": 85,
          "effects": {
            "time": 3,
            "token": 2,
            "risk": -4,
            "quality": 5
          },
          "purpose": "Use Spec + Code Review to check: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "solves": "Use Combo to close multiple Gaps ยท Reduce Risk ยท Increase Quality & Evidence",
          "misses": "Consumes deadline room"
        }
      ]
    }
  ],
  "emergencyStep": {
    "id": "emergency",
    "title": "EMERGENCY: Vulnerable Developer Incident",
    "briefing": [
      "The system starts breaking during the demo, but the team relied solely on AI and can barely debug it on their own.",
      "Without pre-established workflow discipline, this incident could immediately ruin client trust."
    ],
    "event": {
      "id": "emergency_crisis",
      "title": "Production Incident",
      "problem": "The Vulnerable Developer Incident",
      "copy": "The client asks what happened, but the team lacks the Spec, Tests, or Review notes necessary to isolate the cause.",
      "danger": "critical risk"
    },
    "baseOptions": [
      {
        "id": "emergency_hotfix",
        "label": "Manual Root-Cause Hotfix",
        "icon": "FIX",
        "tone": "mint",
        "tags": [
          "Reliable",
          "Consumes time",
          "Resolves crisis"
        ],
        "helper": "Reproduce, isolate, fix, and verify the issue on your own.",
        "tradeoff": "Consumes significant time, but truly mitigates the risk.",
        "outcome": "The team fixes the root cause in time, demonstrating to the client that you are in control.",
        "lesson": "Sometimes there are no shortcuts; you must invest time to put out the fire.",
        "effects": {
          "time": 4,
          "token": 0,
          "risk": -4,
          "quality": 1
        },
        "purpose": "Reproduce, isolate, fix, and verify the issue on your own.",
        "solves": "Reduce Risk ยท Increase Quality & Evidence",
        "misses": "Consumes deadline room"
      },
      {
        "id": "emergency_ai_patch",
        "label": "AI Quick Patch",
        "icon": "AI",
        "tone": "gray",
        "tags": [
          "Fast",
          "Spends tokens",
          "Unsecured"
        ],
        "helper": "Feed the raw error to AI immediately to get the demo running again.",
        "tradeoff": "Saves time, but risks introducing new bugs.",
        "outcome": "AI makes the primary bug disappear quickly, but the team doesn't know if other systems were broken in the process.",
        "lesson": "Putting out fires with AI requires caution: watch out for spreading issues.",
        "problem": "Reprompting Loop Trap",
        "effects": {
          "time": 0,
          "token": 4,
          "risk": -1,
          "quality": -1
        },
        "purpose": "Feed the raw error to AI immediately to get the demo running again.",
        "solves": "Reduce Risk",
        "misses": "Lowers delivery quality / Spends a lot of AI budget"
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
          "Recovery",
          "Process-driven"
        ],
        "helper": "Use a runbook: reproduce, isolate, rollback, verify, explain.",
        "tradeoff": "Takes time, but keeps the team calm and structured.",
        "outcome": "The Runbook guides the team through resolving the incident step-by-step and communicating clearly with the client.",
        "lesson": "Scaffolds give beginners a clear path to follow when systems crash.",
        "effects": {
          "time": 3,
          "token": 1,
          "risk": -5,
          "quality": 2
        },
        "purpose": "Use a runbook: reproduce, isolate, rollback, verify, explain.",
        "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
        "misses": "Consumes deadline room"
      },
      {
        "skill": "walkthrough",
        "id": "emergency_walkthrough",
        "label": "Walk Through The Patch",
        "icon": "WALK",
        "tone": "mint",
        "tags": [
          "Understand cause",
          "Reduce guesswork"
        ],
        "helper": "Have AI explain the patch, then check it line-by-line before accepting.",
        "tradeoff": "Spends tokens and time, but avoids blindly accepting code patches.",
        "outcome": "The team isolates the cause and prevents AI from overwriting code that already functions.",
        "lesson": "Do not trust a patch just because it runs; understand what it actually fixes.",
        "effects": {
          "time": 2,
          "token": 2,
          "risk": -4,
          "quality": 2
        },
        "purpose": "Have AI explain the patch, then check it line-by-line before accepting.",
        "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
        "misses": "Spends tokens and time, but avoids blindly accepting code patches."
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
        "helper": "Write a short test check to verify the primary bug does not regress.",
        "tradeoff": "Slower than raw patching, but provides proof that the fire is extinguished.",
        "outcome": "The team fixes it and verifies with a check, rather than just believing it because the screen is back up.",
        "lesson": "Tests turn disaster recovery into a verified process instead of guesswork.",
        "effects": {
          "time": 2,
          "token": 1,
          "risk": -4,
          "quality": 2
        },
        "purpose": "Write a short test check to verify the primary bug does not regress.",
        "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
        "misses": "Slower than raw patching, but provides proof that the fire is extinguished."
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
        "helper": "Scan for regressions that the patch might have introduced elsewhere.",
        "tradeoff": "Spends extra tokens, but minimizes hidden risk.",
        "outcome": "The team uncovers side effects before they reach the client.",
        "lesson": "Risk Scanner halts rushed patches from turning into a second production incident.",
        "effects": {
          "time": 1,
          "token": 3,
          "risk": -4,
          "quality": 2
        },
        "purpose": "Scan for regressions that the patch might have introduced elsewhere.",
        "solves": "Use skill to resolve specific issues ยท Reduce Risk ยท Increase Quality & Evidence",
        "misses": "Spends a lot of AI budget"
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
  if (effects.token >= 3) misses.push("Spends a lot of AI budget");
  if (effects.time >= 3) misses.push("Consumes deadline room");

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
