# SUPERPOWER WORKFLOW v0.6 - Gameplay Update

ไฟล์นี้แก้ตามคำแนะนำหลักทั้งหมด:

1. แสดง Resource Bar ระหว่างเล่น

   - ระหว่างเล่นจะเห็น Time, Token, Risk ชัดเจน
   - Time ต่ำ = Deadline บีบ, Token สูง = ใช้ AI เยอะเกินไป, Risk สูง = โปรเจกต์เริ่มเสี่ยงพัง
2. อัพเดท Superpower Draft ก่อนเริ่ม Mission

   - ผู้เล่นเลือก skill 3 ใบจากชุดล่าสุด 11 ใบ
   - ลบ Git Worktree และ Subagents ออกจากชุดหลักแล้ว
   - เพิ่ม CONTEXT.md, Implementation Plan, Code Walkthrough, Real-time Risk Scanner และ Scaffolds
3. เพิ่ม Decision Result หลังเลือกทุกครั้ง

   - หลังเลือกจะมีหน้าผลลัพธ์สั้น ๆ
   - อธิบายว่า Event ถูกคุมได้ไหม เกิดอะไรขึ้น และเรียนรู้อะไร
   - เมื่อจบแต่ละ phase จะมี Phase Summary บอก grade, resource delta, edge case และสิ่งที่ควรโฟกัสต่อ
4. Event ตอบสนองกับ Superpower และ edge case ชุดใหม่

   - Brainstorm: Brief Missing Target User
   - Plan: AI Expands Landing Page Into Mini App
   - Execute: Demo API Key Lands In Config
   - Review: IT Asks For Delivery Evidence
   - Emergency: Vulnerable Developer Incident
5. ตัวเลือกมี Trade-off

   - ไม่มีตัวเลือกที่ดีฟรี ๆ
   - ตัวเลือกเร็วจะสะสมความเสี่ยง
   - ตัวเลือกปลอดภัยมักใช้เวลา/AI budget มากขึ้น
6. End Report แบบสรุปเส้นทาง

   - สรุป Time, Token, Risk, Workflow Score ตอนจบ
   - แบ่ง Score Tier 5 ระดับ ตั้งแต่ Workflow Breakdown ถึง Workflow Master
   - แสดง Drafted Superpowers, Superpowers Used และ Problems Triggered
   - มี Decision Timeline ให้เห็นว่าชนะ/พังเพราะอะไร

วิธีใช้:

- เปิด index.html ได้เลย
- หรือแทนที่ game-data.js, script.js และ style.css ในโปรเจกต์เดิมด้วยไฟล์ชุดนี้
