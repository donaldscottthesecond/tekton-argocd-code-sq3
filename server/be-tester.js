const express = require('express');
const app = express();
const storage = require('./io');

const data = {
    list: {
        groceryListName: "my-list",
        items: [
            {
                "item1": "1"
            },
            {
                "item2": "2"
            }
        ]
    }
}

app.get('/', function (req, res) {
  res.send('Hello World');
})

storage.save_list(data);
console.log(storage.read_list("my-list"));

//app.listen(3000);
