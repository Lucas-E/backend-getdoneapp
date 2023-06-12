const express = require('express');
const router = express.Router();
const User = require('../models').User
require('dotenv').config()
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(401).json({
            message: 'Error while getting user'
        })
    }
})