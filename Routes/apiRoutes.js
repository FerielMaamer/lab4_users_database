const express = require('express');
const user = require('../models/userSchema');
const app = express();

app.post('/user', async (req, res) => {
  
    console.log(req.body)
    const employee = new user(req.body);    
    try {
      await employee.save((err) => {
        if(err){          
          res.send(err)
        }else{
          res.send(employee);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  module.exports = app