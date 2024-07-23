import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { format } from 'date-fns';


const port =3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs", { postData: postData });
});

app.get("/create", (req,res) => {
    res.render("create.ejs", {postData: postData, post: undefined});
});

app.post("/submit-form", (req, res) => {
    const { id, title, content, image } = req.body;

    if (id) {
        // Aktualizacja istniejącego postu
        const post = postData.find(p => p.id === id);
        if (post) {
            post.postTitle = title;
            post.postContent = content;
            post.imagePath = image;
        }
    } else {
        // Dodawanie nowego postu
        const newPost = {
            id: Date.now().toString(),
            postTitle: title,
            postContent: content,
            imagePath: image,
            date: format(new Date(), 'dd-MM-yyyy HH:mm')
        };
        postData.push(newPost);
    }

    res.redirect('/create'); // Przekierowanie na stronę główną lub inną stronę po zapisaniu
});

app.get('/edit-post/:id', (req, res) => {
    const postId = req.params.id;
    const post = postData.find(p => p.id === postId);

    if (post) {
        res.render('create.ejs', { post: post, postData: postData });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post("/submit-comment", (req, res) => {
    const {name, email, comment, postId} = req.body;
    commentData.push ({
        postId: postId,
        commentDate: format(new Date(), 'dd-MM-yyyy HH:mm'),
        commentContent: comment,
        commentName: name,
        commentEmail: email
    });
    res.redirect(`/read-post/${postId}`);
});

app.get('/read-post/:id', (req, res) => {
    const postId = req.params.id;
    const post = postData.find(p => p.id === postId);

    if (post) {
        res.render('view.ejs', { post: post, postData: postData , commentData: commentData});
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/delete-post/:id', (req, res) => {
    const postId = req.params.id;
    let index = postData.findIndex(item => item.id === postId);
    if (index > -1) {
        postData.splice(index, 1);
    }
    res.redirect("/create");
});


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});





let postData = [
     {
    id: "c8adb598-6492-4cdf-baae-5a8096504086",
    imagePath: "imge1.jpg",
    postTitle: "Test spieniaczy do mleka - jaki wybrać?",
    postContent: "Ręczny czy elektryczny? I jak ich używać? Tutaj zawiera się kolejna część tekstu tego posta. Tekst ten ma na celu wypełnienie strony tak by można było zobacyzć większy kafel. Tekstu było za mało, więc autor postanowił dopisać coniecco poniżej, i to jest ta cześć która właśnie została dopisana. Szybko dopisana"
},
{
    id: "c8adb532-6492-4cdf-baae-5a8096504086",
    imagePath: "imge2.jpg",
    postTitle: "Kolejny post związany z tematyką bloga",
    postContent: "Ręczny czy elektryczny? I jak ich używać? Tutaj zawiera się kolejna część tekstu tego posta. Tekst ten ma na celu wypełnienie strony tak by można było zobacyzć większy kafel. Tekstu było za mało, więc autor postanowił dopisać coniecco poniżej, i to jest ta cześć która właśnie została dopisana. Szybko dopisana"
},
{
    id: "c8adb598-6492-4cdf-baae-5a8096512856",
    imagePath: "imge3.jpg",
    postTitle: "To jak na razie ostatni blog związany z tematyką bloga",
    postContent: "Ręczny czy elektryczny? I jak ich używać? Tutaj zawiera się kolejna część tekstu tego posta. Tekst ten ma na celu wypełnienie strony tak by można było zobacyzć większy kafel. Tekstu było za mało, więc autor postanowił dopisać coniecco poniżej, i to jest ta cześć która właśnie została dopisana. Szybko dopisana"
}];

let commentData = [{
    postId: "c8adb598-6492-4cdf-baae-5a8096512856",
    commentDate: "23-07-2024 12:35",
    commentContent: "Bardzo przydatny artykuł! Zastanawiałam się nad zakupem spieniacza i teraz wiem, który wybrać. Dzięki!",
    commentName: "Anna",
    commentEmail: "mail@mail.com"
    
}];