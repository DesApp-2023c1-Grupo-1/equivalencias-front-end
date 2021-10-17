import styled from 'styled-components';
import Registro from '../Registro';
import { Titulosh1 } from '../atoms/Title/Titulos';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid } from '@mui/material';

const SideRegistro = styled(Grid)`
    background: #009673;
    width: 35%;
    max-width: 35%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const Register = () => {
    const onClick = (e) => {
        return <Registro />;
    };

    return (
        <SideRegistro>
            <Titulosh1 centrar blanco tituloGrande>
                Trámites de Equivalencias
            </Titulosh1>

            <BotonMUI variant="outlined" onClick={onClick}>
                Registrarse
            </BotonMUI>
        </SideRegistro>
    );
};

export { SideRegistro, Register };
