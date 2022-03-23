import { Box, Typography, Button, TextField, Input} from '@mui/material';
import React, { useState } from 'react';
import './AdminView.css';

/*
    Resources:
    https://mui.com/api/input/
*/

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max(300px, 50%)',
}

function AdminView() {
    const [ingredients, setIngredients] = useState(['']);
    const [directions, setDirections] = useState(['']);

    // This function could definitely be optimized
    function handleTextInputOnChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, lastAry: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) {
        // update text state 
        let newState = lastAry;
        newState[index] = event.target.value;
        // check for empty boxes and whether to add additional boxes    
        for(let i = newState.length - 1; i >= 0; i--) {
            // checking last element first
            if(i === newState.length - 1) {
                if(newState[i].length > 0) {
                    console.log('adding');
                    newState.push('');
                }
            } else if(newState[i].length === 0) {
                console.log('splicing');
                newState.splice(i, 1);
            }
        }
        setState([...newState]);
    }

    return (
        <Box sx={formStyle}>
            <Typography id="recipe-form-title" variant="h4" component="h2" sx={{marginTop: '5rem', marginBottom: '2rem'}}>
                Add Recipe
            </Typography>
            <form method='POST' style={{ display: 'flex', flexDirection: 'column', gap: '3rem'}}>
                <TextField required id="name" label="Recipe Name" variant="outlined" />
                <Input required type="file" id="image" inputProps={{accept: 'image/*'}}/>
                <div id='ingredients'>
                    {ingredients.map((value, index) => 
                        index === 0 ?
                        <TextField required key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, ingredients, setIngredients)}} name="ingredient" label="Add ingredient" variant="outlined" />: 
                        <TextField key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, ingredients, setIngredients)}} name="ingredient" label="Add ingredient" variant="outlined" />)
                    }
                </div>
                <div id='directions'>
                    {directions.map((value, index) => 
                        index === 0 ?
                        <TextField required key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, directions, setDirections)}} name="direction" label="Add direction" variant="outlined" />: 
                        <TextField key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, directions, setDirections)}} name="direction" label="Add direction" variant="outlined" />)
                    }
                </div>
                <Button type='submit' id='submit' variant="contained">
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default AdminView;