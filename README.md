# HR Management API

This is a **Node.js JWT Authentication API** for managing users and their roles based on **Karyawan (pegawai) data**.

## 🛠 Setup Instructions
1. **Clone the repository**:
   ```sh
   git clone https://github.com/DhafinQ/hr-management-api.git;
   cd hr-management-api
   ```
2. **Copy the example `.env` file** and set your authentication secret:
   ```sh
   cp .env.example .env
   ```
   Then modify `.env` and set:
   ```
   AUTH_SECRET=your-secret-key
   ```
3. **Install dependencies**:
   ```sh
   npm install
   ```
4. **Start the server**:
   ```sh
   npm start
   ```

## 🚀 API Endpoints

### **Public Access**
- `GET /api/test/all` → Accessible by anyone

### **Protected Routes**
| Endpoint             | Access Level                |
|----------------------|----------------------------|
| `GET /api/test/user` | **User, Moderator, Admin** |
| `GET /api/test/mod`  | **Moderator**              |
| `GET /api/test/admin`| **Admin**                  |

### **Authentication**
| Endpoint            | Method | Description   |
|---------------------|--------|--------------|
| `/api/auth/signin`  | **POST** | User Sign In  |
| `/api/auth/signup`  | **POST** | User Sign Up  |

## 📝 Request Examples

### **Sign-Up Request**
```json
{
  "NamaLengkap": "dhafin",
  "NIP": "NIP004",
  "IDJabatan": 1,
  "IDDepartemen": 1,
  "TanggalBergabung": "2020-12-12",
  "StatusKaryawan": "Aktif",
  "NoHP": "085282611507",
  "Alamat": "Bandung",
  "HakAkses": "Admin",
  "email": "dhafin@gmail.com",
  "password": "dhafin"
}
```

### **Sign-In Request**
```json
{
  "email": "dhafin@gmail.com",
  "password": "dhafin"
}
```

## 🔐 Authorization Header
After logging in, you need to **pass the token** in the headers:
```sh
Authorization: Bearer <your-access-token>
```
Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQzNTczMTg1LCJleHAiOjE3NDM2NTk1ODV9.7KeOYSdXpiQhR3Izy7RQUbQMDGp8qe7LuRrG9chPY5M
```
