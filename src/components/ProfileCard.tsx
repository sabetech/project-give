import { Card, Avatar } from 'antd-mobile';
import { useAuthUser } from '../hooks/authHooks';

const ProfileCard = () => {
    const getUser = useAuthUser();
    const user = getUser();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    return (
        <Card
            className="!bg-surface-container-low !rounded-xl !mx-4"
            style={{ marginTop: '76px' }}
        >
            <div className="flex items-center gap-4">
                <Avatar
                    src={user?.avatar ? `http://127.0.0.1:8091/api/files/users/${user.id}/${user.avatar}` : ''}
                    className="!w-16 !h-16 !rounded-full"
                />
                <div>
                    <h1 className="font-display text-lg font-bold text-on-surface m-0">
                        {user?.name || 'Guest'}
                    </h1>
                    <p className="text-on-surface-variant text-sm m-0">
                        Member since {user?.created ? formatDate(user.created) : 'N/A'}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default ProfileCard;
