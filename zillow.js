const express = require('express');
const app  = express();
const port  = 5000;

const db  = [{ price: 240000, city: "baltimore" }, { price: 300000, city: "austin" },
    { price: 400000, city: "austin" }, { price: 1000000, city: "seattle"}, 
    { price:1325000, city: "baltimore" }, { price: 550000, city: "seattle"}, 
    { price: 250000, city: "boston" }]


app.get('/v1/zillow/zestimate', (req, res) => {
    
    const sqft = req.query.sqft
    const bed = req.query.bed
    const bath = req.query.bath
  
    const zestimate = sqft * bed * bath * 10
  
    res.json({ zestimate })
  })

app.get('/v1/zillow/houses', async (req, res) => {
    const  city = req.query.city

    houses = []

    await db.forEach(element => {
        if (element.city == city) {
            houses.push(element);
        }
        
    });


    res.status(200).send(houses)
})





app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})



