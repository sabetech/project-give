import { Space, Image, Button, Form, Input } from "antd-mobile";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
    return (<>
        <div style={{display:"flex", flexDirection:"column", width: '100%', height: '100vh', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            
            <Image src="/404" width={350} height={200} alt="Logo" fit='fill' />
            
            <div  style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <h2>Welcome to Give!</h2>
                <p>Manage your contributions to your church right here!</p>
                
                <Button block color="primary" size="large"><div style={{display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}><FcGoogle size={30} />&nbsp;Login with Google</div></Button>
                <p>Sign in with your username and password</p>
                <Form
                    layout='horizontal'
                    footer={
                        <div style={{ display: 'flex', flexDirection: 'column'}}>
                            <Button block type="submit" color="primary" size="large" style={{borderRadius: '15px'}}>Login</Button>
                            <a href="#" style={{ color: '#570A21' }}>Forgot Password?</a>
                        </div>
                    }
                    style={{ marginTop: '15px', backgroundColor: '#f7f1f2', padding: '20px', borderRadius: '15px' }}
                >
                    <Form.Item
                        name='email'
                        label='Email'
                        rules={[{ required: true, message: 'Type in your email' }]}
                        style={{textAlign: 'left', backgroundColor: "#dcced2ff", color: "#964F66", borderRadius: '15px', marginBottom: '15px'}}
                    >
                        <Input onChange={console.log} placeholder='email goes here' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[{ required: true, message: 'Type in your password' }]}
                        style={{textAlign: 'left', backgroundColor: "#dcced2ff", color: "#964F66", borderRadius: '15px'}}
                    >
                        <Input type='password' onChange={console.log} placeholder='password goes here' />
                    </Form.Item>

                </Form>
            </div>
        
            <Space direction="vertical" style={{width: '100%', alignItems: 'center', marginTop: '15vh'}}>
                <p style={{color: '#570A21'}}>By signing in, you agree to our Terms and Conditions and Privacy Policy.</p>
            </Space>
            
        </div>
    </>)
}

export default Login;