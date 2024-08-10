import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const News = () => {
  const newsItems = [
    {
      title: 'Noticia 1',
      date: '01/01/2024',
      description: 'Detalles de la noticia 1 que pueden incluir una descripción breve pero informativa sobre los aspectos más relevantes del evento.',
      imageUrl: '/banner-image.jpeg',
    },
    {
      title: 'Noticia 2',
      date: '02/01/2024',
      description: 'Detalles de la noticia 2 con una breve descripción, permitiendo a los lectores obtener una visión general rápida y fácil de comprender.',
      imageUrl: '/banner-image.jpeg',
    },
    {
      title: 'Noticia 3',
      date: '03/01/2024',
      description: 'Detalles de la noticia 3 que ofrece a los lectores una descripción rápida del contenido relevante y mantiene su interés.',
      imageUrl: '/banner-image.jpeg',
    },
  ];

  return (
    <Container id="noticias" maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Noticias
      </Typography>
      <Grid container spacing={4}>
        {newsItems.map((news, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <CardMedia
                component="img"
                height="180"
                image={news.imageUrl}
                alt={`Noticia ${index + 1}`}
                sx={{ borderRadius: '8px 8px 0 0' }}
                data-testid={`news-image-${index}`}
              />
              <CardContent>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ fontWeight: 'bold', mb: 1 }}
                  data-testid={`news-title-${index}`}
                >
                  {news.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 2 }}
                  data-testid={`news-date-${index}`}
                >
                  Fecha: {news.date}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  data-testid={`news-description-${index}`}
                >
                  {news.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
