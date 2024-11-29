const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const port = 3000;
const { route } = require('./routes/index');
const cookieParser = require('cookie-parser');
const seed = require('./config/seed');
app.use(express.json());
app.use(cors());

const db = require('./config/index');
db.connect();
// Cấu hình Handlebars với extension mặc định
app.use(cookieParser());

route(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});