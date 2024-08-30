import { Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Importa el componente de carrusel

interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  totalBudget: number | undefined; // Permitir undefined para manejar posibles valores no definidos
}

const News = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/campaigns/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            // Mapear datos a la estructura de Campaign
            const formattedData = data.map((campaign: any) => ({
                id: campaign.campaign_id,
                name: campaign.campaign_name,
                startDate: campaign.start_date,
                endDate: campaign.end_date,
                totalBudget: campaign.total_budget,
            }));
            console.log(formattedData); // Verifica la estructura aquí
            setCampaigns(formattedData);
        })
        .catch(error => console.error('Error fetching campaigns:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container id="noticias" maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Noticias
      </Typography>
      <Slider {...settings} sx={{ padding: '0 16px' }}>
        {campaigns.map((campaign) => (
          <div key={campaign.id} style={{ padding: '0 8px' }}> {/* Añade espacio entre los elementos */}
            <Card
              sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
            >
              <CardMedia
                component="img"
                height="180"
                image="/banner-image.jpeg" // Reemplaza esto con una imagen específica si está disponible
                alt={`Campaña ${campaign.name}`}
                sx={{ borderRadius: '8px 8px 0 0' }}
                data-testid={`campaign-image-${campaign.id}`}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 'bold', mb: 1, color: 'black' }} // Nombre del cliente en negro
                  data-testid={`campaign-name-${campaign.id}`}
                >
                  {campaign.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                  data-testid={`campaign-dates-${campaign.id}`}
                >
                  Desde: {new Date(campaign.startDate).toLocaleDateString()} - Hasta: {new Date(campaign.endDate).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  data-testid={`campaign-budget-${campaign.id}`}
                >
                  Presupuesto: ${campaign.totalBudget !== undefined ? campaign.totalBudget.toFixed(2) : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default News;
