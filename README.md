# 🚌 Nomad Tour – REST API for Places & Routes

This project was developed for the WorldSkills Kazakhstan 2024 Web Technologies competition. It is a RESTful API for managing places, schedules, and routes for the “Nomad Tour” hop-on-hop-off bus service in Astana.

## 📌 Description

Nomad Tour is a local startup that offers tourists and residents an easy way to travel around Astana. The service allows users to find the fastest route between two places using real-time schedules. The API includes authentication, place and schedule management, and route search features.

## ✅ Features

- **User Authentication** (Login, Logout)
- **Role-based Access** (Admin/User)
- **CRUD for Places** (Create, Read, Update, Delete)
- **CRUD for Schedules** (Admin only)
- **Route Search** (Based on place IDs and optional time)
- **Route Selection** (Save selected route for users)

## 🛠️ Technologies Used

- Node.js + Express.js
- PostgreSQL
- JWT for Authentication
- Multer for Image Uploads

## 🔐 Login Credentials

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | admin    | adminpass  |
| User1 | user1    | user1pass  |
| User2 | user2    | user2pass  |

## 🔗 API Endpoints

### Auth

- `POST /v1/auth/login` – Login
- `GET /v1/auth/logout` – Logout

### Places

- `GET /v1/place` – Get all places
- `GET /v1/place/:id` – Get place by ID
- `POST /v1/place` – Add a new place (Admin)
- `PUT /v1/place/:id` – Edit place (Admin)
- `DELETE /v1/place/:id` – Delete place (Admin)

### Schedule

- `GET /v1/schedule` – Get all schedules (Admin)
- `POST /v1/schedule` – Add schedule (Admin)
- `PUT /v1/schedule/:id` – Edit schedule (Admin)
- `DELETE /v1/schedule/:id` – Delete schedule (Admin)

### Routes

- `GET /v1/route/search/:fromPlaceId/:toPlaceId/:departureTime?` – Search routes
- `POST /v1/route/selection` – Save selected route (User)

## 📁 Find folder

-Cd media

## How to run code
```bush
  npm run dev
```

