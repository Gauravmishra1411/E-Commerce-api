// Install: npm install @imagekit/nodejs
// Install: npm install @imagekit/nodejs

const { upload } = require("@imagekit/javascript");
const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: "private_Fm3tPeRqPPoFcaWzxtWI2NhljUE=",
  Publickey: "public_YsuP4tdbEV+Uj1mZn8urc4TBc60=",
});
const File_upload=async(file)=>{
  const response=await client.upload({
    file:file,
    folder:"mechin-coding",
    file:req.file.originalname
  })
  return response
}
module.exports = File_upload;
