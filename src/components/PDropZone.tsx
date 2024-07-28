import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Grid, Paper, Stack, InputBase } from '@mui/material';
import { Document, Page } from 'react-pdf';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { styled } from '@mui/system';
import { uploadData } from 'aws-amplify/storage';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: 0,
        fontSize: '24px', // Adjust this value to match the exact size
        fontWeight: 400,
        color: '#ffffff',
        background: '#212225',

        border: 'none',
        '&:focus': {
            outline: 'none',
        },
    },
}));

const DragActiveOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: -72,
    left: 0,
    right: 0,
    bottom: 0,
    height: 'calc(100% + 72px)',
    backgroundColor: '#006DC1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    borderRadius: 8,
}));


const baseStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 2,
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


const PDropZone = forwardRef(({ onFileChange }, ref) => {


    const [files, setFiles] = useState([]);
    const [name, setName] = useState("")

    const handleChange = (event) => {
        setName(event.target.value);

    };

    const handleBlur = () => {
        if (files.length === 0) {
            setName("");
        }
    };
    const onDrop = useCallback((acceptedFiles) => {
        uploadData({
            path: `pink1/${acceptedFiles[0].name}`,
            data: acceptedFiles[0],
        })
        const filePreviews = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setFiles(prevFiles => [...prevFiles, ...filePreviews]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, open, isFocused, isDragAccept, isDragReject, isFileDialogActive } = useDropzone({
        onDrop,
        noClick: true,
    });


    console.log(isFocused, isDragAccept, isDragReject, "isFocused, isDragAccept, isDragReject", isFileDialogActive);

    useImperativeHandle(ref, () => ({
        open
    }));

    useEffect(() => {
        onFileChange(files);
        if (files.length > 0) {
            if (!name) {
                setName(`${files?.length} items`);
            }
        } else {
            setName("");
        }
    }, [files, onFileChange]);


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const renderPreview = (file) => {
        const fileType = file.type.split('/')[0];
        if (fileType === 'image') {
            return <img src={file.preview} alt="preview"
                style={{
                    width: '100%',
                    transform: 'scale(1)',
                    transformOrigin: 'center center',
                    transition: 'transform 0.3s ease-in-out',
                    objectFit: 'cover',
                    position: 'relative',
                    // top: -50
                }}

                onLoad={() => { URL.revokeObjectURL(file.preview); }} />;
        } else if (fileType === 'video') {
            return <video controls style={{ width: '100%', height: 'auto' }} src={file.preview}></video>;
        } else if (file.type === 'application/pdf') {
            return (
                <Document file={file.preview}>
                    <Page pageNumber={1} width={130} />
                </Document>
            );
        } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return <DocViewer documents={[{ uri: file.preview }]} pluginRenderers={DocViewerRenderers} />;
        } else {
            return <Typography variant="body2">No preview available</Typography>;
        }
    };

    return (
        <Box sx={{ width: '100%', flex: '1 1 auto', ...(isDragActive && { borderColor: 'aqua' }), position: "relative" }}
            {...getRootProps({ style })}
        >
            <Paper

                sx={{
                    borderRadius: 1,
                    flex: '1 1 auto',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'aquamarine' },
                    ...(isDragActive && { borderColor: 'aqua' }),
                }}
            >
                <input  {...getInputProps()} />
            </Paper>
            {isDragActive && (
                <DragActiveOverlay>
                    <Box
                        sx={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        Ankur
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        Drop files to upload
                    </Typography>
                </DragActiveOverlay>
            )}
            {files.length > 0 && <Box sx={{ bgcolor: '#212225', px: 2 }}>
                <Typography component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledInputBase
                        fullWidth
                        value={name}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.target.blur();
                            }
                        }}
                        onBlur={handleBlur}
                        inputProps={{ 'aria-label': 'item count' }}
                    />
                    <Typography
                        component="span"
                        variant='h3'
                        sx={{
                            color: '#ffffff',
                        }}
                    >
                    </Typography>
                </Typography>
            </Box>}
            <Grid container spacing={2} sx={{ mt: 2, px: 3 }}>
                {files.map((file, index) => (
                    <Box key={index} sx={{ margin: 2, borderRadius: 1.5, overflow: 'hidden' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                overflow: 'hidden',
                                height: '95px',
                                width: '130px',

                            }}
                        >
                            {renderPreview(file)}

                            {/* <Typography variant="caption">{(file.size / 1024).toFixed(2)} KB</Typography> */}
                        </Box>
                        <Stack alignItems={'center'} justifyContent={'center'} sx={{ backgroundColor: '#18191B', height: 36, width: "100%" }}>
                            <Typography color={'#fff'} overflow={"hidden"} variant="body2">{file.name}</Typography>

                        </Stack>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
});

export default PDropZone;