const express = require('express');
const app  = express();
const port  = 5000;

const db  = [{ price: 240000, city: "baltimore" }, { price: 300000, city: "austin" },
    { price: 400000, city: "austin" }, { price: 1000000, city: "seattle"}, 
    { price:1325000, city: "baltimore" }, { price: 550000, city: "seattle"}, 
    { price: 250000, city: "boston" }]


app.get('/v1/zillow/zestimate', async (req, res) => {
    const { sqft, bed, bath } = req.query;
    
    //Check to see if we have enough of the parameters that we want
    if (!sqft || !bed || !bath) {
        return res.status(404).json( {message: 'All parameters, sqft, bed, and bath are required'})
    }

    //Checking to see if the values of the query can be parsed into a number. If not, its a bad request
    for (param in req.query) { 
         if (isNaN(req.query[param])) {
             return res.status(404).json({message: `The query parameter ${param} is not a number`});
         }
    }

    const zestimate = req.query.sqft * req.query.bed * req.query.bath * 10;
    return res.status(200).json({zestimate: zestimate});
  })

app.get('/v1/zillow/houses', async (req, res) => {
    const  city = req.query.city

    houses = []

    await db.forEach(element => {
        if (element.city == city) {
            houses.push(element);
        }
        
    });

    return res.status(200).send(houses)
})

app.get('/v1/zillow/prices', async (req, res) => {
    const { usd } = req.query;

    if (!usd) {
        return res.status(404).json( {message: 'The parameter usd is required'});
    }

    if (isNaN(req.query.usd)){
        return res.status(404).json({message: "The query parameter usd is not a number"});
    }

    houses = []

    for (entry in db) { //price data is at db[entry].price
        if (req.query.usd >= db[entry].price) {
            houses.push(db[entry])
        }
    }

    return res.status(200).json(houses);
})




app.use('*', (req, res) => {
    return res.status(404).json({message: "This endpoint does not exist!"})
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})



