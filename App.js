import './style.css';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import api from './services/api';


function App () {
const [input, setInput] = useState(''); // quando chamar o Input quero saber o valor desse estado, quando chamar setinput quero passar um valor para esse estado //
const [cep, setCep] = useState({});

async function handleSearch () {      // async, transformei em uma função assicrona devido requisição da API demorar //

  if(input === ''){
    alert("Preencha algum CEP")
    return; // parar execução do meu código //
  }

  try { // quero fazer e pode dar errado por ter que carregar uma API //
    const resultado = await api.get(`${input}/json`); // await para esperar essa requisição para passar para linha de baixo,  get para trazer informacoes, /json porque é o formato que retorna da API em questão //
    setCep(resultado.data) // esta no data do response //
    setInput("");

  }catch{  // se dar errado cai aqui //
    alert("Ops erro ao buscar");
    setInput("");
  }
}
  return (
    <div className="container">
    <h1 className="title">Buscador de CEP</h1>
    <div className="containerInput">
      <input type="text" value={input} onChange={(evento) => setInput(evento.target.value)}placeholder="Digite o seu CEP.." />
      <button className="buttonSearch" onClick={handleSearch}> <FiSearch size={25} color="#fff"/>
      </button>
</div>

{Object.keys(cep).length > 0 && ( //encapsulei o main para so aparecer se o valor de cep for preenchido //
      <main className="main">
      <h2>CEP: {cep.cep}</h2>
      <span>{cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>{cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
      </main>
)}
</div>
);}

export default App;  // para conseguir importar no index.js //


