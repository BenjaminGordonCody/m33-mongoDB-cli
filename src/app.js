const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const { addMovie, addMany } = require("./utils/index");

const app = async (yargsObj) => {
  try {
    const collection = await connection();
    if (yargsObj.add) {
      await addMovie(collection, yargsObj);
    } else if (yargsObj.addMany) {
      await addMany(collection, yargsObj);
    } else {
      console.log("incorrect command");
    }
  } catch (error) {
    console.log(error);
  }
  client.close();
};

app(yargs.argv);
