const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const { addMovie, addMany, find, update } = require("./utils/index");

const app = async (yargsObj) => {
  try {
    const collection = await connection();
    if (yargsObj.add) {
      await addMovie(collection, yargsObj);
    } else if (yargsObj.addMany) {
      await addMany(collection, yargsObj);
    } else if (yargsObj.find) {
      await find(collection, yargsObj);
    } else if (yargsObj.update) {
      await update(collection, yargsObj);
    } else {
      console.log("incorrect command");
    }
  } catch (error) {
    console.log(error);
  }
  client.close();
};

app(yargs.argv);
