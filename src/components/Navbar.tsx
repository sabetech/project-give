import { NavBar } from "antd-mobile";

type NavbarProps = {
    title: string;
    backIcon?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ title, backIcon = false }) => {
    return (
        <NavBar
            style={{
                '--height': '60px',
                '--border-bottom': '1px #dac0c3 solid',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                width: '100%',
                backgroundColor: '#fff8f7',
            }}
            backIcon={backIcon}
        >
            <strong className="font-display text-on-surface">{title}</strong>
        </NavBar>
    );
};

export default Navbar;
