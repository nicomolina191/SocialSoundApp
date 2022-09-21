const { Users } = require("../../db.js");
const transporter = require("../../Mailer/mailer.js");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await Users.findByPk(id);
    user.destroy();
    //force: true ---> if you want to permanently delete

    async function Mail() {
      let info = await transporter.sendMail({
        from: '"SocialSound" <socialsound.web@gmail.com>',
        to: [user.email],
        subject: "Account deleted",
        html: `<h1>We will miss you :( </h1>
        <a href="https://final-project-sable-two.vercel.app/"><img alt="SocialSound" width="200" height="200" src='cid:logo'/></a>
        <h3>You have time to reactivate your account within a maximum period of 30 days </h3>
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
    return res.send("User was successfully deleted");
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = deleteUser;
