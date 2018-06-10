'user strict';
exports.DATABASE_URL =
    process.env.DATABSE_URL ||
    global.DATABASE_URL ||
    'mongodb://Tlonist:Chewbacca1@ds231205.mlab.com:31205/shopping-list-db';
exports.PORT = process.env.PORT || 8080;
