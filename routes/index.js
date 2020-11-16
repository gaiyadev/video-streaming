var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/upload', (req, res, next) => {
    // setting  a range given for the video
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    // The fs.statSync() method is used to asynchronously return information about the given file path.
    //The fs.Stat object returned has several fields and methods to get more details about the file.
    const videoPath = "vid.mp4";
    const videoSize = fs.statSync("vid.mp4").size;
    //console.log(videoPath);
    //console.log(videoSize);

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    console.log(start);
    console.log(end);
    console.log(CHUNK_SIZE);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content successs
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
});



module.exports = router;
