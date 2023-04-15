import React, { useState } from 'react';
import { TituloBienvenida, Titulos } from '../atoms/Title/Titulos';
import {
    OlvidastePassword,
    OlvidastePasswordLink
} from '../atoms/OlvidastePassword';
import LineaSeparacion from '../atoms/LineaSeparacion';
import { InputMUI, ContenedorInputs } from '../atoms/Input/InputMUI';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid, styled } from '@mui/material';
import { Formulario } from '../atoms/Formulario/Formulario';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getUsuarios, postUsuario } from '../../services/usuario_service';

import bcrypt from 'bcryptjs';

const FormularioRegistro = () => {
    const [dni, setDni] = useState(null);
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuariosData = async () => {
            const usuarios = await getUsuarios();

            setUsuarios(usuarios);
        };

        fetchUsuariosData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hashedPassword = bcrypt.hashSync(password, 10);

        console.log(dni);
        console.log(password);
        console.log(hashedPassword);
        /**
         *    Del BACK-END:
         *
         *    const datosUsuario = pick(
         *      createaddUsuario, [
         *          'id','dni','nombre','apellido','email','discord','telefono','rol','password'
         *      ]);
         */
        const usuario = usuarios.find((usuario) => usuario.dni === dni);

        if (usuario) {
            alert('DNI ya registrado');
        } else {
            let usuario = {
                dni: dni,
                password: hashedPassword,
                nombre: 'Pablo',
                apellido: 'ORIGLIA',
                email: 'poriglia@email.com',
                discord: '@poriglia',
                telefono: '12345678',
                rol: 'alumno'
            };
            console.log(usuario);
            alert(usuario);

            postUsuario(usuario);
            // TODO: Mensaje de usuario registrado con éxito
            window.location.href = '/';
        }

        /*
        e.preventDefault();
        console.log(usuarios);
        const usuario = usuarios.find(
            (usuario) => usuario.dni === dni && usuario.password === password
        );
        console.log(usuario);
        if (usuario) {
            localStorage.setItem('dni', JSON.stringify(usuario.dni));
            localStorage.setItem('nombre', JSON.stringify(usuario.nombre));
            localStorage.setItem('apellido', JSON.stringify(usuario.apellido));
            localStorage.setItem('email', JSON.stringify(usuario.email));
            localStorage.setItem('discord', JSON.stringify(usuario.discord));
            localStorage.setItem('telefono', JSON.stringify(usuario.telefono));
            localStorage.setItem('rol', JSON.stringify(usuario.rol));
            localStorage.setItem('password', JSON.stringify(usuario.password));
            localStorage.setItem('id', JSON.stringify(usuario.id));

            if (usuario.rol == 'alumno') {
                window.location.href = '/usuario/equivalencias';
            } else {
                window.location.href = '/direccion/solicitudes';
            }
        } else {
            alert('Usuario o contraseña incorrectos');
        }
        */
    };

    return (
        <FormularioMainRegistro>
            <TituloBienvenida>
                <Titulos titulogrande titulomarginbottom component="h2">
                    Registro
                </Titulos>
                <Titulos titulochico titulolight component="h2">
                    Nuevo usuario
                </Titulos>
            </TituloBienvenida>

            <Formulario sx={{ marginTop: '40px' }}>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    style={{ height: '100%', textAlign: 'center' }}
                >
                    <div>
                        <ContenedorInputs>
                            <InputMUI
                                type="text"
                                id="outlined-basic"
                                label="DNI"
                                variant="outlined"
                                onChange={(e) =>
                                    setDni(parseInt(e.target.value))
                                }
                                value={dni}
                            />
                        </ContenedorInputs>

                        <ContenedorInputs>
                            <InputMUI
                                type="password"
                                id="outlined-basic"
                                label="Contraseña"
                                variant="outlined"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </ContenedorInputs>
                    </div>

                    <LineaSeparacion></LineaSeparacion>

                    <Grid>
                        <BotonMUI
                            variant="contained"
                            buttoncontained
                            disableElevation
                            type="submit"
                        >
                            Registrarse
                        </BotonMUI>
                    </Grid>
                </form>
            </Formulario>
        </FormularioMainRegistro>
    );
};

const FormularioMainRegistro = styled(Grid)`
    width: 65%;
    max-width: 65%;
    height: 100%;
    padding: 50px 0px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export { FormularioMainRegistro, FormularioRegistro };
