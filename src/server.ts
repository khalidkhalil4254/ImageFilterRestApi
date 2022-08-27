import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, files} from './util/util';
import { send } from 'process';
import { append } from 'cheerio/lib/api/manipulation';
import { next } from 'cheerio/lib/api/traversing';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}} <== ( as query).
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */


  app.get( "/filteredimage", async ( req, res ,next) => {
    let {image_url}= req.query;
    res.contentType("image/png");
     //    1. validate the image_url query
    if(!image_url){
      res.status(403).send("Imge URL is Required!!!");
    }
     //    2. call filterImageFromURL(image_url) to filter the image
     //    3. send the resulting file in the response
    filterImageFromURL(image_url as unknown as string).then((data)=>{
      res.status(200).sendFile(data);
    }).catch((err)=>{
      res.status(403).send("Error : "+err);
    }) 
    next();
  } ,(req,res,next)=>{
     //    4. deletes any files on the server on finish of the response
     console.log(files);
      deleteLocalFiles(files);
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );


})();

