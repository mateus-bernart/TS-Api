import React, { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios, { AxiosRequestConfig } from "axios";
import IPaginacao from "../../interfaces/IPaginacao";
import {
  Box,
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");

  const [busca, setBusca] = useState("");

  const [ordenacao, setOrdenacao] = useState("");

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao;
    }
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  }, [ordenacao, busca]);

  useEffect(() => {
    //obter restaurantes
    carregarDados("http://0.0.0.0:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={(evento) => evento.preventDefault()}>
        <Box>
          <InputLabel>Ordenação</InputLabel>
          <Select
            labelId="select-ordenacao-label"
            id="select-ordenacao"
            value={ordenacao}
            onChange={(evento) => setOrdenacao(evento.target.value)}
          >
            <MenuItem value="">Selecione um campo</MenuItem>
            <MenuItem value={"id"}>Id</MenuItem>
            <MenuItem value={"nome"}>Nome</MenuItem>
          </Select>
          <Input
            sx={{ marginLeft: 2 }}
            type="text"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          ></Input>
          <Button type="submit">BUSCAR</Button>
        </Box>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}

      <Button
        onClick={() => carregarDados(paginaAnterior)}
        disabled={!paginaAnterior}
      >
        Página anterior
      </Button>

      <Button
        onClick={() => carregarDados(proximaPagina)}
        disabled={!proximaPagina}
      >
        Próxima página
      </Button>
    </section>
  );
};
export default ListaRestaurantes;
