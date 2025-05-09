import React from "react";
import './BookList.css'

const BookList = ({books}) => {
    return (
        <div className="grid">
            <p>Liste de livres</p>
            <table>
                <thead>
                    <tr>
                        <th>Id</th><th>Titre</th><th>Auteur</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map( book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default BookList;