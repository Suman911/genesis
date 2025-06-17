# ⚠️ Avoid Using Closures in Production

Closures are **not compatible** with `var_export()`.  
Avoid using them in production environments to ensure compatibility and maintainability.

---

# 📁 API Scripts Structure

public/api/ 
├── auth/ # Authentication logic and classes │
├── db/ 
│ ├── migrations/   # Database migration scripts (Phinx) 
│ ├── seeds/        # Database seeders 
│ └── phinx.php     # Phinx configuration file 
│ 
├── src/ 
│ ├── Controller/   # HTTP controllers for handling requests 
│ ├── Middleware/   # Middleware for request/response processing 
│ ├── Repository/   # Database access and query logic 
│ ├── Http/         # Utility/helpers 
│ └── Router        # Route definitions 
│ 
├── index.php       # Main API entry point 
├── .env            # Environment configuration 
├── composer.json   # PHP dependencies 
└── notes.md        # Project notes and documentation
