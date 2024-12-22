1. Download and configure Node.js on pc
2. Download mongodb
3. Download VSCode

4. Open VScode
5. Then open this folder GROCERY-SHOPPING-SYSTEM from vscode
6. On this folder in the backend file there is a .env file. open the file .env and follow the instruction given there
7. Open terminal in vscode
8. Split the terminal into two parts
9. Make sure you are in the right directory GROCERY-SHOPPING-SYSTEM in vscode terminal
10. in one part of the terminal run the following commands
```
cd backend
npm install
npm start
```
11. in another part of the terminal run the following commands
```
cd frontend
npm install
npm start
```
12. The project should work
13. Keep in mind the files won't run if you make mistake configuring the .env file on step 6

14. run the code below in mongodb shell
```
db.products.insertMany([  {
    "name": "Pringles",
    "imageUrl": "https://i.ibb.co.com/3myDYHg/pringles.jpg",
    "price": "350",
    "quantity": 50
  },
  {
    "name": "Apples 1 KG",
    "imageUrl": "https://i.ibb.co.com/G5q1yYt/apples.jpg",
    "price": "300",
    "quantity": 20
  },
  {
    "name": "Oranges 1 KG",
    "imageUrl": "https://i.ibb.co.com/VHnTQxb/oranges.jpg",
    "price": "400",
    "quantity": 20
  },
  {
    "name": "Cadbury Dairy Milk",
    "imageUrl": "https://i.ibb.co.com/7pkbzhX/cadbury.webp",
    "price": "180",
    "quantity": 100
  },
  {
    "name": "Eggs 1 Dozen",
    "imageUrl": "https://i.ibb.co.com/bJzPw7G/eggs.jpg",
    "price": "150",
    "quantity": 30
  },
  {
    "name": "KitKat",
    "imageUrl": "https://i.ibb.co.com/Qfssq7S/kitkat.webp",
    "price": "50",
    "quantity": 60
  },
  {
    "name": "Pran Milk 1000 ML",
    "imageUrl": "https://i.ibb.co.com/y5R8Vr6/milk.jpg",
    "price": "120",
    "quantity": 10
  },
  {
    "name": "Mr Noodles Korean Spicy 8 Family Pack",
    "imageUrl": "https://i.ibb.co.com/FWCxVyr/mrnoodles.jpg",
    "price": "200",
    "quantity": 30
  },
  {
    "name": "Snickers",
    "imageUrl": "https://i.ibb.co.com/9t7fr5N/snickers.jpg",
    "price": "80",
    "quantity": 100
  },
  {
    "name": "Teer Oil 5 ltr",
    "imageUrl": "https://i.ibb.co.com/wpKPD5k/teer.jpg",
    "price": "890",
    "quantity": 40
  }
]);
```
