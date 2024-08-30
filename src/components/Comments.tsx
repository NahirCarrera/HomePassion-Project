import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useState, useEffect } from 'react';

interface Feedback {
  feedback_id: number;
  feedback_text: string;
  feedback_date: string;
  customer_id: number;
  feedback_order: number;
}

const Comments = () => {
  const [comments, setComments] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/feedback/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Feedback[] = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return <Typography variant="h6" textAlign="center">Cargando comentarios...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" textAlign="center" color="error">{error}</Typography>;
  }

  return (
    <Container id="comentarios" maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Comentarios
      </Typography>
      <Typography variant="h6" gutterBottom textAlign="center">
        Número de Comentarios: {comments.length}
      </Typography>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          mb: 2
        }}
      >
        <List>
          {comments.map((comment) => (
            <ListItem 
              key={comment.feedback_id} 
              divider
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 1,
                mb: 2,
                p: 2
              }}
            >
              <ListItemText
               primary={
                <Typography variant="h6" color="text.primary">
                  Cliente {comment.customer_id}
                </Typography>
              }
                secondary={
                  <>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      Fecha: {new Date(comment.feedback_date).toLocaleDateString()}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.primary"
                      sx={{ mt: 1 }}
                    >
                      {comment.feedback_text}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Comments;
