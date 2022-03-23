import { Box, Typography, Button, TextField, Input} from '@mui/material';
import React, { useState } from 'react';
import './AdminView.css';

/*
    Image
    Recipe Name
    Ingredients (array of variable length)
    Directions (array of variable length)
*/

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max(300px, 50%)',
}

function AdminView() {
    const [disabled, setDisabled] = useState(true);

    function handleIngredientOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        // check if additional line has already been added
        let inputs = document.getElementById('ingredients')!.querySelectorAll('input');
        let lastInput = inputs[inputs.length - 1];
        console.log(lastInput.querySelector('input'));
    }

    return (
        <Box sx={formStyle}>
            <Typography id="recipe-form-title" variant="h4" component="h2" sx={{marginBottom: '4rem'}}>
                Add Recipe
            </Typography>
            <form method='POST' style={{ display: 'flex', flexDirection: 'column', gap: '3rem'}}>
                <TextField id="name" label="Recipe Name" variant="outlined" />
                <Input type="file" id="image"/>
                <div id='ingredients'>
                    <TextField onChange={handleIngredientOnChange} name="ingredient" label="Add ingredient" variant="outlined" />
                </div>
                <Button type='submit' id='submit' variant="contained" disabled={disabled}>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default AdminView;