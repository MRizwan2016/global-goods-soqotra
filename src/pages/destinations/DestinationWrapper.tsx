
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DestinationWrapper = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Map destination countries to their respective routes
    const countryRouteMap: Record<string, string> = {
      kenya: '/kenya',
      qatar: '/qatar',
      // Add future countries as they become available
    };

    const route = countryRouteMap[country?.toLowerCase() || ''];
    
    if (route) {
      navigate(route, { replace: true });
    } else {
      // If we don't have a route for this country, go to 404
      navigate('/not-found', { replace: true });
    }
  }, [country, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse text-gray-400">Redirecting...</div>
    </div>
  );
};

export default DestinationWrapper;
