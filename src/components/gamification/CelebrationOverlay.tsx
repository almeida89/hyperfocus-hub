// Componente de overlay para celebrações visuais extras
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Award } from 'lucide-react';

interface CelebrationOverlayProps {
  show: boolean;
  type: 'level' | 'reward' | 'mission' | 'achievement';
  title: string;
  description?: string;
  icon?: string;
  onComplete?: () => void;
}

const CelebrationOverlay = ({ 
  show, 
  type, 
  title, 
  description, 
  icon,
  onComplete 
}: CelebrationOverlayProps) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const getIcon = () => {
    if (icon) return <span className="text-8xl">{icon}</span>;
    
    switch (type) {
      case 'level':
        return <Zap className="w-24 h-24 text-primary" />;
      case 'reward':
        return <Trophy className="w-24 h-24 text-primary" />;
      case 'mission':
        return <Award className="w-24 h-24 text-primary" />;
      case 'achievement':
        return <Star className="w-24 h-24 text-primary" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'level':
        return 'from-primary/20 via-accent/20 to-primary/20';
      case 'reward':
        return 'from-yellow-500/20 via-orange-500/20 to-yellow-500/20';
      case 'mission':
        return 'from-blue-500/20 via-purple-500/20 to-blue-500/20';
      case 'achievement':
        return 'from-green-500/20 via-emerald-500/20 to-green-500/20';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 bg-gradient-to-br ${getColors()} backdrop-blur-sm`}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
            exit={{ scale: 0, rotate: 180 }}
            className="relative z-10 text-center space-y-6"
          >
            {/* Icon with pulse animation */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="flex justify-center"
            >
              {getIcon()}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-foreground"
            >
              {title}
            </motion.h2>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-muted-foreground"
              >
                {description}
              </motion.p>
            )}

            {/* Stars decoration */}
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  <Star className="w-6 h-6 fill-primary text-primary" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationOverlay;
