# Laynext - Backend Görev Yönetimi API Taskı

Bu proje, Laynext staj değerlendirme süreci kapsamında geliştirilmiş, bellek içi (in-memory) veri yapısı kullanan temel bir **Görev Yönetimi (Task Management) API** uygulamasıdır. Projede kullanıcı kayıt/giriş işlemleri JWT (JSON Web Token) ile güvence altına alınmış ve görevler için tam CRUD operasyonları sağlanmıştır.

## 🛠️ Kullanılan Teknolojiler

* **Runtime:** Node.js
* **Framework:** Express.js
* **Güvenlik & Şifreleme:** bcryptjs, jsonwebtoken (JWT)
* **Ortam Değişkenleri:** dotenv

## 📂 Proje Klasör Yapısı

```text
├── controllers/
│   ├── authController.js    # Kayıt ve Giriş kontrol mekanizmaları
│   └── taskController.js    # Görev CRUD operasyonlarının yönetimi
├── middlewares/
│   └── authMiddleware.js    # JWT bilet kontrolü (Güvenlik Kapısı)
├── models/
│   ├── userModel.js         # Bellek içi Kullanıcı şablonu ve dizisi
│   └── taskModel.js         # Bellek içi Görev şablonu ve dizisi
├── routes/
│   ├── authRoutes.js        # Kimlik doğrulama rotaları
│   └── taskRoutes.js        # Görev yönetim rotaları
├── .env                     # Gizli şifreler ve Port ayarı
├── .gitignore               # GitHub'a yüklenmeyecek dosyalar listesi
├── app.js                   # Uygulamanın ana giriş kapısı
├── package.json             # Bağımlılıklar ve proje detayları
└── README.md                # Proje dökümantasyonu