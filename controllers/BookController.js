const Book = require("../models/Book");
const User = require("../models/User");

module.exports = class BookController {
    static index(req, res) {
        res.render("books/index");
    }

    static create(req, res) {
        res.render("books/create");
    }

    static async createPost(req, res) {
        const name = req.body.name;
        const dateRead = req.body.dateRead;
        const description = req.body.description;
        const UserId = req.session.userid;

        console.log(UserId);

        if (!name) {
            req.flash("message", "Por favor entre com todos os dados preenchidos");
            res.render("books/create");
            return;
        }

        if (!dateRead) {
            req.flash("message", "Data de leitura");
            res.render("books/create");
        }

        const book = new Book(name, dateRead, description, UserId.id);

        try {
            book.save();
            req.flash("message", "Livro cadastrado com sucesso");
            res.redirect("/books");
        } catch (err) {
            console.log(err);
        }
    }

    static async showAll(req, res) {
        const UserId = req.session.userid;

        const data = new Book("", "", "", UserId.id);

        const books = await data.getAllBooks();

        res.render("books/index", { books });
    }

    static async deleteBook(req, res) {
        const idbook = req.body.id;
        const book = new Book();

        await book.deleteBookById(idbook);

        res.render("books/index");
    }

    static async editBookById(req, res) {
        const id = req.params.id;
        const data = new Book();

        const book = await data.getBookById(id);

        console.log(book);
        res.render("books/edit", { book });
    }

    static async editBookByIdPost(req, res) {
        const name = req.body.name;
        const dateRead = req.body.dateRead;
        const description = req.body.description;
        const UserId = req.session.userid;
        const id = req.body.id;

        const book = new Book(name, dateRead, description, UserId.id)

        try {
            await book.updateBookById(id);
            req.flash("message", "Livro editado com sucesso");
            res.redirect("/books");
        } catch (err) {
            console.log(err);
        }
    }
};
