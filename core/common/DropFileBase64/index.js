/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import Typography from '@mui/material/Typography';
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const DropFile = ({
    label = '',
    title = '',
    showListFile = true,
    acceptedFile = 'image/*,.pdf,.doc,.docx,xls,xlsx,.zip,.rar',
    maxSize = 5000000,
    multiple = true,
    handleDrop = () => {},
    getBase64 = () => {},
    error = false,
    dropValue = [],
    value = [],
    setValue = () => {},
    noStyle = false,
    maxWidth,
    maxHeight,
}) => {
    const [dropFile, setDropFile] = React.useState(dropValue);
    const checkImage = async (files) => {
        const promises = [];
        for (let index = 0; index < files.length; index += 1) {
            const file = files[index];
            const promise = new Promise((resolve) => {
                const image = new Image();
                image.onload = () => {
                    file.width = image.width;
                    file.height = image.height;
                    resolve(file);
                };
                const url = URL.createObjectURL(file);
                image.src = url;
            });
            promises.push(promise);
        }

        const dataFiles = await Promise.all(promises);
        let errorImage;
        for (let index = 0; index < dataFiles.length; index += 1) {
            const file = files[index];
            if (
                file.type &&
                file.type.match(/image/) &&
                maxWidth &&
                maxHeight
            ) {
                if (file.width >= maxWidth || file.height >= maxHeight) {
                    errorImage = `Maximum size image is ${maxWidth}X${maxHeight} pixel`;
                }
            }
        }

        return errorImage;
    };
    const onDrop = useCallback(async (files) => {
        if (files && files.length > 0) {
            const errorImage = await checkImage(files);
            if (!errorImage) {
                if (multiple) {
                    setDropFile([...dropFile, ...files]);
                    if (setValue) setValue([...dropFile, ...files]);
                } else {
                    setDropFile([files[0]]);
                    if (setValue) setValue([files[0]]);
                }
                handleDrop(files);
            } else {
                window.toastMessage({
                    open: true,
                    text: errorImage,
                    variant: 'error',
                });
            }
        }
        // Do something with the files
    }, []);
    const onDropAccepted = async (files) => {
        // eslint-disable-next-line array-callback-return
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [
                    ...filebase64,
                    {
                        baseCode,
                        file: files[ind],
                    },
                ];
            }
        }

        const errorImage = await checkImage(files);
        if (!errorImage) {
            getBase64(filebase64);
        }
    };

    const messageError = `Cannot upload, Files must be a type  + acceptedFile}& max file ${
        maxSize / 1000000
    }Mb`;

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open,
    } = useDropzone({
        onDrop,
        accept: acceptedFile,
        onDropAccepted,
        onDropRejected: () =>
            window.toastMessage({
                open: true,
                text: messageError,
                variant: 'error',
            }),
        maxSize,
    });

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        breturnWidth: 2,
        breturnRadius: 2,
        breturnColor: '#eeeeee',
        breturnStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'breturn .24s ease-in-out',
        cursor: 'pointer',
    };

    const activeStyle = {
        breturnColor: '#2196f3',
    };

    const acceptStyle = {
        breturnColor: '#00e676',
    };

    const rejectStyle = {
        breturnColor: '#ff1744',
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        // eslint-disable-next-line comma-dangle
        [isDragActive, isDragReject, isDragAccept]
    );

    return (
        <div className='column'>
            {title && title !== '' ? (
                <Typography
                    variant='label'
                    type='semiBold'
                    color={error ? 'red' : 'default'}
                >
                    {title}
                </Typography>
            ) : null}
            <div {...getRootProps({ style: noStyle ? {} : style })}>
                <input {...getInputProps()} />
                {noStyle && (
                    <button type='button' onClick={open}>
                        Choose file
                    </button>
                )}
                {!noStyle && isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    !noStyle && (
                        <p>
                            Drag drop some files here, or click to select file
                        </p>
                    )
                )}
            </div>
            <Typography color={error ? 'red' : 'default'}>{label}</Typography>
            <div className='column'>
                {showListFile && value && value.length > 0
                    ? value.map((file, index) => (
                        <Typography key={index}>{file.name}</Typography>
                    ))
                    : showListFile &&
                      dropFile.length > 0 &&
                      dropFile.map((file, index) => (
                          <Typography key={index}>{file.name}</Typography>
                      ))}
            </div>
        </div>
    );
};

export default DropFile;
