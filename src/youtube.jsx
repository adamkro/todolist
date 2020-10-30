import axios from "axios";

const getYTid = (url) => {
  return url.slice(32, 44);
};

export async function getYouTubeTitle(url) {
  const key = await axios.get("http://localhost:5000/gapi_key");
  const id = getYTid(url);
  const api = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key.data}%20&part=snippet`;
  try {
    let res = await axios.get(api);
    return res.data.items[0].snippet.title;
  } catch (err) {
    console.log(err);
    return "Go";
  }
}
