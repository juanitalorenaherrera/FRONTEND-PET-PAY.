import { PawPrint } from 'lucide-react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

interface LoadingPawsProps {
  message?: string;
  className?: string;
}

export const LoadingPaws = ({
  message = 'Cargando...',
  className = '',
}: LoadingPawsProps) => {
  const pawVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  }),
};

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 ${className}`}
    >
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={pawVariants}
            initial="hidden"
            animate="visible"
          >
            <PawPrint className="w-8 h-8 text-orange-400" />
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-600">{message}</p>
    </div>
  );
};
