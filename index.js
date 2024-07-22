import express from "express";
import bodyParser from "body-parser";


const port =3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs", { postData: postData });
});

app.get("/create", (req,res) => {
    res.render("create.ejs");
});

app.post("/submit-form", (req, res) => {
    const { title, content, image } = req.body;
    postData.push({
        imagePath: image,
        postTitle: title,
        postContent: content
    });
    res.render("index.ejs", {postData: postData});
});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});





let postData = [
     {
    imagePath: "imge1.jpg",
    postTitle: "Test spieniaczy do mleka - jaki wybrać?",
    postContent: "Ręczny czy elektryczny? I jak ich używać? Tutaj zawiera się kolejna część tekstu tego posta. Tekst ten ma na celu wypełnienie strony tak by można było zobacyzć większy kafel. Tekstu było za mało, więc autor postanowił dopisać coniecco poniżej, i to jest ta cześć która właśnie została dopisana. Szybko dopisana..."
},
{
    imagePath: "imge2.jpg",
    postTitle: "Kolejny post związany z tematyką bloga",
    postContent: "Ręczny czy elektryczny? I jak ich używać? Tutaj zawiera się kolejna część tekstu tego posta. Tekst ten ma na celu wypełnienie strony tak by można było zobacyzć większy kafel. Tekstu było za mało, więc autor postanowił dopisać coniecco poniżej, i to jest ta cześć która właśnie została dopisana. Szybko dopisana..."
},
{
    imagePath: "imge3.jpg",
    postTitle: "To jak na razie ostatni blog związany z tematyką bloga",
    postContent: "Ręczny czy elektryczny? I jak ich używać? Tutaj zawiera się kolejna część tekstu tego posta. Tekst ten ma na celu wypełnienie strony tak by można było zobacyzć większy kafel. Tekstu było za mało, więc autor postanowił dopisać coniecco poniżej, i to jest ta cześć która właśnie została dopisana. Szybko dopisana..."
}];