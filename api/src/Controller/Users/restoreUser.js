const { Users } = require("../../db");
const transporter = require("../../Mailer/mailer.js");

const restoreUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOne({
      where: {
        id: id,
      },
      paranoid: false,
    });
    user.restore();

    async function Mail() {
      let info = await transporter.sendMail({
        from: '"SocialSound" <socialsound.web@gmail.com>',
        to: [user.email],
        subject: "Restored account",

        html: `<h1>Welcome back!! :) </h1>
        <a href="https://final-project-sable-two.vercel.app/"><img alt="SocialSound" width="200" height="200" src='cid:logo'/></a>
        <h3>We are happy to have you back!</h3>
        `,
        attachments: [
          {
            filename: "logoiconbg.png",
            path: `${__dirname}/../../Mailer/Images/logoiconbg.png`,
            cid: "logo",
          },
        ],
      });

      console.log("Message sent: %s", info.messageId);
    }

    Mail().catch(console.error);

    return res.send("Restored account");
  } catch (error) {
    res.json(error);
  }
};

module.exports = restoreUser;
