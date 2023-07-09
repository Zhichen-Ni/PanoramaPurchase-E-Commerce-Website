const Chance = require("chance");
const chanceObj = new Chance();

const generatePerson = () => {
    return {
        "name" : chanceObj.animal(),
        "price" : chanceObj.floating({ min: 0, max: 10000, fixed: 2 }),
        "sentence" : chanceObj.sentence(),
        "rate" : chanceObj.floating({ min: 0, max: 5, fixed: 1 }),
        "picture" : chanceObj.url({path: 'images'})
        }
};

// const dom = generatePerson();

// console.log(dom);

const item = Array.from({ length: 1001 }, generatePerson);

    for (var i = 1; i <= 100; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"napkin"+i);
       
        }
    for (var i = 101; i <= 200; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"milk"+(i-100));     
        }
    for (var i = 201; i <= 300; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"apple"+(i-200));
        }
    for (var i = 301; i <= 400; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"orrange"+(i-300));
        }
    for (var i = 401; i <= 500; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"bread"+(i-400));
        }
    for (var i = 501; i <= 600; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"T-shirt"+(i-500));
        }
    for (var i = 601; i <= 700; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"fish"+(i-600));
        }
    for (var i = 701; i <= 800; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"butter"+(i-700));
        }
    for (var i = 801; i <= 900; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"bag"+(i-800));
        }
    for (var i = 901; i <= 1000; i++) {
        console.log(i+"\t"+item[i].sentence+"\t"+item[i].price+"\t"+item[i].rate+"\t"+item[i].picture+"\t"+"face-washer"+(i-900));
        }

