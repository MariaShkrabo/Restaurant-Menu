//чтобы сервер мог считывать переменные окружения
require("dotenv").config();

//с помощью requare импортируются модули в проект
const express = require("express");
const sequelize = require("./db");
const model = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");


//порт, на котором будет работать приложение 
const PORT = process.env.PORT;

//объект модуля, точка входа в программу
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}))
app.use("/api", router);
//последний middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        //порт, на котором слушается сервер, второй-callback, который вызовется при успешной загрузке сервера (npm run dev)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 
    } catch (error) {
        console.log(error);
    }
}

start();

