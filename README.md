
# ระบบแลกคะแนน (Point Redemption System)

โปรเจคนี้เป็นระบบที่ประกอบไปด้วยทั้ง Frontend และ Backend สำหรับการแลกคะแนน โดยผู้ใช้งานสามารถล็อกอิน ดูรายการสิทธิพิเศษ และแลกรับสิทธิ์ได้ตามจำนวนคะแนนที่มี

## โครงสร้างของระบบ

ระบบนี้ใช้ **Nuxt.js (หรือ Vue.js)** สำหรับ Frontend และ **NestJS** สำหรับ Backend โดยมี Docker Compose สำหรับการจัดการทั้งสองส่วนพร้อมกัน

### คุณสมบัติหลัก
- ผู้ใช้สามารถล็อกอินด้วย Username และ Password
- ระบบจะใช้ JWT (JSON Web Token) ในการจัดการ Authentication
- เมื่อผู้ใช้แลกรับสิทธิ์ ระบบจะทำการตัดคะแนน และไม่สามารถแลกรับสิทธิ์เดิมซ้ำได้
- ระบบแสดงผลแบบ Responsive รองรับการใช้งานบนมือถือ

## การติดตั้งและใช้งาน

### ข้อกำหนดเบื้องต้น
- ติดตั้ง Docker และ Docker Compose บนเครื่อง

### วิธีการติดตั้ง

1. Clone โปรเจคนี้จาก GitHub:
   ```bash
   git clone https://github.com/supagonava/reward-point-system
   ```

2. เข้าไปในโฟลเดอร์โปรเจค:
   ```bash
   cd reward-point-system
   ```

3. สร้างและรัน Docker Container ด้วยคำสั่ง:
   ```bash
   docker-compose up --build
   ```

   Docker Compose จะทำการ build ทั้ง Frontend และ Backend แล้วรันทั้งสองส่วนใน container แยกกัน

### การใช้งาน

- เปิดเบราว์เซอร์แล้วเข้าไปที่: `http://localhost:3000` เพื่อเข้าสู่ระบบ Frontend
- API Backend จะทำงานที่ `http://localhost:3001`

## โครงสร้างโปรเจค

```
/point-system
  ├── frontend/           # ไฟล์และโค้ดสำหรับส่วนของ Frontend (Nuxt หรือ Vue.js)
  ├── backend/            # ไฟล์และโค้ดสำหรับส่วนของ Backend (NestJS)
  ├── docker-compose.yml  # ไฟล์ Docker Compose
  └── README.md           # ไฟล์เอกสาร (README)
```

### สิทธิ์แลกคะแนน (Reward)

ระบบสามารถจำลองรายการสินค้าหรือสิทธิพิเศษได้ผ่าน API โดยรายการเหล่านี้จะประกอบไปด้วย:
- รูปภาพ
- รายละเอียดของสิทธิ์
- คะแนนที่ต้องใช้ในการแลก
- วันที่หมดอายุของสิทธิ์

## การใช้งาน Docker Compose

หากต้องการหยุดการทำงานของ container:
```bash
docker-compose down
```

หากต้องการ rebuild เฉพาะบางส่วน:
```bash
docker-compose up --build frontend
```
หรือ
```bash
docker-compose up --build backend
```