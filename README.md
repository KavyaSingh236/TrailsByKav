# TrailsByKav

**TrailsByKav** is a feature-rich full-stack web application inspired by Airbnb. It allows users to explore various listings, create their own travel destinations, leave reviews, and manage accounts with ease. The project showcases modern web development practices using technologies like MongoDB, Node.js, and Express.js. It also integrates interactive maps, user authentication, and image storage, making it a comprehensive platform for discovering unique travel spots.

## 🌐 [Live Demo](https://trailsbykav.onrender.com/listing)

---

## 🚀 Key Features

- **User Authentication:** Secure login and logout functionality, with hashed passwords and encrypted user data.
- **User Profile Management:** Update account details, change passwords, and manage personal information.
- **Listings CRUD:** Create, read, update, and delete listings for travel destinations.
- **Review System:** Users can add, delete, and manage reviews for each listing.
- **Interactive Maps:** Seamless integration with Mapbox to display dynamic maps for each listing location.
- **Image Upload:** Efficient image storage using Cloudinary for seamless listing creation.
- **Flash Messages:** Real-time feedback for user actions like authentication, CRUD operations, and form submissions.
- **Security:** Ensures user data is protected through session handling, cookie parsing, and data validation.

---

## 🛠️ Technologies & Packages

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (via Mongoose for object modeling)
  - Passport.js (Authentication)
  - Joi (Data Validation)
  - Express Session (Session Handling)
  - Connect Flash (Flash Messaging)
  - Connect Mongo (Session Storage)
  - Dotenv (Environment Variables)
  
- **Frontend:**
  - EJS (Template Rendering)
  - CSS3 (Styling)

- **Other Integrations:**
  - **Mapbox:** Interactive maps for visualizing listing locations.
  - **Cloudinary:** Cloud-based image storage for listing images.
  - **Multer:** Middleware for handling file uploads.

---

## ✨ How It Works

1. **User Authentication:** Users can register, log in, log out, and manage their profiles.
2. **Listing Management:** Authenticated users can create new listings, edit them, and delete them.
3. **Review System:** Users can leave reviews on listings, which can be managed by the review creators.
4. **Interactive Maps:** Every listing has an associated location visualized via Mapbox, enhancing the user experience.
5. **Session Handling:** User data is securely stored in sessions using MongoDB, with cookies parsed and handled appropriately.

---

## 📦 Packages & Modules

- **MongoDB** - Database for storing user data and listings.
- **Express.js** - Backend framework for handling server routes and requests.
- **Passport.js** - Authentication library for managing login and user sessions.
- **Cloudinary** - Service for managing and storing images.
- **Mapbox** - Integration for interactive maps and location data visualization.
- **Multer** - Middleware for handling file uploads, such as images.
- **Joi** - Library for validating user input and ensuring data integrity.
- **EJS** - Template engine for rendering dynamic HTML content.

---

## 📸 Screenshots

### Home Page
Showcases listings from all over the world with interactive Mapbox maps.
![Homepage](https://via.placeholder.com/500)

### Listing Page
View individual listings, including location, description, and user reviews.
![Listing Page](https://via.placeholder.com/500)

### User Profile
Manage account details and view your listings.
![Profile](https://via.placeholder.com/500)

---

## 🚀 Future Enhancements

- **Booking Feature:** Allow users to book travel accommodations directly through the platform.
- **Advanced Search Filters:** Enhance search functionality with price ranges, availability, and more categories.
- **Favorites List:** Let users save their favorite listings for easy access.
- **Mobile App:** Expand the platform to mobile devices for a better user experience on-the-go.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---



