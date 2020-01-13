// @flow
const crypto = require('crypto');
const fs = require("fs");

let uploadFunctions = {
    handleFile: function(f: string, callback) : string {
        // First check if file exists already or it is empty. If it does, do not try to save it to server
        let p = __dirname + '/../files/';
        let check_path =  p + f;
        if(fs.existsSync(check_path) || f === null) {
            console.log("File already exists.");
            callback(f);
            return;
        }
        let file = uploadFunctions.base64Decoder(f);
        let name = uploadFunctions.createFilePath(file.type);
        fs.writeFile(p + name, file.data, function(err) { if(err) {
            // TODO correct response code?
            throw err;
        }
            console.log("File moved.");
            callback(name);
        });
    },
    base64Decoder: function(file: string) : string {
        let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    },
    createFilePath: function(extension: string) : string {
        extension = extension.substring(extension.indexOf('/') + 1, extension.length);
        extension = "." + extension;
        const len = 16;
        let p = __dirname + '/../files/';
        //Create a random number for the file
        let str = crypto.randomBytes(Math.ceil(len/2))
            .toString('hex') // convert to hexadecimal format
            .slice(0,len);
        // Check if image exists, if it does: generate a new number.
        while (fs.existsSync(p + str + extension)) {
            str = crypto.randomBytes(Math.ceil(len/2))
                .toString('hex') // convert to hexadecimal format
                .slice(0,len);
        }
        return str + extension;
    }
};

module.exports = uploadFunctions;