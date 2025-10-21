import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { StatusConfig } from "@/types/global";

interface StatusAlertProps {
  statusConfig: StatusConfig
}

export const StatusAlert = ({ statusConfig }: StatusAlertProps) => {
  const StatusIcon = statusConfig.icon;

  return (
    <Alert className={`${statusConfig.bgColor} ${statusConfig.borderColor}`}>
      <StatusIcon className={`h-5 w-5 ${statusConfig.titleColor}`} />
      <AlertTitle className={statusConfig.titleColor}>{statusConfig.label}</AlertTitle>
      <AlertDescription className={statusConfig.descColor}>
        Status transaksi Anda saat ini
      </AlertDescription>
    </Alert>
  );
};
