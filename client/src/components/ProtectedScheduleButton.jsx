import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App.jsx';
import { Calendar, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';

function ProtectedScheduleButton({ className = "btn btn-primary", size = "default" }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    if (!user) {
      toast.info('Please log in to schedule a session.');
      navigate('/login', { state: { message: 'Please log in to schedule a session.' } });
      return;
    }
    navigate('/schedule-appointment');
  };

  const buttonClasses = `${className} ${size === 'large' ? 'text-lg px-8 py-3' : ''}`;

  return (
    <button onClick={handleScheduleClick} className={buttonClasses}>
      <MapPin size={size === 'large' ? 20 : 16} className="mr-2" />
      Schedule Physical Meeting
    </button>
  );
}

export default ProtectedScheduleButton;