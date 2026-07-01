const jwt = require('jsonwebtoken');

// Gelen islteğin biletini kontrol eden fonksiyon
const protect = (req, res, next) => {
    // 1. Kullanıcı biletini başlıkta (headers) göndermiş mi diye bakıyoruz
    const authHeader = req.headers.authorization;

    // Eğer bilet hiç gönderfilmediyse veya "Bearer " ile başlamıyorsa kapıyı kapatıyoruz
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided, authorization denied." });
    }

    // 2. "Bearer eyJhbGci..." şeklindeki yazıdan sadece bilet kodunu ayıklıyoruz
    const token = authHeader.split(' ')[1];

    try {
        // 3. Bileti gizli şifremizle (JWT_SECRET) açıp kontrol ediyoruz
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Biletin içindeki kullanıcı ID'sini isteğin içine koyuyoruz ki controller kim olduğunu bilsin
        req.user = decoded;
        
        // Her şey yoludndaysa bir sonraki aşamaya (yani controller'a) geçiş izni veriyoruz
        next();
    } catch (error) {
        // Bilet süresi dolmuşsa veya sahteyse hata döndürüyoruz
        res.status(401).json({ message: "Token is not valid." });
    }
};

module.exports = { protect };