import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    callback(null, './public/videos')
  },
  filename: function (_request, file, callback) {
    callback(null, "VIDEO_" + Date.now() + path.extname(file.originalname))
  }
})

export default multer({storage});