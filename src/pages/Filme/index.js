import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from '../../services/api';
import './index.css'


function Filme(){

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        async function loadFilm(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '90c6ebf67bcab547668357ca7c7a40ae',
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoad(false);
            })
            .catch(()=>{
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilm();

        return () => {
            console.log("Componente desmontado")
        }


    }, [navigate, id])

    function salvarFilme() {
        const MinhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(MinhaLista) || [];

        const hasFilme = filmesSalvos.some((FilmeSalvo) =>  FilmeSalvo.id === filme.id)

        if (hasFilme){
            toast.warn("Esse filme já está na sua lista")
            return;
        }

        filmesSalvos.push(filme);

        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if (load){
        return(
            <div className="filme-info">
                <h1>Carregando filme...</h1>
            </div>
        );
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>

            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>

            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className="area_buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>

            </div>

        </div>
    );
}

export default Filme;