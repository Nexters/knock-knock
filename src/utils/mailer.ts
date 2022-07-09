import nodemailer from 'nodemailer'

export async function sendLoginEmail({ email, url, token }: { email: string; url: string; token: string }) {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  const info = await transporter.sendMail({
    from: '"woo10000see" <woo10000see@example.com>',
    to: email,
    subject: 'Login to your account',
    html: `클릭해서 로그인하세요! <a href="${url}/login#token=${token}">클릭</a>`,
  })

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}
