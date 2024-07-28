import { Box, Button, CircularProgress, IconButton, List, ListItem, ListItemText, Popover, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Iconify } from "./iconify";
import { varAlpha } from "../theme/styles";
import { motion, AnimatePresence } from "framer-motion";


const SharePopover = ({ files, onAddMore }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [fileData, setFileData] = useState({ count: 0, size: 0 });
    const [copied, setCopied] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const count = files.length;
        const size = files.reduce((acc, file) => acc + file.size, 0);
        setFileData({ count, size: formatFileSize(size) });
    }, [files?.length]);

    const open = Boolean(anchorEl);

    const handleCopyLink = () => {
        navigator.clipboard.writeText("copied");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const isDisabled = files?.length === 0;

    return (
        <>  < Box onClick={handleClick}>
            {files?.length === 0 ? <IconButton
                size="small"
                sx={{
                    p: 0.35,
                    color: 'common.white',
                    bgcolor: (theme) => varAlpha('red', 0.48),
                    '&:hover': { bgcolor: (theme) => varAlpha('red', 0.72) },
                }}
            >
                <Iconify icon="mdi:dots-vertical" width={20} />
            </IconButton> : <Button
                variant="contained"
                size='small'
                startIcon={<ShareIcon />}
                sx={{
                    backgroundColor: '#3B3E41',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    borderRadius: 2,
                    marginLeft: 2,
                    '&:hover': {
                        backgroundColor: '#4A4A4C',
                    },
                }}
            >
                Share
            </Button>}
        </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: '#202124',
                        color: '#e8eaed',
                        width: 320,
                        borderRadius: '8px',
                        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                    },
                }}
            >
                <Box sx={{ py: 2 }}>
                    <List disablePadding>
                        {/* <ListItem
                            sx={{
                                px: 2,
                                py: 2,
                                borderBottom: '1px solid #FFFFFF0D',
                                minHeight: 80,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    // key={files.length === 0 ? "upload" : "fileInfo"}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ width: '100%' }}
                                >
                                    {files.length === 0 ? (
                                        <Box onClick={onAddMore} sx={{ cursor: 'pointer' }}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <UploadIcon />
                                                <Stack>
                                                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                        Upload files
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#9aa0a6' }}>
                                                        or drag & drop files anywhere
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    ) : (
                                        <ListItemText
                                            primary={
                                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                    {fileData.count} items <Typography component="span" variant="h6" color="gray">• {fileData.size}</Typography>
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ color: '#9aa0a6', cursor: 'pointer' }} onClick={onAddMore}>
                                                    Add more
                                                </Typography>
                                            }
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </ListItem> */}
                        <FileSelectionItem files={files} fileData={fileData} onAddMore={onAddMore} isLoading={false} />
                        <ListItem sx={{ px: 2, py: 2, borderBottom: '1px solid #FFFFFF0D' }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Email to"
                                autoComplete='email'
                                placeholder="Add email addresses (optional)"
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    '& .MuiInputBase-root': { color: '#9aa0a6' },
                                    '& .MuiInputLabel-root': { color: '#e8eaed' },
                                    // '& .MuiInput-underline:before': { borderBottomColor: '#5f6368' },
                                    // '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#8ab4f8' },
                                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                                }}
                            />
                        </ListItem>

                        <ListItem sx={{ px: 2, py: 2, borderBottom: '1px solid #FFFFFF0D' }}>
                            <ListItemText
                                primary={<Typography variant="caption" sx={{ color: '#e8eaed' }}>Link expires</Typography>}
                                secondary={<Typography variant="body1" sx={{ color: '#e8eaed', fontWeight: 500 }}>Never</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ px: 2, py: 2, borderBottom: '1px solid #FFFFFF0D' }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Password"
                                placeholder="Set password"
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    '& .MuiInputBase-root': { color: '#9aa0a6' },
                                    '& .MuiInputLabel-root': { color: '#e8eaed' },
                                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                                }}
                            />
                        </ListItem>


                    </List>
                    <Box px={1}>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                component={motion.button}
                                disabled={isDisabled}
                                fullWidth
                                variant="contained"
                                onClick={handleCopyLink}
                                sx={{
                                    mt: 2,
                                    textTransform: 'none',
                                    p: 1,
                                    borderRadius: 2,
                                    '&.Mui-disabled': {
                                        backgroundColor: '#3A3A3C',
                                        color: '#8E8E93',
                                    },
                                }}
                                animate={{
                                    backgroundColor: isDisabled ? '#3A3A3C' : (copied ? '#1FD8A4' : '#3B9EFF'),
                                    color: isDisabled ? '#8E8E93' : '#18191B',
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <AnimatePresence mode="wait">
                                    <Typography
                                        key={isDisabled ? 'disabled' : (copied ? 'copied' : 'copy')}
                                        component={motion.span}
                                        variant="subtitle2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                        sx={{ color: 'inherit' }}
                                    >
                                        {isDisabled ? 'No files selected' : (copied ? 'Copied' : 'Copy link')}
                                    </Typography>
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};


function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseInt((bytes / Math.pow(k, i))) + ' ' + sizes[i];
}


export default SharePopover;

const UploadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.75997 22.6672C8.28263 22.6672 6.93463 21.7779 6.36797 20.3739C6.1613 19.8619 6.40797 19.2792 6.9213 19.0726C7.4333 18.8659 8.01463 19.1126 8.22263 19.6259C8.51197 20.3419 9.2453 20.7619 10.0133 20.6486L19.2453 19.2766C19.6853 19.2112 20.0746 18.9779 20.3386 18.6206C20.604 18.2632 20.7133 17.8232 20.6466 17.3832L19.2746 8.15124C19.1933 7.60457 19.572 7.09524 20.1173 7.01524C20.6546 6.93257 21.172 7.31124 21.2546 7.85657L22.6266 17.0886C22.7706 18.0579 22.5293 19.0246 21.9453 19.8112C21.3626 20.5979 20.508 21.1112 19.5386 21.2552L10.3066 22.6272C10.1226 22.6552 9.9413 22.6672 9.75997 22.6672Z" fill="currentColor" />
        <path d="M14.334 1.33203H5.00065C2.97798 1.33203 1.33398 2.97603 1.33398 4.9987V14.332C1.33398 16.3547 2.97798 17.9987 5.00065 17.9987H14.334C16.3567 17.9987 18.0007 16.3547 18.0007 14.332V4.9987C18.0007 2.97603 16.3567 1.33203 14.334 1.33203ZM13.0007 10.6654H10.6673V12.9987C10.6673 13.5507 10.2193 13.9987 9.66732 13.9987C9.11532 13.9987 8.66732 13.5507 8.66732 12.9987V10.6654H6.33398C5.78198 10.6654 5.33398 10.2174 5.33398 9.66536C5.33398 9.11336 5.78198 8.66536 6.33398 8.66536H8.66732V6.33203C8.66732 5.78003 9.11532 5.33203 9.66732 5.33203C10.2193 5.33203 10.6673 5.78003 10.6673 6.33203V8.66536H13.0007C13.5527 8.66536 14.0007 9.11336 14.0007 9.66536C14.0007 10.2174 13.5527 10.6654 13.0007 10.6654Z" fill="currentColor" />
    </svg>
);

const ShareIcon = () => (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7.25H13.75C14.855 7.25 15.75 8.145 15.75 9.25V13.75C15.75 14.855 14.855 15.75 13.75 15.75H4.25C3.145 15.75 2.25 14.855 2.25 13.75V9.25C2.25 8.145 3.145 7.25 4.25 7.25H6" stroke="#B0B4BA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6 4.25L9 1.25L12 4.25" stroke="#B0B4BA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 1.25V12.75" stroke="#B0B4BA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
);

const FileSelectionItem = ({ files, onAddMore, isLoading }) => {
    const [fileData, setFileData] = useState({ count: 0, size: 0 });

    useEffect(() => {
        const count = files.length;
        const size = files.reduce((acc, file) => acc + file.size, 0);
        setFileData({ count, size: formatFileSize(size) });
    }
        , [files?.length]);

    console.log('fileData', fileData);
    return (
        <ListItem
            key={isLoading ? "loading" : (files.length === 0 ? "upload" : "fileInfo")}
            sx={{
                px: 2,
                py: 2,
                borderBottom: '1px solid #FFFFFF0D',
                minHeight: 80,
                display: 'flex',
                alignItems: 'center',
            }}
        >

            {/* <AnimatePresence> */}
            <Box
                component={motion.div}
                key={isLoading ? "loading" : (files.length === 0 ? "upload" : "fileInfo")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%' }}
            >
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress sx={{ color: "#fff" }} size={24} />
                    </Box>
                ) : ((files.length === 0) ? (
                    <Box onClick={onAddMore} sx={{ cursor: 'pointer' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <UploadIcon />
                            <Stack>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                    Upload files
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9aa0a6' }}>
                                    or drag & drop files anywhere
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                ) : (
                    <Stack>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            {fileData?.count} items <Typography component="span" variant="h6" color="gray">• {fileData?.size}</Typography>
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9aa0a6', cursor: 'pointer' }} onClick={onAddMore}>
                            Add more
                        </Typography>
                    </Stack>

                ))}
            </Box>
            {/* </AnimatePresence> */}
        </ListItem>
    );
};

