import fs from "fs";
import Jimp = require("jimp");
import axios from 'axios';
import { resolve } from "path";
export let files:string[]=[];
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file

//a method to filter a given image by url and returns a promise 


export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {

      const photo = await Jimp.read(inputURL);

      console.log(inputURL);

      const outpath: string = `/tmp/filtered_${Math.floor(Math.random()*2000)}.jpg`; //setting a new name for the image inside the directory to store it in
      files.push(`${__dirname}${outpath}`);

        console.log("MIME:"+photo.getMIME());
        photo
        .resize(256, 256) //1- resize
        .quality(60) //2- set JPEG quality
        .greyscale() //3- set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath); // 4- write the filtered image into a directory
        });
     
      
    } catch (error) {
      reject(error);
    }
  });
}





// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files

//deleting the files in the filtered images directory
export function deleteLocalFiles(files: Array<string>) {
  console.log("root dir:"+__dirname);
  for (let file of files) {
    fs.unlinkSync(file);
    files.shift();
  }
}
