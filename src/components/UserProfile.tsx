'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type UserIdentityProps = {
  username: string;
  nickname?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

function getSize(size: UserIdentityProps['size']) {
  switch (size) {
    case 'sm':
      return 'h-8 w-8 text-xs';
    case 'lg':
      return 'h-12 w-12 text-base';
    case 'md':
    default:
      return 'h-10 w-10 text-sm';
  }
}

export function UserIdentity({
  username,
  nickname,
  imageUrl,
  size = 'md',
  className,
}: UserIdentityProps) {
  const avatarClasses = getSize(size);

  const initials =
    username?.trim()?.slice(0, 1).toUpperCase() ||
    nickname?.trim()?.slice(0, 1).toUpperCase() ||
    'U';

  return (
    <div className={cn('flex items-center gap-3 min-w-0', className)}>
      <Avatar className={cn(avatarClasses, 'shrink-0')}>
        <AvatarImage src={imageUrl || '/placeholder.svg'} alt={`${username} avatar`} />
        <AvatarFallback className="bg-card text-foreground">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-foreground">{username}</span>
        {!!nickname && <span className="truncate text-xs text-muted-foreground">{nickname}</span>}
      </div>
    </div>
  );
}
