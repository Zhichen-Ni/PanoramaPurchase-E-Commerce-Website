Pre-requisite: Must have node.js installed
In the bash, type:
```
npm install chance
```
It will download all the needed library.

Then type the following comment one by one, each of them will generate the corresponding sample data txt file:
```
node User_generate.js > User.txt
node Category_generate.js > Category.txt
node Product_generate.js > Product.txt
node Category_Product_generate.js > CategoryProduct.txt
node Comment_generate.js > Comment.txt
node Cart_generate.js > Cart.txt
```
