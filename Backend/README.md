# 📅 Smart Event Planner API

**Version:** 1.0.0  
**Description:**  
Smart Event Planner is an application designed to help users plan events efficiently. It allows users to organize guest lists, send invitations, get personalized guest recommendations based on AI, and manage event schedules seamlessly. The app also includes features such as automated reminders, task management, and real-time updates for a smoother event planning experience.

---

## 🛠️ Authentication Endpoints

### 🔐 `POST /auth/register`
**Registers a new user**

- **Tags:** Authentication  
- **Summary:** Register a new user  
- **Request Body (application/json):**
```json
{
  "fullname": "Soumojit Makar",
  "email": "soumojitmakar123@gmail.com",
  "password": "644946461646aaafsasas"
}
```

- **Response (200 OK):**
```json
{
  "id": 1,
  "email": "soumojitmakar123@gmail.com",
  "full_name": "Soumojit Makar"
}
```

- **Response (422 Validation Error):**
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

### 🔑 `POST /auth/login`
**Authenticates an existing user**

- **Tags:** Authentication  
- **Summary:** Authorize existing user  
- **Request Body (application/json):**
```json
{
  "username": "soumojitmakar123@gmail.com",
  "password": "644946461646aaafsasas"
}
```

- **Response (200 OK):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

- **Response (422 Validation Error):**
```json
{
  "detail": [
    {
      "loc": ["body", "username"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## 📦 Components - Schemas

### 🔸 UserCreate
```json
{
  "fullname": "Soumojit Makar",
  "email": "soumojitmakar123@gmail.com",
  "password": "644946461646aaafsasas"
}
```

### 🔸 UserLogin
```json
{
  "username": "soumojitmakar123@gmail.com",
  "password": "644946461646aaafsasas"
}
```

### 🔸 UserOut
```json
{
  "id": 1,
  "email": "soumojitmakar123@gmail.com",
  "full_name": "Soumojit Makar"
}
```

### 🔸 Token
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

### 🔸 HTTPValidationError
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

## ✅ ValidationError (Sub-schema)
```json
{
  "loc": ["body", "email"],
  "msg": "value is not a valid email address",
  "type": "value_error.email"
}
```
