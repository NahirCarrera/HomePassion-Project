import { Container, Typography, Box, Card, CardContent } from '@mui/material';
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
          display: 'flex',
          gap: 4,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {comments.map((comment) => (
          <Card key={comment.feedback_id} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography 
                variant="h5" 
                component="div" 
                data-testid={`comment-name-${comment.feedback_id}`}
              >
                Cliente {comment.customer_id}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                data-testid={`comment-date-${comment.feedback_id}`}
              >
                Fecha: {new Date(comment.feedback_date).toLocaleDateString()}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                data-testid={`comment-text-${comment.feedback_id}`}
              >
                {comment.feedback_text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Comments;
