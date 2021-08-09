const hellosign = require("hellosign-sdk")({
  key: "0c4207666e811c4f4a72b9d8a5e242279c1f79b019a772e09c3da9348ddafce1",
});

let signatureRequestId = "";
// const opts = {
//   test_mode: 1,
//   title: "NDA with Acme Co.",
//   subject: "The NDA we talked about",
//   message: "Please sign this NDA and then we can discuss more.",
//   signers: [
//     {
//       email_address: "christopherjbanks@gmail.com",
//       name: "Chris Banks",
//     },
//   ],
//   files: ["./assets/contract.docx"],
// };
const testSign = async (req, res) => {
  console.log("hello", req.body);
  const email = req.body.email;
  const name = req.body.name;
  const opts = {
    test_mode: 1,
    title: "Contract",
    subject: "Job Offer",
    message:
      "Congrats on a successful interview! Please find your contract attached for signature.",
    signers: [
      {
        email_address: email,
        name: name,
      },
    ],
    files: ["./assets/contract.docx"],
  };
  hellosign.signatureRequest
    .send(opts)
    .then((res) => {
      const signatureRequest = res.signature_request;
      signatureRequestId = signatureRequest.signature_request_id;
      signatureRequestId && testCheckStatus(signatureRequestId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const testCheckStatus = (signatureRequestId) => {
  hellosign.signatureRequest
    .get(signatureRequestId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  testSign,
  testCheckStatus,
};
