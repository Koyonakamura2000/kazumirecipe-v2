import { useState, useEffect } from 'react';
import { Box, Paper, Stack, styled, CardMedia, CardContent, Typography } from '@mui/material';
import './Recipes.css';
import {v4 as uuidv4} from 'uuid';

/* Resources:
    https://mui.com/components/stack/
    https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/installation/installation.md#:~:text=Installation%20Install%20MUI%2C%20the%20world%27s%20most%20popular%20React,%2F%2F%20with%20yarn%20yarn%20add%20%40mui%2Fmaterial%20%40emotion%2Freact%20%40emotion%2Fstyled  
*/
function Recipes() {
    const [recipes, setRecipes] = useState<Array<any>>([]);
    const [isError, setError] = useState(false);
    
    useEffect(() => {
        (async () => {
            let response = await fetch("https://kazumirecipeapi.uw.r.appspot.com");
            if(response.ok) {
                const recipeJson = await response.json();
                // setRecipes
                let recipeAry = [];
                for(let i = 0; i < recipeJson.data.length; i++) {
                    let thisRecipe = recipeJson.data[i];
                    let recipeInfo: Recipe = {
                        name: thisRecipe['name'],
                        directions: thisRecipe['directions'],
                        ingredients: thisRecipe['ingredients'],
                        image: thisRecipe['image']
                    };
                    recipeAry.push(recipeInfo);
                }
                setRecipes(recipeAry);
            } else {
                console.log('error: ' + response.status);
                setError(true);
            }
        })().catch(() => {setError(true)});
    }, []);

    interface Recipe {
        name: string;
        directions: string[];
        ingredients: string[];
        image: string;
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));
      
    if(isError) {
        return (
            <Box sx={{ width: '100%'}}>
                <p>Error loading data</p>
            </Box>
        );
    } else {
        if(recipes.length > 0) {
            return (
                <div className='recipe-container'>
                    <Box sx={{bgcolor: '#E7EBF0', padding: 1}}>
                        <Stack spacing={2}>
                            {recipes.map((recipe) => (
                                <Item key={recipe.name}>
                                    <CardMedia component='img' image={recipe.image} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {recipe.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Ingredients: {recipe.ingredients.join(', ')}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {recipe.directions.map((step: string, i: number) => (
                                                <span key={uuidv4()}>{i + 1}. {step}<br /></span>
                                            ))}
                                        </Typography>
                                    </CardContent>
                                </Item>
                            ))}
                        </Stack>
                    </Box>
                </div>
                
            );
        } else {
            return (
                <Box sx={{ width: '100%'}}>
                    <p>Loading...</p>
                </Box>
            );
        }
    }
}

export default Recipes;