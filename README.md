# TaskFlow

TaskFlow is a full-stack task management application built with Laravel, Inertia.js, React, and Tailwind CSS. It is designed to provide a fast, modern web experience while keeping the backend logic and authentication in Laravel.

The project demonstrates a real-world approach to building a SaaS-style productivity app: user authentication, task management, role-based admin access, security features, and dashboard analytics.

<img src="https://i.postimg.cc/1X1vDzNT/Screenshot-2026-09-15-151109.png" />

<div style="margin: 30px 0;"></div>

<img src="https://i.postimg.cc/nrf3qLDt/Screenshot-2026-09-15-151211.png" />

<div style="margin: 30px 0;"></div>

<img src="https://i.postimg.cc/zvYxTfgr/Screenshot-2026-09-15-151316.png" />

## Overview

This application allows authenticated users to:

- create, edit, and delete tasks
- mark tasks as pending or completed
- view dashboard summaries of their work
- manage security settings such as password updates and passkey authentication
- access an admin dashboard for analytics

The app uses Laravel as the server-side foundation and React with Inertia to render pages without building a separate API frontend.

---

## Tech Stack

### Backend
- PHP 8.3
- Laravel 13
- Laravel Fortify
- Eloquent ORM
- PostgreSQL-ready configuration
- Middleware-based access control

### Frontend
- React 19
- Inertia.js
- Vite
- Tailwind CSS
- shadcn/ui-inspired component structure

### Development Tools
- Composer
- npm / pnpm
- Pest for testing
- PHPStan for static analysis
- Laravel Pint for formatting

---

## Architecture and Approach

This project follows a hybrid architecture:

- Laravel handles routing, controllers, validation, auth, middleware, database access, and business logic.
- Inertia.js connects Laravel and React without a separate REST API layer.
- React components render the UI and handle interactive frontend behavior.
- Blade-like Laravel routing still exists, but the app mainly returns Inertia pages.

### Why this approach?

This is a strong pattern for internal business apps and SaaS products because it gives:

- better developer productivity
- server-side security and validation
- a smoother SPA-like user experience
- simpler state handling than a fully decoupled API-client system

In practical terms, the app keeps Laravel as the source of truth for user authentication and permissions while using React for a modern interface.

---

## Project Structure

```text
laravel-todo/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   ├── Providers/
│   └── Actions/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
│   ├── css/
│   ├── js/
│   └── views/
├── routes/
├── tests/
├── .env.example
├── artisan
├── composer.json
├── package.json
├── phpunit.xml
├── vite.config.ts
├── README.md
└── ...
```

### Main application concepts

- `app/Models/User.php` - authentication model with admin flag, login tracking, and security features
- `app/Models/Post.php` - task model linked to the authenticated user
- `app/Http/Controllers/PostController.php` - CRUD logic for tasks
- `app/Http/Controllers/DashboardController.php` - dashboard metrics and recent tasks
- `app/Http/Controllers/AdminController.php` - admin analytics
- `app/Http/Middleware/EnsureUserIsAdmin.php` - restricts access to admin routes
- `routes/web.php` - application routes
- `routes/settings.php` - profile, password, and security routes

---

## Key Features

### Authentication and security

The project uses Laravel Fortify and includes modern authentication features such as:

- email/password login
- email verification
- two-factor authentication support
- passkey authentication support
- password security rules
- login tracking via `last_login_at`

This shows a production-ready security posture rather than a basic starter setup.

### Task management

Users can:

- create post/task entries
- edit contents
- delete them
- toggle status between pending and completed

The controller enforces ownership checks so users cannot modify other users' tasks.

### Free plan limits

The task creation logic includes a free-plan restriction:

- up to 5 tasks for non-paid users
- payment status is checked against the `payments` table

This is a practical pattern for SaaS business logic and is implemented directly in the controller.

### Admin dashboard

The admin area shows:

- total users
- active users in the last 30 minutes
- paid users
- total revenue
- recent payment records

This is useful for understanding how to build internal admin analytics in Laravel apps.

---

## Database Model Summary

### User
The `User` model contains user information and security fields, including:

- `name`
- `email`
- `password`
- `is_admin`
- `last_login_at`
- `email_verified_at`
- support for passkeys and two-factor auth

### Post
Each post/task belongs to a user:

- `user_id`
- `title`
- `content`
- `status`
- timestamps

### Payment
The payment model supports billing logic:

- `amount`
- `currency`
- `status`
- `provider`
- `payment_reference`
- `paid_at`

---

## Routes

The app currently defines these main route groups:

- home page
- authenticated dashboard
- admin dashboard
- task resource routes: index, create, store, edit, update, destroy
- task status toggle route
- user settings routes

This is a good example of how Laravel route grouping can separate public, authenticated, and admin logic cleanly.

---

## Setup Instructions

### 1. Clone the project

```bash
git clone <repository-url>
cd laravel-todo
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Configure environment

Create your local environment file:

```bash
cp .env.example .env
```

Then update the database and app settings in `.env`.

For example, if you are using PostgreSQL or a local database, update:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laravel_todo
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### 5. Generate application key

```bash
php artisan key:generate
```

### 6. Run migrations

```bash
php artisan migrate
```

### 7. Start the app

```bash
php artisan serve
```

In another terminal, run the frontend dev server:

```bash
npm run dev
```

Then open:

```text
http://localhost:8000
```

---

## Build and Validation Commands

This project includes useful scripts from `composer.json` and `package.json`:

### PHP checks

```bash
composer test
```

or more focused checks:

```bash
php artisan test
phpstan analyse
pint --parallel
```

### Frontend checks

```bash
npm run build
npm run check
npm run types:check
```

---

## Environment Notes

The default `.env.example` is configured for a PostgreSQL-based deployment and includes Laravel database, cache, session, and mail settings. The project is set up for a modern production-style environment and can be adjusted for local SQLite, MySQL, PostgreSQL, or cloud-hosted database services.

---

## Development Notes

This project is a good example of a Laravel app built with:

- MVC-style controllers
- Eloquent models
- role-based route protection
- form validation
- modern UI front-end via React and Inertia
- a clean security-first architecture

It is especially useful as a reference for building:

- task boards
- internal dashboards
- SaaS foundations
- user management apps
- secure admin portals

---

## Future Expansion Ideas

Possible improvements for this project include:

- team collaboration and shared task boards
- notifications and reminders
- drag-and-drop Kanban workflow
- recurring tasks
- subscription plans with Stripe integration
- more advanced admin reports and filters
- API versioning if a separate frontend is introduced later

---

## Summary

TaskFlow is a modern Laravel application built with a practical full-stack approach: Laravel for backend power and React + Inertia for a polished frontend experience. It combines task management, admin analytics, user security, and SaaS-style business rules in one structured application.

This project is an excellent example of a maintainable, production-minded web app using the latest Laravel stack and an interactive React UI.
"# TaskFlow---Laravel-"  
