import { NavBar } from "antd-mobile";
type NavbarProps = {
    title: string
    backIcon?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ title , backIcon = false }: NavbarProps) => {
    return <NavBar
        style={{
            '--height': '60px',
            '--border-bottom': '1px #eee solid',
            position: 'fixed', top: 0, left:0, zIndex: 1000, width: '92%',
            // border: "3px solid #060303ff",
          }}
          backIcon={backIcon}
    >
        <strong>{ title }</strong>
    </NavBar>;
}

export default Navbar;