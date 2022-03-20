import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

/* Resources:
    https://mui.com/components/stack/
    https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/installation/installation.md#:~:text=Installation%20Install%20MUI%2C%20the%20world%27s%20most%20popular%20React,%2F%2F%20with%20yarn%20yarn%20add%20%40mui%2Fmaterial%20%40emotion%2Freact%20%40emotion%2Fstyled  
*/
function Recipes() {
    const [recipes, setRecipes] = useState<Array<any>>([]);
    let isError = false;
    
    useEffect(() => {
        (async () => {
            let response = await fetch("https://kazumirecipeapi.uw.r.appspot.com");
            if(response.ok) {
                const recipeJson = await response.json();
                console.log(recipeJson);
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
                isError = true;
            }
        })();
    }, []);

    interface Recipe {
        name: string;
        directions: string[];
        ingredients: string[];
        image: string;
    }

    console.log(recipes);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
      
    if(isError) {
        return (
            <Box sx={{ width: '100%', bgcolor: 'primary.main' }}>
                <p>Error loading data</p>
            </Box>
        );
    } else {
        if(recipes.length > 0) {
            return (
                <Box sx={{bgcolor: '#E7EBF0', padding: 1}}>
                    <Stack spacing={2}>
                        {recipes.map((recipe, i) => (
                            <Item key={i}>{recipe.name}</Item>
                        ))}
                    </Stack>
                </Box>
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