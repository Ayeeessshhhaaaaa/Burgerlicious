const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'burgerlicious',
    password: 'burgerlicious',
    database: 'burgerlicious',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.log("Error connecting to the Database");
        console.log(err);
    }
    else {
        console.log("Connected to the Database");
    }

});


app.get('/orders', (req, res) => {

    let query = "SELECT OrderID, UserID, DATE_FORMAT(OrderDate, '%Y-%m-%d %H:%i:%s') AS OrderDate, TotalAmount, Status from orders";
    db.query(query, (err, result) => {
        if (err) {
            console.log("Error Retrieving Orders");
        }
        if (res) {
            res.send({
                message: 'All orders data',
                data: result
            });
        }

    });
});

app.post('/addOrder', (req, res) => {
    let UserID = req.body.UserID;
    let TotalAmount = req.body.TotalAmount;
    let Status = 'Received'; //always when added the order, status will be received 

    db.query("insert into orders (Status,UserID,TotalAmount,OrderDate) values (?,?,?,NOW())", [Status, UserID, TotalAmount], (err, result) => {

        if (err) {

            console.log(err);

        }
        res.send({
            message: 'Order Inserted',
            data: result
        });

    });


});


app.get('/products', (req, res) => {

    let query = 'select * from ingredients';
    db.query(query, (err, result) => {
        if (err) {
            console.log("Error Retrieving Products");
        }
        if (res) {
            res.send({
                message: 'All products data',
                data: result
            });
        }

    });
});

app.get('/products/:id', (req, res) => {

    let id = parseInt(req.params.id);
    db.query("select * from ingredients where IngredientID = ?", [id], (err, result) => {
        if (err) {
            console.log("Error Retrieving Product");
            console.log(err);
        }
        if (res) {
            res.send({
                message: 'Product Data Retrieved',
                data: result
            });
        }

    });
});

app.post('/addOrderProducts', (req, res) => {
    let orderId = req.body.orderId;
    let data = req.body.data;

    for (let i=0;i<data.length;i++) {

        let product = data[i];
        db.query("insert into ordercustomizations (OrderID,Quantity,Subtotal,IngredientID) values (?,?,?,?)", [parseInt(orderId), product.Quantity, product.Subtotal, parseInt(product.IngredientID)], (err, result) => {

            if (err) {
                console.log(err);
            }

        });
    }

    res.send({
        message: 'Order Products Inserted'
    });


});

app.listen(3600, () => {
    console.log("Server Running");
})