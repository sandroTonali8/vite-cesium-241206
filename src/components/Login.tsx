import { Form, Input } from 'antd'
import { createStyles } from 'antd-style'

export default function Login() {
  const { styles } = blockStyles()

  return (
    <div className={styles.loginpanel}>
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
    </div>
  )
}

const blockStyles = createStyles(({ css, token }) => ({
  loginpanel: css`
    z-index: 1;
    position: absolute;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    left: 20px;
    top: 20px;
  `
}))