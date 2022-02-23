`db` - show builtin test db
`dbs` - show all local dbs

`use swazi-tunes` - creates a new db named swazitunes or switches to it if it exists

`ctrl + c` - to exit the repl

## BSON - Binary JSON

- smaller version of JSON used to store data in Mongo
- space efficient, easier to comress and smaller
- supports more data types eg date types as json does not save date types

## Collections

Where we store our data

### Insert

`db.collection.insert()` - `db.dog.insertOne({name: "Reggie", age: 2, breed: "bulldog", catFriendly: true}` - `db.cats.insert([{name: "Nuksy", breed: "Ginger", dogFriendly: false}, {name: "Jake", nickname: "Kitty"}])`  
`db.collection.insertOne()`
`db.collection.insertMany()`

### Collections

`show collections` - `db.dog.find()`

## find

`db.collection.find()` - `db.dogs.find()` - `db.cats.find({name: {"Nuksy"}})`

# findOne

`db.collection.findOne({key: "Value"})`

- `db.dogs.findOne({catFriendly: true})`
- `db.cats.findOne({dogFriendly: false})`

## UpdateOne

`db.collection.updateOne({selector}, {$set: {}})`

- `db.dogs.updateOne({name: "Makoti"}, {$set: {catFriendly: false}})`

`db.collection.updateMany({dogFriendly: true}, {$set: {isAvailable: false}, $currentDate: {lastModified: true}})`

## DELETE

`db.collection.deleteOne()`

- `db.cats.delete({name: "Garfield"})`
- `db.dogs.deleteMany({isAvailable: false})`
- `db.dogs.deleteMany({})` deletes all

# OPERATORS

`db.cats.find({'personality.childFriendly': true, age: 12})`
`db.cats.find({ age: {$lte: 5}})`
`db.cats.find({ age: {$gte: 6}})`
`db.cats.find({ age: {$gt: 10}})`
`db.cats.find({ age: {$lt: 3}})`

`db.cats.find({ breed: {$in: ['Ginger']}})`
`db.cats.find({ age: {$lt: 3}})`
