const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const urls = [
"https://chipsetgo.dyndns.org:450/scprojects/configuracion/RutaImagenLogoWhite/50c7a5b069e64b2399afd55ac896bf20.png",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/e084c631-b288-4b4d-b904-51f18ead9bd0.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/35e1933d-e9d1-4f3d-9aaa-05949598f44c.jpeg",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/67636aab-3ea9-46b2-9911-b6d262397823.jpeg",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/e6dd23c6-e6fb-4aec-9226-b809cf252eac.jpg",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/3b1b4e42-87d0-4815-80fb-ed96b16ec63c.jpg",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/6ccdc0d8-d190-40d0-9171-5bea0ff8e67f.jpg",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/59558a69-fd54-4617-adb8-6b0ca0aaa661.jpg",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/91f05fc8-f9c9-4dcc-ab72-97ad0d601d09.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/b5f19277-fcb6-4826-901c-575c286b9a94.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/05e65494-6823-41fc-a9dd-26e95129a989.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/4ad82f7b-f782-49d6-a6aa-0c251ec625b5.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/8cdceb68-10ff-4931-8e9e-6b9fc54e84df.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/73d7819d-0fce-4d02-8add-e97ddf066053.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/7c9b63ad-331e-4b56-898b-c2d8e4e201a2.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/e77340fc-5823-4e5f-9ef0-8293cce493a8.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/6163df97-5f69-4749-bd94-4ec2addc6d38.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/e1ae025e-e964-4cbd-87c6-28995e514502.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/b827bacf-27f7-4e86-99e5-b8d04ded39e7.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/e0f09821-ce6f-44aa-8368-0c5e1b1f0e9a.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/b21f95c5-96c5-42eb-bcf9-ac40c66e227d.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/9f5e2489-f359-4569-b740-bd1e6bd90c9c.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/1990e055-d09c-40a5-b8e0-e151b3f14c5b.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/d7e8b89f-3fa7-4a64-8e5c-147d57bfea56.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/8395486d-73c1-4392-8b75-16d33584a379.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/c736f71b-9879-473f-8eaf-82a7f77b871c.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/7a971cb1-b9d2-44b1-812e-c3f406716670.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/77452566-f8b8-4098-aec3-21671bf979e7.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/be80d7f6-2be7-4192-b9a1-ef3f2e02583b.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/316f49ed-3509-4eb9-88f0-547eb951d769.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/b6126072-bb41-41b7-9eba-40b7a719af49.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/6b61b860-5159-4e41-b723-87882a6fa3cb.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/72f63b53-6b62-4254-a7de-8cc520d31efa.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/777dc813-c68f-4ca6-8329-ed777daf5b4d.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/a6e2456d-5b2f-4570-b315-b2af8a7624c7.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/2e76c85e-5a80-43ba-a5d7-62677a564871.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/94edf7f6-6970-437c-b130-b5bb3bc79504.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/0f90a5ed-fe6c-485a-b639-9b9bf817c060.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/16f27746-fdc1-4e0e-91be-15458302e147.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/8b29054f-2959-4e07-8c2e-36a678fe3d0e.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/bccb4624-091d-44cb-89f8-1895ed55b099.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/e508f263-4d3e-4a36-83bc-9513d0420a82.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/32d5a23f-0950-4391-8032-85dc61ef41d1.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/e2f66d1b-3dda-4959-8d8f-8021f38ff588.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/b3956c1b-3cb4-4823-b471-2d97beb7f2fd.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/7b880902-3518-40ca-af85-b48e6e5258c2.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/ecd549b0-3e48-4432-9880-1f20f6c6932c.JPG",
"https://chipsetgo.dyndns.org:450/scprojects/proyectos/ebdb8378-bf94-42f4-bd8d-34d810c4c64c/9fc0b33c-820b-4af3-9cea-fd8d25997ced.JPG"
]

const carpeta = "./imagenes";

if (!fs.existsSync(carpeta)) {
  fs.mkdirSync(carpeta);
}

// función para agregar ceros a la izquierda
function pad(num, size) {
  return String(num).padStart(size, "0");
}

function descargar(url, nombre) {
  const protocolo = url.startsWith("https") ? https : http;
  const ruta = path.join(carpeta, nombre);

  protocolo.get(url, (res) => {
    const file = fs.createWriteStream(ruta);
    res.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("✔", nombre);
    });
  }).on("error", () => {
    console.log("❌ Error:", url);
  });
}

// número de dígitos dinámico (ej: 001 o 0001)
const total = urls.length;
const digits = String(total).length;

urls.forEach((url, i) => {
  const ext = path.extname(url).split("?")[0] || ".jpg";
  const nombre = `${pad(i + 1, digits)}${ext}`;
  descargar(url, nombre);
});