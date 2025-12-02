<h1 align="center">
  Synapsis: A Modern Task Management Web Application
</h1>

<p align="center">
Built with a modern, type-safe development environment, it provides a clean, responsive interface powered by shadcn/ui and Node.js/Express.
</p>

<div align="center">
 <img src="https://i.imgur.com/ZQskP43.png" alt="synapsis demo" />
</div>

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠 Tools & Technologies](#-tools-&-technologies)
- [🚀 Installation & Setup](#-installation-&-setup)
- [👨🏻‍🍳 API Reference](#-api-reference)

## ✨ Features

- User Authentication: Secure registration and login using JWT.
  Drag-and-Drop Task Organization: Easily reorder and manage tasks within boards using drag-and-drop functionality (@hello-pangea/dnd).
- Real-time UI Updates: Efficient data fetching and state synchronization handled by TanStack Query.
- Type-Safe Validation: Comprehensive data validation on both the client and server using Zod.
- Form Management: Forms are handled with ease and excellent error feedback using React Hook Form.
- Responsive Design: Built with Tailwind CSS and the beautiful components from shadcn/ui.
- Centralized State Management: Predictable state management via the React Context API.

Other features to add in the future:

- Dashboard, account settings, user management features, notifications
- Shared packages for the monorepo (schemas, types, etc.)
- Friends system where you can see what they're up to (with privacy)
- AI integration for automation and assistance
- Fully migrate to Next-Auth with JWT and use Clerk/Supabase for the auth (refactor backend)

## 🛠️ Tools & Technologies

- **React 19**
- **Next.js 16**
- **TypeScript**
- **Radix UI + shadcn/ui**
- **Tailwind CSS 4**
- **JWT**
- **Zod**
- **React Hook Form**
- **TanStack Query**
- **TanStack Table**
- **Node.js 22**
- **Express**

## 🚀 Installation and Setup

**Prerequisites**

- Git
- Node.js (v20+)
- npm / pnpm
- Docker (optional)

1. Clone the repository

```bash
git clone https://github.com/aldrinreodica/synapsis.git
```

# Install dependencies from the root directory

```bash
npm install
```

or

```bash
pnpm install
```

Note: Before proceeding, you may skip #2 and #3 and proceed to step #4 (only if you have Docker installed) and don't forget about the .env files

2. Frontend Setup (synapsis-client)

# Create an .env file in the /client root with the following variables:

# --------------------------------------------------------------------------

# PORT=3000

# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# NEXT_PUBLIC_NODE_ENV=development

# --------------------------------------------------------------------------

Run the following command to start the client app:

```bash
pnpm run dev
```

3. Backend Setup (synapsis-backend)

Create an .env file in the /server root with the following variables:

--------------------------------------------------------------------------

MONGO_URI=mongodb://mongo:27017/synapsis

JWT_SECRET=5b1f08a6a4f663940241f50e7864be95

--------------------------------------------------------------------------

Run the following command to start the server app:

```bash
pnpm run dev
```

4. Open Docker Desktop

Run the following command

```bash
# Docker V2
docker compose up
```

or

```bash
# Docker V1
docker-compose up
```

The client application will typically start on http://localhost:3000.

The server application will typically start on http://localhost:5000.

## 👨🏻‍🍳 API Reference

I have published my Postman API collection named Synapsis API

```bash
https://documenter.getpostman.com/view/13843904/2sB3dMwAdV
```

Note: Please use the Create User API to create admin/superadmin for now as I have forgotten about the seeder
