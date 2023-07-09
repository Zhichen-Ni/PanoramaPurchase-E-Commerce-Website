const Chance = require("chance");
const chanceObj = new Chance();

const generatePerson = () => {
    return {
        "user" : chanceObj.integer({ min: 1000, max: 1999 }),
        "product" : chanceObj.integer({ min: 1, max: 1000 }),
        "quantity" : chanceObj.integer({ min: 1, max: 9 })
        }
};

// const dom = generatePerson();

// console.log(dom);

const item = Array.from({ length: 70 }, generatePerson);

    for (var i = 1; i <= 60; i++) {
 
        console.log(item[i].user+"\t"+item[i].product+"\t"+item[i].quantity);
       
        }
    