import { config } from 'dotenv';
import express from 'express';

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));













app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

