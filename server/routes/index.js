var express = require('express');
var router = express.Router();


const { upload } = require('../middleware/multer');
const filesController = require('../core/business/files-controller');
const { ValidateListingFilesSchema } = require('../middleware/file-schema-validation');


/* GET home page. */
router.post('/upload', upload.any(), ValidateListingFilesSchema, async (req, res) => {
  let { error, data } = await filesController.manageFiles(req.files)

  res.send({ error: error, data })

});

module.exports = router;
