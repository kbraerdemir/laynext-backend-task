const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, User } = require('../models/userModel');

// Yeni Kulljanıcı Kayıt Etme Fonksiyonu
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Bu e-posta adresi daha önce alınmış mı diye kontrol ediyoruz
        const kullanıcıVarMı = users.find(u => u.email === email);
        if (kullanıcıVarMı) {
            return res.status(400).json({ message: "Bu e-posta adresi zaten kayıtlı." });
        }

        // Şifreyi güvenşli hale getirmek için hash'liyoruz (kriptoluyoruz)
        const salt = await bcrypt.genSalt(10);
        const gızlıSifre = await bcrypt.hash(password, salt);

        // Yeni kullanıcıyı listemize ekliyoruz
        const yeniId = users.length + 1;
        const yeniKullanıcı = new User(yeniId, email, gızlıSifre);
        users.push(yeniKullanıcı);

        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi." });
    } catch (error) {
        res.status(500).json({ message: "Sistemsel bir hata oluştu." });
    }
};

// Kullanıcı Giriş Yaspma Fonksiyonu
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı listede aratıyoruz
        const kullanıcı = users.find(u => u.email === email);
        if (!kullanıcı) {
            return res.status(400).json({ message: "E-posta veya şifre hatalı." });
        }

        // Gelen şifre ile içerideki kriptolu şifreyi karşılaştırıyoruz
        const sifreDogruMu = await bcrypt.compare(password, kullanıcı.password);
        if (!sifreDogruMu) {
            return res.status(400).json({ message: "E-posta veya şifre hatalı." });
        }

        // Giriş başarılı olunca kullanıcıya 1 saat geçerli JWT bilet üretiyoruz
        const token = jwt.sign(
            { id: kullanıcı.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: "Giriş başarılı.",
            token: token 
        });
    } catch (error) {
        res.status(500).json({ message: "Sistemsel bir hata oluştu." });
    }
};

module.exports = { register, login };