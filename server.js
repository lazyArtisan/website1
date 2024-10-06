const express = require('express');
const mongoose = require('mongoose'); // Mongoose 추가
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
const PORT = 5000;

// MongoDB 연결
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // 로컬 MongoDB URI (또는 MongoDB Atlas URI 사용 가능)
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// 게시글 스키마 및 모델 정의
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// CORS 미들웨어 사용
app.use(cors());
app.use(express.json()); // JSON 데이터 처리

// 게시글 목록 가져오기 (GET)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // MongoDB에서 모든 게시글 가져오기
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 게시글 추가 (POST)
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content });
    await newPost.save(); // MongoDB에 새 게시글 저장
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Error saving post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
