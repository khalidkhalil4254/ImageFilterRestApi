import express from 'express';
import bodyParser from 'body-parser';
import { deleteLocalFiles, files ,refactoredMethod} from './util/util';


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
  
     //    1. validate the image_url query
    if(!image_url){
      res.status(403).send("Imge URL is Required!!!");
    }
     //    2. call filterImageFromURL(image_url) to filter the image
    await refactoredMethod(image_url as unknown as string);
    console.log("saved files locally!");
     //    3. send the resulting file in the response
     console.log(files[files.length-1]);
   setTimeout(()=>{res.status(200).sendFile(files[files.length-1]);},1000);
   console.log("sent files as response!");
    
    next();
  } ,(req,res,next)=>{
     //    4. deletes any files on the server on finish of the response
     setTimeout(()=>{  deleteLocalFiles(files);},12000);
     console.log("deleted files!");
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

