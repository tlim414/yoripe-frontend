import { Card, CardContent, Typography } from "@mui/material"

type RecipeCardProps = {
    recipe: {
        id: string,
        title: string,
        description: string | null,
    }
}

export default function RecipeCard({
    recipe,
}: RecipeCardProps) {

    return (
        <Card
            sx={{
                height: '100%',
                borderRadius: 3,
            }}>
            {/* Add image later */}
            <CardContent>
                <Typography>
                    {recipe.title}
                </Typography>

                <Typography>
                    {recipe.description}
                </Typography>
            </CardContent>
        </Card>
    )
}