import Star from '@/assets/star.svg?react';
import StarFill from '@/assets/star-fil.svg?react';

interface TierStarsProps {
  tier: number;
}

export const TierStars = ({ tier }: TierStarsProps) => {
  const filledStars = Math.min(Math.max(tier, 0), 3);
  const emptyStars = 3 - filledStars;

  return (
    <div className="tier-stars">
      {Array.from({ length: filledStars }, (_, index) => (
        <StarFill key={`filled-${index}`} />
      ))}
      {Array.from({ length: emptyStars }, (_, index) => (
        <Star key={`empty-${index}`} />
      ))}
    </div>
  );
};
