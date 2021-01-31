
const {readCSVFile} = require('../core/helper/helper');
const { contactSchema } = require('../models/files-schema/contact')
const { listingSchema } = require('../models/files-schema/listing')
const fs = require('fs');

exports.ValidateListingFilesSchema = async (req, res, next) => {

    if (req.files.length !== 2)
        return res.status(400).send('Please Upload Two Files!');

    const listingFile = req.files.find(file => file.originalname.search("contacts"));
    const contactFile = req.files.find(file => file.originalname.search("listings"));

    if (!listingFile || !contactFile)
        return res.status(400).send('Invalid Listing or Contact File');

    let validListing = await ValidateFileSchema(listingFile.path, listingSchema);
    let validcontact = await ValidateFileSchema(contactFile.path, contactSchema);

    if (validListing && validcontact) {
        next();
    }
    else {
        res.status(400).send('Invalid Listing or Contact File Format');
    }


}

async function ValidateFileSchema(filePath, fileSchema) {
    try {
        let { errors, rows } = await readCSVFile(filePath, true)
        if (!errors && rows ) {
            let valid = await validateRowsAndSchema(rows[0], fileSchema);
            return valid
        } else {
            fs.unlink(filePath, (err) => {
                if (err) console.log('error delete file', err);
            });
            return false;
        }

    } catch (error) {
        fs.unlink(filePath, (err) => {
            if (err) console.log('error delete file', err);
        });
        return false;
    }
}
async function validateRowsAndSchema(rows, schema) {
    for (let i = 0; i < schema.length; i++)
        if (schema[i].required && rows.findIndex(element => element == schema[i].prop) == -1)
            return false
    return true
}