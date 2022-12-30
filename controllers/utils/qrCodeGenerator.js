import qr from "qrcode";

export function qrCodeGen (certif) {
   let url = "http://192.168.1.15:9090/file/" + certif;
   var filename = "./public/images/"+"QRCODE_CERTIF_" + Date.now()+".png"
    let stjson = JSON.stringify(url)

    qr.toFile(filename, stjson,(err,code) => {
        if(err) return console.log("error")
        console.log(code);
    })
}