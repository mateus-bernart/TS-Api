import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../Http";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert(`restaurante ${nomeRestaurante} atualizado com sucesso!`);
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert(`restaurante ${nomeRestaurante} cadastrado com sucesso!`);
        });
    }
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          id="standard-basic"
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          SALVAR
        </Button>
      </Box>
    </Box>
  );
};
export default FormularioRestaurante;