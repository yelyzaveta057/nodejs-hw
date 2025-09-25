
import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3030;


app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({ message: "Retrieved note with ID: id_param" });
});


app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: "Simulated server error",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
