import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";
import http from "../../../Http";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/").then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`pratos/${pratoASerExcluido.id}/`).then(() => {
      const listaPrato = pratos.filter(
        (prato) => prato.id !== pratoASerExcluido.id
      );
      setPratos([...listaPrato]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  Ver imagem
                </a>
              </TableCell>
              <TableCell sx={{ display: "flex", gap: 2 }}>
                <Link to={`/admin/pratos/${prato.id}`}>
                  <Button variant="outlined">Editar</Button>
                </Link>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
