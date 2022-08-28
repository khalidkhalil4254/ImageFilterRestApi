import fs from "fs";
import Jimp = require("jimp");
import axios from 'axios';
import { resolve } from "path";
import { TIMEOUT } from "dns";
export let files:string[]=[];





// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
//using axios to handle getting image request instead of Jimp handling due to error
//it requests the image as a client as i understood <===
//occured when reading it ==> Error: MIME not found for buffer
//returns the buffer promise of specified image======================================
export async function filterImageFromURL(imgUrl:string){
  const outpath: string = `/tmp/filtered_${Math.floor(Math.random()*2000)}.jpg`; //setting a new name for the image inside the directory to store it in
  files.push(`${__dirname}${outpath}`);
  await axios({
    method: 'get',
    url: imgUrl,
    responseType: 'arraybuffer'
  })
  .then( ({data: imageBuffer})=> {
     Jimp.read(imageBuffer).then((img)=>{
      img
      .resize(256, 256) //1- resize
        .quality(60) //2- set JPEG quality
        .greyscale() //3- set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath); // 4- write the filtered image into a directory
        });
    })   
  }).catch((err)=>{
    console.log("Error:"+err);
  })

}


//deleting the files in the filtered images directory
export function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
    files.shift();
  }
}
