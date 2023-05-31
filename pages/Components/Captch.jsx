import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      //   6LdqclUmAAAAAOUPNWTYhjj0RHYpKHx4p7Kg5yru
      onChange={onChange}
    />
  );
};

export default Captcha;
