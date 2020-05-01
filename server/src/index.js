'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(cors());

app.use(express.json());
app.use('/api', require('./routes'));
app.use(errors());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
