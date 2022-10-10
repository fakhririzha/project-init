Contoh penggunaan props `accept` pada komponen `DropFileBase64`:

```jsx
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import DropFileBase64 from '@commons/DropFileBase64';

const [openSuccess, setOpenSuccess] = React.useState(false);
const [openDialog, setOpenDialog] = React.useState(true);
const [openFailed, setOpenFailed] = React.useState(false);
const [popupMessage, setPopupMessage] = React.useState('');

const position = {
    vertical: 'bottom',
    horizontal: 'center',
};

const { vertical, horizontal } = position;

const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenSuccess(false);
    setOpenFailed(false);
};

const formikFileUpload = useFormik({
    initialValues: {
        filename: '',
        booking_file_pdf: '',
    },
    validationSchema: Yup.object().shape({
        filename: Yup.string().required('Image cannot be empty'),
        booking_file_pdf: Yup.string().required('Image cannot be empty'),
    }),
    onSubmit: async (values, { resetForm }) => {
        console.log(values);
        await fetch('/api/bookings/update', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                booking_id: bookingData.data[0].booking_id,
                booking_file_pdf: values.booking_file_pdf,
            }),
        })
            .then((response) => response.json())
            .then((jsonData) => {
                if (jsonData.error) {
                    setOpenFailed(true);
                    setPopupMessage(jsonData.message);
                    setOpenSuccess(false);
                    resetForm();
                } else {
                    setOpenSuccess(true);
                    setPopupMessage(jsonData.message);
                    setOpenSuccess(true);
                    setUploadFileSuccess(true);
                    resetForm();
                }
            })
            .catch(() => {
                setOpenFailed(true);
                setOpenSuccess(false);
                setPopupMessage('Kesalahan pada server!');
                resetForm();
            });
    },
});

<form onSubmit={formikFileUpload.handleSubmit}>
    <DropFileBase64
        title="PDF Manifest (Max 1Mb) - Required"
        acceptedFile={{
            '.pdf': [],
        }}
        multiple={false}
        error={
            (formikFileUpload.errors.filename && formikFileUpload.touched.filename) ||
            (formikFileUpload.errors.booking_file_pdf && formikFileUpload.touched.booking_file_pdf)
        }
        getBase64={handleDropFile}
    />
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
    </Button>
</form>

<Snackbar anchorOrigin={{ vertical, horizontal }} open={openSuccess} autoHideDuration={2000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {popupMessage}
    </Alert>
</Snackbar>
<Snackbar anchorOrigin={{ vertical, horizontal }} open={openFailed} autoHideDuration={2000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {popupMessage}
    </Alert>
</Snackbar>
```

[]: # Language: markdown
[]: # Path: core\common\DropFileBase64\README.md