import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import useStyles from './styles';

const SelectField = ({
    options = [],
    name = '',
    disabled = false,
    onChange = () => {},
    value = '',
    label = '',
    fullWidth = true,
    error = false,
    errorMessage = '',
    variant = 'standard',
    ...other
}) => {
    const styles = useStyles();

    return (
        <div style={styles.container}>
            <FormControl
                disabled={disabled}
                fullWidth={fullWidth}
                error={error}
                variant={variant}
            >
                <TextField
                    id={name}
                    select
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder='Select an item'
                    error={error}
                    helperText={
                        error && (
                            <Typography
                                variant='span'
                                color={error ? 'red' : 'default'}
                            >
                                {errorMessage}
                            </Typography>
                        )
                    }
                    {...other}
                >
                    <MenuItem disabled selected>
                        Select an item...
                    </MenuItem>
                    {options.data.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        </div>
    );
};

export default SelectField;
