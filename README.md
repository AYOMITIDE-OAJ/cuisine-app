This documentation covers an overview of both the frontend and backend parts, features, required dependencies, installation and configuration guidelines, usage instructions, and notes on performance optimizations. Enjoy! 😃

---

# AYOMITIDE-OAJ/cuisine-app

> **A Full-Stack Cuisine Application**  
> **Backend:** Built with **NestJS** + **TypeORM** (using PostgreSQL)  
> **Frontend:** Built with **React** using **Vite**, **Redux Toolkit** and **React Query**

---

## Introduction

Welcome to the **Cuisine App** repository!  
This project is a full-stack application designed to fetch, display, and manage cuisine set menus. The backend API (located in the `cuisines-api` folder) is a NestJS application that provides endpoints for retrieving cuisines and their corresponding set menus. Meanwhile, the frontend (located in the `cuisine-app` folder) is a modern React application built using Vite. It leverages Redux for state management and React Query for efficient and asynchronous data fetching, ensuring a seamless user experience. 🚀

The app is optimized for performance using caching mechanisms in the API and lazy-loading techniques in the frontend. Detailed endpoints, state management, and error-handling strategies ensure robust functionality. 

---

## Features

### Backend (cuisines-api)
- **API Endpoints:**  
  - `/api/cuisines` – Retrieve all cuisines ordered by the number of orders.  
  - `/api/cuisines/set-menus` – Retrieve paginated set menus; filterable by cuisine slug.  
  - `/api/cuisines/sync` – Trigger synchronization of cuisines and set menus via the Harvest Service. 

- **Caching and Optimization:**  
  - Utilizes the **CacheModule** (with TTL of 5 minutes) to optimize repeated requests and reduce database load. (See caching in the `CuisinesService` and `CacheModule` configuration 
  - Pagination support for set menus is implemented to serve a limited number of items per request.
  
- **Database and ORM:**  
  - Uses **TypeORM** to connect to a PostgreSQL database.  
  - Entities include `Cuisine` and `SetMenu` with relational mappings.  
  - Optimized with database indices to speed up lookups (e.g. the cuisine slug index). citeturn0file2

- **Rate Limiting:**  
  - The project includes a throttling mechanism (via `@nestjs/throttler`) that limits request rates (configured at 1 request per second).

- **Testing:**  
  - Implements unit tests (using **Jest**) for controllers and services to ensure code quality. 

### Frontend (cuisine-app)
- **Dashboard Interface:**  
  - Provides a clean, responsive user interface with a dedicated homepage and a cuisines page that displays set menus in a grid layout.  
  - Users can filter by cuisine, adjust the number of guests, and load more items interactively.

- **State Management and Data Fetching:**  
  - **Redux Toolkit** manages state (e.g. pagination, guest number, selected cuisine slug).  
  - **React Query** handles asynchronous API calls to fetch cuisines, ensuring refetching, caching, and data synchronization on the client side.

- **Modularity:**  
  - Utilizes a component-based architecture – modular components include _SetMenuGrid_, _SetMenuCard_, _FilterSection_, and _LoadMoreButton_.  
  - Integrated error handling and notifications via a toast system to improve user feedback. 

---

## Requirements

### Backend (cuisines-api)
- **Node.js** (v14 or later recommended)
- **Yarn** or **npm**
- **PostgreSQL** database instance
- **Environment Variables:**  
  - `PORT`
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `DB_NAME`
- **Additional Dependencies:**  
  - NestJS packages (e.g., `@nestjs/common`, `@nestjs/core`, `@nestjs/config`, etc.)  
  - TypeORM, cache-manager, axios, and more as listed in `package.json`

### Frontend (cuisine-app)
- **Node.js** (v14 or later recommended)
- **Yarn** or **npm**
- **Vite** (bundler)
- **Environment Variables:**  
  - `VITE_BASE_URL` (points to the backend API URL)
- **Additional Dependencies:**  
  - React, React DOM, Redux Toolkit, React Query, axios, and other utility libraries. 

---

## Installation

### General
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AYOMITIDE-OAJ/cuisine-app.git
   cd cuisine-app
   ```

### Backend Setup (`cuisines-api`)
1. Navigate to the backend folder:
   ```bash
   cd cuisines-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the application using NestJS:
   ```bash
   npm run build
   ```
4. (Optional) Run tests:
   ```bash
   npm run test
   ```  


### Frontend Setup (`cuisine-app`)
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd cuisine-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server with Vite:
   ```bash
   npm run dev
   ```  


---

## Configuration

### Backend (cuisines-api)
- **Environment Variables:**  
  Create a `.env` file at the root of the `cuisines-api` directory with the following:
  ```bash
  PORT=3000
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=your_db_username
  DB_PASSWORD=your_db_password
  DB_NAME=cuisine_db
  ```
  (The `SecretsService` loads these variables to configure the database connection and server port.) 

- **TypeORM Settings:**  
  The TypeORM configuration is dynamically set in `main.module.ts` using the secrets service:
  ```typescript
  TypeOrmModule.forRootAsync({
    useFactory: (secretsService: SecretsService) => ({
      type: 'postgres',
      host: secretsService.DB_HOST,
      port: secretsService.DB_PORT,
      username: secretsService.DB_USERNAME,
      password: secretsService.DB_PASSWORD,
      database: secretsService.DB_NAME,
      entities: [Cuisine, SetMenu],
      synchronize: true,
    }),
    inject: [SecretsService],
  })
  ```
  citeturn0file7

### Frontend (cuisine-app)
- **Vite Environment:**  
  Create a `.env` file at the project root of the `cuisine-app` folder and set:
  ```bash
  VITE_BASE_URL=http://localhost:3000/api
  ```
  This variable is used by Axios to target the backend API. citeturn0file5

- **Routing and Redux:**  
  The application uses router configuration and Redux slices defined in files such as `src/redux/slices/cuisineSlice.ts` and uses constants defined in `src/utils/constants.ts` for navigation and API query keys.

---

## Usage

### Backend API Endpoints
- **Retrieve Cuisines:**  
  **GET** `/api/cuisines`  
  Returns a list of available cuisines sorted by order count.
  
- **Fetch Paginated Set Menus:**  
  **GET** `/api/cuisines/set-menus`  
  Accepts optional query parameters:
  - `page` (default is 1)
  - `limit` (default is 6)
  - `slug` for filtering by a specific cuisine.
  
- **Sync Data:**  
  **GET** `/api/cuisines/sync`  
  Triggers the Harvest Service to synchronize and insert set menus fetched from an external booking API.
  
 

### Frontend Usage
- **Home Page:**  
  The landing page provides a welcome screen with a "Get Started" button that routes users to the cuisines dashboard.
  
- **Cuisines Dashboard:**  
  On the `/cuisines` page, users see a grid of set menus. Features include:
  - **Filters:** Users can filter menus based on available cuisine slugs.
  - **Pagination:** A "Load More" button fetches additional menus, powered by React Query and Redux (see `incrementPage` action in the Redux slice). 
  - **Guest Controls:** Increment and decrement buttons allow adjusting the number of guests, which can modify the view of dish portions.
  
- **Error Handling & Notifications:**  
  The frontend uses a toast-based notification system for error, info, and success messages that improve the user experience.

---

## Additional Notes

### Performance Optimizations
- **API Caching:**  
  The backend caches results for 5 minutes to reduce database load and response time using the NestJS CacheModule.
  
- **Pagination:**  
  Both the backend and frontend implement pagination to ensure that only the required data is transferred and rendered, thus enhancing performance.
  
- **Redux and React Query:**  
  The use of React Query on the frontend ensures that data is fetched asynchronously with built-in caching and revalidation, making the UI responsive even under poor network conditions. 


### Build Requirements
- **Backend Build:**  
  Once dependencies are installed, use:
  ```bash
  npm run build
  npm run start:dev
  ```
  For production, build with `npm run build` and then start with `npm run start:prod`.

- **Frontend Build:**  
  For development:
  ```bash
  npm run dev
  ```
  To build for production:
  ```bash
  npm run build
  npm run preview
  ```
  The Vite configuration is minimal and leverages the React SWC plugin for fast builds.

---



Feel free to contribute and reach out for any issues or enhancements.

---