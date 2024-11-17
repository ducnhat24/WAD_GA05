const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { engine } = require('express-handlebars');
const { route } = require('./routes/index');
const cookieParser = require('cookie-parser');
app.use(express.json());

const db = require('./config/index');
db.connect();

// Cấu hình Handlebars với extension mặc định
app.engine("handlebars", engine({
  extname: ".handlebars", // Sử dụng phần mở rộng .handlebars
  helpers: {
    eq: (a, b) => a === b,
    includes: (item, array) => Array.isArray(array) && array.includes(item),
  },
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

route(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
