import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const Comments = () => {
  const comments = [
    { name: 'Cliente 1', rating: '★★★★☆', comment: 'Comentario del cliente 1.' },
    { name: 'Cliente 2', rating: '★★★☆☆', comment: 'Comentario del cliente 2.' },
    { name: 'Cliente 3', rating: '★★★☆☆', comment: 'Comentario del cliente 3.' },
  ];

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
        {comments.map((comment, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardContent>
      <Typography 
        variant="h5" 
        component="div" 
        data-testid={`comment-name-${index}`}
      >
        {comment.name}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        data-testid={`comment-rating-${index}`}
      >
        {comment.rating}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        data-testid={`comment-text-${index}`}
      >
        {comment.comment}
      </Typography>
    </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Comments;
