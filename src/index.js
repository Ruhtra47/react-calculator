import React, {useState} from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #444;
    width: 260px;
`

const StyledVal = styled.span`
    font-size: 25;
    color: #fff;
    height: 20px;
`

const StyledRes = styled.span`
    font-size: 50;
    color: #fff;
`

const StyledButton = styled.button`
    font-size: 30;
    height: 75px;
    width: 75px;
    padding: 20px;
    background-color: #000;
    color: #fff;
    border-color: #000;
    text-align: center;
    outline: none;
    font-family: 'Fira Code', sans-serif;
`

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 300px;
    border: 1px solid #000;
`

const ButtonsContainer = styled.div`
    flex-direction: row;
    flex-wrap: wrap;
`

const App = () => {
    
    const [valorTela, setValorTela] = useState('');
    const [resultado, setResultado] = useState(0);
    const [acumulador, setAcumulador] = useState(0);
    const [operado, setOperado] = useState(false);
    
    const Tela = (val, res) => {
        return (
            <StyledDiv>
                <StyledVal>{val}</StyledVal>
                <StyledRes>{res}</StyledRes>
            </StyledDiv>
        )
    }

    const Btn = (label, onClick) => {
        return <StyledButton onClick={onClick}>{label}</StyledButton>
    }

    const AddDigit = (d) => {
        if ((d === "+" || d === '-' || d === "*" || d === '/') && operado) {
            console.log("+-*/");
            setOperado(false);
            setValorTela(resultado+d)
            return
        }

        if (operado) {
            setValorTela(d);
            setOperado(false);
            return
        }

        setValorTela(valorTela + d)
    }

    const LimparMemoria = () => {
        setOperado(false)
        setValorTela('')
        setResultado(0)
        setAcumulador(0)
    }

    const Operacao = (operador) => {
        if (operador === 'bs') {
            let vtela = valorTela
            vtela = vtela.substring(0, vtela.length-1)
            setValorTela(vtela)
            setOperado(false)
            return
        }

        try {
            const r = eval(valorTela)
            setAcumulador(r)
            setResultado(r)
            setOperado(true)
        } catch {
            setResultado('ERRO')
        }
    }

    return (
        <Container>
            <h3>Calculadora</h3>
            {Tela(valorTela, resultado)}
            <ButtonsContainer>
                {Btn('AC', LimparMemoria)}
                {Btn('(', () => {AddDigit('(')})}
                {Btn(')', () => {AddDigit(')')})}
                {Btn('/', () => AddDigit('/'))}
                {Btn('7', () => {AddDigit('7')})}
                {Btn('8', () => {AddDigit('8')})}
                {Btn('9', () => {AddDigit('9')})}
                {Btn('*', () => {AddDigit('*')})}
                {Btn('4', () => {AddDigit('4')})}
                {Btn('5', () => {AddDigit('5')})}
                {Btn('6', () => {AddDigit('6')})}
                {Btn('-', () => {AddDigit('-')})}
                {Btn('1', () => {AddDigit('1')})}
                {Btn('2', () => {AddDigit('2')})}
                {Btn('3', () => {AddDigit('3')})}
                {Btn('+', () => {AddDigit('+')})}
                {Btn('0', () => {AddDigit('0')})}
                {Btn('.', () => {AddDigit('.')})}
                {Btn('<-', () => {Operacao('bs')})}
                {Btn('=', () => {Operacao('=')})}
            </ButtonsContainer>
        </Container>
    );
}


ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App/>} />
        </Routes>
    </Router>,
    document.querySelector("#root")
);