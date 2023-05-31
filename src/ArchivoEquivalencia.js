import { Button, Grid, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileUploader } from './components/atoms/Input/InputMUI';
import { BotonMUI } from './components/atoms/Button/BotonMUI';
import { StandardInput } from './components/atoms/Input/InputMUI';

const rol = JSON.parse(localStorage.getItem('rol'));

const ArchivoEquivalencia = ({
    handleChangeArray,
    formValueArray,
    key2,
    nombreArchivo
}) => {
    const [file, setFile] = useState(null);

    const [fileList, setFileList] = useState([]);

    const [fileListUpdate, setFileListUpdate] = useState(false);

    // Hace una llamada a la API para obtener la lista de archivos
    useEffect(() => {
        console.log('nombre de archivo ' + nombreArchivo);
        console.log('Value array archivo: ');

        if (nombreArchivo == null) {
            return;
        }

        fetch('http://localhost:3001/api/archivos/' + nombreArchivo, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((res) => setFileList(res))
            //.then(res => console.log(res))
            .catch((err) => {
                console.error(err);
            });
        setFileListUpdate(false);
    }, [fileListUpdate, nombreArchivo]);

    // if (props.nombreArchivo != null) {
    //     fetch('http://localhost:3001/api/archivos/' + props.nombreArchivo, {
    //     method: 'GET',
    //     })
    //     .then(res => setFileList(res))
    //     .catch(err => {console.error(err)});
    //     setFileListUpdate(false)
    // }},[fileListUpdate, props.nombreArchivo]);

    const handleSelectedFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSendFile = () => {
        if (!file) {
            alert('Debe seleccionar algún archivo');
            return;
        }

        const formdata = new FormData();
        formdata.append('archivopdf', file);

        fetch('http://localhost:3001/api/archivos/', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                setFileListUpdate(true);
            })
            .catch((err) => {
                console.error(err);
            });

        // document.getElementById("algo").value = file

        document.getElementById('contained-button-file').value = null;
        setFile(null);
    };

    const handleDeleteFile = (f) => {
        fetch('http://localhost:3001/api/archivos/' + f, {
            method: 'DELETE'
        })
            .then((res) => res.text())
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        setFileListUpdate(true);
    };

    return (
        <>
            {rol == 'directivo' && (
                <Grid>
                    {[fileList].map((file) => (
                        <Grid
                            item
                            container
                            key={file}
                            justifyContent="space-between"
                            sx={{ marginTop: '5px' }}
                        >
                            <Link
                                //key={file}
                                href={'http://localhost:3001/' + file}
                                target="_blank"
                                underline="hover"
                                color="#FF5733"
                                display="inline"
                                xs={12}
                            >
                                {file}
                            </Link>
                            {/* <BotonMUI //key={file}
                                    buttonupload
                                    variant="outlined"
                                    >
                                    <Link 
                                    href={"http://localhost:3001/" + file} 
                                    //target="_blank" 
                                    underline='hover'
                                    display='inline'
                                    color='inherit'
                                    download={"http://localhost:3001/" + file}
                                    >
                                        Descargar
                                    </Link>
                                </BotonMUI> */}
                        </Grid>
                    ))}
                </Grid>
            )}
            {rol == 'alumno' && (
                <Grid xs={12}>
                    {nombreArchivo != null && (
                        <Grid item container sx={{ marginTop: '16px' }}>
                            <Grid
                                item
                                container
                                direction="column"
                                // justifyContent="space-between"
                                alignItems="flex-start"
                                sx={{ marginTop: '12px' }}
                            >
                                {[fileList].map((file) => (
                                    <Grid
                                        item
                                        container
                                        key={file}
                                        justifyContent="space-between"
                                        sx={{ marginTop: '5px' }}
                                    >
                                        <Link
                                            //key={file}
                                            href={
                                                'http://localhost:3001/' + file
                                            }
                                            target="_blank"
                                            underline="hover"
                                            color="#FF5733"
                                            display="inline"
                                        >
                                            {file}
                                        </Link>
                                        <BotonMUI //key={file}
                                            buttonupload
                                            variant="outlined"
                                            onClick={() =>
                                                handleDeleteFile(file)
                                            }
                                        >
                                            Eliminar
                                        </BotonMUI>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid
                                item
                                container
                                sx={{ marginTop: '16px' }}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-end"
                            >
                                <FileUploader
                                    id="contained-button-file"
                                    //multiple
                                    size="large"
                                    variant="standard"
                                    type="file"
                                    accept="application/*"
                                    allowedExtensions={['pdf']}
                                    onChange={handleSelectedFile}
                                    disabled
                                />
                                <br></br>
                                <br></br>
                                {/* </label> */}
                                <BotonMUI
                                    // width='10%'
                                    // sx={{
                                    // marginRight: '12px'
                                    // }}
                                    buttonuploadoff
                                    variant="outlined"
                                    // component="span"
                                    /*Agregado*/
                                    onClick={handleSendFile}
                                    disabled
                                    background-color="#FFFFFF"
                                    /*Fin Agregado*/
                                >
                                    Cargar
                                </BotonMUI>
                            </Grid>
                        </Grid>
                    )}
                    {nombreArchivo == null && (
                        <Grid
                            item
                            container
                            sx={{ marginTop: '16px' }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                        >
                            {/* <label
                                htmlFor="contained-button-file"
                                // style={{ width: '100%' }}
                            > */}
                            {/* Agregado */}
                            {/* <StandardInput
                                        //key={formValueArray.key}
                                        required
                                        name="cargaHorariaTotal"
                                        size="small"
                                        label="Carga horaria total"
                                        variant="outlined"
                                        type="number"
                                        value={formValueArray.archivo}
                                        //onChange={(event) => handleChangeArray(event, key2)}
                            /> */}
                            <FileUploader
                                id="contained-button-file"
                                //multiple
                                size="large"
                                variant="standard"
                                type="file"
                                accept="application/*"
                                allowedExtensions={['pdf']}
                                onChange={handleSelectedFile}
                            />
                            {/* </label> */}
                            <BotonMUI
                                // width='10%'
                                // sx={{
                                // marginRight: '12px'
                                // }}
                                buttonupload
                                variant="outlined"
                                // component="span"
                                /*Agregado*/
                                onClick={handleSendFile}
                                /*Fin Agregado*/
                            >
                                Cargar
                            </BotonMUI>
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
};

export { ArchivoEquivalencia };
