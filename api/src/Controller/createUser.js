const { Users } = require("../db");
const transporter = require("../Mailer/mailer.js");

const createUser = async (req, res) => {
  const { name, role, plan, email, password, username, avatar, idgoogle } =
    req.body;

  try {
    let user = await Users.create({
      name,
      role,
      plan,
      email,
      password,
      username,
      avatar,
      idgoogle,
    });

    async function Mail() {
      let info = await transporter.sendMail({
        from: '"SocialSound" <socialsound.web@gmail.com>',
        to: [user.email],
        subject: "Welcome!",
        html: `<h1>Welcome to SocialSound</h1>
        <a href="https://final-project-sable-two.vercel.app/"><img alt="SocialSound" width="200" height="200" src='cid:logo'/></a>`,
        attachments: [
          {
            filename: "logoiconbg.png",
            path: `${__dirname}/Images/logoiconbg.png`,
            cid: "logo",
          },
        ],
      });

      console.log("Message sent: %s", info.messageId);
    }

    Mail().catch(console.error);

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = createUser;
