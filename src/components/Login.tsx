import { Button, Form, Input } from 'antd'
import { createStyles } from 'antd-style'
import styled from 'styled-components'

const Div = styled.div`
  z-index: 1;
  position: absolute;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  left: 20px;
  top: 20px;
`

export default function Login() {
  const { styles } = blockStyle()

  return (
    <Div>
      <Form>
        <Form.Item
          name='username'
          label='username'>
          <Input/>
        </Form.Item>
        <Form.Item
          name='password'
          label='password'>
          <Input/>
        </Form.Item>
      </Form>
      <Button type='primary' className={styles.LoginButton}>Login</Button>
    </Div>
  )
}

const blockStyle = createStyles(({ css }) => ({
  LoginButton: css`
    display: block; 
    margin-left: auto;
  `
}))