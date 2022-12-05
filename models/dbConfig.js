const mongoose = require("mongoose");

mongoose.connect(
  'mongodb+srv://doadmin:3Sp9MnC615H8I4f2@db-mongodb-lon1-68624-22ee3051.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-lon1-68624',
  { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Mongodb connected');
  })
  .catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('MongoDatabse E-Commerce');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected...');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose connection is disconnected due to app termination...'
    );
    process.exit(0);
  });
});
