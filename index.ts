import "./style.css";
import "./App";

const bgImages = [
  "https://images.unsplash.com/photo-1679834841135-b73991e3941d?auto=format&fit=crop&w=1287&q=80",
  "https://images.unsplash.com/photo-1679847727418-33ef58d86ebe?auto=format&fit=crop&w=1287&q=80",
  "https://images.unsplash.com/photo-1679882069275-1c43fefbe81a?auto=format&fit=crop&w=1336&q=80",
  "https://images.unsplash.com/photo-1679859229899-b89913461269?auto=format&fit=crop&w=1287&q=80",
  "https://images.unsplash.com/photo-1679850281616-74e0a264971f?auto=format&fit=crop&w=1287&q=80",
];

let bgIndex = 0;
setInterval(() => {
  document.getElementsByTagName("main-app")[0].props.bgimage =
    bgImages[bgIndex];
  bgIndex = bgIndex === bgImages.length - 1 ? 0 : bgIndex + 1;
}, 10000);
