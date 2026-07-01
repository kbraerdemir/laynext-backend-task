const { tasks, Task } = require('../models/taskModel');

// 1. Yeni Görjev Oluşturma (Create)
const createTask = (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; // Middleware'in bizim için çözdüğü kullanıcı ID'si

        if (!title) {
            return res.status(400).json({ message: "Title is required." });
        }

        const newTaskId = tasks.length + 1;
        const newTask = new Task(newTaskId, userId, title, description);
        tasks.push(newTask);

        res.status(201).json({ message: "Task created successfully.", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

// 2. Sadece Giriş Yapan Kullanıcının Görevlerini Listeleme (Read)
const getTasks = (req, res) => {
    try {
        const userId = req.user.id;
        
        // Listeden sadece bu kullanıcınşın ID'sine eşit olan görevleri filtreliyoruz
        const userTasks = tasks.filter(t => t.userId === userId);
        
        res.status(200).json(userTasks);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

// 3. Görev Güncelleme (Update)
const updateTask = (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const userId = req.user.id;
        const { title, description, status } = req.body;

        // Güncellenmek istenen görevi listede buluyoruz
        const task = tasks.find(t => t.id === taskId && t.userId === userId);

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        // Gelen yeni bilgiler varsa güncelliyoruz, yoksa eskisi kalıyor
        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;

        res.status(200).json({ message: "Task updated successfully.", task });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

// 4. Görev Silme (Delete)
const deleteTask = (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const userId = req.user.id;

        // Silinecek görevin sırasını (index) buluyoruz
        const taskIndex = tasks.findIndex(t => t.id === taskId && t.userId === userId);

        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found." });
        }

        // Görevi diziden siliyoruz
        tasks.splice(taskIndex, 1);

        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };