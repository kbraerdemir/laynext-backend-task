require('dotenv').config();
const express = require('express');
const app = express();

// Gelen JSON verilerini sunucunun okuyabilmesi için bu ayarı açıyoruz
app.use(express.json());

// Rotaları (Adresleri) projeye dahil ediyoruz
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Adres ön eklerini tanımlıyoruz
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Sunucunun çalışıp çalışmadığını anlamak için basit bir test rotası
app.get('/', (req, res) => {
    res.status(200).json({ durum: "başarılı", mesaj: "Görev Yönetimi Sistemi Çalışıyor." });
});

// .env dosyasındaki portu al, yoksa varsayılan olarak 5000 portunu kullan
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başarıyla başlatıldı...`);
});