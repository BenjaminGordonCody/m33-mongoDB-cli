const movieObjFromYargs = (yargs) => {
  const possAttributes = ["title", "actor", "date", "genre", "director"];
  const movieObj = {};
  possAttributes.forEach((element) => {
    movieObj[element] = yargs[element] ? yargs[element] : "unspecified";
  });
  return movieObj;
};

const subsetOfIndividualMovieYargs = (yargsObj, index) => {
  try {
    const yargObjKeys = Object.keys(yargsObj);
    const newYargsObj = {};
    yargObjKeys.forEach((element) => {
      if (element.includes(index)) {
        const newKey = element.slice(0, -1); //strip identifying digit
        newYargsObj[newKey] = yargsObj[element];
      }
    });
    return newYargsObj;
  } catch (error) {
    console.log(error);
  }
};

exports.addMovie = async (collection, yargsObj) => {
  const movieObj = movieObjFromYargs(yargsObj);
  await collection.insertOne(movieObj);
};

exports.addMany = async (collection, yargsObj) => {
  try {
    if (yargsObj.entries < 9) {
      console.log("Max 9 entries");
    }
    const moviesArr = [];
    console.log(yargsObj.entries);
    for (let i = 1; i < yargsObj.entries + 1; i++) {
      let movieObj = subsetOfIndividualMovieYargs(yargsObj, i);
      movieObj = movieObjFromYargs(movieObj); //removes unrecognised yargs
      moviesArr.push(movieObj);
    }
    await collection.insertMany(moviesArr);
  } catch (error) {
    console.log(error);
  }
};
