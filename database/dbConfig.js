const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  'mongodb+srv://Neal20:U8g6TLXBQlflbEM6@cluster0.fybmcr3.mongodb.net/E-Commerce?retryWrites=true&w=majority',
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

