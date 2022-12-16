import fetch from "node-fetch";
import fs from "fs";
const bashURL = "https://api.themoviedb.org/3/movie";
const dataFetch = [
  {
    url:
      bashURL +
      "/now_playing?api_key=62c56b5d87972aeae63a6e1bfdfd3972&language=en-US&page=1",
    nameJSONFile: "playNowJSON",
  },
  {
    url:
      bashURL +
      "/361743?api_key=62c56b5d87972aeae63a6e1bfdfd3972&language=en-US",
    nameJSONFile: "movieDetailJSON",
  },
  {
    url:
      bashURL +
      "/top_rated?api_key=62c56b5d87972aeae63a6e1bfdfd3972&language=en-US&page=1",
    nameJSONFile: "topRatedMovieJSON",
  },
];
async function fetchData() {
  for (const f of dataFetch) {
    const resp = await fetch(f.url);
    const data = await resp.json();

    fs.writeFile(
      `src/services/jsons/${f.nameJSONFile}.json`,
      JSON.stringify(data),
      "utf8",
      () => {
        console.log("successful");
      }
    );
  }
}

fetchData();
