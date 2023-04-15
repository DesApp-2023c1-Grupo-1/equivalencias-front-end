import React from 'react';
import { FormularioRegistro } from '../../molecules/FormularioRegistro';
import { Register } from '../../molecules/SideRegistro';
import { TarjetaLogin, FatherContainer } from './IniciarSesionStyled';

const PageRegistro = () => {
    return (
        <FatherContainer>
            <TarjetaLogin>
                <Register />

                <FormularioRegistro />
            </TarjetaLogin>
        </FatherContainer>
    );
};

export default PageRegistro;
