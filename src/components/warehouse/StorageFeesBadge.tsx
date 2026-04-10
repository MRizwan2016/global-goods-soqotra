import React from 'react';
import { Badge } from '@/components/ui/badge';
import { StorageFeeResult } from '@/utils/storageFeesCalculator';
import { useLanguage } from '@/contexts/LanguageContext';

interface StorageFeesBadgeProps {
  feeResult: StorageFeeResult;
  compact?: boolean;
}

const StorageFeesBadge: React.FC<StorageFeesBadgeProps> = ({ feeResult, compact = false }) => {
  const { t } = useLanguage();

  if (feeResult.totalFee <= 0 && feeResult.status === 'free') {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
        {compact ? `${feeResult.daysInStorage}d` : `${t('storage.gracePeriod')} (${feeResult.daysInStorage}/${feeResult.gracePeriodDays})`}
      </Badge>
    );
  }

  const statusColors = {
    amber: 'bg-amber-100 text-amber-800 border-amber-300',
    red: 'bg-red-100 text-red-800 border-red-300',
    free: 'bg-green-100 text-green-800',
  };

  return (
    <div className="flex flex-col gap-1">
      <Badge className={`${statusColors[feeResult.status]} text-xs`}>
        {feeResult.daysInStorage} {t('storage.days')}
      </Badge>
      <span className="text-xs font-bold text-destructive">
        QAR {feeResult.totalFee.toFixed(2)}
      </span>
    </div>
  );
};

export default StorageFeesBadge;
