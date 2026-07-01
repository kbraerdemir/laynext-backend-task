//Genel rotayı tuttuğumuz yer..
const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

// Tüm bu adreslerin güvenli kapıdan (protect) geçmesi gerekiyor
router.post('/', protect, createTask);       // Görev ekle
router.get('/', protect, getTasks);         // Görevleri listele
router.put('/:id', protect, updateTask);     // Görev güncelle (Adreste id gider: /api/tasks/1)
router.delete('/:id', protect, deleteTask);  // Görev sil (Adreste id gider: /api/tasks/1)

module.exports = router;