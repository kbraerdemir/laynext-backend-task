// Görevleri haflızada tutacağımız boş dizi (Veri tabanı niyetine)
const tasks = [];

// En temel Görev kalıbı
class Task {
    constructor(id, userId, title, description, status = 'pending') {
        this.id = id;
        this.userId = userId; // Görevin hangi kullanıcıya ait olduğunu belirler
        this.title = title;
        this.description = description;
        this.status = status; // Varsayılan olarak 'pending' (beklemede) başlar, 'completed' olabilir
    }
}

module.exports = { tasks, Task };