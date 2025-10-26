import { Card, Avatar, Space } from 'antd-mobile';
import '../css/profile_card.css';
const ProfileCard = () => {
    return (
        <Card className="member-card" style={{position: 'absolute', top: '65px', left: '0',}}>
            <div className="member-content">
                <Avatar 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                className="profile-avatar"
                />
                <div className="member-info">
                    <h1 className="member-name">Sophia Carter</h1>
                    <p className="member-since">Member since 2021</p>
                </div>
            </div>
        </Card>
    );
}

export default ProfileCard;