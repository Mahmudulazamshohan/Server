const  mongoose =  require('mongoose');
mongoose.Promise = global.Promise;
//Connect with data url
mongoose.connect('mongodb://localhost:27017/vueapps',{useNewUrlParser: true});
module.exports = {mongoose};