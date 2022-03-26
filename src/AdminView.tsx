import { Box, Typography, Button, TextField, Input, Alert} from '@mui/material';
import React, { useState } from 'react';
import './AdminView.css';

/*
    Resources:
    https://mui.com/api/input/
*/

const formStyle = {
    position: 'absolute',
    left: '50%',
    top: '20vh',
    transform: 'translate(-50%)',
    width: 'max(300px, 50%)',
    paddingBottom: '20vh'
}

function AdminView() {
    const [ingredients, setIngredients] = useState(['']);
    const [directions, setDirections] = useState(['']);
    const [failedUpload, setFailedUpload] = useState(false);
    const [successfulUpload, setSuccessfulUpload] = useState(false);

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
                    newState.push('');
                }
            } else if(newState[i].length === 0) {
                newState.splice(i, 1);
            }
        }
        setState([...newState]);
    }

    // sends POST request to kazumirecipeapi to add recipe to database
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let form: HTMLFormElement = document.querySelector('form')!;
        let formData = new FormData(form);
        // clean ingredients and directions to remove empty last element
        removeLast('ingredients', formData);
        removeLast('directions', formData);
        fetch('https://kazumirecipeapi.uw.r.appspot.com/addRecipe', {
            method: 'POST',
            body: formData
        }).then((res) => handleResponse(res)).catch(() => setFailedUpload(true));
    }

    // updates page to notify that the recipe has been added or rejected
    async function handleResponse(res: Response) {
        if(res.status !== 200) {
            // error
            setFailedUpload(true);
            setTimeout(() => setFailedUpload(false), 10000);
        } else {
            setSuccessfulUpload(true);
            // reset form values
            document.querySelector('form')!.reset();
            setTimeout(() => setSuccessfulUpload(false), 10000);
        }
    }

    function removeLast(category: string, formData: FormData) {
        let original = formData.getAll(category);
        formData.delete(category);
        for(let i = 0; i < original.length - 1; i++) {
            formData.append(category, original[i]);
        }
    }

    return (
        <Box sx={formStyle}>
            <Typography id="recipe-form-title" variant="h4" component="h2" sx={{marginTop: '5rem', marginBottom: '2rem'}}>
                Add Recipe
            </Typography>
            <form id='add-recipe' method='POST' onSubmit={event => {handleSubmit(event)}} style={{ display: 'flex', flexDirection: 'column', gap: '3rem'}}>
                <TextField required name="name" label="Recipe Name" variant="outlined" />
                <Input required type="file" name="image" inputProps={{accept: 'image/*'}}/>
                <div id='ingredients'>
                    {ingredients.map((value, index) => 
                        index === 0 ?
                        <TextField required key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, ingredients, setIngredients)}} name="ingredients" label="Add ingredient" variant="outlined" />: 
                        <TextField key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, ingredients, setIngredients)}} name="ingredients" label="Add ingredient" variant="outlined" />)
                    }
                </div>
                <div id='directions'>
                    {directions.map((value, index) => 
                        index === 0 ?
                        <TextField required key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, directions, setDirections)}} name="directions" label="Add direction" variant="outlined" />: 
                        <TextField key={index} value={value} onChange={event => {handleTextInputOnChange(event, index, directions, setDirections)}} name="directions" label="Add direction" variant="outlined" />)
                    }
                </div>
                <Button type='submit' id='submit' variant="contained">
                    Submit
                </Button>
                <div className='alert-container'>
                    {(successfulUpload && <Alert severity="success">Recipe successfully added!</Alert>) || (failedUpload && <Alert severity="error">Error: Recipe not uploaded</Alert>)}
                </div>
            </form>
        </Box>
    );
}

export default AdminView;