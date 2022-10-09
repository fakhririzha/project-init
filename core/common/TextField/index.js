import { baseUrl } from '@app-config';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import useStyles from './styles';

const TextField = ({
    placeholder = '',
    disabled = false,
    onChange = () => {},
    value = '',
    label = '',
    fullWidth = true,
    shrink = true,
    error = false,
    errorMessage = '',
    variant = 'standard',
    footer,
    styleTextField = {},
    tinyMce = false,
    formik = {},
    ...other
}) => {
    const styles = useStyles();
    const editorRef = useRef(null);

    return (
        <div style={styles.container}>
            {!tinyMce ? (
                <FormControl
                    disabled={disabled}
                    fullWidth={fullWidth}
                    error={error}
                    variant={variant}
                >
                    <InputLabel
                        shrink={shrink}
                        htmlFor={label}
                        className={styles.label}
                    >
                        {label}
                    </InputLabel>
                    <Input
                        id={label}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        sx={styleTextField}
                        {...other}
                    />
                    {React.isValidElement(footer) ? (
                        footer
                    ) : (
                        <Typography
                            variant='p'
                            color={error ? 'red' : 'default'}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                </FormControl>
            ) : (
                <>
                    <Editor
                        tinymceScriptSrc={`${baseUrl}/tinymce//tinymce.min.js`}
                        onInit={(evt, editor) => {
                            editorRef.current = editor;
                        }}
                        initialValue={value}
                        value={value}
                        onEditorChange={(values) => {
                            formik.setFieldValue(onChange, values);
                            console.log(values);
                        }}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: ['lists'],
                            toolbar:
                                'undo redo | bold italic | alignleft aligncenter | alignright alignjustify | bullist numlist ',
                            content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                    {React.isValidElement(footer) ? (
                        footer
                    ) : (
                        <Typography
                            variant='p'
                            color={error ? 'red' : 'default'}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                </>
            )}
        </div>
    );
};

export default TextField;
