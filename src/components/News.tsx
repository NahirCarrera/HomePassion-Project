import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

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

  return (
    <Container id="noticias" maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Campañas
      </Typography>
      <Grid container spacing={4}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
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
                  sx={{ fontWeight: 'bold', mb: 1 }}
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
