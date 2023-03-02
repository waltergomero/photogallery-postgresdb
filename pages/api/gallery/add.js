import { IncomingForm } from "formidable";
import path from "path";
import { conn } from "@/utils/dbconnection";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const asynParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    console.log("form: ", form);
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("req: ", req);
    const result = await asynParse(req);
    console.log("images", result);
    var _path = create_folder(result.fields.user_id);

    const user_id = result.fields.user_id;
    const category_id = result.fields.category_id;
    const title = result.fields.title;
    const description = result.fields.description;
    const preImageName = result.files.image.originalFilename;
    const ext = "." + result.fields.extension;

    var date = new Date();
    const unixTimestamp = Math.floor(date.getTime());

    const imageName = unixTimestamp + ext;

    const oldPath = result.files.image.filepath;
    const newPath = _path + "/" + imageName;

    mv(oldPath, newPath, function (err) {});

    const updatedPath = removeFirstWord(newPath);

    var sizeOf = require("image-size");
    var dimensions = sizeOf(oldPath);
    var width = dimensions.width;
    var height = dimensions.height;
    var islandscape = true;
    if (dimensions.height > dimensions.width) islandscape = false;

    const query2 =
      "INSERT INTO southwind.gallery(image_name, category_id, user_id, path_original, path_reduced, description, islandscape, title, width, height) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const values2 = [
      imageName,
      category_id,
      user_id,
      updatedPath,
      updatedPath,
      description,
      islandscape,
      title,
      width,
      height,
    ];
    const result2 = await conn.query(query2, values2);

    return res.status(200).json(result2);
  }
}

function create_folder(userid) {
  const fs = require("fs");
  const dir = "public/gallery/" + userid;
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf("/");

  if (indexOfSpace === -1) {
    return "";
  }

  return str.substring(indexOfSpace + 1);
}
