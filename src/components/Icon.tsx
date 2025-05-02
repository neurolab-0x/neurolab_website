import {
  Zap,
  Brain,
  LineChart,
  FlaskConical,
  Target,
  Clock,
  BookOpen,
  Building2,
  Shield,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const icons: { [key: string]: React.ComponentType<any> } = {
    'zap': Zap,
    'brain': Brain,
    'chart': LineChart,
    'flask': FlaskConical,
    'target': Target,
    'clock': Clock,
    'book': BookOpen,
    'building': Building2,
    'shield': Shield,
    'analytics': BarChart3,
    'check': CheckCircle2
  };

  const IconComponent = icons[name.toLowerCase()];

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ${className}`}
      size={size}
    />
  );
};

export default Icon; 