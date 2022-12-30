import qr from "qrcode";

export function qrCodeGen (req,certif) {
   let url = "http://" + req.get('host') + "/file/" + certif;
   console.log(req.get('host'));
   var filename = "./public/images/"+"QRCODE_CERTIF_" + Date.now()+".png"
    let stjson = JSON.stringify(url)

    qr.toFile(filename, stjson,(err,code) => {
        if(err) return console.log("error")
        console.log(code);
    })
}