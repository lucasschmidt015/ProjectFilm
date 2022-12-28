import React from "react";
import { Link } from "react-router-dom";
import './index.css'

function Error(){
    return(
        <div className="NotFound">
            <h1>404</h1>      
            <h2>Pagina não encontrada!</h2>
            <Link to="/">Veja todos filmes!</Link>
        </div>
    );
}

export default Error;