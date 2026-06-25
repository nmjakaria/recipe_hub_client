# 🍽️ RecipeHub — Recipe Sharing Platform

A full-stack recipe sharing platform where food enthusiasts can create, share, discover, and manage recipes. Built with **Next.js**, **Better Auth**, and **MongoDB** on the frontend, powered by an **Express.js** REST API on the backend.

🔗 **Live Site:** [https://recipe-hub-share.vercel.app](https://recipe-hub-share.vercel.app)
📁 **Client Repository:** [https://github.com/nmjakaria/recipe_hub_client](https://github.com/nmjakaria/recipe_hub_client)

---

## ✨ Features

### 👤 User Features
- Register & login with credentials or Google (via Better Auth)
- Browse all recipes with category & cuisine filters
- View detailed recipe information
- Like, favorite, and report recipes
- Purchase individual recipes via Stripe
- Upgrade to **Premium** membership for unlimited recipe uploads
- Manage personal recipes (add, edit, delete)
- View purchased recipes and saved favorites
- Update profile (name & avatar)

### 🛡️ Admin Features
- Dashboard overview with platform statistics
- Manage users (block / unblock)
- Manage recipes (edit, delete, feature/unfeature)
- Review and moderate community reports
- View all transactions (purchases & subscriptions)

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (JavaScript) |
| Authentication | Better Auth |
| Database | MongoDB |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Payments | Stripe Checkout |
| Image Upload | ImgBB API |
| Deployment | Vercel |

---

## 📁 Project Structure

```
recipe_hub_client/
├── app/
│   ├── (public)/
│   │   ├── page.jsx               # Home Page
│   │   ├── browse-recipes/        # Browse All Recipes
│   │   ├── recipes/[id]/          # Recipe Details
│   │   ├── login/                 # Login Page
│   │   └── register/              # Register Page
│   ├── (private)/
│   │   ├── dashboard/
│   │   │   ├── overview/          # Dashboard Overview
│   │   │   ├── my-recipes/        # My Recipes
│   │   │   ├── add-recipe/        # Add Recipe
│   │   │   ├── my-favorites/      # Saved Favorites
│   │   │   ├── purchased-recipes/ # Purchased Recipes
│   │   │   └── profile/           # Profile Settings
│   │   └── admin/
│   │       ├── overview/          # Admin Overview
│   │       ├── manage-users/      # User Management
│   │       ├── manage-recipes/    # Recipe Management
│   │       ├── reports/           # Content Reports
│   │       └── transactions/      # Transaction Ledger
│   └── api/
│       └── auth/                  # Better Auth API Routes
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ...
├── lib/
│   └── auth.js                    # Better Auth Configuration
├── .env.local                     # Environment Variables
└── next.config.js
```

---

## 🗄️ Database Schema

**Database:** `recipehub_db`

### `user`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique user identifier |
| `name` | String | Full name |
| `email` | String | Email address |
| `emailVerified` | Boolean | Email verification status |
| `image` | String | Profile image URL |
| `role` | String | `"user"` or `"admin"` |
| `plan` | String | `"free"` or `"premium"` |
| `isBlocked` | Boolean | Account status |
| `createdAt` | Date | Registration date |
| `updatedAt` | Date | Last update timestamp |

### `recipes`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Recipe identifier |
| `recipeName` | String | Name of the recipe |
| `recipeImage` | String | ImgBB image URL |
| `category` | String | e.g. Breakfast, Dinner |
| `cuisineType` | String | e.g. Chinese, Bengali |
| `difficultyLevel` | String | Easy / Medium / Hard |
| `preparationTime` | Number | Time in minutes |
| `ingredients` | Array | List of ingredients |
| `instructions` | Array | Step-by-step instructions |
| `description` | String | Recipe description |
| `authorId` | String | Reference to user `_id` |
| `authorName` | String | Author's display name |
| `authorEmail` | String | Author's email |
| `likesCount` | Number | Total like count |
| `isFeatured` | Boolean | Featured on homepage |
| `status` | String | `"pending"` or `"allowed"` |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |

### `recipeLikes`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Like record identifier |
| `recipeId` | ObjectId | Reference to recipe |
| `userId` | String | Reference to user |
| `createdAt` | Date | Like timestamp |

### `recipeFavorites`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Favorite record identifier |
| `userId` | ObjectId | Reference to user |
| `userEmail` | String | User's email |
| `recipeId` | ObjectId | Reference to recipe |
| `recipeName` | String | Cached recipe name |
| `recipeImage` | String | Cached recipe image |
| `category` | String | Cached category |
| `cuisineType` | String | Cached cuisine type |
| `createdAt` | Date | Saved timestamp |

### `recipe_purchases`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Purchase record identifier |
| `recipeId` | ObjectId | Purchased recipe reference |
| `userId` | String | Buyer's user ID |
| `userEmail` | String | Buyer's email |
| `amount` | Number | Amount paid (USD) |
| `transactionId` | String | Stripe payment intent ID |
| `paymentStatus` | String | e.g. `"paid"` |
| `paidAt` | Date | Payment timestamp |

### `subscriptions`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Subscription identifier |
| `userId` | ObjectId | Reference to user |
| `userEmail` | String | Subscriber's email |
| `stripeSubscriptionId` | String | Stripe subscription ID |
| `stripePriceId` | String | Stripe price plan ID |
| `status` | String | e.g. `"active"` |
| `amount` | Number | Subscription amount (USD) |
| `createdAt` | Date | Subscription start date |
| `expiresAt` | Date | Expiry date (null = ongoing) |

### `reports`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Report identifier |
| `recipeId` | ObjectId | Reported recipe reference |
| `reporterEmail` | String | Reporter's email |
| `reason` | String | Violation reason/description |
| `status` | String | `"pending"` or `"dismissed"` |
| `createdAt` | Date | Report timestamp |
| `updatedAt` | Date | Last status update |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- MongoDB Atlas account
- Stripe account
- Better Auth setup
- ImgBB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nmjakaria/recipe_hub_client.git
   cd recipe_hub_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # App
   NEXT_PUBLIC_API_URL=http://localhost:5000

   # Better Auth
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000

   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # ImgBB
   NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication

This project uses **Better Auth** for authentication with the following features:

- **Credential Login** — Email & password with validation
- **Google OAuth** — One-click social login
- **JWT via JWKS** — Tokens verified on the Express backend using `jose`
- **HTTPOnly Cookies** — Secure token storage
- **Protected Routes** — Middleware-based route guards for private pages
- **Role-Based Access** — `user` and `admin` roles enforced on both client and server

### Password Requirements
- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter

---

## 💳 Payment Integration

RecipeHub uses **Stripe Checkout** for two payment flows:

| Flow | Description | Collection |
|---|---|---|
| Single Recipe Purchase | Buy access to one premium recipe ($5) | `recipe_purchases` |
| Premium Membership | Unlock unlimited recipe uploads ($99) | `subscriptions` |

After successful payment, the user's `plan` field is updated to `"premium"` in the database.

---

## 🌐 API Endpoints (Backend)

The backend runs separately on **Express.js**. Key endpoints:

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/recipes` | Public | Get all recipes (paginated, filterable) |
| `GET` | `/api/recipes/:id` | Public/Auth | Get single recipe details |
| `POST` | `/api/recipes` | User | Create a new recipe |
| `PATCH` | `/api/recipes/:id` | User | Update a recipe |
| `DELETE` | `/api/recipes/:id` | User | Delete a recipe |
| `POST` | `/api/recipes/:id/like` | User | Toggle like on a recipe |
| `POST` | `/api/recipes/:id/favorite` | User | Toggle favorite on a recipe |
| `POST` | `/api/recipes/:id/report` | User | Submit a content report |
| `GET` | `/api/user/my-recipes` | User | Get logged-in user's recipes |
| `GET` | `/api/user/my-favorite` | User | Get user's favorite recipes |
| `GET` | `/api/user/purchased-recipes/:userId` | User | Get user's purchased recipes |
| `POST` | `/api/recipe-purchases` | Public | Record a recipe purchase |
| `POST` | `/api/subscriptions` | Public | Record a premium subscription |
| `GET` | `/api/users` | Admin | Get all users |
| `PATCH` | `/api/users/:id/block` | Admin | Block/unblock a user |
| `GET` | `/api/reports` | Admin | Get all reports |
| `PATCH` | `/api/reports/:id` | Admin | Update report status |
| `DELETE` | `/api/reports/:id` | Admin | Delete a report |
| `PATCH` | `/api/admin/recipes/:id` | Admin | Feature/update recipe status |
| `GET` | `/api/admin/transactions` | Admin | Get all transactions |

---

## 📄 Pages Overview

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| Browse Recipes | `/browse-recipes` | Public |
| Recipe Details | `/recipes/[id]` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Dashboard Overview | `/dashboard` | Private |
| My Recipes | `/dashboard/my-recipes` | Private |
| Add Recipe | `/dashboard/add-recipe` | Private |
| My Favorites | `/dashboard/my-favorites` | Private |
| Purchased Recipes | `/dashboard/purchased-recipes` | Private |
| Profile | `/dashboard/profile` | Private |
| Admin Overview | `/admin` | Admin |
| Manage Users | `/admin/manage-users` | Admin |
| Manage Recipes | `/admin/manage-recipes` | Admin |
| Reports | `/admin/reports` | Admin |
| Transactions | `/admin/transactions` | Admin |

---

## 🎨 UI/UX Highlights

- Fully **responsive** design for mobile, tablet, and desktop
- **Dark / Light theme** toggle
- **Framer Motion** animations on homepage sections
- Professional card layouts for recipe browsing
- Custom **404 error page** with illustration and back-home button
- Loading skeletons during data fetching and authentication

---

## 🔍 Filtering & Pagination

- Filter recipes by **Category** and **Cuisine Type**
- MongoDB `$in` operator for category filtering
- **Server-side pagination** on the Browse Recipes page
- Default page size: 8 recipes per page

---

## 🚢 Deployment

The client is deployed on **Vercel**.

### Deployment Checklist
- ✅ No CORS issues
- ✅ No 404 issues on direct URL access
- ✅ No 504 gateway timeout errors
- ✅ Route reloads work correctly in production
- ✅ Private routes remain protected after page refresh
- ✅ Authenticated users stay logged in across sessions

---

## 👨‍💻 Developer

**Naimullah Md Jakaria**
📧 naimullahmdjakaria64@gmail.com
🔗 [GitHub](https://github.com/nmjakaria)
