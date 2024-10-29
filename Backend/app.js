const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const MemoryStore = require('session-memory-store')(session);
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const { checkSessionMiddleware } = require("./middlewares/sessionHandler");
const { checkTokenMiddleware } = require("./middlewares/tokenHandler");
const { login, register, logout } = require("./controllers/authController") 
const { checkLogin } = require("./middlewares/checkLogin") 

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const tableRoutes = require("./routes/tableRoutes");
const permissionsettingRoutes = require("./routes/permissionSettingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paidRoutes = require("./routes/paidRoutes");
const reservedTableRoutes = require("./routes/reservedTableRoutes");

dotenv.config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
};

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(
    session({
        genid: (req) => {
            return uuidv4();
        },
        store: MemoryStore(),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 86_400_000
        },
    })
);

app.use(checkSessionMiddleware);
app.use(checkTokenMiddleware);
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/check", checkLogin);


app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/paymentmethod', paymentMethodRoutes);
app.use('/table', tableRoutes);
app.use('/permissionsetting', permissionsettingRoutes);
app.use('/order', orderRoutes);
app.use('/paid', paidRoutes);
app.use('/reservation', reservedTableRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running at http://localhost:${PORT}`);
});