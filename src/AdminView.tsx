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
    const [ingredients, setIngredients] = useState(['']);

    // This function could definitely be optimized
    function handleIngredientOnChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        // update text state 
        console.log(event.target.value);
        console.log(index);
        let newState = ingredients;
        console.log(newState);
        newState[index] = event.target.value;
        console.log(newState);
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
        setIngredients([...newState]);
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
                    {ingredients.map((value, index) => 
                        <TextField key={index} value={value} onChange={event => {handleIngredientOnChange(event, index)}} name="ingredient" label="Add ingredient" variant="outlined" />)
                    }
                </div>
                <Button type='submit' id='submit' variant="contained" disabled={disabled}>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default AdminView;